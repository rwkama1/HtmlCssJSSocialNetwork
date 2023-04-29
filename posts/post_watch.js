class PostWatchJS
{
  //LOAD PAGE
  static loadPage=async()=>
  {

    try {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
      let {iduser,userrname}=sessionuser;
        let idpostwatch = sessionStorage.getItem('idpostwatch');

          let getPost=await APIRESTPost.getPost(idpostwatch,iduser,
            userrname)
      
      
      let getuser=await APIRESTUser.getUser(getPost.user.iduser,iduser,
        userrname);
    let iduserlogin=iduser;
        let iduserpost=getuser.iduser;
       //SHOW EDIT DELETE POST DIV
        const editDeleteDiv = document.getElementById('postwatch_editdeletepost_div');

               if (iduserlogin===iduserpost) {
              
               editDeleteDiv.removeAttribute('hidden');
               } else {
             
               editDeleteDiv.setAttribute('hidden', true);
               }



    //SHOW EXISTLIKEPOST
  let existLikePost=await APIRESTLikes.existLikePost(idpostwatch,iduser,userrname);

  
    if(existLikePost)
    {
      document.getElementById("svg_postwatch_likepost").setAttribute("fill","black");
    }

   
    // GET ID USER

  document.getElementById("postwatch_iduser").value=iduserpost;

      //GET POST
       this.loadPost(getPost,getuser.image);

     await this.listSuggestedPost(sessionuser.iduser,sessionuser.userrname,iduserpost);
      //NUMBER COMMENT POSTS
      let NumberOfCommentPost=await  APIRESTPostComment.NumberOfCommentPost(idpostwatch);
      document.getElementById("postwatch_div_numbercomments").innerHTML=`Comments (${NumberOfCommentPost})`;

  
  // await this.loadCommentPost(listcommentpost,idpostwatch,iduser,userrname);


      
     

  } catch (error) {
    console.log(error);
    //window.location.href="../index.html"; 
       }
   
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

// LOAD SUGGESTED POST
static async listSuggestedPost(iduserlogin,usernamelogin,iduserpost) {
          
  let getPostSuggestedUser = await APIRESTPost.getPostSuggestedUser
  (iduserlogin,iduserpost,usernamelogin);

  let html_load_listsuggestedpost="";
  for (let i = 0; i < Math.min(getPostSuggestedUser.length, 15); i++) {
    let {  description, stringpostedago, title,user,idpost } = getPostSuggestedUser[i];
    html_load_listsuggestedpost += `
             <div class="py-2 relative">
                        <div class="flex-1 pt-3 relative"> 
                        
                          <a 
                          href="post_watch.html"
                          onclick="PostWatchJS.passidtoPostWatch('${idpost}');" 
                          >
                        
                          <h4 class="line-clamp-3 font-semibold whitespace-no-wrap overflow-hidden text-truncate">
                         ${title}
                         </h4>
                          <br>
                          <p class=" line-clamp-3 whitespace-no-wrap overflow-hidden text-truncate">
                         ${description}
                          </p>
                        </a>
                        <br>
                          <div class="flex space-x-2 items-center text-sm pt-1">
                           
                            <div> ${stringpostedago}  ago</div>
                            <div>·</div>
                          
                          </div>
                        </div>
             </div>
 
        `;
  }
  document.getElementById("postwatch_listsuggestedpost").innerHTML = html_load_listsuggestedpost;  
  
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
    static passidtoPostWatch=(idpost)=>
    {
      sessionStorage.setItem('idpostwatch', null);
      sessionStorage.setItem('idpostwatch', idpost); 
          
    }
    static passidtoUserProfile_Comment=(idusercomment)=>
    {
       try {
      
        sessionStorage.setItem("iduserwatch",null);
          sessionStorage.setItem('iduserwatch', idusercomment);
      
         }catch (error) {
          alert(error);
          
         }
          
    }  
    static passidtoUserProfile_SubComment=(idsubcommentuser)=>
    {
       try {
      
        sessionStorage.setItem("iduserwatch",null);
          sessionStorage.setItem('iduserwatch', idsubcommentuser);
      
         }catch (error) {
          alert(error);
          
         }
          
    } 

//#region COMMENTS
//******************************************************** */

//SHOW COMMENTS 
static async show_comment_post()
{
  let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
  let {iduser,userrname}=sessionuser;
    let idpostwatch = sessionStorage.getItem('idpostwatch');
   let listcommentpost=await  APIRESTPostComment.getCommentPostByPost(idpostwatch,
    iduser,userrname);

  await PostWatchJS.loadCommentPost(listcommentpost,idpostwatch,iduser,userrname);

// profileloginuser_commentspost${idpost}
}

 //LOAD COMMENT POSTS
  static loadCommentPost=async(listcommentpost,idpost,iduser,userrname)=>
  {
    let html_comments_posts="";
  
      for (let i = 0; i < listcommentpost.length; i++) {
        const commentpost = listcommentpost[i];
        let idcomment=commentpost.idusercomment ;
        let textcomment=commentpost.textcomment ;
        let likescomment =commentpost.likescomment;
        let datepublishcomment =commentpost.datepublishcomment;
        let stringpostedago =commentpost.stringpostedago;


        //CONERT FORMAT DATE

        const dt = new Date(datepublishcomment);
        const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        //USER
        let idcommentuser  =commentpost.idcommentuser ;
        let namecommentuser  =commentpost.namecommentuser ;
        let imagecommentuser  =commentpost.imagecommentuser ;
        if (imagecommentuser==="") {
          imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }

     
        let NumberOfSubComments=commentpost.numbersubcomment; 
        // let listsubcommentpost=await  APIRESTSubComment.getSubCommentByComment(
        //   iduser,
        //   idcomment);
        //   let numberofsubcomments=listsubcommentpost.length;
        //   let loadSubCommentPost="";
        //   if(numberofsubcomments!==0)
        //   {
        //     loadSubCommentPost = await this.loadSubCommentPost(listsubcommentpost,idcomment, iduser,userrname);
        //   }
      
      const svgfill_existlikecomment =  this.svgfill_existlikecomment(commentpost.existcommentloginuser);
      


      let show_edit_delete_comment = this.show_edit_delete_comment(commentpost.existcommentloginuser);

     html_comments_posts+=`
    <div id="postwatch_div_listcomment$${idcomment}"  >
    <!--  Comment -->
    <div class="flex items-start">
    <a 
    href="../profileuser/profileuser.html"
    onclick="PostWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
    >
    <img src="${imagecommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
    </a>
     
       <div>
       <a 
       href="../profileuser/profileuser.html"
       onclick="PostWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
       >
         <h4 class="text-base m-0 font-semibold">${namecommentuser}</h4>
         </a>
         <span class="text-gray-700 text-sm">${stringpostedago}</span>
         <br>
         <p id="postwatch_p_textcomment${idcomment}">
          ${textcomment}
         </p>
         <div class="flex space-x-4 lg:font-bold">
          <button onclick="PostWatchJS.like_dislike_Comment('${idcomment}', event);" class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
                  <svg id="svg_postwatch_likecomment${idcomment}"
                   xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 20 20" 
                   fill="${svgfill_existlikecomment}"
                    width="22" height="22" 
                    class="dark:text-gray-100">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                  </svg>
              </div>
              <div id="postwatch_numberlikescomment${idcomment}"> ${likescomment}</div>
          </button>
          <button 
          onclick="PostWatchJS.show_subcomment_post('${idcomment}','${iduser}','${userrname}');"
           uk-toggle="target: #view-subcomments${idcomment}" class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
                  fill="grey"
                  width="22" height="22" class="dark:text-gray-100">
                      <path fill-rule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                  </svg>
              </div>
              <div id="postwatch_div_numbersubcomments${idcomment}"> ${NumberOfSubComments} </div>
          </button>
      </div>
       </div>
       <!-- EDIT AND DELETE COMMENT  -->
       <div ${show_edit_delete_comment} >
          <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
            <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
            uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
               <ul class="space-y-1">
                
                  <li>
                     <a href="" 
                     onclick="PostWatchJS.showtextcommentUpdateModalComment('${idcomment}','${textcomment}');"
                     uk-toggle="target: #update_comment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                         <i class="uil-edit-alt mr-1"></i>
                          Edit  </a>
                  </li>
            
                  <li>
                     <hr class="-mx-2 my-2 dark:border-gray-800">
                  </li>
                  <li>
                     <a href="" 
                     onclick="PostWatchJS.showIdDeleteModalComment('${idcomment}');"
                     uk-toggle="target: #deletecommentmodal" 
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
        <div id="postwatch_listupdatesubcomments${idcomment}">
        <!-- Subcomennt 1 -->
        
         </div>
       </div>
   <br>
        <!-- ADD SUBCOMMENT -->
        <div>
          <form id="form_postwatch_addsubcomment"
           onsubmit="PostWatchJS.addSubCommentPost('${idcomment}', event);">
             <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input type="text" id="postwatch_textsubcomment${idcomment}" required placeholder="Add your Sub Comment.." class="bg-transparent max-h-10 shadow-none px-5 w-1/2">
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
      let {iduser,userrname}=sessionuser;
      let idpostwatch = sessionStorage.getItem('idpostwatch');
     const textcomment = document.getElementById('postwatch_textcomment').value;

     const commentPost= await APIRESTPostComment.commentPost(idpostwatch,
      textcomment,iduser,userrname);
     if (commentPost) {
      // let data={
      //   idpostwatch,textcomment,iduser,userrname

      // }
      // console.log(data);
       messagenotification('Comment Added','success',event);

      await this.showAddedCommentPost(idpostwatch,iduser,userrname);
       
   

      //  setInterval(() => {
      //   location.reload();
      //  }, 1000);
       document.getElementById('postwatch_textcomment').value="";
      }
  }catch (error) {
    alert(error);
  }
  }



//EDIT DELETE COMMENT POST

static  showtextcommentUpdateModalComment=async(idcomment,textcomment)=>
{
  
  document.getElementById('postwatch_idcomment_updatecomment').value=idcomment;
  document.getElementById('postwatch_text_updatecomment').value=textcomment;
 
 
}
static showIdDeleteModalComment=async(idcomment)=>
{
  document.getElementById('postwatch_idcomment_deletecommentmodal').value=idcomment;

}
//UPDATE COMMENT POST
static updateCommentPost=async(event)=>
{
  try {
    event.preventDefault();
    let idcomment=document.getElementById("postwatch_idcomment_updatecomment").value;
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let {iduser,userrname}=sessionuser;
    let idpostwatch = sessionStorage.getItem('idpostwatch');
   const textcomment = document.getElementById('postwatch_text_updatecomment').value;

   const editcommentPost= await APIRESTPostComment.editcommentPost(idcomment,idpostwatch,
    textcomment,iduser,userrname);
   if (editcommentPost) {
 
     messagenotification('Comment Updated','success',event);

   this.showUpdatedCommentPost(idcomment,textcomment);
     
 

    //  setInterval(() => {
    //   location.reload();
    //  }, 1000);
     document.getElementById('postwatch_text_updatecomment').value="";
    }
}catch (error) {
  alert(error);
}
}
//DELETE COMMENT POST
static deleteCommentPost=async(event)=>
{
  try {
    event.preventDefault();
    let idcomment=document.getElementById("postwatch_idcomment_deletecommentmodal").value;
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let {iduser,userrname}=sessionuser;
    let idpostwatch = sessionStorage.getItem('idpostwatch');
  

   const deletecommentPost= await APIRESTPostComment.deletecommentPost(idcomment,idpostwatch,
    iduser,userrname);
   if (deletecommentPost) {
 
     messagenotification('Comment Deleted','success',event);

    this.showRemoveCommentPost(idcomment);
     

    
    }
}catch (error) {
  alert(error);
}
}

//SHOW SUBCOMMENT AFTER ADD UPDATE REMOVE
static  showAddedCommentPost=async(idpost,iduser,userrname)=>
{
    let listcommentpost=await  APIRESTPostComment.getCommentPostByPost(idpost,
      iduser,userrname);
      let lastcommentpost = listcommentpost[listcommentpost.length - 1];
        const commentpost = lastcommentpost;
        let idcomment=commentpost.idusercomment ;
        let textcomment=commentpost.textcomment ;
        let likescomment =commentpost.likescomment;
        let datepublishcomment =commentpost.datepublishcomment;
        let stringpostedago =commentpost.stringpostedago;
        //CONERT FORMAT DATE

        const dt = new Date(datepublishcomment);
        const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        //USER
        let idcommentuser  =commentpost.idcommentuser ;
        let namecommentuser  =commentpost.namecommentuser ;
        let imagecommentuser  =commentpost.imagecommentuser ;
        if (imagecommentuser==="") {
          imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }

        let numberofsubcomments=0;

      //   let loadSubCommentPost =await this.loadSubCommentPost(idcomment,iduser);
      //  let svgfill_existlikecomment= await this.svgfill_existlikecomment(idcomment,iduser,userrname);
     
     

      let html_addcomment_post=`
    <div id="postwatch_div_listcomment$${idcomment}" >
    <!--  Comment -->
    <div class="flex items-start">
    <a 
    href="../profileuser/profileuser.html"
    onclick="PostWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
    >
    <img src="${imagecommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
    </a>
     
       <div>
       <a 
       href="../profileuser/profileuser.html"
       onclick="PostWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
       >
         <h4 class="text-base m-0 font-semibold">${namecommentuser}</h4>
         </a>
         <span class="text-gray-700 text-sm">${stringpostedago}</span>
         <br>
         <p id="postwatch_p_textcomment${idcomment}">
          ${textcomment}
         </p>
         <div class="flex space-x-4 lg:font-bold">
          <button onclick="PostWatchJS.like_dislike_Comment('${idcomment}', event);" class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
                  <svg id="svg_postwatch_likecomment${idcomment}"
                   xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 20 20" 
                   fill="grey"
                    width="22" height="22" 
                    class="dark:text-gray-100">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                  </svg>
              </div>
              <div id="postwatch_numberlikescomment${idcomment}"> ${likescomment}</div>
          </button>
          <a href="" uk-toggle="target: #view-subcomments${idcomment}" class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
                  fill="grey"
                  width="22" height="22" class="dark:text-gray-100">
                      <path fill-rule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                  </svg>
              </div>
              <div id="postwatch_div_numbersubcomments${idcomment}"> ${numberofsubcomments} </div>
          </a>
      </div>
       </div>
       <!-- EDIT AND DELETE COMMENT  -->
       <div  >
          <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
            <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
            uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
               <ul class="space-y-1">
                
                  <li>
                     <a href="" 
                     onclick="PostWatchJS.showtextcommentUpdateModalComment('${idcomment}','${textcomment}');"
                     uk-toggle="target: #update_comment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                         <i class="uil-edit-alt mr-1"></i>
                          Edit  </a>
                  </li>
            
                  <li>
                     <hr class="-mx-2 my-2 dark:border-gray-800">
                  </li>
                  <li>
                     <a href="" 
                     onclick="PostWatchJS.showIdDeleteModalComment('${idcomment}');"
                     uk-toggle="target: #deletecommentmodal" 
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
        <div id="postwatch_listupdatesubcomments${idcomment}">
        <!-- Subcomennt 1 -->
        
         </div>
       </div>
   <br>
        <!-- ADD SUBCOMMENT -->
        <div>
          <form id="form_postwatch_addsubcomment"
           onsubmit="PostWatchJS.addSubCommentPost('${idcomment}', event);">
             <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input type="text" id="postwatch_textsubcomment${idcomment}" placeholder="Add your Sub Comment.." class="bg-transparent max-h-10 shadow-none px-5 w-1/2">
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
 
  
  let comments_postwatch1= document.getElementById(`comments_postwatch1`);

  comments_postwatch1.parentNode.insertAdjacentHTML("beforeend", html_addcomment_post);
 
  
 //NUMBER COMMENT 
 let NumberOfComment=listcommentpost.length;
 document.getElementById("postwatch_div_numbercomments").innerHTML=`Comments (${NumberOfComment})`;

}
static  showUpdatedCommentPost(idcomment,textcomment) {
  document.getElementById(`postwatch_p_textcomment${idcomment}`).innerHTML=textcomment;
 }
 static  showRemoveCommentPost(idcomment) {
   //ADD NUMBER COMMENTS HTML
   let textcontent_numbercomments= document.getElementById("postwatch_div_numbercomments");
   let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
   let numcomments=Number(stringnumcomments);
   textcontent_numbercomments.innerHTML=`Comments (${numcomments-1})`;

  document.getElementById(`postwatch_div_listcomment$${idcomment}`).remove();
 }
//-------------------------------------------------------------------------
  //SUBCOMMENTS
  static async show_subcomment_post(idcomment,iduserlogin,usernamelogin)
  {
     let listsubcommentpost=await APIRESTSubComment.getSubCommentByComment(
           iduserlogin,
           idcomment);
  
   let forSubCommentPost=await this.loadSubCommentPost(listsubcommentpost,idcomment,iduserlogin,usernamelogin);
   document.getElementById(`postwatch_listupdatesubcomments${idcomment}`).innerHTML=forSubCommentPost;
  // profileloginuser_commentspost${idpost}
  }
 //ADD SUBCOMMENT POST
 static addSubCommentPost=async(idcomment,event)=>
 {
   try {
     event.preventDefault();
     let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    const textsubcomment = document.getElementById(`postwatch_textsubcomment${idcomment}`).value;

    const addSubComment= await APIRESTSubComment.addSubComment
    (idcomment,
      textsubcomment,sessionuser.iduser,sessionuser.userrname);
    if (addSubComment) {
  
      messagenotification('Added comment answer','success',event);

      await this.showAddedSubComment(idcomment,sessionuser.iduser,sessionuser.userrname);
      
     //await this.loadSubCommentPost(idcomment,sessionuser.iduser);
      
  

     //  setInterval(() => {
     //   location.reload();
     //  }, 1000);
      document.getElementById(`postwatch_textsubcomment${idcomment}`).value="";
     }
 }catch (error) {
   alert(error);
 }
 }
//EDIT DELETE SUBCOMMENT POST

static  showsubcommentUpdateModal=async(idcomment,idsubcomment,textsubcomment)=>
{
  document.getElementById('postwatch_idcomment_updatesubcomment').value=idcomment;
  document.getElementById('postwatch_idsubcomment_updatesubcomment').value=idsubcomment;
  document.getElementById('postwatch_textsubcomment_updatesubcomment').value=textsubcomment;
 
 
}
static showsubcommentDeleteModal=async(idcomment,idsubcomment)=>
{
  
  document.getElementById('postwatch_idcomment_deletesubcomment').value=idcomment;
  document.getElementById('postwatch_idsubcomment_deletesubcomment').value=idsubcomment;

}
//UPDATE SUB COMMENT POST
static updateSubCommentPost=async(event)=>
{
  try {
    event.preventDefault();
    
    let idcomment=document.getElementById("postwatch_idcomment_updatesubcomment").value;
    let idsubcomment=document.getElementById("postwatch_idsubcomment_updatesubcomment").value;
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let {iduser,userrname}=sessionuser;

   const textsubcomment = document.getElementById('postwatch_textsubcomment_updatesubcomment').value;

   const editsubcommentPost= await APIRESTSubComment.editsubcommentPost(idsubcomment,idcomment,
    textsubcomment,iduser,userrname);
   if (editsubcommentPost) {
 
     messagenotification('SubComment Updated','success',event);

     this.showUpdatedSubComment(idsubcomment,textsubcomment);
    //await this.loadCommentPost(idpostwatch,iduser,userrname);
    
     document.getElementById('postwatch_textsubcomment_updatesubcomment').value="";
    }
}catch (error) {
  alert(error);
}
}
//DELETE SUB COMMENT POST
static deleteSubCommentPost=async(event)=>
{
  try {
    event.preventDefault();
    let idsubcomment=document.getElementById("postwatch_idsubcomment_deletesubcomment").value;
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let {iduser,userrname}=sessionuser;
    
  

   const deletesubcommentPost= await APIRESTSubComment.deletesubcommentPost(idsubcomment,
    iduser,userrname);
   if (deletesubcommentPost) {
 
     messagenotification('SubComment Deleted','success',event);
this.showRemoveSubComment(idsubcomment)
   // await this.loadCommentPost(idpostwatch,iduser,userrname);
     

    
    }
}catch (error) {
  alert(error);
}
}
static loadSubCommentPost=async(listsubcommentpost,idcomment,iduser,userrname)=>
  {
    let html_subcomments_posts="";
    
      for (let i = 0; i < listsubcommentpost.length; i++) {
        const subcommentpost = listsubcommentpost[i];
        let idsubusercomment =subcommentpost.idsubusercomment ;
        let textsubcomment= subcommentpost.textsubcomment; 
        let likessubcomment =subcommentpost.likessubcomment;
        let datepublishsubcomment =subcommentpost.datepublishsubcomment ;
        let stringpostedagosubcomment= subcommentpost.stringpostedagosubcomment; 
        //CONVERT FORMAT DATE

        const dt = new Date(datepublishsubcomment);
        const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        //USER
        let idsubcommentuser  =subcommentpost.idsubcommentuser   ;
        let namesubcommentuser  =subcommentpost.namesubcommentuser   ;
        let imagesubcommentuser  =subcommentpost.imagesubcommentuser;
      
        if (imagesubcommentuser==="") {
          imagesubcommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }
        const svgfill_existlikesubcomment = this.svgfill_existlikesubcomment(subcommentpost.existlikeloginuser);
        let show_edit_delete_subcomment = this.show_edit_delete_subcomment(subcommentpost.existsubcommentloginuser);

        html_subcomments_posts+=`
     <div class="flex items-start mt-8" id="postwatch_div_listsubcomment$${idsubusercomment}">
     <a 
     href="../profileuser/profileuser.html"
     onclick="PostWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
     >
     <img src="${imagesubcommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
     </a>
     <div>
     <a 
     href="../profileuser/profileuser.html"
     onclick="PostWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
     >
       <h4 class="text-sm m-0 font-semibold">${namesubcommentuser}</h4>
       </a>
       <span class="text-gray-700 text-sm">${stringpostedagosubcomment}</span>
       <br>
       <p id="postwatch_p_textsubcomment$${idsubusercomment}" class="text-sm">
        ${textsubcomment}
       </p>
       <!-- Like  -->
       <div class="flex space-x-4 lg:font-bold">
        <button onclick="PostWatchJS.like_dislike_SubComment('${idsubusercomment}', event);" class="flex items-center space-x-2">
            <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 w-8">
                <svg id="svg_postwatch_likesubcomment${idsubusercomment}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
                fill="${svgfill_existlikesubcomment}" width="22" height="22" class="dark:text-gray-100">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
            </div>
            <div id="postwatch_numberlikessubcomment${idsubusercomment}">${likessubcomment}</div>
        </button>
   
    </div>
     </div>
     <!-- EDIT AND DELETE SUBCOMENT -->
     <div ${show_edit_delete_subcomment}>
        <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
          <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
          uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
             <ul class="space-y-1">
              
                <li>
                   <a href="" 
                   onclick="PostWatchJS.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}');"
                   uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-edit-alt mr-1"></i>
                        Edit  </a>
                </li>
          
                <li>
                   <hr class="-mx-2 my-2 dark:border-gray-800">
                </li>
                <li>
                   <a href=""
                   onclick="PostWatchJS.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}');"
                   uk-toggle="target: #deletesubcommentmodal" 
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

//SHOW SUBCOMMENT AFTER ADD UPDATE REMOVE

  static async showAddedSubComment(idcomment,iduser,userrname) {
    let listsubcomment = await APIRESTSubComment.getSubCommentByComment(iduser, idcomment);
    let subcommentpost = listsubcomment[listsubcomment.length - 1];
    let stringpostedagosubcomment= subcommentpost.stringpostedagosubcomment; 
    let idsubusercomment = subcommentpost.idsubusercomment;
    let textsubcomment = subcommentpost.textsubcomment;
    let likessubcomment = subcommentpost.likessubcomment;
    let datepublishsubcomment = subcommentpost.datepublishsubcomment;

    //CONERT FORMAT DATE
    const dt = new Date(datepublishsubcomment);
    const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    //USER
    let idsubcommentuser  =subcommentpost.idsubcommentuser;
    let namesubcommentuser = subcommentpost.namesubcommentuser;
    let imagesubcommentuser = subcommentpost.imagesubcommentuser;

    if (imagesubcommentuser === "") {
      imagesubcommentuser = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
    }
  
    let html_subcomment = `
    <div class="flex items-start mt-8" id="postwatch_div_listsubcomment$${idsubusercomment}">
    <a 
    href="../profileuser/profileuser.html"
    onclick="PostWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
    >

    <img src="${imagesubcommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
    
    </a>
    <div>

    <a 
    href="../profileuser/profileuser.html"
    onclick="PostWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
    >

    <h4 class="text-sm m-0 font-semibold">${namesubcommentuser}</h4>
   
    </a>

      <span class="text-gray-700 text-sm">${stringpostedagosubcomment}</span>
      <br>
      <p id="postwatch_p_textsubcomment$${idsubusercomment}" class="text-sm">
       ${textsubcomment}
      </p>
      <!-- Like  -->
      <div class="flex space-x-4 lg:font-bold">
      <button onclick="PostWatchJS.like_dislike_SubComment('${idsubusercomment}', event);" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 w-8">
               <svg id="svg_postwatch_likesubcomment${idsubusercomment}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
               fill="grey" width="22" height="22" class="dark:text-gray-100">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
               </svg>
           </div>
           <div id="postwatch_numberlikessubcomment${idsubusercomment}">${likessubcomment}</div>
        </button>
  
   </div>
    </div>
    <!-- EDIT AND DELETE SUBCOMENT -->
    <div >
       <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
         <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
         uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
            <ul class="space-y-1">
             
               <li>
                  <a href=""
                  onclick="PostWatchJS.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}');"
                   uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                      <i class="uil-edit-alt mr-1"></i>
                       Edit  </a>
               </li>
         
               <li>
                  <hr class="-mx-2 my-2 dark:border-gray-800">
               </li>
               <li>
                  <a href=""
                  onclick="PostWatchJS.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}');"
                   uk-toggle="target: #deletesubcommentmodal" 
                  class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                      <i class="uil-trash-alt mr-1"></i> Delete </a>
               </li>
            </ul>
         </div>
    </div>
  </div>
     `;
    let idpostwatch_listupdatesubcomments= document.getElementById(`postwatch_listupdatesubcomments${idcomment}`);
    idpostwatch_listupdatesubcomments.parentNode.insertAdjacentHTML("beforeend", html_subcomment);

     
 //NUMBER SUBCOMMENT 
 let NumberOfSubComment=listsubcomment.length;
 document.getElementById(`postwatch_div_numbersubcomments${idcomment}`).innerHTML=`${NumberOfSubComment}`;
  }
  static  showUpdatedSubComment(idsubcomment,textsubcomment) {
   document.getElementById(`postwatch_p_textsubcomment$${idsubcomment}`).innerHTML=textsubcomment;
  }
  static  showRemoveSubComment(idsubcomment) {
    document.getElementById(`postwatch_div_listsubcomment$${idsubcomment}`).remove();

    let idcommenthtml=  document.getElementById('postwatch_idcomment_deletesubcomment').value;
    let numbercommenthtml= document.getElementById(`postwatch_div_numbersubcomments${idcommenthtml}`).textContent;
    let numbercomments=Number(numbercommenthtml);
     document.getElementById(`postwatch_div_numbersubcomments${idcommenthtml}`).innerHTML=numbercomments-1;
  }
   //#endregion COMMENTS

//#region  LIKES
   //-------------------------------------------------------------------------
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
      
         document.getElementById(`svg_postwatch_likecomment${idcomment}`).setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`postwatch_numberlikescomment${idcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`postwatch_numberlikescomment${idcomment}`).innerHTML=numberoflikes;
       }
      } 

     else{

      const likeComment= await APIRESTLikes.likeComment(idcomment,
        sessionuser.iduser,sessionuser.userrname );
       if (likeComment) {
      
         document.getElementById(`svg_postwatch_likecomment${idcomment}`).setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`postwatch_numberlikescomment${idcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`postwatch_numberlikescomment${idcomment}`).innerHTML=numberoflikes;
       }
     }
  
       
    
     
    }catch (error) {
      alert(error);
    }
  }

  static like_dislike_SubComment= async(idsubcomment,event)=>
  {
    try {
      event.preventDefault();
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    
      let existLikeSubComment=await APIRESTLikes.existLikeSubComment(idsubcomment,sessionuser.iduser,sessionuser.userrname)
     
      if (existLikeSubComment) {

      const deleteSubComment= await APIRESTLikes.deleteSubComment(idsubcomment,
        sessionuser.iduser,sessionuser.userrname );
       if (deleteSubComment) {
      
         document.getElementById(`svg_postwatch_likesubcomment${idsubcomment}`).setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`postwatch_numberlikessubcomment${idsubcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`postwatch_numberlikessubcomment${idsubcomment}`).innerHTML=numberoflikes;
       }
      } 

     else{

      const likeSubComment= await APIRESTLikes.likeSubComment(idsubcomment,
        sessionuser.iduser,sessionuser.userrname );
       if (likeSubComment) {
      
         document.getElementById(`svg_postwatch_likesubcomment${idsubcomment}`).setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`postwatch_numberlikessubcomment${idsubcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`postwatch_numberlikessubcomment${idsubcomment}`).innerHTML=numberoflikes;
       }
     }
  
       
    
     
    }catch (error) {
      alert(error);
    }
  }

//#endregion  LIKES
 //-------------------------------------------------------------------------

 //OTHERS

 //COMMENT
 static svgfill_existlikecomment=(existlikecomment)=>
 {
  let fill="";
  //let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,iduser,username);
  if(existlikecomment)
  {
   fill="black"
  }
  else{
    fill="grey"
  }
  return fill;
}
static show_edit_delete_comment=(existcommentsloginuser)=>
{
  let hidden="";
  
  if (existcommentsloginuser) {
    hidden="";
  } else {
    hidden="hidden"  
  }
  return hidden;
}

//SUBCOMMENTS

static svgfill_existlikesubcomment=(existlikesubcomment)=>
{
 let fill="";
 
 if(existlikesubcomment)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static show_edit_delete_subcomment=(existsubcomment)=>
{
  let hidden="";
  
  if (existsubcomment) {
    hidden="";
  } else {
    hidden="hidden"  
  }
  return hidden;
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


const form_postwatch_updatecomment = document.getElementById('form_postwatch_updatecomment');
form_postwatch_updatecomment.addEventListener('submit', PostWatchJS.updateCommentPost);


const form_postwatch_updatesubcoment = document.getElementById('form_postwatch_updatesubcoment');
form_postwatch_updatesubcoment.addEventListener('submit', PostWatchJS.updateSubCommentPost);

const button_postwatch_deletecomment = document.getElementById('button_postwatch_deletecomment');
button_postwatch_deletecomment.addEventListener('click', PostWatchJS.deleteCommentPost);

const button_postwatch_deletesubcomment = document.getElementById('button_postwatch_deletesubcomment');
button_postwatch_deletesubcomment.addEventListener('click', PostWatchJS.deleteSubCommentPost);

const postwatch_a_viewcomments = document.getElementById('postwatch_a_viewcomments');
postwatch_a_viewcomments.addEventListener('click', PostWatchJS.show_comment_post);