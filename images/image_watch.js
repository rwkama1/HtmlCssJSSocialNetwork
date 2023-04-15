class ImageWatchJS
{
  //LOAD PAGE
  static loadPage=async()=>
  {
 
    try {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
      let idimagewatch=sessionStorage.getItem('idimagewatch');
      let getImage=await APIRESTImages.getImage(idimagewatch,sessionuser.iduser,
      sessionuser.userrname)
       let getuser=await APIRESTUser.getUser(getImage.user.iduser,sessionuser.iduser,sessionuser.userrname);
         
       let iduserlogin=sessionuser.iduser;
       let iduserimage=getuser.iduser;
       //SHOW EDIT DELETE IMAGE DIV
        const editDeleteDiv = document.getElementById('imagewatch_editdeleteimage_div');

               if (iduserlogin===iduserimage) {
              
               editDeleteDiv.removeAttribute('hidden');
               } else {
             
               editDeleteDiv.setAttribute('hidden', true);
               }

 //SHOW EXISTLIKEIMAGE
 let existLikeImage=await APIRESTLikes.existLikeImage(idimagewatch,sessionuser.iduser,sessionuser.userrname);

  
 if(existLikeImage)
 {
   document.getElementById("svg_imagewatch_likeimage").setAttribute("fill","black");
 }



    // GET ID USER

    document.getElementById("imagewatch_iduser").value=iduserimage;

    //LOAD IMAGE
    this.loadImage(getImage,getuser.image);



  //NUMBER COMMENT IMAGE
  let NumberOfCommentIMAGE= await  APIRESTImageComment.NumberOfCommentImage(idimagewatch);
  document.getElementById("imagewatch_div_numbercomments").innerHTML=`Comments (${NumberOfCommentIMAGE})`;

 
  //await this.loadCommentImage(listcommentIMAGE,idimagewatch,sessionuser.iduser,sessionuser.userrname);

  } catch (error) {
    console.log(error);
    //window.location.href="../index.html"; 
       }
  
  }

  
   static loadImage=async(getImage,userimage)=>
  {
   
   
   let { urlimage, likes,description, DateTimePublish, title,user,idphoto,visibility} = getImage;
 
   
       //SHOW NUMBER LIKES

       document.getElementById("imagewatch_numberlike").innerHTML=likes;
   //CONERT FORMAT DATE

  const dt = new Date(DateTimePublish);
  const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
   if(userimage==="")
     {
       userimage="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
     }
     //GET IMAGE
   document.getElementById("imagewatch_image").src= urlimage;
   document.getElementById("imagewatch_titleimage").innerHTML=title;
   document.getElementById("imagewatch_userimageprofile").setAttribute("src", userimage);
   document.getElementById("imagewatch_username_div").innerHTML=user.name;
   document.getElementById("imagewatch_publishedimage").innerHTML=`Published on ${formatted_date}`;
   document.getElementById("imagewatch_descriptionimage_p").innerHTML=description;
   // document.getElementById("usersettings_urltwitter").setAttribute("value", urltwitter);

   //GET UPDATE IMAGE MODAL
   document.getElementById("imagewatch_updateimage_idimage").setAttribute("value", idphoto);
   document.getElementById("imagewatch_updateimage_name").setAttribute("value", title);
   document.getElementById("imagewatch_updateimage_description").innerHTML=description;
   const visibilitySelect = document.getElementById('imagewatch_updateimage_visibility');
   if (visibility === 'Private') {
     visibilitySelect.value = 'Private';
   } else {
     visibilitySelect.value = 'Public';
   }

   //GET ID IMAGE DELETE
   document.getElementById("idphoto_deleteimagemodal_imagewatch").setAttribute("value", idphoto);

  } 
     //UPDATE IMAGE
     static updateImage= async(event)=>
     {
       try {
         event.preventDefault();
         let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
         const idimage = document.getElementById('imagewatch_updateimage_idimage').value;
         const title = document.getElementById('imagewatch_updateimage_name').value;
          const description = document.getElementById('imagewatch_updateimage_description').value;       
          const visibility = document.getElementById('imagewatch_updateimage_visibility').value;
         
            
          const dataform = {idimage,title
            ,description,visibility}
        
           const response_upload_image= await APIRESTImages.updateImage(dataform,sessionuser.iduser,
            sessionuser.userrname);
           if (response_upload_image) {
         
             messagenotification('Image Updated','success',event);
             setInterval(() => {
              location.reload()
             }, 1000);
          
             document.getElementById('imagewatch_updateimage_name').value="";
             document.getElementById('imagewatch_updateimage_description').value="";
            }
      
        
       }catch (error) {
         alert(error);
       }
     }
     //DELETE IMAGE
     static deleteImage= async(event)=>
     {
       try {
        
         const idimage = document.getElementById('idphoto_deleteimagemodal_imagewatch').value;
         let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
        
           const response_delete_image= await APIRESTImages.deleteImage(idimage,
            sessionuser.iduser,sessionuser.userrname );
           if (response_delete_image) {
         
             messagenotification('Image Deleted','success',event);
             setInterval(() => {
              window.location.href="./image_mainpage.html"; 
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
        const iduser=document.getElementById("imagewatch_iduser").value;
        sessionStorage.setItem("iduserwatch",null);
          sessionStorage.setItem('iduserwatch', iduser);
      
         }catch (error) {
          // alert(error);
          
         }
          
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
static async show_comment_images()
{
  let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
  let {iduser,userrname}=sessionuser;
  let idimagewatch=sessionStorage.getItem('idimagewatch');
  let listcommentIMAGE=await  APIRESTImageComment.getCommentImageByImage(idimagewatch,
    iduser,userrname);

  await ImageWatchJS.loadCommentImage(listcommentIMAGE,idimagewatch,iduser,userrname);

// profileloginuser_commentspost${idpost}
}


 //LOAD COMMENT IMAGE
  static loadCommentImage=async(listcommentimage,idimage,iduser,userrname)=>
  {
    let html_comments_image="";
//console.log(listcommentimage);
      for (let i = 0; i < listcommentimage.length; i++) {
        const commentimage = listcommentimage[i];
        let idcomment=commentimage.IdUserComment ;
        let textcomment=commentimage.Textt ;
        let likescomment =commentimage.Likes ;
        let datepublishcomment =commentimage.datepublishcomment;
        let stringpostedago =commentimage.stringpostedago;

        //CONVERT FORMAT DATE

        const dt = new Date(datepublishcomment);
        const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        //USER
        let idcommentuser  =commentimage.idcommentuser ;
        let namecommentuser  =commentimage.namecommentuser ;
        let imagecommentuser  =commentimage.imagecommentuser ;
        if (imagecommentuser==="") {
          imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }
        let numberofsubcomments=await APIRESTSubComment.NumberOfSubComments
        (idcomment);
        // ${loadSubCommentImage}
     

        // let listsubcomment=await  APIRESTSubComment.getSubCommentByComment(
        //   iduser,
        //   idcomment);
        //   let numberofsubcomments=listsubcomment.length;
        //   let loadSubCommentImage="";
        //   if(numberofsubcomments!==0)
        //   {
        //     loadSubCommentImage = await this.loadSubCommentImage(listsubcomment,idcomment, iduser,userrname);
        //   }
        // let NumberOfSubComments=await APIRESTSubComment.NumberOfSubComments
        // (idcomment);
       const svgfill_existlikecomment= await this.svgfill_existlikecomment(idcomment, iduser, userrname);
      
  

      let show_edit_delete_comment =await this.show_edit_delete_comment(idimage,idcomment,iduser,userrname);

     html_comments_image+=`
    <div id="imagewatch_div_listcomment$${idcomment}"  >
                <!--  Comment -->
                   <div class="flex items-start">
                   <a 
                   href="../profileuser/profileuser.html"
                   onclick="ImageWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
                   >
                     <img src="${imagecommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
                   </a>            
                     <div>
                                  <a 
                                  href="../profileuser/profileuser.html"
                                  onclick="ImageWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
                                  >
                                   <h4 class="text-base m-0 font-semibold">${namecommentuser}</h4>
                                   </a>  

                                   <span class="text-gray-700 text-sm">${stringpostedago}</span>
                                   <br>
                                   <p id="imagewatch_p_textcomment${idcomment}">
                                   ${textcomment}
                                   </p>
                                   <div class="flex space-x-4 lg:font-bold">
                                    <button onclick="ImageWatchJS.like_dislike_Comment('${idcomment}', event);" class="flex items-center space-x-2">
                                        <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
                                            <svg 
                                            id="svg_imagewatch_likecomment${idcomment}"
                                            fill="${svgfill_existlikecomment}"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  width="22" height="22" class="dark:text-gray-100">
                                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                                            </svg>
                                        </div>
                                        <div id="imagewatch_numberlikescomment${idcomment}"> ${likescomment}</div>
                                    </button>
                                    <button
                                    onclick="ImageWatchJS.show_subcomment_image('${idcomment}','${iduser}','${userrname}');"
                                     uk-toggle="target: #view-subcomments${idcomment}" class="flex items-center space-x-2">
                                        <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                                                <path fill-rule="evenodd"
                                                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div id="imagewatch_div_numbersubcomments${idcomment}">  ${numberofsubcomments} </div>
                                    </button>
                                </div>
                                 </div>
                                 <!-- EDIT AND DELETE COMMENT  -->
                                 <div ${show_edit_delete_comment}>
                                    <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                                      <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                                      uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                                         <ul class="space-y-1">
                                          
                                            <li>
                                               <a href="" 
                                               onclick="ImageWatchJS.showtextcommentUpdateModalComment('${idcomment}','${textcomment}');"
                                               uk-toggle="target: #update_comment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                                   <i class="uil-edit-alt mr-1"></i>
                                                    Edit  </a>
                                            </li>
                                      
                                            <li>
                                               <hr class="-mx-2 my-2 dark:border-gray-800">
                                            </li>
                                            <li>
                                               <a href=""
                                               onclick="ImageWatchJS.showIdDeleteModalComment('${idcomment}');"
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
                                 <div id="imagewatch_listupdatesubcomments${idcomment}">
                                 <!-- Subcoment 1 -->
                                  
                                   </div>
                         
                                </div> 
                             <br>
                                  <!-- ADD SUBCOMMENT -->
                                  <div>
                                    <form
                                    id="form_imagewatch_addsubcomment"
                                    onsubmit="ImageWatchJS.addSubCommentImage('${idcomment}', event);">
                                    
                                       <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                                         <input type="text"
                                         required 
                                         id="imagewatch_textsubcomment${idcomment}"
                                         placeholder="Add your Sub Comment.." class="bg-transparent max-h-10 shadow-none px-5 w-1/2">
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
                              <br>
    `
    //  //SHOW EXISTLIKECOMMENT
    //  let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,sessionuser.iduser,sessionuser.userrname);

  
    //  if(existLikeComment)
    //  {
    //    document.getElementById("svg_postwatch_likecomment").setAttribute("fill","black");
    //  }
 
  }
  document.getElementById("comments_imagewatch1").innerHTML= html_comments_image;
  


  
  }
  //ADD COMMENT Image
  static addCommentImage=async(event)=>
  {
    try {
      event.preventDefault();
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
      let {iduser,userrname}=sessionuser;
      let idimagewatch = sessionStorage.getItem('idimagewatch');
     const textcomment = document.getElementById('imagewatch_textcomment').value;

     const commentImage= await APIRESTImageComment.commmentImage(idimagewatch,
      textcomment,iduser,userrname);
     if (commentImage) {
      // let data={
      //   idpostwatch,textcomment,iduser,userrname

      // }
      // console.log(data);
       messagenotification('Comment Added','success',event);

      await this.showAddedCommentImage(idimagewatch,iduser,userrname);
       
   

      //  setInterval(() => {
      //   location.reload();
      //  }, 1000);
       document.getElementById('imagewatch_textcomment').value="";
      }
  }catch (error) {
    alert(error);
  }
  }
//EDIT DELETE COMMENT IMAGE



static  showtextcommentUpdateModalComment=async(idcomment,textcomment)=>
{
  
  document.getElementById('imagewatch_idcomment_updatecomment').value=idcomment;
  document.getElementById('imagewatch_text_updatecomment').value=textcomment;
 
 
}
static showIdDeleteModalComment=async(idcomment)=>
{
  document.getElementById('imagewatch_idcomment_deletecommentmodal').value=idcomment;

}
//UPDATE COMMENT IMAGE
static updateCommentImage=async(event)=>
{
  try {
    event.preventDefault();
    let idcomment=document.getElementById("imagewatch_idcomment_updatecomment").value;
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let {iduser,userrname}=sessionuser;
    let idimagewatch = sessionStorage.getItem('idimagewatch');
   const textcomment = document.getElementById('imagewatch_text_updatecomment').value;

   const editcommentImage= await APIRESTImageComment.editcommentImage(idcomment,idimagewatch,
    textcomment,iduser,userrname);
   if (editcommentImage) {
 
     messagenotification('Comment Updated','success',event);

   this.showUpdatedCommentImage(idcomment,textcomment);
     
 

    //  setInterval(() => {
    //   location.reload();
    //  }, 1000);
     document.getElementById('imagewatch_text_updatecomment').value="";
    }
}catch (error) {
  alert(error);
}
}
//DELETE COMMENT IMAGE
static deleteCommentImage=async(event)=>
{
  try {
    event.preventDefault();
    let idcomment=document.getElementById("imagewatch_idcomment_deletecommentmodal").value;
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let {iduser,userrname}=sessionuser;
    let idimagewatch = sessionStorage.getItem('idimagewatch');
  

   const deletecommentImage= await APIRESTImageComment.deletecommentImage(idcomment,idimagewatch,
    iduser,userrname);
   if (deletecommentImage) {
 
     messagenotification('Comment Deleted','success',event);

    this.showRemoveCommentImage(idcomment);
     

    
    }
}catch (error) {
  alert(error);
}
}

//SHOW COMMENT AFTER ADD UPDATE REMOVE
static  showAddedCommentImage=async(idimage,iduser,userrname)=>
{
    let listcommentimage=await  APIRESTImageComment.getCommentImageByImage(idimage,
      iduser,userrname);
      let lastcommentimage = listcommentimage[listcommentimage.length - 1];
        const commentimage = lastcommentimage;
        let idcomment=commentimage.IdUserComment ;
        let textcomment=commentimage.Textt ;
        let likescomment =commentimage.Likes ;
        let datepublishcomment =commentimage.datepublishcomment;
        let stringpostedago =commentimage.stringpostedago;
        //CONERT FORMAT DATE

        const dt = new Date(datepublishcomment);
        const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        //USER
        let idcommentuser  =commentimage.idcommentuser;
        let namecommentuser  =commentimage.namecommentuser ;
        let imagecommentuser  =commentimage.imagecommentuser ;
        if (imagecommentuser==="") {
          imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }

        let numberofsubcomments=0;

      //   let loadSubCommentPost =await this.loadSubCommentPost(idcomment,iduser);
      //  let svgfill_existlikecomment= await this.svgfill_existlikecomment(idcomment,iduser,userrname);
     
      const svgfill_existlikecomment = await  this.svgfill_existlikecomment(idcomment, iduser, userrname);
      
      

      let show_edit_delete_comment =await this.show_edit_delete_comment(idimage,idcomment,iduser,userrname);

      let html_addcomment_image=`
    <div id="imagewatch_div_listcomment$${idcomment}" >
    <!--  Comment -->
    <div class="flex items-start">
    <a 
    href="../profileuser/profileuser.html"
    onclick="ImageWatchJS.passidtoUserProfile_Comment('${idcommentuser}');"  
    >
    <img src="${imagecommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
    </a>
     
       <div>
       <a 
       href="../profileuser/profileuser.html"
       onclick="ImageWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
       >
         <h4 class="text-base m-0 font-semibold">${namecommentuser}</h4>
         </a>
         <span class="text-gray-700 text-sm">${stringpostedago}</span>
         <br>
         <p id="imagewatch_p_textcomment${idcomment}">
          ${textcomment}
         </p>
         <div class="flex space-x-4 lg:font-bold">
          <button onclick="ImageWatchJS.like_dislike_Comment('${idcomment}', event);" class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
                  <svg id="svg_imagewatch_likecomment${idcomment}"
                   xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 20 20" 
                   fill="${svgfill_existlikecomment}"
                    width="22" height="22" 
                    class="dark:text-gray-100">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                  </svg>
              </div>
              <div id="imagewatch_numberlikescomment${idcomment}"> ${likescomment}</div>
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
              <div id="imagewatch_div_numbersubcomments${idcomment}"> ${numberofsubcomments} </div>
          </a>
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
                     onclick="ImageWatchJS.showtextcommentUpdateModalComment('${idcomment}','${textcomment}');"
                     uk-toggle="target: #update_comment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                         <i class="uil-edit-alt mr-1"></i>
                          Edit  </a>
                  </li>
            
                  <li>
                     <hr class="-mx-2 my-2 dark:border-gray-800">
                  </li>
                  <li>
                     <a href="" 
                     onclick="ImageWatchJS.showIdDeleteModalComment('${idcomment}');"
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
        <div id="imagewatch_listupdatesubcomments${idcomment}">
        <!-- Subcomennt 1 -->
        
         </div>
       </div>
   <br>
        <!-- ADD SUBCOMMENT -->
        <div>
          <form id="form_imagewatch_addsubcomment"
           onsubmit="ImageWatchJS.addSubCommentImage('${idcomment}', event);">
             <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input 
               type="text" id="imagewatch_textsubcomment${idcomment}" 
               required
               placeholder="Add your Sub Comment.." class="bg-transparent max-h-10 shadow-none px-5 w-1/2">
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
 
  
  let comments_imagewatch1= document.getElementById(`comments_imagewatch1`);
  comments_imagewatch1.parentNode.insertAdjacentHTML("beforeend", html_addcomment_image);
 
 //NUMBER COMMENT IMAGE
 let NumberOfCommentIMAGE=listcommentimage.length;
 document.getElementById("imagewatch_div_numbercomments").innerHTML=`Comments (${NumberOfCommentIMAGE})`;

}
static  showUpdatedCommentImage(idcomment,textcomment) {
  document.getElementById(`imagewatch_p_textcomment${idcomment}`).innerHTML=textcomment;
 
 }
 static  showRemoveCommentImage(idcomment) {
  //ADD NUMBER COMMENTS HTML
  let textcontent_numbercomments= document.getElementById("imagewatch_div_numbercomments");
  let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
  let numcomments=Number(stringnumcomments);
  textcontent_numbercomments.innerHTML=`Comments (${numcomments-1})`;


  document.getElementById(`imagewatch_div_listcomment$${idcomment}`).remove();

}
//-------------------------------------------------------------------------
  //SUBCOMMENTS

  static async show_subcomment_image(idcomment,iduserlogin,usernamelogin)
  {
     let listsubcomment=await APIRESTSubComment.getSubCommentByComment(
           iduserlogin,
           idcomment);
  
   let forSubCommentImage=await this.loadSubCommentImage(listsubcomment,idcomment,iduserlogin,usernamelogin);
   document.getElementById(`imagewatch_listupdatesubcomments${idcomment}`).innerHTML=forSubCommentImage;
  // profileloginuser_commentspost${idpost}
  }

 //ADD SUBCOMMENT IMAGE
 static addSubCommentImage=async(idcomment,event)=>
 {
   try {
     event.preventDefault();
     let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    const textsubcomment = document.getElementById(`imagewatch_textsubcomment${idcomment}`).value;

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
      document.getElementById(`imagewatch_textsubcomment${idcomment}`).value="";
     }
 }catch (error) {
   alert(error);
 }
 }
//EDIT DELETE SUBCOMMENT IMAGE

static  showsubcommentUpdateModal=async(idcomment,idsubcomment,textsubcomment)=>
{
  document.getElementById('imagewatch_idcomment_updatesubcomment').value=idcomment;
  document.getElementById('imagewatch_idsubcomment_updatesubcomment').value=idsubcomment;
  document.getElementById('imagewatch_textsubcomment_updatesubcomment').value=textsubcomment;
 
 
}
static showsubcommentDeleteModal=async(idcomment,idsubcomment)=>
{
  document.getElementById('imagewatch_idcomment_deletesubcomment').value=idcomment;
  document.getElementById('imagewatch_idsubcomment_deletesubcomment').value=idsubcomment;

}
//UPDATE SUB COMMENT IMAGE
static updateSubCommentImage=async(event)=>
{
  try {
    event.preventDefault();
    
    let idcomment=document.getElementById("imagewatch_idcomment_updatesubcomment").value;
    let idsubcomment=document.getElementById("imagewatch_idsubcomment_updatesubcomment").value;
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let {iduser,userrname}=sessionuser;

   const textsubcomment = document.getElementById('imagewatch_textsubcomment_updatesubcomment').value;

   const editsubcomment= await APIRESTSubComment.editsubcommentPost(idsubcomment,idcomment,
    textsubcomment,iduser,userrname);
   if (editsubcomment) {
 
     messagenotification('SubComment Updated','success',event);

     this.showUpdatedSubComment(idsubcomment,textsubcomment);
    //await this.loadCommentPost(idpostwatch,iduser,userrname);
    
     document.getElementById('imagewatch_textsubcomment_updatesubcomment').value="";
    }
}catch (error) {
  alert(error);
}
}
//DELETE SUB COMMENT IMAGE
static deleteSubCommentImage=async(event)=>
{
  try {
    event.preventDefault();
    let idcomment=  document.getElementById('imagewatch_idcomment_deletesubcomment').value;
    let idsubcomment=document.getElementById("imagewatch_idsubcomment_deletesubcomment").value;
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let {iduser,userrname}=sessionuser;
    
  

   const deletesubcomment= await APIRESTSubComment.deletesubcommentPost(idsubcomment,
    iduser,userrname);
   if (deletesubcomment) {
 
     messagenotification('SubComment Deleted','success',event);
    this.showRemoveSubComment(idsubcomment)
   // await this.loadCommentPost(idpostwatch,iduser,userrname);
     

    
    }
}catch (error) {
  alert(error);
}
}


  static loadSubCommentImage=async(listsubcomment,idcomment,iduser,userrname)=>
  {
    let html_subcomments="";
   
      for (let i = 0; i < listsubcomment.length; i++) {
        const subcomment = listsubcomment[i];
        let idsubusercomment =subcomment.idsubusercomment  ;
        let textsubcomment= subcomment.textsubcomment; 
        let likessubcomment =subcomment.likessubcomment;
        let datepublishsubcomment =subcomment.datepublishsubcomment ;
        let stringpostedagosubcomment= subcomment.stringpostedagosubcomment; 
        //CONERT FORMAT DATE

        const dt = new Date(datepublishsubcomment);
        const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        //USER
        let idsubcommentuser  =subcomment.idsubcommentuser;
        let namesubcommentuser  =subcomment.namesubcommentuser;
        let imagesubcommentuser  =subcomment.imagesubcommentuser;
      
        if (imagesubcommentuser==="") {
          imagesubcommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }
        const svgfill_existlikesubcomment =await this.svgfill_existlikesubcomment(idsubusercomment, iduser, userrname);
        let show_edit_delete_subcomment =await this.show_edit_delete_subcomment(idsubusercomment,iduser,userrname);

        html_subcomments+=`
     <div class="flex items-start mt-8" id="imagewatch_div_listsubcomment$${idsubusercomment}">
     <a 
     href="../profileuser/profileuser.html"
     onclick="ImageWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
     >
     <img src="${imagesubcommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
     </a>
     <div>
     <a 
     href="../profileuser/profileuser.html"
     onclick="ImageWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
     >
       <h4 class="text-sm m-0 font-semibold">${namesubcommentuser}</h4>
       </a>
       <span class="text-gray-700 text-sm">${stringpostedagosubcomment}</span>
       <br>
       <p id="imagewatch_p_textsubcomment$${idsubusercomment}" class="text-sm">
        ${textsubcomment}
       </p>
       <!-- Like  -->
       <div class="flex space-x-4 lg:font-bold">
        <button onclick="ImageWatchJS.like_dislike_SubComment('${idsubusercomment}', event);" class="flex items-center space-x-2">
            <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 w-8">
                <svg id="svg_imagewatch_likesubcomment${idsubusercomment}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
                fill="${svgfill_existlikesubcomment}" width="22" height="22" class="dark:text-gray-100">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
            </div>
            <div id="imagewatch_numberlikessubcomment${idsubusercomment}">${likessubcomment}</div>
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
                   onclick="ImageWatchJS.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}');"
                   uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-edit-alt mr-1"></i>
                        Edit  </a>
                </li>
          
                <li>
                   <hr class="-mx-2 my-2 dark:border-gray-800">
                </li>
                <li>
                   <a href=""
                   onclick="ImageWatchJS.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}');"
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
  return html_subcomments;
  
  
  }

//SHOW SUBCOMMENT AFTER ADD UPDATE REMOVE

  static async showAddedSubComment(idcomment,iduser,userrname) {
    let listsubcomment = await APIRESTSubComment.getSubCommentByComment(iduser, idcomment);
    let subcomment = listsubcomment[listsubcomment.length - 1];

    let idsubusercomment = subcomment.idsubusercomment;
    let textsubcomment = subcomment.textsubcomment;
    let likessubcomment = subcomment.likessubcomment;
    let datepublishsubcomment = subcomment.datepublishsubcomment;
    let stringpostedagosubcomment= subcomment.stringpostedagosubcomment; 
    //CONERT FORMAT DATE
    const dt = new Date(datepublishsubcomment);
    const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    //USER
    let idsubcommentuser = subcomment.idsubcommentuser;
    let namesubcommentuser = subcomment.namesubcommentuser;
    let imagesubcommentuser = subcomment.imagesubcommentuser;

    if (imagesubcommentuser === "") {
      imagesubcommentuser = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
    }
    const svgfill_existlikesubcomment =await this.svgfill_existlikesubcomment(idsubusercomment, iduser, userrname);
    let show_edit_delete_subcomment =await this.show_edit_delete_subcomment(idsubusercomment,iduser,userrname);
    let html_subcomment = `
    <div class="flex items-start mt-8" id="imagewatch_div_listsubcomment$${idsubusercomment}">
    <a 
    href="../profileuser/profileuser.html"
    onclick="ImageWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
    >
    <img src="${imagesubcommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
    </a>
    <div>
    <a 
    href="../profileuser/profileuser.html"
    onclick="ImageWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
    >
      <h4 class="text-sm m-0 font-semibold">${namesubcommentuser}</h4>
      </a>
      <span class="text-gray-700 text-sm">${stringpostedagosubcomment}</span>
      <br>
      <p id="imagewatch_p_textsubcomment$${idsubusercomment}" class="text-sm">
       ${textsubcomment}
      </p>
      <!-- Like  -->
      <div class="flex space-x-4 lg:font-bold">
       <button onclick="ImageWatchJS.like_dislike_SubComment('${idsubusercomment}', event);" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 w-8">
               <svg id="svg_imagewatch_likesubcomment${idsubusercomment}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
               fill="${svgfill_existlikesubcomment}" width="22" height="22" class="dark:text-gray-100">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
               </svg>
           </div>
           <div id="imagewatch_numberlikessubcomment${idsubusercomment}">${likessubcomment}</div>
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
                  onclick="ImageWatchJS.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}');"
                   uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                      <i class="uil-edit-alt mr-1"></i>
                       Edit  </a>
               </li>
         
               <li>
                  <hr class="-mx-2 my-2 dark:border-gray-800">
               </li>
               <li>
                  <a href=""
                  onclick="ImageWatchJS.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}');"
                   uk-toggle="target: #deletesubcommentmodal" 
                  class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                      <i class="uil-trash-alt mr-1"></i> Delete </a>
               </li>
            </ul>
         </div>
    </div>
  </div>
     `;
    let imagewatch_listupdatesubcomments= document.getElementById(`imagewatch_listupdatesubcomments${idcomment}`);
    imagewatch_listupdatesubcomments.parentNode.insertAdjacentHTML("beforeend", html_subcomment);
  
 //NUMBER SUBCOMMENT 
 let NumberOfSubComment=listsubcomment.length;
 document.getElementById(`imagewatch_div_numbersubcomments${idcomment}`).innerHTML=`${NumberOfSubComment}`;

  }
  static  showUpdatedSubComment(idsubcomment,textsubcomment) {
   document.getElementById(`imagewatch_p_textsubcomment$${idsubcomment}`).innerHTML=textsubcomment;
  }
  static  showRemoveSubComment(idsubcomment) {
    document.getElementById(`imagewatch_div_listsubcomment$${idsubcomment}`).remove();
  
    let idcommenthtml=  document.getElementById('imagewatch_idcomment_deletesubcomment').value;
 let numbercommenthtml= document.getElementById(`imagewatch_div_numbersubcomments${idcommenthtml}`).textContent;
 let numbercomments=Number(numbercommenthtml);
  document.getElementById(`imagewatch_div_numbersubcomments${idcommenthtml}`).innerHTML=numbercomments-1;
   }
   //#endregion COMMENTS

//#region  LIKES
   //-------------------------------------------------------------------------
  //LIKES

  //ADD DELETE LIKE IMAGE

  static like_dislike_Image= async(event)=>
  {
    try {
      event.preventDefault();
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
      let idimagewatch = sessionStorage.getItem('idimagewatch');
      let existLikeImage=await APIRESTLikes.existLikeImage(idimagewatch,sessionuser.iduser,sessionuser.userrname)
     if (existLikeImage) {
      const deletelikeImage= await APIRESTLikes.deletelikeImage(idimagewatch,
        sessionuser.iduser,sessionuser.userrname );
       if (deletelikeImage) {
      
         document.getElementById('svg_imagewatch_likeimage').setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById('imagewatch_numberlike').textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById('imagewatch_numberlike').innerHTML=numberoflikes;
       }
      } 
     else{
      const likeImage= await APIRESTLikes.likeImage(idimagewatch,
        sessionuser.iduser,sessionuser.userrname);
       if (likeImage) {
      
         document.getElementById('svg_imagewatch_likeimage').setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById('imagewatch_numberlike').textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById('imagewatch_numberlike').innerHTML=numberoflikes;
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
      
         document.getElementById(`svg_imagewatch_likecomment${idcomment}`).setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`imagewatch_numberlikescomment${idcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`imagewatch_numberlikescomment${idcomment}`).innerHTML=numberoflikes;
       }
      } 

     else{

      const likeComment= await APIRESTLikes.likeComment(idcomment,
        sessionuser.iduser,sessionuser.userrname );
       if (likeComment) {
      
         document.getElementById(`svg_imagewatch_likecomment${idcomment}`).setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`imagewatch_numberlikescomment${idcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`imagewatch_numberlikescomment${idcomment}`).innerHTML=numberoflikes;
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
      
         document.getElementById(`svg_imagewatch_likesubcomment${idsubcomment}`).setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`imagewatch_numberlikessubcomment${idsubcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`imagewatch_numberlikessubcomment${idsubcomment}`).innerHTML=numberoflikes;
       }
      } 

     else{

      const likeSubComment= await APIRESTLikes.likeSubComment(idsubcomment,
        sessionuser.iduser,sessionuser.userrname );
       if (likeSubComment) {
      
         document.getElementById(`svg_imagewatch_likesubcomment${idsubcomment}`).setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`imagewatch_numberlikessubcomment${idsubcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`imagewatch_numberlikessubcomment${idsubcomment}`).innerHTML=numberoflikes;
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
 static svgfill_existlikecomment=async(idcomment,iduser,username)=>
 {
  let fill="";
  let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,iduser,username);
  if(existLikeComment)
  {
   fill="black"
  }
  else{
    fill="grey"
  }
  return fill;
}
static show_edit_delete_comment=async(idimage,idcomment,iduserlogin,userrname)=>
{
  let hidden="";
  let existLikeComment=await APIRESTImageComment.existCommentImage(idimage,idcomment,iduserlogin,userrname);
  if (existLikeComment) {
    hidden="";
  } else {
    hidden="hidden"  
  }
  return hidden;
}

//SUBCOMMENTS

static svgfill_existlikesubcomment=async(idsubcomment,iduser,username)=>
{
 let fill="";
 let existLikeSubComment=await APIRESTLikes.existLikeSubComment(idsubcomment,iduser,username);
 if(existLikeSubComment)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static show_edit_delete_subcomment=async(idsubcomment,iduserlogin,userrname)=>
{
  let hidden="";
  let existSubComment=await APIRESTSubComment.existSubComment(idsubcomment,iduserlogin,userrname);
  if (existSubComment) {
    hidden="";
  } else {
    hidden="hidden"  
  }
  return hidden;
}
}
window.addEventListener("load",ImageWatchJS.loadPage);


const updateimageform = document.getElementById('form_updateimage_imagewatch');
updateimageform.addEventListener('submit', ImageWatchJS.updateImage);

const buttonDeleteImage = document.getElementById('button_deleteimagemodal_imagewatch');
buttonDeleteImage.addEventListener('click', ImageWatchJS.deleteImage);

const a_userprofile= document.getElementById('imagewatch_a_userprofile');
a_userprofile.addEventListener('click', ImageWatchJS.passidtoUserProfile);


const imagewatch_buttonlikeimage = document.getElementById('imagewatch_buttonlikeimage');
imagewatch_buttonlikeimage.addEventListener('click', ImageWatchJS.like_dislike_Image);

//COMMENTS

const form_addcommentimage = document.getElementById('form_addcommentimage');
form_addcommentimage.addEventListener('submit', ImageWatchJS.addCommentImage);

const form_imagewatch_updatecomment = document.getElementById('form_imagewatch_updatecomment');
form_imagewatch_updatecomment.addEventListener('submit', ImageWatchJS.updateCommentImage);



const button_imagewatch_deletecomment = document.getElementById('button_imagewatch_deletecomment');
button_imagewatch_deletecomment.addEventListener('click', ImageWatchJS.deleteCommentImage);

//SUBCOMMENT



const form_imagewatch_updatesubcoment = document.getElementById('form_imagewatch_updatesubcoment');
form_imagewatch_updatesubcoment.addEventListener('submit', ImageWatchJS.updateSubCommentImage);


const button_imagewatch_deletesubcomment = document.getElementById('button_imagewatch_deletesubcomment');
button_imagewatch_deletesubcomment.addEventListener('click', ImageWatchJS.deleteSubCommentImage);


const imagewatch_a_viewcomments = document.getElementById('imagewatch_a_viewcomments');
imagewatch_a_viewcomments.addEventListener('click', ImageWatchJS.show_comment_images);
