class FeedJS
{
      //LOAD PAGE
    
static loadPage=async()=>
  {
    
    try {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));

      // SHOW  IMAGE PROFILE TIMELINE ADD POST IMAGE VIDEO

      if(sessionuser.image==="")
      {
         sessionuser.image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      let addpost_imageprofile= document.getElementById("feed_imageprofile_timeline_addpost");
      addpost_imageprofile.src=sessionuser.image;

      //LOAD TIMELINE

     await this.load_timeline(sessionuser.iduser,sessionuser.userrname);
     
       // LOAD ALBUM VIDEOS MODAL ADD VIDEOS
        await this.loadAlbumVideoUserModal(sessionuser);

      //LOAD ALBUM IMAGES MODAL ADD IMAGE

      await this.loadAlbumImagesUserModal(sessionuser);

   } catch (error) {
  
   alert(error);
  
   }
 
   }
//GET TITLE ALBUMS IN ADD MODAL IMAGE
static async loadAlbumImagesUserModal(getuser) {

  let getalbumimagesuser = await APIRESTAlbumImage.getAlbumImageByLoginUser(getuser.iduser,getuser.userrname);
  let load_albums_image = "";
  for (let i = 0; i < getalbumimagesuser.length; i++) {
    load_albums_image += `<option value=${getalbumimagesuser[i].idalbumphoto}>${getalbumimagesuser[i].title}</option>`;
  }

  document.getElementById("feed_select_albumimages").innerHTML = load_albums_image;
}




//GET TITLE ALBUM IN ADD MODAL VIDEO
static async loadAlbumVideoUserModal(getuser) {
   
   let getalbumvideosuser = await APIRESTAlbumVideo.getAlbumVideoseByLoginUser(getuser.iduser,getuser.userrname);
  let load_albums_video = "";
  for (let i = 0; i < getalbumvideosuser.length; i++) {
    load_albums_video += `<option value=${getalbumvideosuser[i].idalbumvideo}>${getalbumvideosuser[i].title}</option>`;
  }

  document.getElementById("feed_select_albumvideos").innerHTML = load_albums_video;
}

//ADD IMAGE

static upload_image_modal=async(event)=>
    {
      try {
     
        event.preventDefault();
        let getuserlogin = JSON.parse(sessionStorage.getItem('user_login'));
        document.getElementById("create-image-modal").classList.add("cursor-loading");
       const title = document.getElementById('feed_uploadimage_title').value;
        const idalbumphoto = document.getElementById('feed_select_albumimages').value;
        const description = document.getElementById('feed_uploadimage_description').value;
        const visibility = document.getElementById('feed_uploadimage_visibility').value;
        let fileimageprofile = document.getElementById('uploadoneimage').files[0];
  
       
      let urlimage=await APIRESTCloudinary.upload_image(fileimageprofile,getuserlogin.iduser);
        const dataform = {title
          ,idalbumphoto,visibility,description,urlimage}
      


         const response_upload_image= await APIRESTImages.addImage(dataform,
            getuserlogin.iduser,getuserlogin.userrname);
         if (response_upload_image) {
      
           document.getElementById('feed_uploadimage_title').value="";
           document.getElementById('feed_uploadimage_description').value="";
          }
    
       
          messagenotification('Image Added','success',event);
          document.getElementById("create-image-modal").classList.remove("cursor-loading");
          setInterval(location.reload(),1000);
     }catch (error) {
       alert(error);
       location.reload();
     }
      
    }

//ADD VIDEO

 static upload_video_modal=async(event)=>
    {
      try {
       event.preventDefault();
       let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
       document.getElementById("create-video-modal").classList.add("cursor-loading");
       const title = document.getElementById('feed_uploadvideo_title').value;
        const idalbumvideo = document.getElementById('feed_select_albumvideos').value;
        const description = document.getElementById('feed_uploadvideo_description').value;
        const visibility = document.getElementById('feed_uploadvideo_visibility').value;
        let filevideo = document.getElementById('uploadonevideo').files[0];
   
       
      let urlvideo=await APIRESTCloudinary.upload_video(filevideo,getulogin.iduser);
        const dataform = {title
          ,idalbumvideo,visibility,description,urlvideo}
      
         const response_upload_video= await APIRESTVideo.addVideo(dataform,getulogin.iduser,getulogin.userrname);
         if (response_upload_video) {
        
           document.getElementById('feed_uploadvideo_title').value="";
           document.getElementById('feed_uploadvideo_description').value="";
          }
    
          messagenotification('Video Added','success',event);
          document.getElementById("create-video-modal").classList.remove("cursor-loading");
          setInterval(location.reload(),1000);
         
     }catch (error) {
       alert(error);
       location.reload();
     }
      
    }

 //ADD POST

 static add_post=async(event)=>
 {
   try {
     event.preventDefault();
     let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
    const title = document.getElementById('feed_addpost_name').value;
 
     const description = document.getElementById('feed_addpost_description').value;
     const visibility = document.getElementById('feed_addpost_visibility').value;

     const dataform = {title
       ,visibility,description}
   
      const response_post= await APIRESTPost.addPost(dataform,getulogin.iduser,
         getulogin.userrname);
      if (response_post) {
      
        document.getElementById('feed_addpost_name').value="";
        document.getElementById('feed_addpost_description').value="";
       }
 
       messagenotification('Post Added','success',event);
      
       setInterval(location.reload(),1000);
      
  }catch (error) {
    alert(error);
    location.reload();
  }
   
 }
 

//TIMELINE
static  load_timeline=async(iduserlogin,usernamelogin)=>
{
  let getPhotoPostVideoMainPage = await APIRESTImageVideoPost.getPhotoPostVideoMainPage(iduserlogin);
  
  let html_load_postvideoimage = '';
  let html_load_postvideoimage_more = '';
  for (let i = 0; i < getPhotoPostVideoMainPage.length; i++) {
    let getpostimagevideo=getPhotoPostVideoMainPage[i];
  

    if (i >= 3) {
     
        if (getpostimagevideo.type==="P") {
       
         html_load_postvideoimage_more+= await this.html_Post_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
         
       } else if (getpostimagevideo.type==="I"){
         html_load_postvideoimage_more+= await this.html_Image_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
       }
       else
       {
         html_load_postvideoimage_more+= await this.html_Video_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
       }
  

    } else {
      if (getpostimagevideo.type==="P") {
        
         html_load_postvideoimage+=await this.html_Post_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
     
      } else if (getpostimagevideo.type==="I"){
        html_load_postvideoimage+= await this.html_Image_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
      }
      else
      {
        html_load_postvideoimage+=await this.html_Video_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
      }
    }
  }
  document.getElementById("feed_timeline_div").innerHTML= html_load_postvideoimage + 
  '<div id="feed_timeline_user" hidden>' + 
  html_load_postvideoimage_more + 
  '</div>';
  
}

static async html_Post_TimeLine(getpost,iduserlogin,usernamelogin)
{
   //GET POST
   let userImageProfile=getpost.user.image;
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idpost=getpost.id;
   let likespost=getpost.likes;
   let iduser=getpost.user.iduser;
   let userName=getpost.user.name;
   let stringpostedago=getpost.stringpostedago;
   let description=getpost.description;

 //NUMBER COMMENT POSTS
 
     
      let NumberOfCommentPost=getpost.numbercomments;

      //SHOW EXISTLIKEPOST
     let existLikePost= this.exist_like_post(getpost.existlikeloginuser);

  let html_post=`
  <div class="card lg:mx-0 uk-animation-slide-bottom-small">
               
  <div class="flex justify-between items-center lg:p-4 p-2.5">
     <div class="flex flex-1 items-center space-x-4">
        <a 
        onclick="Head_SidebarJS.passidtoUserProfile('${iduser}');" 
        href="../profileuser/profileuser.html"

        > <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
        <div class="flex-1 font-semibold capitalize">
           <a 
           onclick="Head_SidebarJS.passidtoUserProfile('${iduser}');" 
          href="../profileuser/profileuser.html"

            class="text-black dark:text-gray-100"> ${userName} </a>
           <div class="flex items-center space-x-2">
           <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people" role="img" class="md hydrated" aria-label="people"></ion-icon>
           </div>
        </div>
     </div>
  
  </div>
  <div class="p-5 pt-0 border-b dark:border-gray-700">
    ${description}
  </div>
  <div class="p-4 space-y-3">
     <div class="flex space-x-4 lg:font-bold">
        <button 
        onclick="FeedJS.like_dislike_Post('${idpost}','${iduserlogin}','${usernamelogin}',event);"  
        class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
              <svg
              id="svg_feed_timeline_likepost${idpost}"
               xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="${existLikePost}" 
              width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
           </div>
           <div id="feed_timeline_numberlikespost${idpost}"> ${likespost}</div>
        </button>
        <button 
        onclick="FeedJS.show_comment_posts('${idpost}','${iduserlogin}','${usernamelogin}');"  
         uk-toggle="target: #view-commentspost${idpost}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
              </svg>
           </div>
           <div id="feed_timeline_numbercommentpost${idpost}"> ${NumberOfCommentPost} </div>
        </button>


     </div>
    
     <div hidden id="view-commentspost${idpost}" class="border-t py-4 space-y-4 dark:border-gray-600">
        <div id="feed_commentspost${idpost}">  
    
        <!-- COMMENT -->
        </div>   
     </div> 
      
     <form
     id="form_feed_addCommentPost${idpost}"
     onsubmit="FeedJS.addCommentPost('${idpost}','${iduserlogin}','${usernamelogin}', event);"
     >
     <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
        <input id="feed_textcommentpost${idpost}" required placeholder="Add your Comment.." required required class="bg-transparent max-h-10 shadow-none px-5">
        <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
           <button id="feed_buttonaddcomment_${idpost}" type="submit">
              <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
           </button>
        
        </div>
     </div>
     </form>
  </div>
</div>
<br>
  `;
  return html_post;
}
  static async html_Image_TimeLine(getimage,iduserlogin,usernamelogin)
{
   let userImageProfile=getimage.user.image;
   
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idimage=getimage.id;
   let likeimage=getimage.likes;
   let userName=getimage.user.name;
   let iduser=getimage.user.iduser;
   let stringpostedago=getimage.stringpostedago;
   let urlimage=getimage.url;
   
//NUMBER COMMENT IMAGE
 
//let NumberOfCommentImage=await  APIRESTImageComment.NumberOfCommentImage(idimage);

let NumberOfCommentImage=getimage.numbercomments;

// let forCommentsPost=await this.forCommentsPost(listcommentpost,idpost,iduserlogin,usernamelogin) 
//  ${forCommentsPost}

 //SHOW EXISTLIKEIMAGE


 let exist_like_image= this.exist_like_image(getimage.existlikeloginuser);


  let html_image=`
  <div class="card lg:mx-0 uk-animation-slide-bottom-small">
  <!-- post header-->
  <div class="flex justify-between items-center lg:p-4 p-2.5">
     <div class="flex flex-1 items-center space-x-4">
        <a 
        onclick="Head_SidebarJS.passidtoUserProfile('${iduser}');" 
        href="../profileuser/profileuser.html"
        > <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
        <div class="flex-1 font-semibold capitalize">
           <a 
           onclick="Head_SidebarJS.passidtoUserProfile('${iduser}');" 
           href="../profileuser/profileuser.html"
           class="text-black dark:text-gray-100"> ${userName} </a>
           <div class="flex items-center space-x-2">
           <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people"></ion-icon>
           </div>
        </div>
     </div>
    
  </div>
  <!-- <div uk-lightbox>     -->
     <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
       
              <a href="../images/image_watch.html"
              onclick="Head_SidebarJS.passidtoImageWatch('${idimage}');"
              >
                 <img src="${urlimage}" alt="" uk-responsive>
                 </a>
      
     </div>
 
  <!-- </div> -->
  <div class="p-4 space-y-3">
     <div class="flex space-x-4 lg:font-bold">
        <button 
        onclick="FeedJS.like_dislike_Image('${idimage}','${iduserlogin}','${usernamelogin}',event);"  
         class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg 
              id="svg_feed_timeline_likeimage${idimage}"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" fill="${exist_like_image}"
               width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
           </div>
           <div id="feed_timeline_numberlikesimage${idimage}"> ${likeimage}</div>
        </button>
        <a href=""
        onclick="FeedJS.show_comment_images('${idimage}','${iduserlogin}','${usernamelogin}');"  
         uk-toggle="target: #view-commentsimage${idimage}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
           </div>
           <div id="feed_timeline_numbercommentimage${idimage}"> ${NumberOfCommentImage}</div>
        </a>
      
     </div>
    
     <div hidden id="view-commentsimage${idimage}" class="border-t py-4 space-y-4 dark:border-gray-600">
     <!-- COMMENT -->
     <div id="feed_commentimage${idimage}">  
    
   
     </div>  
 
       
      
    </div> 
    
    <form
    id="form_feed_addCommentImage${idimage}"
    onsubmit="FeedJS.addCommentImage('${idimage}','${iduserlogin}','${usernamelogin}', event);"
    >
    <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
       <input id="feed_textcommentimage${idimage}" placeholder="Add your Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
       <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
          <button id="feed_buttonaddcomment_${idimage}" type="submit">
             <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
          </button>
       
       </div>
    </div>
    </form>
  </div>
</div>
<br>
  `;
  return html_image
  }
  static async html_Video_TimeLine(getvideo,iduserlogin,usernamelogin)
  {
   let userImageProfile=getvideo.user.image;
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idvideo=getvideo.id;
   let likevideo=getvideo.likes;
   let userName=getvideo.user.name;
   let iduser=getvideo.user.iduser;
   let stringpostedago=getvideo.stringpostedago;
   let urlvideo=getvideo.url;

 
  // NUMBER COMMENT VIDEO
 
//let NumberOfCommentVideo=await  APIRESTVideoComment.NumberOfCommentVideo(idvideo);

let NumberOfCommentVideo=getvideo.numbercomments;

//SHOW EXISTLIKEVIDEO

let exist_like_video= this.exist_like_video(getvideo.existlikeloginuser);

//let exist_like_video=getvideo.existlikeloginuser;

    let html_video=`
    <div  class="card lg:mx-0 uk-animation-slide-bottom-small">
    <!-- post header-->
    <div class="flex justify-between items-center lg:p-4 p-2.5">
       <div class="flex flex-1 items-center space-x-4">
          <a 
          onclick="Head_SidebarJS.passidtoUserProfile('${iduser}');" 
          href="../profileuser/profileuser.html"
          > <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
          <div class="flex-1 font-semibold capitalize">
             <a 
             onclick="Head_SidebarJS.passidtoUserProfile('${iduser}');" 
             href="../profileuser/profileuser.html"
              class="text-black dark:text-gray-100"> ${userName} </a>
             <div class="flex items-center space-x-2">
               <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people"></ion-icon>
           </div>
          </div>
       </div>
   
    </div>
    <!-- VIDEO -->
    <div class="w-full h-full">

          <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
         
               <a 
               href="../videos/video_watch.html"
               onclick="Head_SidebarJS.passidtoVideoWatch('${idvideo}');"
               >
                <video src="${urlvideo}" autoplay loop muted playsinline >

                </video>
              
                </a>
             
    </div>
       </div>
    <div class="p-4 space-y-3">
       <div class="flex space-x-4 lg:font-bold">
          <button 
          onclick="FeedJS.like_dislike_Video('${idvideo}','${iduserlogin}','${usernamelogin}',event);"  
          
          class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg 
                id="svg_feed_timeline_likevideo${idvideo}"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="${exist_like_video}"
                 width="22" height="22" class="dark:text-gray-100">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
             </div>
             <div id="feed_timeline_numberlikesvideo${idvideo}" > ${likevideo}</div>
          </button>

          <a href="" 
          onclick="FeedJS.show_comment_videos('${idvideo}','${iduserlogin}','${usernamelogin}');"  
          uk-toggle="target: #view-commentsvideo${idvideo}"
           class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20"
                 fill="gray"
                 width="22" height="22" class="dark:text-gray-100">
                   <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                </svg>
             </div>
             <div id="feed_timeline_numbercommentvideo${idvideo}"> ${NumberOfCommentVideo}</div>
          </a>
          
       </div>
      
       <div hidden id="view-commentsvideo${idvideo}" class="border-t py-4 space-y-4 dark:border-gray-600">
     
       <div id="feed_commentvideo${idvideo}">  
    
   
       </div>  
     
       </div>

       <form
       id="form_feed_addCommentVideo${idvideo}"
       onsubmit="FeedJS.addCommentVideo('${idvideo}','${iduserlogin}','${usernamelogin}', event);"
       >
       <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
          <input id="feed_textcommentvideo${idvideo}" placeholder="Add your Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
          <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
             <button id="feed_buttonaddcomment_${idvideo}" type="submit">
                <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
             </button>
          
          </div>
       </div>
       </form>
    </div>
 </div>
 <br>
    `;
    return html_video
}

//********************************************* */
//#region COMMENTS
//COMMENTS

//SHOW COMMENTS 
static async show_comment_posts(idpost,iduserlogin,usernamelogin)
{
   let listcommentpost=await  APIRESTPostComment.getCommentPostByPost(idpost,
      iduserlogin,usernamelogin);
 let forCommentsPost=await this.forCommentsPost(listcommentpost,idpost,iduserlogin,usernamelogin);
 document.getElementById(`feed_commentspost${idpost}`).innerHTML=forCommentsPost;

}
static async show_comment_images(idimage,iduserlogin,usernamelogin)
{
   let listcommentimage=await  APIRESTImageComment.getCommentImageByImage(idimage,
      iduserlogin,usernamelogin);
 let forCommentImage=await this.forCommentImage(listcommentimage,idimage,iduserlogin,usernamelogin);
 document.getElementById(`feed_commentimage${idimage}`).innerHTML=forCommentImage;
// profileloginuser_commentspost${idpost}
}
static async show_comment_videos(idvideo,iduserlogin,usernamelogin)
{
   let listcommentvideo=await  APIRESTVideoComment.getCommentVideoByVideo(idvideo,
      iduserlogin,usernamelogin);
 let forCommentVideo=await this.forCommentVideo(listcommentvideo,idvideo,iduserlogin,usernamelogin);
 document.getElementById(`feed_commentvideo${idvideo}`).innerHTML=forCommentVideo;
// profileloginuser_commentspost${idpost}
}
//FOR COMMENTS
static async forCommentsPost(listcommentpost,idpost,iduserlogin,username){
   let html_comments_post=""; 
   for (let i = 0; i < listcommentpost.length; i++) {
      const commentpost = listcommentpost[i];
      let idcomment=commentpost.idusercomment ;
      let textcomment=commentpost.textcomment ;
      let stringpostedago=commentpost.stringpostedago;
      let likescomment =commentpost.likescomment;
      let datepublishcomment =commentpost.datepublishcomment;


      //CONVERT FORMAT DATE

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
     
   const exist_like_comment =  this.exist_like_comment(commentpost.existlikeloginuser);
   
  // let show_edit_delete_comment =commentpost.existcommentloginuser;
   let show_edit_delete_comment = this.show_edit_delete_comment(commentpost.existcommentloginuser);
         html_comments_post += `
         <div id="feed_div_listcommentpost${idcomment}" >

               
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">
            <a 
            title="${namecommentuser}"
            onclick="Head_SidebarJS.passidtoUserProfile('${idcommentuser}');" 
            href="../profileuser/profileuser.html"
            >
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </a>
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="feed_p_textcommentpost${idcomment}" class="leading-6">
                  ${textcomment}
                  
                  </p>
                  <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
                  <div ${show_edit_delete_comment} class="ml-auto">
                  <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                     <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                     uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                        <ul class="space-y-1">
                        
                           <li>
                              <a href=""
                              onclick="FeedJS.showtextcommentUpdateModalComment_Post
                              ('${idcomment}','${textcomment}','${idpost}','${iduserlogin}'
                              ,'${username}');"
                              uk-toggle="target: #update_comment_modal" 
                              class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                 <i class="uil-edit-alt mr-1"></i>
                                    Edit  </a>
                           </li>
                     
                           <li>
                              <hr class="-mx-2 my-2 dark:border-gray-800">
                           </li>
                           <li>
                           
                              <a href="" 
                              onclick="FeedJS.showIdDeleteModalComment_Post('${idcomment}',
                              '${iduserlogin}','${username}','${idpost}');"
                              uk-toggle="target: #deletecommentmodal" 
                              class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                                 <i class="uil-trash-alt mr-1"></i> Delete </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               </div>
               <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                  <button 
                  onclick="FeedJS.like_dislike_Comment('${idcomment}',
                    '${iduserlogin}','${username}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="feed_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                     <span id="feed_span_likecomment${idcomment}">${likescomment}</span>
                  

                  </button>
                  <button 
                  onclick="FeedJS.show_subcomment_post('${idcomment}',
                    '${iduserlogin}','${username}');"
                  uk-toggle="target: #view_subcommentpost${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="feed_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentpost${idcomment}" class="flex-col">
            
               <div>
                  <div id="feed_listupdatesubcomments${idcomment}">
                 
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_feed_addSubCommentPost${idcomment}"
           onsubmit="FeedJS.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="feed_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
                  <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                     <button type="submit">
                        <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                     </button>
                  </div>
               </div>
            </div>
            </form>
            <br>
         </div>
      </div>
         `;

  }
  
   return html_comments_post
    }
   static async forCommentImage(listcommentimage,idimage,iduserlogin,username){
      let html_comment_image="";
      for (let i = 0; i < listcommentimage.length; i++) {
         const commentimage = listcommentimage[i];
         let idcomment=commentimage.IdUserComment  ;
         let textcomment=commentimage.Textt  ;
         let stringpostedago=commentimage.stringpostedago;
         let likescomment =commentimage.Likes;
         let datepublishcomment =commentimage.datepublishcomment;
   
   
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
         let NumberOfSubComments=commentimage.numbersubcomment;
         // let NumberOfSubComments=await APIRESTSubComment.NumberOfSubComments
         // (idcomment);

      //const exist_like_comment = commentpost.existlikeloginuser;
      const exist_like_comment =  this.exist_like_comment(commentimage.existlikeloginuser);
      
     // let show_edit_delete_comment =commentpost.existcommentloginuser;
      let show_edit_delete_comment = this.show_edit_delete_comment(commentimage.existcommentloginuser);

         html_comment_image += `
         <div id="feed_div_listcommentimage${idcomment}" >

               
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">

               <a 
            title="${namecommentuser}"
            onclick="Head_SidebarJS.passidtoUserProfile('${idcommentuser}');" 
            href="../profileuser/profileuser.html">
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </a>
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="feed_p_textcommentimage${idcomment}" class="leading-6">
                  ${textcomment}
                  
                  </p>
                  <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
                  <div ${show_edit_delete_comment} class="ml-auto">
                  <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                     <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                     uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                        <ul class="space-y-1">
                        
                           <li>
                              <a href=""
                              onclick="FeedJS.showtextcommentUpdateModalComment_Image
                              ('${idcomment}','${textcomment}','${idimage}','${iduserlogin}'
                              ,'${username}');"
                              uk-toggle="target: #update_comment_modalImage" 
                              class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                 <i class="uil-edit-alt mr-1"></i>
                                    Edit  </a>
                           </li>
                     
                           <li>
                              <hr class="-mx-2 my-2 dark:border-gray-800">
                           </li>
                           <li>
                           
                              <a href="" 
                              onclick="FeedJS.showIdDeleteModalComment_Image('${idcomment}',
                              '${iduserlogin}','${username}','${idimage}');"
                              uk-toggle="target: #deletecommentmodalImage" 
                              class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                                 <i class="uil-trash-alt mr-1"></i> Delete </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               </div>
               <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                  <button 
                  onclick="FeedJS.like_dislike_Comment('${idcomment}',
                    '${iduserlogin}','${username}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="feed_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                     <span id="feed_span_likecomment${idcomment}">${likescomment}</span>
                  

                  </button>
                  <button 
                  onclick="FeedJS.show_subcomment_post('${idcomment}',
                    '${iduserlogin}','${username}');"
                  uk-toggle="target: #view_subcommentimage${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="feed_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentimage${idcomment}" class="flex-col">
            
               <div>
                  <div id="feed_listupdatesubcomments${idcomment}">
                 
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_feed_addSubCommentPost${idcomment}"
           onsubmit="FeedJS.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="feed_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
                  <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                     <button type="submit">
                        <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                     </button>
                  </div>
               </div>
            </div>
            </form>
            <br>
         </div>
      </div>
         `;
     }
      return html_comment_image
  }
  static async forCommentVideo(listcommentvideos,idvideo,iduserlogin,username){
   let html_comment_video="";
   for (let i = 0; i < listcommentvideos.length; i++) {
      const commentvideo = listcommentvideos[i];
      let idcomment=commentvideo.idusercomment ;
      let textcomment=commentvideo.textcomment;
      let stringpostedago=commentvideo.stringpostedago;
      let likescomment =commentvideo.likescomment ;
      let datepublishcomment =commentvideo.datepublishcomment;


      //CONVERT FORMAT DATE

      const dt = new Date(datepublishcomment);
      const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      //USER
      let idcommentuser  =commentvideo.idcommentuser ;
      let namecommentuser  =commentvideo.namecommentuser ;
      let imagecommentuser  =commentvideo.imagecommentuser ;
      if (imagecommentuser==="") {
        imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      let NumberOfSubComments=commentvideo.numbersubcomment;
            // let NumberOfSubComments=await APIRESTSubComment.NumberOfSubComments
            // (idcomment);
   
         //const exist_like_comment = commentpost.existlikeloginuser;
         const exist_like_comment =  this.exist_like_comment(commentvideo.existlikeloginuser);
         
        // let show_edit_delete_comment =commentpost.existcommentloginuser;
         let show_edit_delete_comment = this.show_edit_delete_comment(commentvideo.existcommentloginuser);
      html_comment_video += `
      <div id="feed_div_listcommentvideo${idcomment}" >

         
      <div class="flex">
         <div class="w-10 h-10 rounded-full relative flex-shrink-0">
         
         <a 
         title="${namecommentuser}"
         onclick="Head_SidebarJS.passidtoUserProfile('${idcommentuser}');" 
         href="../profileuser/profileuser.html">
            <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
            </a>
            </div>
         <div >
            <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
            <div class="flex">
            <p id="feed_p_textcommentvideo${idcomment}" class="leading-6">
               ${textcomment}
               
               </p>
               <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
               <div ${show_edit_delete_comment} class="ml-auto">
               <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                  <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                  uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                     <ul class="space-y-1">
                     
                        <li>
                           <a href=""
                           onclick="FeedJS.showtextcommentUpdateModalComment_Video
                           ('${idcomment}','${textcomment}','${idvideo}','${iduserlogin}'
                           ,'${username}');"
                           uk-toggle="target: #update_comment_modalVideo" 
                           class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                              <i class="uil-edit-alt mr-1"></i>
                                 Edit  </a>
                        </li>
                  
                        <li>
                           <hr class="-mx-2 my-2 dark:border-gray-800">
                        </li>
                        <li>
                        
                           <a href="" 
                           onclick="FeedJS.showIdDeleteModalComment_Video('${idcomment}',
                           '${iduserlogin}','${username}','${idvideo}');"
                           uk-toggle="target: #deletecommentmodalVideo" 
                           class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                              <i class="uil-trash-alt mr-1"></i> Delete </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            </div>
            <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
               <button 
               onclick="FeedJS.like_dislike_Comment('${idcomment}',
                 '${iduserlogin}','${username}',event);"
                class="text-black-600">
              
                  <iconify-icon id="feed_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                  <span id="feed_span_likecomment${idcomment}">${likescomment}</span>
               

               </button>
               <button 
               onclick="FeedJS.show_subcomment_post('${idcomment}',
                 '${iduserlogin}','${username}');"
               uk-toggle="target: #view_subcommentvideo${idcomment}" >
                  <iconify-icon icon="akar-icons:comment"></iconify-icon>
                  <span id="feed_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                  
               </button>
               <span> ${stringpostedago} </span> 
            </div>
         </div>
      </div>
      <br>
      <!-- SUBCOMMENTS -->
      <div hidden id="view_subcommentvideo${idcomment}" class="flex-col">
         
            <div>
               <div id="feed_listupdatesubcomments${idcomment}">
              
               </div>
            </div>
         <!-- SEND MESSAGE INPUT -->
         <form 
         id="form_feed_addSubCommentPost${idcomment}"
        onsubmit="FeedJS.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
        >
         <div class="flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
            <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input id="feed_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
               <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                  <button type="submit">
                     <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                  </button>
               </div>
            </div>
         </div>
         </form>
         <br>
      </div>
   </div>
     `;
  }
   return html_comment_video;
    }

    // SHOW EDIT DELETE COMMENT
 static show_edit_delete_comment=(existcommentpost)=>
    {
      let hidden="";
     // let existLikeComment=await APIRESTPostComment.existCommentPost(idpost,idcomment,iduserlogin,userrname);
      if (existcommentpost) {
        hidden="";
      } else {
        hidden="hidden"  
      }
      return hidden;
    }
static show_edit_delete_commentImage=(existcommentimage)=>
    {
      let hidden="";
      //let existLikeComment=await APIRESTImageComment.existCommentImage(idimage,idcomment,iduserlogin,userrname);
      if (existcommentimage) {
        hidden="";
      } else {
        hidden="hidden"  
      }
      return hidden;
}
static show_edit_delete_commentVideo=(existcommentvideo)=>
    {
      let hidden="";
     // let existLikeComment=await APIRESTVideoComment.existCommentVideo(idvideo,idcomment,iduserlogin,userrname);
      if (existcommentvideo) {
        hidden="";
      } else {
        hidden="hidden"  
      }
      return hidden;
}


//ADD COMMENT
static addCommentPost=async(idpost,iduserlogin,usernamelogin,event)=>
  {
    try {
      event.preventDefault();
     const textcomment = document.getElementById(`feed_textcommentpost${idpost}`).value;

     const commentPost= await APIRESTPostComment.commentPost(idpost,
      textcomment,iduserlogin,usernamelogin);
       if (commentPost) {

           //#region REAL TIME NOTIFICATION

           var ably = new Ably.Realtime('rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A');
           const commentsnotificationChannelName = `comments_user_notificationsP`;
           const commentsnotificationChannel = ably.channels.get(commentsnotificationChannelName);
           const commentsnotificationRequestMessage = { name: `comments_user_notifications_messageP` };
           commentsnotificationChannel.publish(commentsnotificationRequestMessage);
           
           //#endregion REAL TIME NOTIFICATION 

         messagenotification('Comment Added','success',event);
         await this.showAddedCommentPost(idpost,iduserlogin,usernamelogin);
       document.getElementById(`feed_textcommentpost${idpost}`).value="";
      }
  }catch (error) {
    alert(error);
  }
  }
  static addCommentImage=async(idimage,iduserlogin,usernamelogin,event)=>
  {
    try {
      event.preventDefault();
     const textcomment = document.getElementById(`feed_textcommentimage${idimage}`).value;

     const commmentImage= await APIRESTImageComment.commmentImage(idimage,
      textcomment,iduserlogin,usernamelogin);
       if (commmentImage) {

          //#region REAL TIME NOTIFICATION 

          var ably = new Ably.Realtime('rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A');
          const commentsnotificationChannelName = `comments_user_notificationsI`;
          const commentsnotificationChannel = ably.channels.get(commentsnotificationChannelName);
          const commentsnotificationRequestMessage = { name: `comments_user_notifications_messageI` };
          commentsnotificationChannel.publish(commentsnotificationRequestMessage);
         
          //#endregion REAL TIME NOTIFICATION 

       messagenotification('Comment Added','success',event);

      await this.showAddedCommentImage(idimage,iduserlogin,usernamelogin);
      
       document.getElementById(`feed_textcommentimage${idimage}`).value="";
      }
  }catch (error) {
    alert(error);
  }
  }
  static addCommentVideo=async(idvideo,iduserlogin,usernamelogin,event)=>
  {
    try {
      event.preventDefault();
     const textcomment = document.getElementById(`feed_textcommentvideo${idvideo}`).value;

     const commmentVideo= await APIRESTVideoComment.commmentVideo(idvideo,
      textcomment,iduserlogin,usernamelogin);
       if (commmentVideo) {

             //#region REAL TIME NOTIFICATION

             var ably = new Ably.Realtime('rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A');
             const commentsnotificationChannelName = `comments_user_notificationsV`;
             const commentsnotificationChannel = ably.channels.get(commentsnotificationChannelName);
             const commentsnotificationRequestMessage = { name: `comments_user_notifications_messageV` };
             commentsnotificationChannel.publish(commentsnotificationRequestMessage);
             
             //#endregion REAL TIME NOTIFICATION 
         messagenotification('Comment Added','success',event);

         await this.showAddedCommentVideo(idvideo,iduserlogin,usernamelogin);
         
         document.getElementById(`feed_textcommentvideo${idvideo}`).value="";
      }
  }
  catch (error) {
    alert(error);
  }
  }    
  
  //UPDATE COMMENT

static updateCommentPost=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("feed_idcomment_updatecomment").value;
 let idpost=document.getElementById("feed_idpost_updatecomment").value;
 let iduserlogin=document.getElementById("feed_iduserlogin_updatecomment").value;
 let usernamelogin=document.getElementById("feed_usernamelogin_updatecomment").value;
const textcomment = document.getElementById('feed_text_updatecomment').value;

const editcommentPost= await APIRESTPostComment.editcommentPost(idcomment,idpost,
 textcomment,iduserlogin,usernamelogin);
if (editcommentPost) {

  messagenotification('Comment Updated','success',event);

this.showUpdatedCommentPost(idcomment,textcomment);
  


  document.getElementById('feed_text_updatecomment').value="";
 }
}catch (error) {
alert(error);
}
}   
static updateCommentImage=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("feed_idcomment_updatecommentImage").value;
 let idimage=document.getElementById("feed_idimage_updatecommentImage").value;
 let iduserlogin=document.getElementById("feed_iduserlogin_updatecommentImage").value;
 let usernamelogin=document.getElementById("feed_usernamelogin_updatecommentImage").value;
const textcomment = document.getElementById('feed_text_updatecommentImage').value;

const editcommentImage= await APIRESTImageComment.editcommentImage(idcomment,idimage,
 textcomment,iduserlogin,usernamelogin);
if (editcommentImage) {

  messagenotification('Comment Updated','success',event);

this.showUpdatedCommentImage(idcomment,textcomment);
  


  document.getElementById('feed_text_updatecommentImage').value="";
 }
}catch (error) {
alert(error);
}
}  
static updateCommentVideo=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("feed_idcomment_updatecommentVideo").value;
 let idvideo=document.getElementById("feed_idvideo_updatecommentVideo").value;
 let iduserlogin=document.getElementById("feed_iduserlogin_updatecommentVideo").value;
 let usernamelogin=document.getElementById("feed_usernamelogin_updatecommentVideo").value;
const textcomment = document.getElementById('feed_text_updatecommentVideo').value;

const editcommentVideo= await APIRESTVideoComment.editcommentVideo(idcomment,idvideo,
 textcomment,iduserlogin,usernamelogin);
if (editcommentVideo) {

  messagenotification('Comment Updated','success',event);

this.showUpdatedCommentVideo(idcomment,textcomment);
  


 //  setInterval(() => {
 //   location.reload();
 //  }, 1000);
  document.getElementById('feed_text_updatecommentVideo').value="";
 }
}catch (error) {
alert(error);
}
}



//DELETE COMMENT  
static deleteCommentPost=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("feed_idcomment_deletecommentmodal").value;
 let idpost=document.getElementById("feed_idpost_deletecommentmodal").value;
 let iduserlogin=document.getElementById("feed_iduserlogin_deletecommentmodal").value;
 let usernamelogin=document.getElementById("feed_usernamelogin_deletecommentmodal").value;


const deletecommentPost= await APIRESTPostComment.deletecommentPost(idcomment,idpost,
   iduserlogin,usernamelogin);
if (deletecommentPost) {

  messagenotification('Comment Deleted','success',event);

 this.showRemoveCommentPost(idpost,idcomment);
  

 
 }
}catch (error) {
alert(error);
}
}
static deleteCommentImage=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("feed_idcomment_deletecommentmodalImage").value;
 let idimage=document.getElementById("feed_idimage_deletecommentmodalImage").value;
 let iduserlogin=document.getElementById("feed_iduserlogin_deletecommentmodalImage").value;
 let usernamelogin=document.getElementById("feed_usernamelogin_deletecommentmodalImage").value;


const deletecommentImage= await APIRESTImageComment.deletecommentImage(idcomment,idimage,
   iduserlogin,usernamelogin);
if (deletecommentImage) {

  messagenotification('Comment Deleted','success',event);

 this.showRemoveCommentImage(idimage,idcomment);
  

 
 }
}catch (error) {
alert(error);
}
}
static deleteCommentVideo=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("feed_idcomment_deletecommentmodalVideo").value;
 let idvideo=document.getElementById("feed_idvideo_deletecommentmodalVideo").value;
 let iduserlogin=document.getElementById("feed_iduserlogin_deletecommentmodalVideo").value;
 let usernamelogin=document.getElementById("feed_usernamelogin_deletecommentmodalVideo").value;

const deletecommentVideo= await APIRESTVideoComment.deletecommentVideo(idcomment,idvideo,
   iduserlogin,usernamelogin);
if (deletecommentVideo) {

  messagenotification('Comment Deleted','success',event);

 this.showRemoveCommentVideo(idvideo,idcomment);
  

 
 }
}catch (error) {
alert(error);
}
}
//SHOW COMMENT AFTER ADD

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
     let stringpostedago=commentpost.stringpostedago;
     //CONVERT FORMAT DATE

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
    


     let html_comments_post = `
      <div id="feed_div_listcommentpost${idcomment}" >

            
      <div class="flex">
         <div class="w-10 h-10 rounded-full relative flex-shrink-0">
            <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
            </div>
         <div >
            <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
            <div class="flex">
            <p id="feed_p_textcommentpost${idcomment}" class="leading-6">
               ${textcomment}
               
               </p>
               <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
               <div  class="ml-auto">
               <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                  <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                  uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                     <ul class="space-y-1">
                     
                        <li>
                           <a href=""
                           onclick="FeedJS.showtextcommentUpdateModalComment_Post
                           ('${idcomment}','${textcomment}','${idpost}','${iduser}'
                           ,'${userrname}');"
                           uk-toggle="target: #update_comment_modal" 
                           class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                              <i class="uil-edit-alt mr-1"></i>
                                 Edit  </a>
                        </li>
                  
                        <li>
                           <hr class="-mx-2 my-2 dark:border-gray-800">
                        </li>
                        <li>
                        
                           <a href="" 
                           onclick="FeedJS.showIdDeleteModalComment_Post('${idcomment}',
                           '${iduser}','${userrname}','${idpost}');"
                           uk-toggle="target: #deletecommentmodal" 
                           class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                              <i class="uil-trash-alt mr-1"></i> Delete </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            </div>
            <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
               <button 
               onclick="FeedJS.like_dislike_Comment('${idcomment}',
                 '${iduser}','${userrname}',event);"
                class="text-black-600">
              
                  <iconify-icon id="feed_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                  <span id="feed_span_likecomment${idcomment}">${likescomment}</span>
               
                 
           
                  
               </button>
               <button uk-toggle="target: #view_subcommentpost${idcomment}" >
                  <iconify-icon icon="akar-icons:comment"></iconify-icon>
                  <span id="feed_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                  
               </button>
               <span> ${stringpostedago} </span> 
            </div>
         </div>
      </div>
      <br>
      <!-- SUBCOMMENTS -->
      <div hidden id="view_subcommentpost${idcomment}" class="flex-col">
         
            <div>
               <div id="feed_listupdatesubcomments${idcomment}">
               
               </div>
            </div>
         <!-- SEND MESSAGE INPUT -->
         <form 
         id="form_feed_addSubCommentPost${idcomment}"
        onsubmit="FeedJS.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
        >
         <div class="flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
            <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input id="feed_textsubcommentpost${idcomment}" placeholder="Reply Comment.." required  class="bg-transparent max-h-10 shadow-none px-5">
               <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                  <button type="submit">
                     <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                  </button>
               </div>
            </div>
         </div>
         </form>
         <br>
      </div>
   </div>
      `;
 
let feed_commentspost= document.getElementById(`feed_commentspost${idpost}`);

feed_commentspost.parentNode.insertAdjacentHTML("beforeend", html_comments_post);


//NUMBER COMMENT 
let NumberOfComment=listcommentpost.length;
document.getElementById(`feed_timeline_numbercommentpost${idpost}`).innerHTML=`${NumberOfComment}`;

}
static  showAddedCommentImage=async(idimage,iduser,userrname)=>
{
 let listcommentimage=await  APIRESTImageComment.getCommentImageByImage(idimage,
   iduser,userrname);
   let lastcommentimage = listcommentimage[listcommentimage.length - 1];
   const commentimage = lastcommentimage;
   let idcomment=commentimage.IdUserComment  ;
   let textcomment=commentimage.Textt  ;
   let stringpostedago=commentimage.stringpostedago;
   let likescomment =commentimage.Likes;
   let datepublishcomment =commentimage.datepublishcomment;


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
  
      let numberofsubcomments=0;
    


     let html_comments_image = `
      <div id="feed_div_listcommentimage${idcomment}" >

            
      <div class="flex">
         <div class="w-10 h-10 rounded-full relative flex-shrink-0">
            <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
            </div>
         <div >
            <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
            <div class="flex">
            <p id="feed_p_textcommentimage${idcomment}" class="leading-6">
               ${textcomment}
               
               </p>
               <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
               <div  class="ml-auto">
               <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                  <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                  uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                     <ul class="space-y-1">
                     
                        <li>
                           <a href=""
                           onclick="FeedJS.showtextcommentUpdateModalComment_Image
                           ('${idcomment}','${textcomment}','${idimage}','${iduser}'
                           ,'${userrname}');"
                           uk-toggle="target: #update_comment_modalImage" 
                           class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                              <i class="uil-edit-alt mr-1"></i>
                                 Edit  </a>
                        </li>
                  
                        <li>
                           <hr class="-mx-2 my-2 dark:border-gray-800">
                        </li>
                        <li>
                        
                           <a href="" 
                           onclick="FeedJS.showIdDeleteModalComment_Image('${idcomment}',
                           '${iduser}','${userrname}','${idimage}');"
                           uk-toggle="target: #deletecommentmodalImage" 
                           class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                              <i class="uil-trash-alt mr-1"></i> Delete </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            </div>
            <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
               <button 
               onclick="FeedJS.like_dislike_Comment('${idcomment}',
                 '${iduser}','${userrname}',event);"
                class="text-black-600">
              
                  <iconify-icon id="feed_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                  <span id="feed_span_likecomment${idcomment}">${likescomment}</span>
               
                 
           
                  
               </button>
               <button uk-toggle="target: #view_subcommentimage${idcomment}" >
                  <iconify-icon icon="akar-icons:comment"></iconify-icon>
                  <span id="feed_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                  
               </button>
               <span> ${stringpostedago} </span> 
            </div>
         </div>
      </div>
      <br>
      <!-- SUBCOMMENTS -->
      <div hidden id="view_subcommentimage${idcomment}" class="flex-col">
         
            <div>
               <div id="feed_listupdatesubcomments${idcomment}">
               
               </div>
            </div>
         <!-- SEND MESSAGE INPUT -->
         <form 
         id="form_feed_addSubCommentPost${idcomment}"
        onsubmit="FeedJS.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
        >
         <div class="flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
            <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input id="feed_textsubcommentpost${idcomment}" required placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
               <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                  <button type="submit">
                     <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                  </button>
               </div>
            </div>
         </div>
         </form>
         <br>
      </div>
   </div>
      `;
 //  //SHOW EXISTLIKECOMMENT
 //  let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,sessionuser.iduser,sessionuser.userrname);


 //  if(existLikeComment)
 //  {
 //    document.getElementById("svg_postwatch_likecomment").setAttribute("fill","black");
 //  }


let profileuser_commentsimage= document.getElementById(`feed_commentimage${idimage}`);

profileuser_commentsimage.parentNode.insertAdjacentHTML("beforeend", html_comments_image);


//NUMBER COMMENT 
let NumberOfComment=listcommentimage.length;
document.getElementById(`feed_timeline_numbercommentimage${idimage}`).innerHTML=`${NumberOfComment}`;

}
static  showAddedCommentVideo=async(idvideo,iduser,userrname)=>
{
 let listcommentvideo=await  APIRESTVideoComment.getCommentVideoByVideo(idvideo,
   iduser,userrname);
   let lastcommentvideo = listcommentvideo[listcommentvideo.length - 1];
   const commentvideo = lastcommentvideo;
         let idcomment=commentvideo.idusercomment ;
         let textcomment=commentvideo.textcomment;
   
         let likescomment =commentvideo.likescomment ;
         let datepublishcomment =commentvideo.datepublishcomment;
         let stringpostedago=commentvideo.stringpostedago;
   
         //CONVERT FORMAT DATE
   
         const dt = new Date(datepublishcomment);
         const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
   
         //USER
         let idcommentuser  =commentvideo.idcommentuser ;
         let namecommentuser  =commentvideo.namecommentuser ;
         let imagecommentuser  =commentvideo.imagecommentuser ;
         if (imagecommentuser==="") {
           imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
         }
      let numberofsubcomments=0;
    


     let html_comment_video = `
     <div id="feed_div_listcommentvideo${idcomment}" >

            
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="feed_p_textcommentvideo${idcomment}" class="leading-6">
                  ${textcomment}
                  
                  </p>
                  <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
                  <div  class="ml-auto">
                  <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                     <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                     uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                        <ul class="space-y-1">
                        
                           <li>
                              <a href=""
                              onclick="FeedJS.showtextcommentUpdateModalComment_Video
                              ('${idcomment}','${textcomment}','${idvideo}','${iduser}'
                              ,'${userrname}');"
                              uk-toggle="target: #update_comment_modalVideo" 
                              class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                 <i class="uil-edit-alt mr-1"></i>
                                    Edit  </a>
                           </li>
                     
                           <li>
                              <hr class="-mx-2 my-2 dark:border-gray-800">
                           </li>
                           <li>
                           
                              <a href="" 
                              onclick="FeedJS.showIdDeleteModalComment_Video('${idcomment}',
                              '${iduser}','${userrname}','${idvideo}');"
                              uk-toggle="target: #deletecommentmodalVideo" 
                              class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                                 <i class="uil-trash-alt mr-1"></i> Delete </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               </div>
               <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                  <button 
                  onclick="FeedJS.like_dislike_Comment('${idcomment}',
                    '${iduser}','${userrname}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="feed_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                     <span id="feed_span_likecomment${idcomment}">${likescomment}</span>
                  

                  </button>
                  <button 
                  onclick="FeedJS.show_subcomment_post('${idcomment}',
                    '${iduser}','${userrname}');"
                  uk-toggle="target: #view_subcommentvideo${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="feed_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentvideo${idcomment}" class="flex-col">
            
               <div>
                  <div id="feed_listupdatesubcomments${idcomment}">
                 
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_feed_addSubCommentPost${idcomment}"
           onsubmit="FeedJS.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="feed_textsubcommentpost${idcomment}" placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
                  <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                     <button type="submit">
                        <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                     </button>
                  </div>
               </div>
            </div>
            </form>
            <br>
         </div>
      </div>
      `;
 //  //SHOW EXISTLIKECOMMENT
 //  let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,sessionuser.iduser,sessionuser.userrname);


 //  if(existLikeComment)
 //  {
 //    document.getElementById("svg_postwatch_likecomment").setAttribute("fill","black");
 //  }


let feed_commentvideo= document.getElementById(`feed_commentvideo${idvideo}`);

feed_commentvideo.parentNode.insertAdjacentHTML("beforeend", html_comment_video);


//NUMBER COMMENT 
let NumberOfComment=listcommentvideo.length;
document.getElementById(`feed_timeline_numbercommentvideo${idvideo}`).innerHTML=`${NumberOfComment}`;

}
//SHOW COMMENT AFTER UPDATE

static  showUpdatedCommentPost(idcomment,textcomment) {
document.getElementById(`feed_p_textcommentpost${idcomment}`).innerHTML=textcomment;
}
static  showUpdatedCommentImage(idcomment,textcomment) {
document.getElementById(`feed_p_textcommentimage${idcomment}`).innerHTML=textcomment;
}
static  showUpdatedCommentVideo(idcomment,textcomment) {
document.getElementById(`feed_p_textcommentvideo${idcomment}`).innerHTML=textcomment;
}

//SHOW COMMENT AFTER DELETE
static  showRemoveCommentPost(idpost,idcomment) {
//ADD NUMBER COMMENTS HTML
let textcontent_numbercomments= document.getElementById(`feed_timeline_numbercommentpost${idpost}`);
let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
let numcomments=Number(stringnumcomments);
textcontent_numbercomments.innerHTML=`${numcomments-1}`;

document.getElementById(`feed_div_listcommentpost${idcomment}`).remove();
}
static  showRemoveCommentImage(idimage,idcomment) {
//ADD NUMBER COMMENTS HTML
let textcontent_numbercomments= document.getElementById(`feed_timeline_numbercommentimage${idimage}`);
let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
let numcomments=Number(stringnumcomments);
textcontent_numbercomments.innerHTML=`${numcomments-1}`;

document.getElementById(`feed_div_listcommentimage${idcomment}`).remove();
}
static  showRemoveCommentVideo(idvideo,idcomment) {
//ADD NUMBER COMMENTS HTML
let textcontent_numbercomments= document.getElementById(`feed_timeline_numbercommentvideo${idvideo}`);
let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
let numcomments=Number(stringnumcomments);
textcontent_numbercomments.innerHTML=`${numcomments-1}`;

document.getElementById(`feed_div_listcommentvideo${idcomment}`).remove();
}


//SHOW INFORMATION UPDATE COMMENT MODAL

static  showtextcommentUpdateModalComment_Image=(idcomment,textcomment,idimage,iduserlogin,username)=>
{
document.getElementById("feed_idcomment_updatecommentImage").value=idcomment;
document.getElementById("feed_idimage_updatecommentImage").value=idimage;
document.getElementById("feed_iduserlogin_updatecommentImage").value=iduserlogin;
document.getElementById("feed_usernamelogin_updatecommentImage").value=username;
document.getElementById('feed_text_updatecommentImage').value=textcomment;

}
static  showtextcommentUpdateModalComment_Post=async(idcomment,textcomment,idpost,iduserlogin,username)=>
{

document.getElementById('feed_idcomment_updatecomment').value=idcomment;
document.getElementById('feed_iduserlogin_updatecomment').value=iduserlogin;
document.getElementById('feed_usernamelogin_updatecomment').value=username;
document.getElementById('feed_text_updatecomment').value=textcomment;
document.getElementById('feed_idpost_updatecomment').value=idpost;



}
static  showtextcommentUpdateModalComment_Video=async(idcomment,textcomment,idvideo,iduserlogin,username)=>
{
document.getElementById('feed_idcomment_updatecommentVideo').value=idcomment;
document.getElementById('feed_iduserlogin_updatecommentVideo').value=iduserlogin;
document.getElementById('feed_usernamelogin_updatecommentVideo').value=username;
document.getElementById('feed_text_updatecommentVideo').value=textcomment;
document.getElementById('feed_idvideo_updatecommentVideo').value=idvideo;

}
//SHOW INFORMATION DELETE  COMMENT MODAL

static showIdDeleteModalComment_Post=async(idcomment,iduserlogin,usernamelogin,idpost)=>
{
document.getElementById('feed_idcomment_deletecommentmodal').value=idcomment;
document.getElementById('feed_iduserlogin_deletecommentmodal').value=iduserlogin;
document.getElementById('feed_usernamelogin_deletecommentmodal').value=usernamelogin;
document.getElementById('feed_idpost_deletecommentmodal').value=idpost;
}
static showIdDeleteModalComment_Image=async(idcomment,iduserlogin,usernamelogin,idimage)=>
{
document.getElementById('feed_idcomment_deletecommentmodalImage').value=idcomment;
document.getElementById('feed_iduserlogin_deletecommentmodalImage').value=iduserlogin;
document.getElementById('feed_usernamelogin_deletecommentmodalImage').value=usernamelogin;
document.getElementById('feed_idimage_deletecommentmodalImage').value=idimage;
}
static showIdDeleteModalComment_Video=async(idcomment,iduserlogin,usernamelogin,idvideo)=>
{
document.getElementById('feed_idcomment_deletecommentmodalVideo').value=idcomment;
document.getElementById('feed_iduserlogin_deletecommentmodalVideo').value=iduserlogin;
document.getElementById('feed_usernamelogin_deletecommentmodalVideo').value=usernamelogin;
document.getElementById('feed_idvideo_deletecommentmodalVideo').value=idvideo;
}
//********************************************************* */
// SUBCOMMENTS
static async show_subcomment_post(idcomment,iduserlogin,usernamelogin)
{
   let listsubcommentpost=await APIRESTSubComment.getSubCommentByComment(
         iduserlogin,
         idcomment);

 let forSubCommentPost=await this.forSubCommentPost(listsubcommentpost,idcomment,iduserlogin,usernamelogin);
 document.getElementById(`feed_listupdatesubcomments${idcomment}`).innerHTML=forSubCommentPost;
// profileloginuser_commentspost${idpost}
}
static forSubCommentPost=async(listsubcommentpost,idcomment,iduser,userrname)=>
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
        const exist_like_subcomment =  this.exist_like_subcomment(subcommentpost.existlikeloginuser);
        
        let show_edit_delete_subcomment = this.show_edit_delete_subcomment(subcommentpost.existsubcommentloginuser);

        html_subcomments_posts+=`
        <div id="feed_div_subcomment${idsubusercomment}">

        <div  class="flex">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div class="w-7 h-7 rounded-full relative flex-shrink-0"> 
        <a 
        title="${namesubcommentuser}"
        onclick="FeedJS.passidtoUserProfile('${idsubcommentuser}');" 
        href="../profileuser/profileuser.html">
           <img src="${imagesubcommentuser}" alt=""
              class="absolute h-full rounded-full w-full">
              </a>
        </div>
        <div>
           <div style="text-align: center;">
           <div class="flex">
              <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
                 <label style="text-align: center;" >
                 <small id="feed_small_textsubcommentpost${idsubusercomment}"   class="leading-6"> 
                  ${textsubcomment}
                 </small>
                 </label>
                 <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
              </div>
              <div ${show_edit_delete_subcomment}>
              <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                   <ul class="space-y-1">
                     
                      <li>
                         <a href=""
                       
                         onclick="FeedJS.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}','${iduser}','${userrname}');"
                          uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                             <i class="uil-edit-alt mr-1"></i>
                              Edit  </a>
                      </li>
                
                      <li>
                         <hr class="-mx-2 my-2 dark:border-gray-800">
                      </li>
                      <li>
                         <a href=""
                         onclick="FeedJS.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}','${iduser}','${userrname}');"
                          uk-toggle="target: #deletesubcommentmodal" class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                             <i class="uil-trash-alt mr-1"></i> Delete </a>
                      </li>
                   </ul>
                </div>
              </div>
              </div>
              <div class="text-xs flex items-center space-x-3 mt-2 ml-5">
                 <button  
                 onclick="FeedJS.like_dislike_SubComment('${idcomment}','${idsubusercomment}',
                    '${iduser}','${userrname}',event);"
                 class="text-black-600">
                  
                 
                 <iconify-icon id="feed_icon_likesubcomment${idsubusercomment}" icon="ant-design:like-${exist_like_subcomment}"></iconify-icon>               
                 <span id="feed_span_likesubcomment${idsubusercomment}">${likessubcomment}</span>
                    <!-- Like  -->
                 </button>
                 <span>${stringpostedagosubcomment}</span>
              </div>
           </div>
           <br>
        </div>
        </div>
        </div>
           `;
  }
  return html_subcomments_posts;
  
  
  }
   //ADD SUBCOMMENT
   static addSubComment=async(idcomment,iduserlogin,usernamelogin,event)=>
   {
     try {
       event.preventDefault();
    
      const textsubcomment = document.getElementById(`feed_textsubcommentpost${idcomment}`).value;
  
      const addSubComment= await APIRESTSubComment.addSubComment
      (idcomment,
        textsubcomment,iduserlogin,usernamelogin);
      if (addSubComment) {
    

            //#region REAL TIME NOTIFICATION

            var ably = new Ably.Realtime('rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A');
            const commentsnotificationChannelName = `comments_user_notificationsSubComment`;
            const commentsnotificationChannel = ably.channels.get(commentsnotificationChannelName);
            const commentsnotificationRequestMessage = { name: `comments_user_notifications_messageSubComment` };
            commentsnotificationChannel.publish(commentsnotificationRequestMessage);
            
            //#endregion REAL TIME NOTIFICATION 

        messagenotification('Added comment answer','success',event);
  
        await this.showAddedSubComment(idcomment,iduserlogin,usernamelogin);
        
       //await this.loadSubCommentPost(idcomment,sessionuser.iduser);
        
    
  
       //  setInterval(() => {
       //   location.reload();a
       //  }, 1000);
        document.getElementById(`feed_textsubcommentpost${idcomment}`).value="";
       }
   }catch (error) {
     alert(error);
   }
   } 
   //SHOW SUBCOMMENT AFTER ADD UPDATE REMOVE

static async showAddedSubComment(idcomment,iduser,userrname) {
   let listsubcomment = await APIRESTSubComment.getSubCommentByComment(iduser, idcomment);
   let subcommentpost = listsubcomment[listsubcomment.length - 1];

   let idsubusercomment = subcommentpost.idsubusercomment;
   let textsubcomment = subcommentpost.textsubcomment;
   let likessubcomment = subcommentpost.likessubcomment;
   let datepublishsubcomment = subcommentpost.datepublishsubcomment;
   let stringpostedagosubcomment= subcommentpost.stringpostedagosubcomment; 
   //CONVERT FORMAT DATE
   const dt = new Date(datepublishsubcomment);
   const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

   //USER
   let idsubcommentuser  =subcommentpost.idsubcommentuser;
   let namesubcommentuser = subcommentpost.namesubcommentuser;
   let imagesubcommentuser = subcommentpost.imagesubcommentuser;

   if (imagesubcommentuser === "") {
     imagesubcommentuser = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   // const svgfill_existlikesubcomment =await this.svgfill_existlikesubcomment(idsubusercomment, iduser, userrname);
   //     let show_edit_delete_subcomment =await this.show_edit_delete_subcomment(idsubusercomment,iduser,userrname);
   let html_subcomment = `
   <div id="feed_div_subcomment${idsubusercomment}">
   <div class="flex">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div class="w-7 h-7 rounded-full relative flex-shrink-0"> 
           <img src="${imagesubcommentuser}" alt=""
              class="absolute h-full rounded-full w-full">
        </div>
        <div>
       
           <div style="text-align: center;">
           <div class="flex">
              <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
                 <label style="text-align: center;" >
                 <small id="feed_small_textsubcommentpost${idsubusercomment}"   class="leading-6"> 
                  ${textsubcomment}
                 </small>
                 </label>
                 <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
              </div>
              <div>
              <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                   <ul class="space-y-1">
                     
                      <li>
                         <a href=""
                         onclick="FeedJS.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}','${iduser}','${userrname}');"
                          uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                             <i class="uil-edit-alt mr-1"></i>
                              Edit  </a>
                      </li>
                
                      <li>
                         <hr class="-mx-2 my-2 dark:border-gray-800">
                      </li>
                      <li>
                         <a href=""
                         onclick="FeedJS.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}','${iduser}','${userrname}');"
                          uk-toggle="target: #deletesubcommentmodal" class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                             <i class="uil-trash-alt mr-1"></i> Delete </a>
                      </li>
                   </ul>
                </div>
              </div>
              </div>
              <div class="text-xs flex items-center space-x-3 mt-2 ml-5">
                 <button  
                 onclick="FeedJS.like_dislike_SubComment('${idcomment}','${idsubusercomment}',
                 '${iduser}','${userrname}',event);"
                 class="text-black-600">
                  
                 <iconify-icon id="feed_icon_likesubcomment${idsubusercomment}" icon="ant-design:like-outlined"></iconify-icon>  
                    <span id="feed_span_likesubcomment${idsubusercomment}"> ${likessubcomment} </span>  
                    <!-- Like  -->
                 </button>
                 <span>${stringpostedagosubcomment}</span>
              </div>
           </div>
           <br>
        </div>
        </div>
        </div>
    `;
   let feed_listupdatesubcomments= document.getElementById(`feed_listupdatesubcomments${idcomment}`);
   feed_listupdatesubcomments.parentNode.insertAdjacentHTML("beforeend", html_subcomment);
    
//NUMBER SUBCOMMENT 
let NumberOfSubComment=listsubcomment.length;
document.getElementById(`feed_span_numbersubcomments${idcomment}`).innerHTML=`${NumberOfSubComment}`;
 }
 static  showUpdatedSubComment(idsubcomment,textsubcomment) {
   document.getElementById(`feed_small_textsubcommentpost${idsubcomment}`).innerHTML=textsubcomment;
  }
  static  showRemoveSubComment(idcomment,idsubcomment) {
   document.getElementById(`feed_div_subcomment${idsubcomment}`).remove();


   let numbercommenthtml= document.getElementById(`feed_span_numbersubcomments${idcomment}`).textContent;
   let numbercomments=Number(numbercommenthtml);
    document.getElementById(`feed_span_numbersubcomments${idcomment}`).innerHTML=numbercomments-1;
 }
//SHOW EDIT DELETE SUBCOMMENT 

static show_edit_delete_subcomment=(existsubcommentloginuser)=>
   {
     let hidden="";
    // let existSubComment=await APIRESTSubComment.existSubComment(idsubcomment,iduserlogin,userrname);
     if (existsubcommentloginuser) {
       hidden="";
     } else {
       hidden="hidden"  
     }
     return hidden;
 }
static  showsubcommentUpdateModal=async(idcomment,idsubcomment,textsubcomment,iduserlogin,usernamelogin)=>
{
   SelectData.showsubcommentUpdateModal=
   {
      iduserlogin,
      usernamelogin,
      idcomment,
      idsubcomment
   }
//    document.getElementById('profileloginuser_iduserlogin_updatesubcomment').value=iduserlogin;
//   document.getElementById('profileloginuser_usernamelogin_updatesubcomment').value=usernamelogin;
//   document.getElementById('profileloginuser_idcomment_updatesubcomment').value=idcomment;
//   document.getElementById('profileloginuser_idsubcomment_updatesubcomment').value=idsubcomment;
  document.getElementById('feed_textsubcomment_updatesubcomment').value=textsubcomment;
 
 
}
static showsubcommentDeleteModal=async(idcomment,idsubcomment,iduserlogin,usernamelogin)=>
{
  SelectData.showsubcommentDeleteModal={
   idcomment,idsubcomment,iduserlogin,usernamelogin
  }
//   document.getElementById('postwatch_idcomment_deletesubcomment').value=idcomment;
//   document.getElementById('postwatch_idsubcomment_deletesubcomment').value=idsubcomment;

}

//UPDATE SUB COMMENT 
static updateSubComment=async(event)=>
{
  try {
    event.preventDefault();
    
    let idcomment=SelectData.showsubcommentUpdateModal.idcomment;
    let iduserlogin=SelectData.showsubcommentUpdateModal.iduserlogin;
    let usernamelogin=SelectData.showsubcommentUpdateModal.usernamelogin;
    let idsubcomment=SelectData.showsubcommentUpdateModal.idsubcomment;
   const textsubcomment = document.getElementById('feed_textsubcomment_updatesubcomment').value;

   const editsubcommentPost= await APIRESTSubComment.editsubcommentPost(idsubcomment,idcomment,
    textsubcomment,iduserlogin,usernamelogin);
   if (editsubcommentPost) {
 
     messagenotification('SubComment Updated','success',event);

     this.showUpdatedSubComment(idsubcomment,textsubcomment);
    //await this.loadCommentPost(idpostwatch,iduser,userrname);
    SelectData.showsubcommentUpdateModal={};
     document.getElementById('feed_textsubcomment_updatesubcomment').value="";
    }
}catch (error) {
  alert(error);
}
}
//DELETE SUB COMMENT 
static deleteSubComment=async(event)=>
{
  try {
    event.preventDefault();
   
   let idcomment=SelectData.showsubcommentDeleteModal.idcomment;
   let idsubcomment=SelectData.showsubcommentDeleteModal.idsubcomment;
   let iduserlogin=SelectData.showsubcommentDeleteModal.iduserlogin;
   let usernamelogin=SelectData.showsubcommentDeleteModal.usernamelogin;
   const deletesubcommentPost= await APIRESTSubComment.deletesubcommentPost(idsubcomment,
      iduserlogin,usernamelogin);
   if (deletesubcommentPost) {
 
       messagenotification('SubComment Deleted','success',event);
      this.showRemoveSubComment(idcomment,idsubcomment)
   // await this.loadCommentPost(idpostwatch,iduser,userrname);
     

    
    }
}catch (error) {
  alert(error);
}
}


//#endregion COMMENTS

//*********************************************** */

//#region LIKES
static like_dislike_Post= async(idpost,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();

    let existLikePost=await APIRESTLikes.existLikePost(idpost,iduserlogin,usernamelogin)
   if (existLikePost) {
    const deletelikePost= await APIRESTLikes.deletelikePost(idpost,iduserlogin,usernamelogin);
     if (deletelikePost) {
    
       document.getElementById(`svg_feed_timeline_likepost${idpost}`).setAttribute("fill","grey");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikespost${idpost}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_timeline_numberlikespost${idpost}`).innerHTML=numberoflikes;
     }
    } 
   else{
    const likePost= await APIRESTLikes.likePost(idpost,iduserlogin,usernamelogin);
     if (likePost) {
    
       document.getElementById(`svg_feed_timeline_likepost${idpost}`).setAttribute("fill","black");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikespost${idpost}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_timeline_numberlikespost${idpost}`).innerHTML=numberoflikes;
     }
   }

     
  
   
  }catch (error) {
    alert(error);
  }
}
static like_dislike_Video= async(idvideo,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();

    let existLikeVideo=await APIRESTLikes.existLikeVideo(idvideo,iduserlogin,usernamelogin)
   if (existLikeVideo) {
    const deletelikeVideo= await APIRESTLikes.deletelikeVideo(idvideo,iduserlogin,usernamelogin);
     if (deletelikeVideo) {
    
       document.getElementById(`svg_feed_timeline_likevideo${idvideo}`).setAttribute("fill","grey");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikesvideo${idvideo}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_timeline_numberlikesvideo${idvideo}`).innerHTML=numberoflikes;
     }
    } 
   else{
    const likeVideo= await APIRESTLikes.likeVideo(idvideo,iduserlogin,usernamelogin);
     if (likeVideo) {
    
       document.getElementById(`svg_feed_timeline_likevideo${idvideo}`).setAttribute("fill","black");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikesvideo${idvideo}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_timeline_numberlikesvideo${idvideo}`).innerHTML=numberoflikes;
     }
   }

     
  
   
  }catch (error) {
    alert(error);
  }
}
static like_dislike_Image= async(idimage,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();

    let existLikeImage=await APIRESTLikes.existLikeImage(idimage,iduserlogin,usernamelogin)
   if (existLikeImage) {
    const deletelikeImage= await APIRESTLikes.deletelikeImage(idimage,iduserlogin,usernamelogin);
     if (deletelikeImage) {
    
       document.getElementById(`svg_feed_timeline_likeimage${idimage}`).setAttribute("fill","grey");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikesimage${idimage}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_timeline_numberlikesimage${idimage}`).innerHTML=numberoflikes;
     }
    } 
   else{
    const likeImage= await APIRESTLikes.likeImage(idimage,iduserlogin,usernamelogin);
     if (likeImage) {
    
       document.getElementById(`svg_feed_timeline_likeimage${idimage}`).setAttribute("fill","black");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikesimage${idimage}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_timeline_numberlikesimage${idimage}`).innerHTML=numberoflikes;
     }
   }

     
  
   
  }catch (error) {
    alert(error);
  }
}
static like_dislike_Comment= async(idcomment,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();

  
    let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,iduserlogin,usernamelogin)
   
    if (existLikeComment) {

    const deleteComment= await APIRESTLikes.deleteComment(idcomment,
       iduserlogin,usernamelogin );
     if (deleteComment) {
       
       document.getElementById(`feed_icon_likecomment${idcomment}`).setAttribute("icon","ant-design:like-outlined");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_span_likecomment${idcomment}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_span_likecomment${idcomment}`).innerHTML=numberoflikes;
     }
    } 

   else{

    const likeComment= await APIRESTLikes.likeComment(idcomment,
       iduserlogin,usernamelogin);
     if (likeComment) {
    
       document.getElementById(`feed_icon_likecomment${idcomment}`).setAttribute("icon","ant-design:like-filled");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_span_likecomment${idcomment}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_span_likecomment${idcomment}`).innerHTML=numberoflikes;
     }
   }

   
  }catch (error) {
    alert(error);
  }
}
static like_dislike_SubComment= async(idcomment,idsubcomment,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();
 
  
    let existLikeSubComment=await APIRESTLikes.existLikeSubComment(idsubcomment,iduserlogin,usernamelogin)
   
    if (existLikeSubComment) {

    const deleteSubComment= await APIRESTLikes.deleteSubComment(idsubcomment,
      iduserlogin,usernamelogin );
     if (deleteSubComment) {
    
       document.getElementById(`feed_icon_likesubcomment${idsubcomment}`).setAttribute("icon","ant-design:like-outlined");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_span_likesubcomment${idsubcomment}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_span_likesubcomment${idsubcomment}`).innerHTML=numberoflikes;
     }
    } 

   else{

    const likeSubComment= await APIRESTLikes.likeSubComment(idsubcomment,
       iduserlogin,usernamelogin );
     if (likeSubComment) {
    
       document.getElementById(`feed_icon_likesubcomment${idsubcomment}`).setAttribute("icon","ant-design:like-filled");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_span_likesubcomment${idsubcomment}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_span_likesubcomment${idsubcomment}`).innerHTML=numberoflikes;
     }
   }

     
  
   
  }catch (error) {
    alert(error);
  }
}


//EXIST LIKE 
static exist_like_post=(existlikepost)=>
{
 let fill="";
 
 if(existlikepost)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_image=(existlikeimage)=>
{
 let fill="";
 
 if(existlikeimage)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_video=(existlikevideo)=>
{
 let fill="";
 
 if(existlikevideo)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_comment=(existlikecomment)=>
{
 let fill="";
 
 if(existlikecomment)
 {
  fill="filled"
 }
 else{
   fill="outlined"
 }
 return fill;
}
static exist_like_subcomment=(existlikesubcomment)=>
{
 let fill="";
 
 if(existlikesubcomment)
 {
  fill="filled"
 }
 else{
   fill="outlined"
 }
 return fill;
}

//#endregion LIKES
}

window.addEventListener("load",FeedJS.loadPage);


//IMAGE
const form_feed_addimage = document.getElementById('form_feed_addimage');
form_feed_addimage.addEventListener('submit', FeedJS.upload_image_modal);

//VIDEO
const form_feed_addvideo = document.getElementById('form_feed_addvideo');
form_feed_addvideo.addEventListener('submit', FeedJS.upload_video_modal);

//POST
const form_feed_addpost = document.getElementById('form_feed_addpost');
form_feed_addpost.addEventListener('submit', FeedJS.add_post);


//UPDATE COMMENT

const form_feed_updatecomment= document.getElementById('form_feed_updatecomment');
form_feed_updatecomment.addEventListener('submit', FeedJS.updateCommentPost);

const form_feed_updatecommentImage= document.getElementById('form_feed_updatecommentImage');
form_feed_updatecommentImage.addEventListener('submit', FeedJS.updateCommentImage);

const form_feed_updatecommentVideo= document.getElementById('form_feed_updatecommentVideo');
form_feed_updatecommentVideo.addEventListener('submit', FeedJS.updateCommentVideo);


//DELETE COMMENT

const button_feed_deletecomment= document.getElementById('button_feed_deletecomment');
button_feed_deletecomment.addEventListener('click', FeedJS.deleteCommentPost);

const button_feed_deletecommentImage= document.getElementById('button_feed_deletecommentImage');
button_feed_deletecommentImage.addEventListener('click', FeedJS.deleteCommentImage);


const button_feed_deletecommentVideo= document.getElementById('button_feed_deletecommentVideo');
button_feed_deletecommentVideo.addEventListener('click', FeedJS.deleteCommentVideo);


//UPDATE SUBCOMMENT

const form_feed_updatesubcomment = document.getElementById('form_feed_updatesubcomment');
form_feed_updatesubcomment.addEventListener('submit', FeedJS.updateSubComment);

//DELETE SUBCOMMENT
const feed_button_deletesubcomment = document.getElementById('feed_button_deletesubcomment');
feed_button_deletesubcomment.addEventListener('click', FeedJS.deleteSubComment);