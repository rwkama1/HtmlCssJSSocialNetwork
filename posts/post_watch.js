class PostWatchJS
{
  //LOAD PAGE
  static loadPage=async()=>
  {
   setTimeout(async () => {
    try {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
        let idpostwatch = sessionStorage.getItem('idpostwatch');

          let getPost=await APIRESTPost.getPost(idpostwatch,sessionuser.iduser,
            sessionuser.userrname)
      
      
      let getuser=await APIRESTUser.getUser(getPost.user.iduser,sessionuser.iduser,
        sessionuser.userrname);
    let iduserlogin=sessionuser.iduser;
        let iduserpost=getuser.iduser;
       //SHOW EDIT DELETE POST DIV
        const editDeleteDiv = document.getElementById('postwatch_editdeletepost_div');

               if (iduserlogin===iduserpost) {
              
               editDeleteDiv.removeAttribute('hidden');
               } else {
             
               editDeleteDiv.setAttribute('hidden', true);
               }



    //SHOW EXISTLIKEPOST
  let existLikePost=await APIRESTLikes.existLikePost(idpostwatch,sessionuser.iduser,sessionuser.userrname);

  
    if(existLikePost)
    {
      document.getElementById("svg_postwatch_likepost").setAttribute("fill","black");
    }

   
    // GET ID USER

  document.getElementById("postwatch_iduser").value=iduserpost;

      //GET POST
       this.loadPost(getPost,getuser.image);

      //NUMBER COMMENT POSTS
       let NumberOfCommentPost=await APIRESTPostComment.NumberOfCommentPost(idpostwatch);
       document.getElementById("postwatch_div_numbercomments").innerHTML=`Comments (${NumberOfCommentPost})`;
      
       //LOAD COMMENT POSTS  
       await this.loadCommentPost(idpostwatch,sessionuser);

  } catch (error) {
    console.log(error);
    //window.location.href="../index.html"; 
       }
   },1000);
  }



  static loadPost=async(getPost,userimage)=>
  {
   
   
   let {  description,likes , DateTimePublish, title,user,idpost,visibility} = getPost;
 
   //SHOW NUMBER LIKES

   document.getElementById("postwatch_numberlikes").innerHTML=likes;
   
   //CONERT FORMAT DATE

  const dt = new Date(DateTimePublish);
  const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
   if(userimage==="")
     {
       userimage="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
     }
     //GET IMAGE
  
   document.getElementById("postwatch_title").innerHTML=title;
   document.getElementById("postwatch_userimage").setAttribute("src", userimage);
   document.getElementById("postwatch_username_div").innerHTML=user.name;
   document.getElementById("postwatch_publishedpost").innerHTML=`Published on ${formatted_date}`;
   document.getElementById("postwatch_description").innerHTML=description;
   // document.getElementById("usersettings_urltwitter").setAttribute("value", urltwitter);

   //GET UPDATE POST MODAL
   document.getElementById("idpost_updatepost_postwatch").setAttribute("value",idpost );
   document.getElementById("postwatch_updatepost_name").setAttribute("value", title);
   document.getElementById("postwatch_updatepost_description").innerHTML=description;
   const visibilitySelect = document.getElementById('postwatch_updatepost_visibility');
   if (visibility === 'Private') {
     visibilitySelect.value = 'Private';
   } else {
     visibilitySelect.value = 'Public';
   }

   //GET ID POST DELETE
   document.getElementById("idpost_deletepost_postwatch").setAttribute("value", idpost);

  } 
     //UPDATE POST
     static updatePost= async(event)=>
     {
       try {
         event.preventDefault();
         let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
         const idpost = document.getElementById('idpost_updatepost_postwatch').value;
         const title = document.getElementById('postwatch_updatepost_name').value;
          const description = document.getElementById('postwatch_updatepost_description').value;       
          const visibility = document.getElementById('postwatch_updatepost_visibility').value;
         
            
          const dataform = {idpost,title
            ,description,visibility}
        
           const updatePost= await APIRESTPost.updatePost(dataform,
            sessionuser.iduser,sessionuser.userrname );
           if (updatePost) {
         
             messagenotification('Post Updated','success',event);
             setInterval(() => {
              location.reload();
             }, 1000);
             document.getElementById('postwatch_updatepost_name').value="";
             document.getElementById('postwatch_updatepost_description').value="";
            }
      
        
       }catch (error) {
         alert(error);
       }
     }
     //DELETE POST
     static deletePost= async(event)=>
     {
       try {
        
         const idpost = document.getElementById('idpost_deletepost_postwatch').value;
        
         let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
           const deletePost= await APIRESTPost.deletePost(idpost,sessionuser.iduser,
            sessionuser.userrname);
           if (deletePost) {
         
             messagenotification('Post Deleted','success',event);
             setInterval(() => {
              window.location.href="./post_mainpage.html"; 
             }, 1000);
           
            }
      
        
       }catch (error) {
         alert(error);
       }
     }
      //REDIRECT TO PROFILE USER
    static passidtoUserProfile=()=>
    {
        try {
        const iduser=document.getElementById("postwatch_iduser").value;
          sessionStorage.setItem("iduserwatch",null);
          sessionStorage.setItem('iduserwatch', iduser);
      
          }catch (error) {
          // alert(error);
          
          }
          
    }  



//******************************************************** */
 //COMMENTS 


 //LOAD COMMENT POSTS
  static loadCommentPost=async(idpost,sessionuser)=>
  {
    let html_comments_posts="";
    let listcommentpost=await  APIRESTPostComment.getCommentPostByPost(idpost,
      sessionuser.iduser,sessionuser.userrname);
      for (let i = 0; i < listcommentpost.length; i++) {
        const commentpost = listcommentpost[i];
        let idcomment=commentpost.idusercomment ;
        let textcomment=commentpost.textcomment ;
        let likescomment =commentpost.likescomment;
        let datepublishcomment =commentpost.datepublishcomment;

        //CONERT FORMAT DATE

        const dt = new Date(datepublishcomment);
        const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        //USER
        let namecommentuser  =commentpost.namecommentuser ;
        let imagecommentuser  =commentpost.imagecommentuser ;
        if (imagecommentuser==="") {
          imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }

        let numberofsubcomments=await  APIRESTSubComment.NumberOfSubComments(idcomment);
      
     html_comments_posts+=`
    <div >
    <!--  Comment -->
    <div class="flex items-start">
    <a 
    href="../profileuser/profileuser.html"
    onclick="PostWatchJS.passidtoUserProfile();" 
    >
    <img src="${imagecommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
    </a>
     
       <div>
         <h4 class="text-base m-0 font-semibold">${namecommentuser}</h4>
         <span class="text-gray-700 text-sm">${formatted_date}</span>
         <br>
         <p>
          ${textcomment}
         </p>
         <div class="flex space-x-4 lg:font-bold">
          <button onclick="PostWatchJS.like_dislike_Comment('${idcomment}', event);" class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
                  <svg id="svg_postwatch_likecomment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                  </svg>
              </div>
              <div id="postwatch_numberlikescomment"> ${likescomment}</div>
          </button>
          <a href="" uk-toggle="target: #view-subcomments${idcomment}" class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                      <path fill-rule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                  </svg>
              </div>
              <div> ${numberofsubcomments} </div>
          </a>
      </div>
       </div>
       <!-- EDIT AND DELETE COMMENT  -->
       <div>
          <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
            <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
            uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
               <ul class="space-y-1">
                
                  <li>
                     <a href="" uk-toggle="target: #update_comment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                         <i class="uil-edit-alt mr-1"></i>
                          Edit  </a>
                  </li>
            
                  <li>
                     <hr class="-mx-2 my-2 dark:border-gray-800">
                  </li>
                  <li>
                     <a href="" uk-toggle="target: #deletecommentmodal" 
                     class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                         <i class="uil-trash-alt mr-1"></i> Delete </a>
                  </li>
               </ul>
            </div>
       </div>
     </div>
  
    <!-- Subcomment -->
    <div class="ml-12 mt-4" hidden id="view-subcomments${idcomment}" >
      <div class="p-4 rounded-md">
       <div >
        <div id="postwatch_listupdatesubcomments">
        <!-- Subcomennt 1 -->
           ${await this.loadSubCommentPost(idcomment,sessionuser.iduser)}
         </div>
       </div>
   <br>
        <!-- ADD SUBCOMMENT -->
        <div>
          <form id="form_postwatch_addsubcomment"
           onsubmit="PostWatchJS.addSubCommentPost('${idcomment}', event);">
             <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input type="text" id="postwatch_textsubcomment" placeholder="Add your Sub Comment.." class="bg-transparent max-h-10 shadow-none px-5 w-1/2">
               <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                 <button type="submit" class="btn btn-primary">
                   <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                 </button>
               </div>
             </div>
           </form>
           
        </div>
      </div>
    </div>
  </div>
  
    <br>
    `
    //  //SHOW EXISTLIKECOMMENT
    //  let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,sessionuser.iduser,sessionuser.userrname);

  
    //  if(existLikeComment)
    //  {
    //    document.getElementById("svg_postwatch_likecomment").setAttribute("fill","black");
    //  }
 
  }
  document.getElementById("comments_postwatch1").innerHTML= html_comments_posts;
  


  
  }
  //ADD COMMENT POST
  static addCommentPost=async(event)=>
  {
    try {
      event.preventDefault();
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
      let idpostwatch = sessionStorage.getItem('idpostwatch');
     const textcomment = document.getElementById('postwatch_textcomment').value;

     const commentPost= await APIRESTPostComment.commentPost(idpostwatch,
      textcomment,sessionuser.iduser,sessionuser.userrname);
     if (commentPost) {
   
       messagenotification('Comment Added','success',event);

      await this.loadCommentPost(idpostwatch,sessionuser);
       
   

      //  setInterval(() => {
      //   location.reload();
      //  }, 1000);
       document.getElementById('postwatch_textcomment').value="";
      }
  }catch (error) {
    alert(error);
  }
  }
//********************************* */
  //SUBCOMMENTS

 //ADD SUBCOMMENT POST
 static addSubCommentPost=async(idcomment,event)=>
 {
   try {
     event.preventDefault();
     let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    const textsubcomment = document.getElementById('postwatch_textsubcomment').value;

    const addSubComment= await APIRESTSubComment.addSubComment
    (idcomment,
      textsubcomment,sessionuser.iduser,sessionuser.userrname);
    if (addSubComment) {
  
      messagenotification('Added comment answer','success',event);

      await this.showAddedSubComment(idcomment,sessionuser.iduser);
      
     //await this.loadSubCommentPost(idcomment,sessionuser.iduser);
      
  

     //  setInterval(() => {
     //   location.reload();
     //  }, 1000);
      document.getElementById('postwatch_textsubcomment').value="";
     }
 }catch (error) {
   alert(error);
 }
 }

  static loadSubCommentPost=async(idcomment,iduser)=>
  {
    let html_subcomments_posts="";
    let listsubcommentpost=await  APIRESTSubComment.getSubCommentByComment(
      iduser,
      idcomment);
      for (let i = 0; i < listsubcommentpost.length; i++) {
        const subcommentpost = listsubcommentpost[i];
        let idsubusercomment =subcommentpost.idsubusercomment  ;
        let textsubcomment= subcommentpost.textsubcomment; 
        let likessubcomment =subcommentpost.likessubcomment;
        let datepublishsubcomment =subcommentpost.datepublishsubcomment ;

        //CONERT FORMAT DATE

        const dt = new Date(datepublishsubcomment);
        const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        //USER
        let namesubcommentuser  =subcommentpost.namesubcommentuser   ;
        let imagesubcommentuser  =subcommentpost.imagesubcommentuser;
      
        if (imagesubcommentuser==="") {
          imagesubcommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }
      
        html_subcomments_posts+=`
     <div class="flex items-start mt-8">
     <img src="${imagesubcommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
     <div>
       <h4 class="text-sm m-0 font-semibold">${namesubcommentuser}</h4>
       <span class="text-gray-700 text-sm">${formatted_date}</span>
       <br>
       <p class="text-sm">
        ${textsubcomment}
       </p>
       <!-- Like  -->
       <div class="flex space-x-4 lg:font-bold">
        <button onclick="PostWatchJS.like_dislike_Comment('${idcomment}', event);" class="flex items-center space-x-2">
            <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 w-8">
                <svg id="svg_postwatch_likecomment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
            </div>
            <div>${likessubcomment}</div>
        </button>
   
    </div>
     </div>
     <!-- EDIT AND DELETE SUBCOMENT -->
     <div>
        <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
          <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
          uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
             <ul class="space-y-1">
              
                <li>
                   <a href="" uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-edit-alt mr-1"></i>
                        Edit  </a>
                </li>
          
                <li>
                   <hr class="-mx-2 my-2 dark:border-gray-800">
                </li>
                <li>
                   <a href="" uk-toggle="target: #deletesubcommentmodal" 
                   class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                       <i class="uil-trash-alt mr-1"></i> Delete </a>
                </li>
             </ul>
          </div>
     </div>
   </div>
    `
  }
  return html_subcomments_posts;
  
  
  }
//SHOW SUBCOMMENT AFTER ADD

  static async showAddedSubComment(idcomment,iduser) {
    let listsubcomment = await APIRESTSubComment.getSubCommentByComment(iduser, idcomment);
    let subcommentpost = listsubcomment[listsubcomment.length - 1];

    let idsubusercomment = subcommentpost.idsubusercomment;
    let textsubcomment = subcommentpost.textsubcomment;
    let likessubcomment = subcommentpost.likessubcomment;
    let datepublishsubcomment = subcommentpost.datepublishsubcomment;

    //CONERT FORMAT DATE
    const dt = new Date(datepublishsubcomment);
    const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    //USER
    let namesubcommentuser = subcommentpost.namesubcommentuser;
    let imagesubcommentuser = subcommentpost.imagesubcommentuser;

    if (imagesubcommentuser === "") {
      imagesubcommentuser = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
    }

    let html_subcomment = `
      <div class="flex items-start mt-8">
      <img src="${imagesubcommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
      <div>
        <h4 class="text-sm m-0 font-semibold">${namesubcommentuser}</h4>
        <span class="text-gray-700 text-sm">${formatted_date}</span>
        <br>
        <p class="text-sm">
         ${textsubcomment}
        </p>
        <!-- Like  -->
        <div class="flex space-x-4 lg:font-bold">
         <a href="" class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 w-8">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                     <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                 </svg>
             </div>
             <div>${likessubcomment}</div>
         </a>
    
     </div>
      </div>
      <!-- EDIT AND DELETE SUBCOMENT -->
      <div>
         <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
           <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
           uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
              <ul class="space-y-1">
               
                 <li>
                    <a href="" uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                        <i class="uil-edit-alt mr-1"></i>
                         Edit  </a>
                 </li>
           
                 <li>
                    <hr class="-mx-2 my-2 dark:border-gray-800">
                 </li>
                 <li>
                    <a href="" uk-toggle="target: #deletesubcommentmodal" 
                    class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                        <i class="uil-trash-alt mr-1"></i> Delete </a>
                 </li>
              </ul>
           </div>
      </div>
    </div>
     `;
    let idpostwatch_listupdatesubcomments= document.getElementById("postwatch_listupdatesubcomments");
    idpostwatch_listupdatesubcomments.parentNode.insertAdjacentHTML("beforeend", html_subcomment);
  }
  //*************************************** */
  //LIKES

  //ADD DELETE LIKE POST

  static like_dislike_Post= async(event)=>
  {
    try {
      event.preventDefault();
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
      let idpostwatch = sessionStorage.getItem('idpostwatch');
      let existLikePost=await APIRESTLikes.existLikePost(idpostwatch,sessionuser.iduser,sessionuser.userrname)
     if (existLikePost) {
      const deletelikePost= await APIRESTLikes.deletelikePost(idpostwatch,
        sessionuser.iduser,sessionuser.userrname );
       if (deletelikePost) {
      
         document.getElementById('svg_postwatch_likepost').setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById('postwatch_numberlikes').textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById('postwatch_numberlikes').innerHTML=numberoflikes;
       }
      } 
     else{
      const likePost= await APIRESTLikes.likePost(idpostwatch,
        sessionuser.iduser,sessionuser.userrname );
       if (likePost) {
      
         document.getElementById('svg_postwatch_likepost').setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById('postwatch_numberlikes').textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById('postwatch_numberlikes').innerHTML=numberoflikes;
       }
     }
  
       
    
     
    }catch (error) {
      alert(error);
    }
  }

  static like_dislike_Comment= async(idcomment,event)=>
  {
    try {
      event.preventDefault();
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    
      let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,sessionuser.iduser,sessionuser.userrname)
     
      if (existLikeComment) {

      const deleteComment= await APIRESTLikes.deleteComment(idcomment,
        sessionuser.iduser,sessionuser.userrname );
       if (deleteComment) {
      
         document.getElementById('svg_postwatch_likecomment').setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById('postwatch_numberlikescomment').textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById('postwatch_numberlikescomment').innerHTML=numberoflikes;
       }
      } 

     else{

      const likeComment= await APIRESTLikes.likeComment(idcomment,
        sessionuser.iduser,sessionuser.userrname );
       if (likeComment) {
      
         document.getElementById('svg_postwatch_likecomment').setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById('postwatch_numberlikescomment').textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById('postwatch_numberlikescomment').innerHTML=numberoflikes;
       }
     }
  
       
    
     
    }catch (error) {
      alert(error);
    }
  }

}
window.addEventListener("load",PostWatchJS.loadPage);


const updatepostform = document.getElementById('form_postwatch_updatepost');
updatepostform.addEventListener('submit', PostWatchJS.updatePost);


const buttonDeletePost = document.getElementById('button_deletepostmodal_postwatch');
buttonDeletePost.addEventListener('click', PostWatchJS.deletePost);

const a_userprofile= document.getElementById('postwatch_a_userprofile');
a_userprofile.addEventListener('click', PostWatchJS.passidtoUserProfile);


const form_addcommentpost = document.getElementById('form_addcommentpost');
form_addcommentpost.addEventListener('submit', PostWatchJS.addCommentPost);


const postwatch_buttonlikepost = document.getElementById('postwatch_buttonlikepost');
postwatch_buttonlikepost.addEventListener('click', PostWatchJS.like_dislike_Post);