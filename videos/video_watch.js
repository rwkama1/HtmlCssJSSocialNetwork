class VideoWatchJS
{
   //LOAD PAGE
   static loadPage=async()=>
   {

        //DARK MODE
        var nightMode = sessionStorage.getItem('gmtNightMode');
        if (nightMode) {
        document.documentElement.classList.add('dark');
        }



    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
   
     try {
     
      let idvideowatch = sessionStorage.getItem('idvideowatch');
      let getVideo=await APIRESTVideo.getVideo(idvideowatch
      ,sessionuser.iduser,sessionuser.userrname);
    
      let getuser=await APIRESTUser.getUser(getVideo.user.iduser,sessionuser.iduser,
        sessionuser.userrname)
        let iduserlogin=sessionuser.iduser;
        let iduservideo=getuser.iduser;
        //SHOW EDIT DELETE VIDEO DIV
         const editDeleteDiv = document.getElementById('videowatch_editdeletevideo_div');

                if (iduserlogin===iduservideo) {
               
                editDeleteDiv.removeAttribute('hidden');
                } else {
              
                editDeleteDiv.setAttribute('hidden', true);
                }
 //SHOW EXISTLIKEVIDEO
 let existLikeVideo=await APIRESTLikes.existLikeVideo(idvideowatch,sessionuser.iduser,sessionuser.userrname);

  
 if(existLikeVideo)
 {
   document.getElementById("svg_videowatch_likevideo").setAttribute("fill","black");
 }




// GET ID USER

document.getElementById("videowatch_iduser").value=iduservideo;



//GET VIDEO

  this.loadVideo(getVideo,getuser.image);

  //GET SUGGESTED VIDEOS
  this.listSuggestedVideos(sessionuser.iduser,sessionuser.userrname,iduservideo);
   
  //NUMBER COMMENT VIDEO

  let NumberOfCommentVideo=await  APIRESTVideoComment.NumberOfCommentVideo(idvideowatch);
  document.getElementById("videowatch_div_numbercomments").innerHTML=`Comments (${NumberOfCommentVideo})`;

 
 // await this.loadCommentVideo(listcommentvideo,idvideowatch,sessionuser.iduser,sessionuser.userrname);

   } catch (error) {
     console.log(error);
     //window.location.href="../index.html"; 
        }
    
   } 
   static loadVideo=async(getVideo,userimage)=>
   {
    
    
    let { urlvideo, likes,description, DateTimePublish, title,user,idvideo,visibility} = getVideo;
  
       //SHOW NUMBER LIKES

   document.getElementById("videowatch_likesvideo").innerHTML=likes;
    //CONVERT FORMAT DATE

   const dt = new Date(DateTimePublish);
   const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if(userimage==="")
      {
        userimage="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      //GET VIDEO
    document.getElementById("videowatch_video").setAttribute("src", urlvideo);
    document.getElementById("videowatch_titlevideo").innerHTML=title;
    document.getElementById("videowatch_userimageprofile").setAttribute("src", userimage);
    document.getElementById("videowatch_username_div").innerHTML=user.name;
    document.getElementById("videowatch_publishedvideo").innerHTML=`Published on ${formatted_date}`;
    document.getElementById("videowatch_descriptionvideo_p").innerHTML=description;
    // document.getElementById("usersettings_urltwitter").setAttribute("value", urltwitter);

    //GET UPDATE VIDEO MODAL
    document.getElementById("videowatch_updatevideo_idvideo").setAttribute("value", idvideo);
    document.getElementById("videowatch_updatevideo_name").setAttribute("value", title);
    document.getElementById("videowatch_updatevideo_description").innerHTML=description;
    const visibilitySelect = document.getElementById('videowatch_updatevideo_visibility');
    if (visibility === 'Private') {
      visibilitySelect.value = 'Private';
    } else {
      visibilitySelect.value = 'Public';
    }

    //GET ID VIDEO DELETE
    document.getElementById("idvideo_deletevideomodal_videowatch").setAttribute("value", idvideo);

   }
// LOAD SUGGESTED VIDEOS
   static async listSuggestedVideos(iduserlogin,usernamelogin,iduservideo) {
          
    let getVideoSuggestedUser = await APIRESTVideo.getVideoSuggestedUser
    (iduserlogin,iduservideo,usernamelogin);

    let html_load_listsuggestedvideo="";
    for (let i = 0; i < Math.min(getVideoSuggestedUser.length, 15); i++) {
      let { urlvideo, description, stringpostedago, title,user,idvideo } = getVideoSuggestedUser[i];
      html_load_listsuggestedvideo += `
       <div class="py-2 relative">
                        
      <div class="flex-1 pt-3 relative"> 
      <div>
            <a 
            href="video_watch.html" 
            onclick="VideoWatchJS.passidtoVideoWatch('${idvideo}');" 
            class="w-full h-32 overflow-hidden rounded-lg relative shadow-sm flex-shrink-0 block">
         <video src="${urlvideo}" autoplay loop muted playsinline uk-responsive></video>
      </a>
      </div>
         <a href="video_watch.html" 
         onclick="VideoWatchJS.passidtoVideoWatch('${idvideo}');"
         class="line-clamp-2 font-semibold">  
        
         ${description}
              </a>
         <div class="flex space-x-2 items-center text-sm pt-1">
            <div> ${stringpostedago}</div>
            <div>·</div>
         
         </div>
      </div>
   </div> 
          `;
    }
    document.getElementById("videowatch_listsuggestedvideos").innerHTML = html_load_listsuggestedvideo;  
    
}
   //UPDATE VIDEO
   static updateVideo= async(event)=>
   {
     try {
       event.preventDefault();
      
       const idvideo = document.getElementById('videowatch_updatevideo_idvideo').value;
       const title = document.getElementById('videowatch_updatevideo_name').value;
        const description = document.getElementById('videowatch_updatevideo_description').value;       
        const visibility = document.getElementById('videowatch_updatevideo_visibility').value;
       
          
        const dataform = {idvideo,title
          ,description,visibility}
          let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
         const response_upload_video= await APIRESTVideo.updateVideo(dataform,sessionuser.iduser,
          sessionuser.userrname);
         if (response_upload_video) {
       
           messagenotification('Video Updated','success',event);
           setInterval(() => {
            location.reload();
           }, 1000);
       
           document.getElementById('videowatch_updatevideo_name').value="";
           document.getElementById('videowatch_updatevideo_description').value="";
          }
    
      
     }catch (error) {
       alert(error);
     }
   }
   //DELETE VIDEO
   static deleteVideo= async(event)=>
   {
     try {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
       const idvideo = document.getElementById('idvideo_deletevideomodal_videowatch').value;
      
      
         const response_delete_video= await APIRESTVideo.deleteVideo(idvideo,
          sessionuser.iduser,sessionuser.userrname);
         if (response_delete_video) {
       
           messagenotification('Video Deleted','success',event);
           setInterval(() => {
            window.location.href="./video_mainpage.html"; 
           }, 1000);
         
          }
    
      
     }catch (error) {
      console.error(error);
       alert(error);
     }
   }

 //REDIRECT TO PROFILE USER
 static passidtoUserProfile=()=>
 {
    try {
     const iduser=document.getElementById("videowatch_iduser").value;
     sessionStorage.setItem("iduserwatch",null);
       sessionStorage.setItem('iduserwatch', iduser);
   
      }catch (error) {
       alert(error);
       
      }
       
 }  
 static passidtoVideoWatch=(idvideo)=>
 {
   
      sessionStorage.setItem('idvideowatch', null);
     sessionStorage.setItem('idvideowatch', idvideo); 
   
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
static async show_comment_video()
{
  let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
  let {iduser,userrname}=sessionuser;
  let idvideowatch = sessionStorage.getItem('idvideowatch');
  let listcommentvideo=await  APIRESTVideoComment.getCommentVideoByVideo(idvideowatch,
    iduser,userrname);

  await VideoWatchJS.loadCommentVideo(listcommentvideo,idvideowatch,iduser,userrname);

// profileloginuser_commentspost${idpost}
}



 //LOAD COMMENT VIDEO
 static loadCommentVideo=async(listcommentvideo,idvideo,iduser,userrname)=>
 {
   let html_comments_videos="";
 
     for (let i = 0; i < listcommentvideo.length; i++) {
       const commentvideo = listcommentvideo[i];
       let idcomment=commentvideo.idusercomment ;
       let textcomment=commentvideo.textcomment ;
       let likescomment =commentvideo.likescomment;
       let datepublishcomment =commentvideo.datepublishcomment;
       let stringpostedago =commentvideo.stringpostedago;

       //CONVERT FORMAT DATE

       const dt = new Date(datepublishcomment);
       const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

       //USER
       let idcommentuser=commentvideo.idcommentuser;
       let namecommentuser  =commentvideo.namecommentuser ;
       let imagecommentuser  =commentvideo.imagecommentuser ;
       if (imagecommentuser==="") {
         imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
       }

 
       let numberofsubcomments=commentvideo.numbersubcomment ;
      
      //  let listsubcommentvideo=await  APIRESTSubComment.getSubCommentByComment(
      //   iduser,
      //   idcomment);
      //   let numberofsubcomments=listsubcommentvideo.length;
      //   let loadSubCommentVideo="";
      //   if(numberofsubcomments!==0)
      //   {
      //     loadSubCommentVideo = await this.loadSubCommentVideo(listsubcommentvideo,idcomment, iduser,userrname);
      //   }
   
      const svgfill_existlikecomment =  this.svgfill_existlikecomment(commentvideo.existcommentloginuser);
      


      let show_edit_delete_comment = this.show_edit_delete_comment(commentvideo.existcommentloginuser);

     html_comments_videos+=`
     <div id="videowatch_div_listcomment$${idcomment}">
     <!--  Comment -->
     <div class="flex items-start">
        <a 
        href="../profileuser/profileuser.html"
        onclick="VideoWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
        >
        <img src="${imagecommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
        </a>
        <div>
        <a 
        href="../profileuser/profileuser.html"
        onclick="VideoWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
        >
        <h4 class="text-base m-0 font-semibold">${namecommentuser}</h4>
        </a>
        <span class="text-gray-700 text-sm">${stringpostedago}</span>
        <br>
        <p id="videowatch_p_textcomment${idcomment}">
          ${textcomment}
        </p>
        <div class="flex space-x-4 lg:font-bold">
           <button onclick="VideoWatchJS.like_dislike_Comment('${idcomment}', event);" class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
                 <svg 
                 id="svg_videowatch_likecomment${idcomment}"
                 xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" 
                  fill="${svgfill_existlikecomment}"
                  width="22"
                   height="22" 
                   class="dark:text-gray-100">
                       <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                 </svg>
              </div>
              <div id="videowatch_numberlikescomment${idcomment}"> ${likescomment}</div>
           </button>
           <button 
           onclick="VideoWatchJS.show_subcomment_video('${idcomment}','${iduser}','${userrname}');"
            uk-toggle="target: #view-subcomments${idcomment}"
            class="flex items-center space-x-2">
              <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                       <path fill-rule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                 </svg>
              </div>
              <div id="videowatch_div_numbersubcomments${idcomment}"> ${numberofsubcomments}</div>
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
                    onclick="VideoWatchJS.showtextcommentUpdateModalComment('${idcomment}','${textcomment}');"
                    uk-toggle="target: #update_comment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                          <i class="uil-edit-alt mr-1"></i>
                          Edit  </a>
                 </li>
           
                 <li>
                    <hr class="-mx-2 my-2 dark:border-gray-800">
                 </li>
                 <li>
                    <a href=""
                    onclick="VideoWatchJS.showIdDeleteModalComment('${idcomment}');"
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
        <div id="videowatch_listupdatesubcomments${idcomment}">
        <!-- Subcoment 1 -->
          
          </div>

       </div> 
  <br>
        <!-- ADD SUBCOMMENT -->
        <div>
        <form 
        id="form_videowatch_addsubcomment"
        onsubmit="VideoWatchJS.addSubCommentVideo('${idcomment}', event);">
              <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
              <input type="text" id="videowatch_textsubcomment${idcomment}"
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
 document.getElementById("comments_videowatch1").innerHTML= html_comments_videos;
 


 
 }
 //ADD COMMENT VIDEO
 static addCommentVideo=async(event)=>
 {
   try {
     event.preventDefault();
     let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
     let {iduser,userrname}=sessionuser;
     let idvideowatch = sessionStorage.getItem('idvideowatch');
    const textcomment = document.getElementById('videowatch_textcomment').value;

    const commmentVideo= await APIRESTVideoComment.commmentVideo(idvideowatch,
     textcomment,iduser,userrname);
    if (commmentVideo) {

     //#region REAL TIME NOTIFICATION

     var ably = new Ably.Realtime('rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A');
     const commentsnotificationChannelName = `comments_user_notificationsV`;
     const commentsnotificationChannel = ably.channels.get(commentsnotificationChannelName);
     const commentsnotificationRequestMessage = { name: `comments_user_notifications_messageV` };
     commentsnotificationChannel.publish(commentsnotificationRequestMessage);
     
     //#endregion REAL TIME NOTIFICATION 

      messagenotification('Comment Added','success',event);

     await this.showAddedCommentVideo(idvideowatch,iduser,userrname);
      
  

     //  setInterval(() => {
     //   location.reload();
     //  }, 1000);
      document.getElementById('videowatch_textcomment').value="";
     }
 }catch (error) {
   alert(error);
 }
 }
//EDIT DELETE COMMENT VIDEO



static  showtextcommentUpdateModalComment=async(idcomment,textcomment)=>
{
 
 document.getElementById('videowatch_idcomment_updatecomment').value=idcomment;
 document.getElementById('videowatch_text_updatecomment').value=textcomment;


}
static showIdDeleteModalComment=async(idcomment)=>
{
 document.getElementById('videowatch_idcomment_deletecommentmodal').value=idcomment;

}
//UPDATE COMMENT VIDEO
static updateCommentVideo=async(event)=>
{
 try {
   event.preventDefault();
   let idcomment=document.getElementById("videowatch_idcomment_updatecomment").value;
   let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
   let {iduser,userrname}=sessionuser;
   let idvideowatch = sessionStorage.getItem('idvideowatch');
  const textcomment = document.getElementById('videowatch_text_updatecomment').value;

  const editcommentVideo= await APIRESTVideoComment.editcommentVideo(idcomment,idvideowatch,
   textcomment,iduser,userrname);
  if (editcommentVideo) {

    messagenotification('Comment Updated','success',event);

    this.showUpdatedCommentVideo(idcomment,textcomment);
   //  setInterval(() => {
   //   location.reload();
   //  }, 1000);
    document.getElementById('videowatch_text_updatecomment').value="";
   }
}catch (error) {
 alert(error);
}
}
//DELETE COMMENT VIDEO
static deleteCommentVideo=async(event)=>
{
 try {
   event.preventDefault();
   let idcomment=document.getElementById("videowatch_idcomment_deletecommentmodal").value;
   let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
   let {iduser,userrname}=sessionuser;
   let idvideowatch = sessionStorage.getItem('idvideowatch');
  const deletecommentVideo= await APIRESTVideoComment.deletecommentVideo(idcomment,idvideowatch,
   iduser,userrname);
  if (deletecommentVideo) {
     messagenotification('Comment Deleted','success',event);
     this.showRemoveCommentVideo(idcomment);
   }
}catch (error) {
 alert(error);
}
}

//SHOW SUBCOMMENT AFTER ADD UPDATE REMOVE
static  showAddedCommentVideo=async(idvideo,iduser,userrname)=>
{
   let listcommentvideo=await  APIRESTVideoComment.getCommentVideoByVideo(idvideo,
     iduser,userrname);
     let lastcommentvideo = listcommentvideo[listcommentvideo.length - 1];
       const commentvideo = lastcommentvideo;
       let idcomment=commentvideo.idusercomment ;
       let textcomment=commentvideo.textcomment ;
       let likescomment =commentvideo.likescomment;
       let datepublishcomment =commentvideo.datepublishcomment;
       let stringpostedago =commentvideo.stringpostedago;
       //CONERT FORMAT DATE

       const dt = new Date(datepublishcomment);
       const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

       //USER
       let idcommentuser=commentvideo.idcommentuser;
       let namecommentuser  =commentvideo.namecommentuser ;
       let imagecommentuser  =commentvideo.imagecommentuser ;
       if (imagecommentuser==="") {
         imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
       }

       let numberofsubcomments=0;

     //   let loadSubCommentPost =await this.loadSubCommentPost(idcomment,iduser);
     //  let svgfill_existlikecomment= await this.svgfill_existlikecomment(idcomment,iduser,userrname);
    
   

     let html_addcomment_video=`
   <div id="videowatch_div_listcomment$${idcomment}" >
   <!--  Comment -->
   <div class="flex items-start">
   <a 
   href="../profileuser/profileuser.html"
   onclick="VideoWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
   >
   <img src="${imagecommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
   </a>
    
      <div>
      <a 
      href="../profileuser/profileuser.html"
      onclick="VideoWatchJS.passidtoUserProfile_Comment('${idcommentuser}');" 
      >
        <h4 class="text-base m-0 font-semibold">${namecommentuser}</h4>
        </a>
        <span class="text-gray-700 text-sm">${stringpostedago}</span>
        <br>
        <p id="videowatch_p_textcomment${idcomment}">
         ${textcomment}
        </p>
        <div class="flex space-x-4 lg:font-bold">
         <button onclick="VideoWatchJS.like_dislike_Comment('${idcomment}', event);" class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
                 <svg id="svg_videowatch_likecomment${idcomment}"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="grey"
                   width="22" height="22" 
                   class="dark:text-gray-100">
                     <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                 </svg>
             </div>
             <div id="videowatch_numberlikescomment${idcomment}"> ${likescomment}</div>
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
             <div id="videowatch_div_numbersubcomments${idcomment}"> ${numberofsubcomments} </div>
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
                    onclick="VideoWatchJS.showtextcommentUpdateModalComment('${idcomment}','${textcomment}');"
                    uk-toggle="target: #update_comment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                        <i class="uil-edit-alt mr-1"></i>
                         Edit  </a>
                 </li>
           
                 <li>
                    <hr class="-mx-2 my-2 dark:border-gray-800">
                 </li>
                 <li>
                    <a href="" 
                    onclick="VideoWatchJS.showIdDeleteModalComment('${idcomment}');"
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
       <div id="videowatch_listupdatesubcomments${idcomment}">
       <!-- Subcomennt 1 -->
       
        </div>
      </div>
  <br>
       <!-- ADD SUBCOMMENT -->
       <div>
         <form id="form_videowatch_addsubcomment"
          onsubmit="VideoWatchJS.addSubCommentVideo('${idcomment}', event);">
            <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
              <input type="text" id="videowatch_textsubcomment${idcomment}"
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

 
 let comments_videowatch1= document.getElementById(`comments_videowatch1`);

 comments_videowatch1.parentNode.insertAdjacentHTML("beforeend", html_addcomment_video);

 //NUMBER COMMENT IMAGE
 let NumberOfComment=listcommentvideo.length;
 document.getElementById("videowatch_div_numbercomments").innerHTML=`Comments (${NumberOfComment})`;
}
static  showUpdatedCommentVideo(idcomment,textcomment) {
 document.getElementById(`videowatch_p_textcomment${idcomment}`).innerHTML=textcomment;
}
static  showRemoveCommentVideo(idcomment) {
 //ADD NUMBER COMMENTS HTML
 let textcontent_numbercomments= document.getElementById("videowatch_div_numbercomments");
 let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
 let numcomments=Number(stringnumcomments);
 textcontent_numbercomments.innerHTML=`Comments (${numcomments-1})`;

 document.getElementById(`videowatch_div_listcomment$${idcomment}`).remove();
}
//-------------------------------------------------------------------------
 //SUBCOMMENTS
 static async show_subcomment_video(idcomment,iduserlogin,usernamelogin)
  {
     let listsubcommentvideo=await APIRESTSubComment.getSubCommentByComment(
           iduserlogin,
           idcomment);
  
   let forSubCommentVideo=await this.loadSubCommentVideo(listsubcommentvideo,idcomment,iduserlogin,usernamelogin);
   document.getElementById(`videowatch_listupdatesubcomments${idcomment}`).innerHTML=forSubCommentVideo;
  // profileloginuser_commentspost${idpost}
  }
//ADD SUBCOMMENT VIDEO
static addSubCommentVideo=async(idcomment,event)=>
{
  try {
    event.preventDefault();
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
   const textsubcomment = document.getElementById(`videowatch_textsubcomment${idcomment}`).value;

   const addSubComment= await APIRESTSubComment.addSubComment
   (idcomment,
     textsubcomment,sessionuser.iduser,sessionuser.userrname);
   if (addSubComment) {
 

          //#region REAL TIME NOTIFICATION

      var ably = new Ably.Realtime('rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A');
      const commentsnotificationChannelName = `comments_user_notificationsSubComment`;
      const commentsnotificationChannel = ably.channels.get(commentsnotificationChannelName);
      const commentsnotificationRequestMessage = { name: `comments_user_notifications_messageSubComment` };
      commentsnotificationChannel.publish(commentsnotificationRequestMessage);
      
      //#endregion REAL TIME NOTIFICATION 

     messagenotification('Added comment answer','success',event);

     await this.showAddedSubComment(idcomment,sessionuser.iduser,sessionuser.userrname);
     
   
     document.getElementById(`videowatch_textsubcomment${idcomment}`).value="";
    }
}catch (error) {
  alert(error);
}
}
//EDIT DELETE SUBCOMMENT VIDEO

static  showsubcommentUpdateModal=async(idcomment,idsubcomment,textsubcomment)=>
{
 document.getElementById('videowatch_idcomment_updatesubcomment').value=idcomment;
 document.getElementById('videowatch_idsubcomment_updatesubcomment').value=idsubcomment;
 document.getElementById('videowatch_textsubcomment_updatesubcomment').value=textsubcomment;


}
static showsubcommentDeleteModal=async(idcomment,idsubcomment)=>
{
  document.getElementById('videowatch_idcomment_deletesubcomment').value=idcomment;
 document.getElementById('videowatch_idsubcomment_deletesubcomment').value=idsubcomment;

}
//UPDATE SUB COMMENT VIDEO
static updateSubCommentVideo=async(event)=>
{
 try {
   event.preventDefault();
   
   let idcomment=document.getElementById("videowatch_idcomment_updatesubcomment").value;
   let idsubcomment=document.getElementById("videowatch_idsubcomment_updatesubcomment").value;
   let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
   let {iduser,userrname}=sessionuser;

  const textsubcomment = document.getElementById('videowatch_textsubcomment_updatesubcomment').value;

  const editsubcomment= await APIRESTSubComment.editsubcommentPost(idsubcomment,idcomment,
   textsubcomment,iduser,userrname);
  if (editsubcomment) {

    messagenotification('SubComment Updated','success',event);

    this.showUpdatedSubComment(idsubcomment,textsubcomment);
   //await this.loadCommentPost(idpostwatch,iduser,userrname);
   
    document.getElementById('videowatch_textsubcomment_updatesubcomment').value="";
   }
}catch (error) {
 alert(error);
}
}
//DELETE SUB COMMENT VIDEO
static deleteSubCommentVideo=async(event)=>
{
 try {
   event.preventDefault();
   let idsubcomment=document.getElementById("videowatch_idsubcomment_deletesubcomment").value;
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


 static loadSubCommentVideo=async(listsubcommentvideo,idcomment,iduser,userrname)=>
 {
   let html_subcomments_video="";
  
     for (let i = 0; i < listsubcommentvideo.length; i++) {
       const subcommentvideo = listsubcommentvideo[i];
       let idsubusercomment =subcommentvideo.idsubusercomment  ;
       let textsubcomment= subcommentvideo.textsubcomment; 
       let likessubcomment =subcommentvideo.likessubcomment;
       let datepublishsubcomment =subcommentvideo.datepublishsubcomment ;
       let stringpostedagosubcomment= subcommentvideo.stringpostedagosubcomment; 
       //CONERT FORMAT DATE

       const dt = new Date(datepublishsubcomment);
       const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

       //USER
       let idsubcommentuser=subcommentvideo.idsubcommentuser ;
       let namesubcommentuser  =subcommentvideo.namesubcommentuser   ;
       let imagesubcommentuser  =subcommentvideo.imagesubcommentuser;
     
       if (imagesubcommentuser==="") {
         imagesubcommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
       }
       const svgfill_existlikesubcomment = this.svgfill_existlikesubcomment(subcommentvideo.existlikeloginuser);
       let show_edit_delete_subcomment = this.show_edit_delete_subcomment(subcommentvideo.existsubcommentloginuser);

       html_subcomments_video+=`
    <div class="flex items-start mt-8" id="videowatch_div_listsubcomment$${idsubusercomment}">
    <a 
    href="../profileuser/profileuser.html"
    onclick="VideoWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
    >
    <img src="${imagesubcommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
    </a>
    <div>
    <a 
    href="../profileuser/profileuser.html"
    onclick="VideoWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
    >
      <h4 class="text-sm m-0 font-semibold">${namesubcommentuser}</h4>
      </a>
      <span class="text-gray-700 text-sm">${stringpostedagosubcomment}</span>
      <br>
      <p id="videowatch_p_textsubcomment$${idsubusercomment}" class="text-sm">
       ${textsubcomment}
      </p>
      <!-- Like  -->
      <div class="flex space-x-4 lg:font-bold">
       <button onclick="VideoWatchJS.like_dislike_SubComment('${idsubusercomment}', event);" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 w-8">
               <svg id="svg_videowatch_likesubcomment${idsubusercomment}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
               fill="${svgfill_existlikesubcomment}" width="22" height="22" class="dark:text-gray-100">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
               </svg>
           </div>
           
           <div id="videowatch_numberlikessubcomment${idsubusercomment}">${likessubcomment}</div>
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
                  onclick="VideoWatchJS.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}');"
                  uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                      <i class="uil-edit-alt mr-1"></i>
                       Edit  </a>
               </li>
         
               <li>
                  <hr class="-mx-2 my-2 dark:border-gray-800">
               </li>
               <li>
                  <a href=""
                  onclick="VideoWatchJS.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}');"
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
 return html_subcomments_video;
 
 
 }

//SHOW SUBCOMMENT AFTER ADD UPDATE REMOVE

 static async showAddedSubComment(idcomment,iduser,userrname) {
   let listsubcomment = await APIRESTSubComment.getSubCommentByComment(iduser, idcomment);
   let subcommentvideo = listsubcomment[listsubcomment.length - 1];

   let idsubusercomment = subcommentvideo.idsubusercomment;
   let textsubcomment = subcommentvideo.textsubcomment;
   let likessubcomment = subcommentvideo.likessubcomment;
   let datepublishsubcomment = subcommentvideo.datepublishsubcomment;
   let stringpostedagosubcomment= subcommentvideo.stringpostedagosubcomment; 
   //CONERT FORMAT DATE
   const dt = new Date(datepublishsubcomment);
   const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

   //USER
   let idsubcommentuser=subcommentvideo.idsubcommentuser ;
   let namesubcommentuser = subcommentvideo.namesubcommentuser;
   let imagesubcommentuser = subcommentvideo.imagesubcommentuser;

   if (imagesubcommentuser === "") {
     imagesubcommentuser = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
 
   let html_subcomment = `
   <div class="flex items-start mt-8" id="videowatch_div_listsubcomment$${idsubusercomment}">
   <a 
   href="../profileuser/profileuser.html"
   onclick="VideoWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
   >
   <img src="${imagesubcommentuser}" alt="" class="rounded-full shadow w-8 h-8 mr-4">
   </a>
   <div>
   <a 
   href="../profileuser/profileuser.html"
   onclick="VideoWatchJS.passidtoUserProfile_SubComment('${idsubcommentuser}');" 
   >
     <h4 class="text-sm m-0 font-semibold">${namesubcommentuser}</h4>
     </a>
     <span class="text-gray-700 text-sm">${stringpostedagosubcomment}</span>
     <br>
     <p id="videowatch_p_textsubcomment$${idsubusercomment}" class="text-sm">
      ${textsubcomment}
     </p>
     <!-- Like  -->
     <div class="flex space-x-4 lg:font-bold">
      <button onclick="VideoWatchJS.like_dislike_SubComment('${idsubusercomment}', event);" class="flex items-center space-x-2">
          <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 w-8">
              <svg id="svg_videowatch_likesubcomment${idsubusercomment}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
              fill="grey" width="22" height="22" class="dark:text-gray-100">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
          </div>
          <div id="videowatch_numberlikessubcomment${idsubusercomment}">${likessubcomment}</div>
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
                 onclick="VideoWatchJS.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}');"
                  uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                     <i class="uil-edit-alt mr-1"></i>
                      Edit  </a>
              </li>
        
              <li>
                 <hr class="-mx-2 my-2 dark:border-gray-800">
              </li>
              <li>
                 <a href=""
                 onclick="VideoWatchJS.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}');"
                  uk-toggle="target: #deletesubcommentmodal" 
                 class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                     <i class="uil-trash-alt mr-1"></i> Delete </a>
              </li>
           </ul>
        </div>
   </div>
 </div>
    `;
   let idpostwatch_listupdatesubcomments= document.getElementById(`videowatch_listupdatesubcomments${idcomment}`);
   idpostwatch_listupdatesubcomments.parentNode.insertAdjacentHTML("beforeend", html_subcomment);
 
    
 //NUMBER SUBCOMMENT 
 let NumberOfSubComment=listsubcomment.length;
 document.getElementById(`videowatch_div_numbersubcomments${idcomment}`).innerHTML=`${NumberOfSubComment}`;
  }
 static  showUpdatedSubComment(idsubcomment,textsubcomment) {
  document.getElementById(`videowatch_p_textsubcomment$${idsubcomment}`).innerHTML=textsubcomment;
 }
 static  showRemoveSubComment(idsubcomment) {
   document.getElementById(`videowatch_div_listsubcomment$${idsubcomment}`).remove();
  
   
   let idcommenthtml=  document.getElementById('videowatch_idcomment_deletesubcomment').value;
   let numbercommenthtml= document.getElementById(`videowatch_div_numbersubcomments${idcommenthtml}`).textContent;
   let numbercomments=Number(numbercommenthtml);
    document.getElementById(`videowatch_div_numbersubcomments${idcommenthtml}`).innerHTML=numbercomments-1;
  }
  //#endregion COMMENTS

//#region  LIKES
  //-------------------------------------------------------------------------
 //LIKES

 //ADD DELETE LIKE POST

 static like_dislike_Video= async(event)=>
 {
   try {
     event.preventDefault();
     let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
     let idvideowatch = sessionStorage.getItem('idvideowatch');
     let existLikeVideo=await APIRESTLikes.existLikeVideo(idvideowatch,sessionuser.iduser,sessionuser.userrname)
    if (existLikeVideo) {
     const deletelikeVideo= await APIRESTLikes.deletelikeVideo(idvideowatch,
       sessionuser.iduser,sessionuser.userrname );
      if (deletelikeVideo) {
     
        document.getElementById('svg_videowatch_likevideo').setAttribute("fill","grey");
        //ADD LIKE HTML
        let textcontent_numberlikes= document.getElementById('videowatch_likesvideo').textContent;
        let numberoflikes=Number(textcontent_numberlikes)-1;
        document.getElementById('videowatch_likesvideo').innerHTML=numberoflikes;
      }
     } 
    else{
     const likeVideo= await APIRESTLikes.likeVideo(idvideowatch,
       sessionuser.iduser,sessionuser.userrname );
      if (likeVideo) {
     
        document.getElementById('svg_videowatch_likevideo').setAttribute("fill","black");
        //ADD LIKE HTML
        let textcontent_numberlikes= document.getElementById('videowatch_likesvideo').textContent;
        let numberoflikes=Number(textcontent_numberlikes)+1;
        document.getElementById('videowatch_likesvideo').innerHTML=numberoflikes;
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
     
        document.getElementById(`svg_videowatch_likecomment${idcomment}`).setAttribute("fill","grey");
        //ADD LIKE HTML
        let textcontent_numberlikes= document.getElementById(`videowatch_numberlikescomment${idcomment}`).textContent;
        let numberoflikes=Number(textcontent_numberlikes)-1;
        document.getElementById(`videowatch_numberlikescomment${idcomment}`).innerHTML=numberoflikes;
      }
     } 

    else{

     const likeComment= await APIRESTLikes.likeComment(idcomment,
       sessionuser.iduser,sessionuser.userrname );
      if (likeComment) {
     
        document.getElementById(`svg_videowatch_likecomment${idcomment}`).setAttribute("fill","black");
        //ADD LIKE HTML
        let textcontent_numberlikes= document.getElementById(`videowatch_numberlikescomment${idcomment}`).textContent;
        let numberoflikes=Number(textcontent_numberlikes)+1;
        document.getElementById(`videowatch_numberlikescomment${idcomment}`).innerHTML=numberoflikes;
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
     
        document.getElementById(`svg_videowatch_likesubcomment${idsubcomment}`).setAttribute("fill","grey");
        //ADD LIKE HTML
        let textcontent_numberlikes= document.getElementById(`videowatch_numberlikessubcomment${idsubcomment}`).textContent;
        let numberoflikes=Number(textcontent_numberlikes)-1;
        document.getElementById(`videowatch_numberlikessubcomment${idsubcomment}`).innerHTML=numberoflikes;
      }
     } 

    else{

     const likeSubComment= await APIRESTLikes.likeSubComment(idsubcomment,
       sessionuser.iduser,sessionuser.userrname );
      if (likeSubComment) {
     
        document.getElementById(`svg_videowatch_likesubcomment${idsubcomment}`).setAttribute("fill","black");
        //ADD LIKE HTML
        let textcontent_numberlikes= document.getElementById(`videowatch_numberlikessubcomment${idsubcomment}`).textContent;
        let numberoflikes=Number(textcontent_numberlikes)+1;
        document.getElementById(`videowatch_numberlikessubcomment${idsubcomment}`).innerHTML=numberoflikes;
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
window.addEventListener("load",VideoWatchJS.loadPage);

const updatevideoform = document.getElementById('form_updatevideo_videowatch');
updatevideoform.addEventListener('submit', VideoWatchJS.updateVideo);

const buttonDeleteVideo = document.getElementById('button_deletevideomodal_videowatch');
buttonDeleteVideo.addEventListener('click', VideoWatchJS.deleteVideo);

const a_userprofile= document.getElementById('videowatch_a_userprofile');
a_userprofile.addEventListener('click', VideoWatchJS.passidtoUserProfile);


const form_addcommentvideo = document.getElementById('form_addcommentvideo');
form_addcommentvideo.addEventListener('submit', VideoWatchJS.addCommentVideo);

const form_videowatch_updatecomment = document.getElementById('form_videowatch_updatecomment');
form_videowatch_updatecomment.addEventListener('submit', VideoWatchJS.updateCommentVideo);

const button_videowatch_deletecomment = document.getElementById('button_videowatch_deletecomment');
button_videowatch_deletecomment.addEventListener('click', VideoWatchJS.deleteCommentVideo);


const videowatch_buttonlikevideo = document.getElementById('videowatch_buttonlikevideo');
videowatch_buttonlikevideo.addEventListener('click', VideoWatchJS.like_dislike_Video);

const form_videowatch_updatesubcoment = document.getElementById('form_videowatch_updatesubcoment');
form_videowatch_updatesubcoment.addEventListener('submit', VideoWatchJS.updateSubCommentVideo);


const button_videowatch_deletesubcomment = document.getElementById('button_videowatch_deletesubcomment');
button_videowatch_deletesubcomment.addEventListener('click', VideoWatchJS.deleteSubCommentVideo);


const videowatch_a_viewcomments = document.getElementById('videowatch_a_viewcomments');
videowatch_a_viewcomments.addEventListener('click', VideoWatchJS.show_comment_video);