class Profile_Login_User

{ 

  static  getLoginUser=async()=>
  {
    let response_loginuser= await APIRESTLoginUser.getLoginUser();
    let getuser= await APIRESTUser.getUser(response_loginuser.iduser);
    return getuser

  }
    //LOAD PAGE
    
    static showdata_getLoginUser=async()=>
    {
      try {
      
      let getuser=await this.getLoginUser();
       const {iduser,name,email,ocupattion,urlfacebook,country
         ,urlinstagram,urllinkedin,urltwitter,description,
         userrname,image,coverphoto
       }=getuser
       
   //SHOW IMAGE COVER PROFILE


   this.showImageCoverProfile(image, coverphoto);
   
   //  //SHOW NAME DESCRIPTION PROFILE
 
     this.loadNameDescriptionUser(description, name);


       //TIMELINE
       await this.load_timeline(iduser);

    

         // LOAD VIDEOS LOGIN USER
         await this.loadVideosLoginUser(iduser);


      // LOAD ALBUM VIDEOS LOGIN USER
      await this.loadAlbumVideosLoginUser();


          //LOAD ALBUM VIDEOS MODAL ADD VIDEOS
      await this.loadAlbumVideoUserModal();

    

      // LOAD DESCRIPTION MODAL UPDATE DESCRIPTION

      document.getElementById("profileloginuser_txtarea_updateabout").value= description;

      //LOAD ALBUM IMAGES MODAL ADD IMAGE

      await this.loadAlbumImagesUserModal();

   

      // LOAD ALBUMIMAGES LOGIN USER
  
           await this.loadAlbumImagesLoginUser();
   
      // LOAD IMAGES LOGIN USER
  
      await this.loadImagesLoginUser(iduser);

     

    


    // LOAD POST LOGIN USER
  
      await this.loadPostLoginUser(iduser);
      

      const buttonDeleteImage = document.getElementById('button_deleteimagemodal_profileuser');
      buttonDeleteImage.addEventListener('click', Profile_Login_User.deleteImage);



     } catch (error) {
      console.error(error);
     alert(error);
     window.location.href="../index.html";
   
     }
     
     } 

//TIMELINE

static load_timeline=async(iduser)=>
{
  let getPhotoPostVideoByUser = await APIRESTImageVideoPost.getPhotoPostVideoByUser(iduser);
  // console.log(getPhotoPostVideoByUser);
  let html_load_postvideoimage = '';
  let html_load_postvideoimage_more = '';
  for (let i = 0; i < Math.min(getPhotoPostVideoByUser.length, 15); i++) {
    let getpostimagevideo=getPhotoPostVideoByUser[i];
  //   let userProfileImage = getpostuser[i].user.image;
  //  let idpost=getpostuser[i].idpost;
  //   let postTitle = getpostuser[i].title;
  //   let stringpostedago = getpostuser[i].stringpostedago;
    
  //   let postdescription = getpostuser[i].description;
    // let postdescription = getpostuser[i].description;

    if (i >= 3) {
     
        if (getpostimagevideo.type==="P") {
         // let commentposts=await APIRESTPostComment.getCommentPostByPost(getpostimagevideo.id);
         html_load_postvideoimage_more+=this.html_Post_TimeLine(getpostimagevideo);
         
       } else if (getpostimagevideo.type==="I"){
         html_load_postvideoimage_more+=this.html_Image_TimeLine(getpostimagevideo);
       }
       else
       {
         html_load_postvideoimage_more+=this.html_Video_TimeLine(getpostimagevideo);
       }
  

    } else {
      if (getpostimagevideo.type==="P") {
        
         html_load_postvideoimage+=this.html_Post_TimeLine(getpostimagevideo);
     
      } else if (getpostimagevideo.type==="I"){
        html_load_postvideoimage+=this.html_Image_TimeLine(getpostimagevideo);
      }
      else
      {
        html_load_postvideoimage+=this.html_Video_TimeLine(getpostimagevideo);
      }
    }
  }
  document.getElementById("profileloginuser_timelinelist_div").innerHTML= html_load_postvideoimage + 
  '<div id="profile_timeline_user" hidden>' + 
  html_load_postvideoimage_more + 
  '</div>';


  
  
}


     static update_description_modal=async(event)=>
     {
       try {
        event.preventDefault();
        let description = document.getElementById('profileloginuser_txtarea_updateabout').value;
        try {
          const response_update= await APIRESTUser.updateDescription(description);
          if (response_update) {
        
            messagenotification('Description Updated','success',event)
          
          }
          
          } catch (error) {
            alert(error);
          }
             
   
     
     
       
      } catch (error) {
        alert(error);
        
    
      }
      } 


    //#region IMAGES

    static upload_image_modal=async(event)=>
    {
      try {
        event.preventDefault();
        document.getElementById("create-image-modal").classList.add("cursor-loading");
       const title = document.getElementById('profileloginuser_uploadimage_title').value;
        const idalbumphoto = document.getElementById('profileloginuser_select_albumimages').value;
        const description = document.getElementById('profileloginuser_uploadimage_description').value;
        const visibility = document.getElementById('profileloginuser_uploadimage_visibility').value;
        let fileimageprofile = document.getElementById('uploadoneimage').files[0];
        let getulogin=await this.getLoginUser();
       
      let urlimage=await APIRESTCloudinary.upload_image(fileimageprofile,getulogin.iduser);
        const dataform = {title
          ,idalbumphoto,visibility,description,urlimage}
      
         const response_upload_image= await APIRESTImages.addImage(dataform);
         if (response_upload_image) {
      
           document.getElementById('profileloginuser_uploadimage_title').value="";
           document.getElementById('profileloginuser_uploadimage_description').value="";
          }
    
       
          messagenotification('Image Added','success',event);
          document.getElementById("create-image-modal").classList.remove("cursor-loading");
          setInterval(location.reload(),1000);
     }catch (error) {
       alert(error);
       location.reload();
     }
      
    }
    static add_album_image=async(event)=>
    {
      try {
       
        event.preventDefault();
        document.getElementById("create_album_images_modal").classList.add("cursor-loading");
          let arrayurlimages=[];
        const title=  document.getElementById('titlealbum_profileloginuser').value; 
          let filesalbumimages = SelectData.getSelectMultipleImages();
          for (let i = 0; i < filesalbumimages.length; i++) {
              const fileimage = filesalbumimages[i] ;
              let getulogin=await this.getLoginUser();
              let urlimage=await APIRESTCloudinary.upload_image(fileimage,getulogin.iduser);
              arrayurlimages.push(urlimage);
          }
      
        //      let urlimage=await APIRESTCloudinary.upload_image(fileimageprofile);
         
         
         const response_upload_albumimage= await APIRESTAlbumImage.add_album_image(title,arrayurlimages);
         if (response_upload_albumimage) {
       

           SelectData.selectMultipleImages=[];
           document.getElementById('titlealbum_profileloginuser').value=""; 
          }
          messagenotification('Album images Added','success',event);
          document.getElementById("create_album_images_modal").classList.remove("cursor-loading");
          setInterval(location.reload(),1000);
        
      
     }catch (error) {
       alert(error);
       location.reload();
     }   
      
    }
    static updateImage= async(event)=>
    {
      try {
        event.preventDefault();
        const idimage = document.getElementById('idphoto_updateimage_profileloginuser').value;
        const title = document.getElementById('title_updateimage_profileloginuser').value;
         const description = document.getElementById('description_updateimage_profileloginuser').value;
       
         const visibility = document.getElementById('visibility_updateimage_profileloginuser').value;
        
           
         const dataform = {idimage,title
           ,description,visibility}
       
          const response_upload_image= await APIRESTImages.updateImage(dataform);
          if (response_upload_image) {
        
            messagenotification('Image Updated','success',event);
            document.getElementById('title_updateimage_profileloginuser').value="";
            document.getElementById('description_updateimage_profileloginuser').value="";
           }
     
       
      }catch (error) {
        alert(error);
      }
    }
    static deleteImage= async(event)=>
    {
      try {
       
        const idimage = document.getElementById('idphoto_deleteimagemodal_profileloginuser').value;
       
       
          const response_delete_image= await APIRESTImages.deleteImage(idimage);
          if (response_delete_image) {
        
            messagenotification('Image Deleted','success',event);
            setInterval(() => {
              location.reload()
            }, 1000);
          
           }
     
       
      }catch (error) {
        alert(error);
      }
    }

    // GET IMAGES

    static  showDataUpdateModal=async(id)=>
    {
      const response_getimage= await APIRESTImages.getImage(id);
      document.getElementById('idphoto_updateimage_profileloginuser').value=response_getimage.idphoto;
      
      document.getElementById('title_updateimage_profileloginuser').value=response_getimage.title;
    document.getElementById('description_updateimage_profileloginuser').value=response_getimage.description;
      const visibilitySelect = document.getElementById('visibility_updateimage_profileloginuser');
      if (response_getimage.visibility === 'Private') {
        visibilitySelect.value = 'Private';
      } else {
        visibilitySelect.value = 'Public';
      }
      
      
    

    }
    static showIdDeleteModal=async(id)=>
    {
      document.getElementById('idphoto_deleteimagemodal_profileloginuser').value=id;
   
    }
    //#endregion IMAGES

    //#region VIDEOS
    static upload_video_modal=async(event)=>
    {
      try {
       event.preventDefault();
       document.getElementById("create-video-modal").classList.add("cursor-loading");
       const title = document.getElementById('profileloginuser_uploadvideo_title').value;
        const idalbumvideo = document.getElementById('profileloginuser_select_albumvideos').value;
        const description = document.getElementById('profileloginuser_uploadvideo_description').value;
        const visibility = document.getElementById('profileloginuser_uploadvideo_visibility').value;
        let filevideo = document.getElementById('uploadonevideo').files[0];
        let getulogin=await this.getLoginUser();
       
      let urlvideo=await APIRESTCloudinary.upload_video(filevideo,getulogin.iduser);
        const dataform = {title
          ,idalbumvideo,visibility,description,urlvideo}
      
         const response_upload_video= await APIRESTVideo.addVideo(dataform);
         if (response_upload_video) {
        
           document.getElementById('profileloginuser_uploadvideo_title').value="";
           document.getElementById('profileloginuser_uploadvideo_description').value="";
          }
    
          messagenotification('Video Added','success',event);
          document.getElementById("create-video-modal").classList.remove("cursor-loading");
          setInterval(location.reload(),1000);
         
     }catch (error) {
       alert(error);
       location.reload();
     }
      
    }
    static add_album_video=async(event)=>
    {
      try {
       event.preventDefault();
       document.getElementById("create-album-video-modal").classList.add("cursor-loading");
          let arrayurlvideo=[];
          const title=  document.getElementById('titlealbumvideo_profileloginuser').value; 
          let filesalbumvideos= SelectData.getSelectMultipleVideos();
          for (let i = 0; i < filesalbumvideos.length; i++) {
              const filevideos = filesalbumvideos[i] ;
              let getulogin=await this.getLoginUser();
              let urlvideo=await APIRESTCloudinary.upload_video(filevideos,getulogin.iduser);
              arrayurlvideo.push(urlvideo);
          }
      
        //      let urlimage=await APIRESTCloudinary.upload_image(fileimageprofile);
         
         
         const response_upload_albumvideo= await APIRESTAlbumVideo.add_album_video(title,arrayurlvideo);
         if (response_upload_albumvideo) {
       
         
           SelectData.selectMultipleVideos=[];
           document.getElementById('titlealbumvideo_profileloginuser').value=""; 
          }
         
          messagenotification('Album videos Added','success',event);
          document.getElementById("create-album-video-modal").classList.remove("cursor-loading");
        setInterval(location.reload(),1000)
      
     }catch (error) {
      event.preventDefault();
      //  alert(error);
       console.log(error);
      //  location.reload();
     }   
      
    }
    static updateVideo= async(event)=>
    {
      try {
        event.preventDefault();
        const idvideo = document.getElementById('profileloginuser_updatevideo_idvideo').value;
        const title = document.getElementById('profileloginuser_updatevideo_name').value;
         const description = document.getElementById('profileloginuser_updatevideo_description').value;       
         const visibility = document.getElementById('profileloginuser_updatevideo_visibility').value;
        
           
         const dataform = {idvideo,title
           ,description,visibility}
       
          const response_upload_video= await APIRESTVideo.updateVideo(dataform);
          if (response_upload_video) {
        
            messagenotification('Video Updated','success',event);
            document.getElementById('profileloginuser_updatevideo_name').value="";
            document.getElementById('profileloginuser_updatevideo_description').value="";
           }
     
       
      }catch (error) {
        alert(error);
      }
    }
    static deleteVideo= async(event)=>
    {
      try {
       
        const idvideo = document.getElementById('idvideo_deletevideomodal_profileloginuser').value;
       
       
          const response_delete_video= await APIRESTVideo.deleteVideo(idvideo);
          if (response_delete_video) {
        
            messagenotification('Video Deleted','success',event);
            setInterval(() => {
              location.reload()
            }, 1000);
          
           }
     
       
      }catch (error) {
        alert(error);
      }
    }

    static  showDataUpdateModalVideo=async(id)=>
    {
      const response_getvideo= await APIRESTVideo.getVideo(id);
      document.getElementById('profileloginuser_updatevideo_idvideo').value=response_getvideo.idvideo;
      document.getElementById('profileloginuser_updatevideo_name').value=response_getvideo.title;
      document.getElementById('profileloginuser_updatevideo_description').value=response_getvideo.description;
      const visibilitySelect = document.getElementById('profileloginuser_updatevideo_visibility');
      if (response_getvideo.visibility === 'Private') {
        visibilitySelect.value = 'Private';
      } else {
        visibilitySelect.value = 'Public';
      }
    }
    static showIdDeleteModalVideo=async(id)=>
    {
      document.getElementById('idphoto_deleteimagemodal_profileloginuser').value=id;
   
    }

    //#endregion VIDEOS

    //#region POST

    static add_post=async(event)=>
    {
      try {
        event.preventDefault();
        
       const title = document.getElementById('profileloginuser_addpost_name').value;
    
        const description = document.getElementById('profileloginuser_addpost_description').value;
        const visibility = document.getElementById('profileloginuser_addpost_visibility').value;
   
        const dataform = {title
          ,visibility,description}
      
         const response_post= await APIRESTPost.addPost(dataform);
         if (response_post) {
         
           document.getElementById('profileloginuser_addpost_name').value="";
           document.getElementById('profileloginuser_addpost_description').value="";
          }
    
          messagenotification('Post Added','success',event);
         
          setInterval(location.reload(),1000);
         
     }catch (error) {
       alert(error);
       location.reload();
     }
      
    }
    static updatePost= async(event)=>
    {
      try {
        event.preventDefault();
        const idpost = document.getElementById('idpost_updatepost_profileloginuser').value;
        const title = document.getElementById('profileloginuser_updatepost_name').value;
         const description = document.getElementById('profileloginuser_updatepost_description').value;       
         const visibility = document.getElementById('profileloginuser_updatepost_visibility').value;
        
           
         const dataform = {idpost,title
           ,description,visibility}
       
          const response_upload_post= await APIRESTPost.updatePost(dataform);
          if (response_upload_post) {
        
            messagenotification('Post Updated','success',event);
            document.getElementById('profileloginuser_updatepost_name').value="";
            document.getElementById('profileloginuser_updatepost_description').value="";
           }
     
       
      }catch (error) {
        alert(error);
      }
    }
    static deletePost= async(event)=>
    {
      try {
       
        const idpost = document.getElementById('idpost_deletepostmodal_profileloginuser').value;
       
       
          const response_delete_post= await APIRESTPost.deletePost(idpost);
          if (response_delete_post) {
        
            messagenotification('Post Deleted','success',event);
            setInterval(() => {
              location.reload()
            }, 1000);
          
           }
     
       
      }catch (error) {
        alert(error);
      }
    }
    static  showDataUpdateModalPost=async(id)=>
    {
      const response_getpost= await APIRESTPost.getPost(id);
      document.getElementById('idpost_updatepost_profileloginuser').value=response_getpost.idpost;
      document.getElementById('profileloginuser_updatepost_name').value=response_getpost.title;
      document.getElementById('profileloginuser_updatepost_description').value=response_getpost.description;
      const visibilitySelect = document.getElementById('profileloginuser_updatepost_visibility');
      if (response_getpost.visibility === 'Private') {
        visibilitySelect.value = 'Private';
      } else {
        visibilitySelect.value = 'Public';
      }
    }
    static showIdDeleteModalPost=async(id)=>
    {
      document.getElementById('idpost_deletepostmodal_profileloginuser').value=id;
   
    }

    //#endregion


//#region LOAD PAGE

//GET NAME ABOUT USER
static loadNameDescriptionUser(description, name) {
  let inside_profileloginuser_p_description = `
         ${description} <a href=""
         uk-toggle="target: #update-about-modal">  Edit </a> 
      `;
  document.getElementById("profileloginuser_h1_nameuser").innerHTML = name;
  document.getElementById("profileloginuser_p_description").innerHTML = inside_profileloginuser_p_description;
}
//GET ALBUM IMAGES LOGIN USER
static async loadAlbumImagesLoginUser() {
  let getalbumimagesuser = await APIRESTAlbumImage.getAlbumImageByLoginUser();
  
  let html_load_albumimage = '';

  for (let i = 0; i < getalbumimagesuser.length; i++) {
    const idalbumphoto = getalbumimagesuser[i].idalbumphoto ;
    let getImagesByAlbum = await APIRESTImages.getImagesByAlbum(idalbumphoto);
if(getImagesByAlbum.length!==0)
{

    if (i >= 3) {
      html_load_albumimage += `
      <div hidden id="morealbumimage" >
      <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
         <ul class="uk-slideshow-items">
         ${this.forAddImagesFromAlbum(getImagesByAlbum)}
         </ul>
         <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
         <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
      </div>
   </div>
        `;
    } else {
      html_load_albumimage += `
      <div>
      <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
         <ul class="uk-slideshow-items">
         ${this.forAddImagesFromAlbum(getImagesByAlbum)}
         </ul>
         <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
         <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
      </div>
     
   </div>
        `;
    }
    
  }
}


  document.getElementById("profileloginuser_listalbumimages_div").innerHTML = html_load_albumimage;
}
//GET IMAGES LOGIN USER
static async loadImagesLoginUser(iduser) {
  let getimagesuser = await APIRESTImages.getImagesByLoginUser(iduser,iduser);
  document.getElementById("profileloginuser_span_photoscount").innerHTML = getimagesuser.length;
  let html_load_images = '';

  for (let i = 0; i < getimagesuser.length; i++) {
    const imageUrl = getimagesuser[i].urlimage;


    if (i >= 3) {
      html_load_images += `
          <div id="morephotos" hidden class="card lg:mx-0 uk-animation-slide-bottom-small">
            <div class="bg-green-400 max-w-full lg:h-44 h-36 rounded-lg relative overflow-hidden shadow uk-transition-toggle">
              <a href="">
                <img src="${imageUrl}" class="w-full h-full absolute object-cover inset-0">
              </a>
              <!-- overly-->
              <div class="-bottom-12 absolute bg-gradient-to-b from-transparent h-1/2 to-gray-800 uk-transition-slide-bottom-small w-full"></div>
              <div class="absolute bottom-0 w-full p-3 text-white uk-transition-slide-bottom-small">
                <div class="flex justify-around text-xs">
                  <a
                  id="a_update_image_modal"
                   uk-toggle="target: #update-image-modal" href=""
                   onclick="Profile_Login_User.showDataUpdateModal(${getimagesuser[i].idphoto});">  Update </a>
                  <a uk-toggle="target: #deleteimagemodal" href=""
                  onclick="Profile_Login_User.showIdDeleteModal(${getimagesuser[i].idphoto});"
                  >  Delete </a> 
                </div>

              </div>
            </div>
          </div>
        `;
    } else {
      html_load_images += `
          <div>
            <div class="bg-green-400 max-w-full lg:h-44 h-36 rounded-lg relative overflow-hidden shadow uk-transition-toggle">
              <a href="">
                <img src="${imageUrl}" class="w-full h-full absolute object-cover inset-0">
              </a>
              <!-- overly-->
              <div class="-bottom-12 absolute bg-gradient-to-b from-transparent h-1/2 to-gray-800 uk-transition-slide-bottom-small w-full"></div>
              <div class="absolute bottom-0 w-full p-3 text-white uk-transition-slide-bottom-small">
                <div class="flex justify-around text-xs">
                  <a 
                  id="a_update_image_modal"
                  uk-toggle="target: #update-image-modal" href=""
                  onclick="Profile_Login_User.showDataUpdateModal('${getimagesuser[i].idphoto}');">  Update </a>
                
                  <a uk-toggle="target: #deleteimagemodal" href=""
                  onclick="Profile_Login_User.showIdDeleteModal(${getimagesuser[i].idphoto});"
                  >  Delete </a> 
                </div>

              </div>
            </div>
          </div>
        `;
    }
  }


  document.getElementById("profileloginuser_listallimages_div").innerHTML = html_load_images;
}
//GET POST LOGIN USER
static async loadPostLoginUser(iduser) {
   let getpostuser = await APIRESTPost.getPostByLoginUser(iduser);
   document.getElementById("profileloginuser_span_postcount").innerHTML = getpostuser.length;
   let html_load_post = '';
 
   for (let i = 0; i < getpostuser.length; i++) {
     let userProfileImage = getpostuser[i].user.image;
    let idpost=getpostuser[i].idpost;
     let postTitle = getpostuser[i].title;
     let stringpostedago = getpostuser[i].stringpostedago;
     
     let postdescription = getpostuser[i].description;
     // let postdescription = getpostuser[i].description;

 let countpostcomments=await APIRESTPostComment.getCommentPostByPost(idpost);
     if (i >= 3) {
       html_load_post += `
           <li hidden id="morepost">
           <div class="flex items-start space-x-5 p-7">
               <img src="${userProfileImage}" alt="" class="w-12 h-12 rounded-full">
               <div class="flex-1">
                   <a href="#" class="text-lg font-semibold line-clamp-1 mb-1"> ${postTitle} </a>
                   <p class="text-sm text-gray-400 mb-2"> Posted By: <span data-href="%40tag-dev.html">${stringpostedago}</span></p>
                 <p class="leading-6 line-clamp-2 mt-3">${postdescription}</p>
               </div>
               <div class="sm:flex items-center space-x-4 hidden">
                   <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                   <span class="text-xl"> ${countpostcomments.length} </span>
               </div>
           </div>
       </li>
         `;
     } else {
       html_load_post += `
         <li>
             <div class="flex items-start space-x-5 p-7">
                 <img src="${userProfileImage}" alt="" class="w-12 h-12 rounded-full">
                 <div class="flex-1">
                     <a href="#" class="text-lg font-semibold line-clamp-1 mb-1">${postTitle}  </a>
                     <p class="text-sm text-gray-400 mb-2">  <span data-href="%40tag-dev.html">${stringpostedago}</span>  </p>
                     <p class="leading-6 line-clamp-2 mt-3">${postdescription}</p>
                 </div>
                 <div class="sm:flex items-center space-x-4 hidden">
                     <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" 
                     xmlns="http://www.w3.org/2000/svg">
                     <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                     <span class="text-xl"> ${countpostcomments.length} </span>
                 </div>
             </div>
         </li>

         `;
     }
   }
 
 
   document.getElementById("profileloginuser_listposts_ul").innerHTML = html_load_post;
 }S
//GET ALBUM VIDEOS LOGIN USER
static async loadAlbumVideosLoginUser() {
  let getalbumvideosuser = await APIRESTAlbumVideo.getAlbumVideoseByLoginUser();
  
  let html_load_albumvideo = '';

  for (let i = 0; i < getalbumvideosuser.length; i++) {
    const idalbumvideo = getalbumvideosuser[i].idalbumvideo  ;
    let getVideosByAlbum = await APIRESTVideo.getVideosByAlbum(idalbumvideo);
if(getVideosByAlbum.length!==0)
{

    if (i >= 3) {
      html_load_albumvideo += `
      <div hidden id="morealbumvideo" >
      <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
         <ul class="uk-slideshow-items">
         ${this.forAddVideoFromAlbum(getVideosByAlbum)} 
         </ul>
         <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
         <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
      </div>
   </div>
        `;
    } else {
      html_load_albumvideo += `
      <div>
          <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
                    <ul class="uk-slideshow-items">
                    ${this.forAddVideoFromAlbum(getVideosByAlbum)}        
                    </ul>
                 <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
                 <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
              </div>
                             
         </div>
        `;
    }
    
  }
}


  document.getElementById("profileloginuser_listalbumvideo_div").innerHTML = html_load_albumvideo;
}

//GET VIDEOS LOGIN USER
static async loadVideosLoginUser(iduser) {
  let getVideosByLoginUser = await APIRESTVideo.getVideosByLoginUser(iduser);
  document.getElementById("profileloginuser_span_videoscount").innerHTML = getVideosByLoginUser.length;
  let html_load_videos = '';

  for (let i = 0; i < getVideosByLoginUser.length; i++) {
    const videoUrl = getVideosByLoginUser[i].urlvideo;


    if (i >= 3) {
      html_load_videos += `
      <div hidden id="morevideo" >
      <div class="uk-position-relative uk-visible-toggle uk-light" >
               <a href="../feed/feed.html">
                <video src="${videoUrl}" autoplay loop muted playsinline>

                </video>
              
                </a>
      
      </div>
   </div>
        `;
    } else {
      html_load_videos += `
      <div>
      <div class="uk-position-relative uk-visible-toggle uk-light" >
         <a href="../feed/feed.html">
            <video src="${videoUrl}" autoplay loop muted playsinline>

            </video>
          
            </a>
      </div>
   </div>
        `;
    }
  }


  document.getElementById("profileloginuser_listallvideos_div").innerHTML = html_load_videos;
}

//GET IMAGE COVER PROFILE
static showImageCoverProfile(image, coverphoto) {
  if (image === "") {
    document.getElementById("profileloginuser_profileimage").src = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
  }
  else {
    document.getElementById("profileloginuser_profileimage").src = image;
  }

  if (coverphoto === "") {
    document.getElementById("profileloginuser_coverimage").src = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/no-image-slide_nclriy.jpg";
  } else {
    document.getElementById("profileloginuser_coverimage").src = coverphoto;
  }
}
//GET TITLE ALBUMS IN ADD MODAL IMAGE
static async loadAlbumImagesUserModal() {
  let getalbumimagesuser = await APIRESTAlbumImage.getAlbumImageByLoginUser();
  let load_albums_image = "";
  for (let i = 0; i < getalbumimagesuser.length; i++) {
    load_albums_image += `<option value=${getalbumimagesuser[i].idalbumphoto}>${getalbumimagesuser[i].title}</option>`;
  }

  document.getElementById("profileloginuser_select_albumimages").innerHTML = load_albums_image;
}




//GET TITLE ALBUM IN ADD MODAL VIDEO
static async loadAlbumVideoUserModal() {
  let getalbumvideosuser = await APIRESTAlbumVideo.getAlbumVideoseByLoginUser();
  let load_albums_video = "";
  for (let i = 0; i < getalbumvideosuser.length; i++) {
    load_albums_video += `<option value=${getalbumvideosuser[i].idalbumvideo}>${getalbumvideosuser[i].title}</option>`;
  }

  document.getElementById("profileloginuser_select_albumvideos").innerHTML = load_albums_video;
}

 //#endregion LOAD PAGE

//OTHERS

static forAddImagesFromAlbum(images)
   {
    let html_images="";
    for (let i = 0; i < images.length; i++) {
      const imageUrl = images[i].urlimage;
      html_images += `
         <li>
            <a href="">
               <img src="${imageUrl}" alt="" uk-cover>
            </a>
         </li>
      `;
   }
    return html_images
   
   }

   static forAddVideoFromAlbum(videos)
   {
    let html_videos="";
    for (let i = 0; i < videos.length; i++) {
      const urlvideo = videos[i].urlvideo;
      html_videos += `
      <li> 
      <a href="../feed/feed.html">
         <video src="${urlvideo}" 
         autoplay loop muted playsinline >

         </video>
         </a>
   </li>
      `;
   }
    return html_videos
   
   }
//******************************************************** */
  static html_Post_TimeLine(getpost)
{
   let userImageProfile=getpost.user.image;
   let idpost=getpost.id;
   let userName=getpost.user.name;
   let stringpostedago=getpost.stringpostedago;
   let description=getpost.description;
  let html_post=`
  <div class="card lg:mx-0 uk-animation-slide-bottom-small">
               
  <div class="flex justify-between items-center lg:p-4 p-2.5">
     <div class="flex flex-1 items-center space-x-4">
        <a href="#"> <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
        <div class="flex-1 font-semibold capitalize">
           <a href="#" class="text-black dark:text-gray-100"> ${userName} </a>
           <div class="flex items-center space-x-2">
           <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people" role="img" class="md hydrated" aria-label="people"></ion-icon>
           </div>
        </div>
     </div>
     <div>
      
           <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
       
      
          <div  class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
          uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
             <ul class="space-y-1">
                <!-- <li> 
                   <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                    <i class="uil-share-alt mr-1"></i> Share
                   </a> 
                   </li> -->
                <li>
                   <a href="" uk-toggle="target: #update_post_modal"
                   onclick="Profile_Login_User.showDataUpdateModalPost('${idpost}');"
                    class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-edit-alt mr-1"></i>
                        Edit  </a>
                </li>
                
                <li>
                   <hr class="-mx-2 my-2 dark:border-gray-800">
                </li>
                <li>
                   <a href="" uk-toggle="target: #delete_post_modal" 
                   onclick="Profile_Login_User.showIdDeleteModalPost('${idpost}');"
                   class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                       <i class="uil-trash-alt mr-1"></i> Delete </a>
                </li>
             </ul>
          </div>
         
      </div>
  </div>
  <div class="p-5 pt-0 border-b dark:border-gray-700">
    ${description}
  </div>
  <div class="p-4 space-y-3">
     <div class="flex space-x-4 lg:font-bold">
        <a href="" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
           </div>
           <div> Like</div>
        </a>
        <a href="" uk-toggle="target: #view-commentspost${idpost}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
              </svg>
           </div>
           <div> Comments </div>
        </a>


     </div>
     <div class="flex items-center space-x-3 pt-2">
        <div class="flex items-center"> 
           <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"> 
           <img src="../assets/images/avatars/avatar-4.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
           <img src="../assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
        </div>
        <div class="dark:text-gray-100">  
           <a href="" uk-toggle="target: #see_user_liked">
              <strong> 209 Liked it </strong>
           </a>
        
        </div>
     </div>
     <div hidden id="view-commentspost${idpost}" class="border-t py-4 space-y-4 dark:border-gray-600">
         
      ${this.forCommentsPost()}
        <!-- COMMENT -->
       
     </div>   <!-- END VIEWCOMMENTPOST -->
     
     <!-- <a href="" class="hover:text-blue-600 hover:underline">  View more comments </a> -->
     <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
        <input placeholder="Add your Comment.." class="bg-transparent max-h-10 shadow-none px-5">
        <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
           <a href="">
              <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
           </a>
        
        </div>
     </div>
  </div>
</div>
<br>
  `;
  return html_post;
}
  static html_Image_TimeLine(getimage)
{
   let userImageProfile=getimage.user.image;
   let idimage=getimage.id;
   let userName=getimage.user.name;
   let stringpostedago=getimage.stringpostedago;
   let urlimage=getimage.url;
  let html_image=`
  <div class="card lg:mx-0 uk-animation-slide-bottom-small">
  <!-- post header-->
  <div class="flex justify-between items-center lg:p-4 p-2.5">
     <div class="flex flex-1 items-center space-x-4">
        <a href="#"> <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
        <div class="flex-1 font-semibold capitalize">
           <a href="#" class="text-black dark:text-gray-100"> ${userName} </a>
           <div class="flex items-center space-x-2">
           <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people"></ion-icon>
           </div>
        </div>
     </div>
     <div>
        <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
          <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
          uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
             <ul class="space-y-1">
                <!-- <li> 
                   <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                    <i class="uil-share-alt mr-1"></i> Share
                   </a> 
                   </li> -->
                <li>
                   <a href="#" uk-toggle="target: #update-image-modal" 
                   onclick="Profile_Login_User.showDataUpdateModal('${idimage}');"
                   class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-edit-alt mr-1">

                       </i> Edit  </a>
                </li>
              
                <li>
                   <hr class="-mx-2 my-2 dark:border-gray-800">
                </li>
                <li>
                   <a href="" uk-toggle="target: #deleteimagemodal" 
                   onclick="Profile_Login_User.showIdDeleteModal(${idimage});"
                    class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                       <i class="uil-trash-alt mr-1"></i> Delete </a>
                </li>
             </ul>
          </div>  
          
       </div>
  </div>
  <!-- <div uk-lightbox>     -->
     <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
       
              <a href="">
                 <img src="${urlimage}" alt="" uk-responsive>
                 </a>
      
     </div>
 
  <!-- </div> -->
  <div class="p-4 space-y-3">
     <div class="flex space-x-4 lg:font-bold">
        <a href="" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
           </div>
           <div> Like</div>
        </a>
        <a href="" uk-toggle="target: #view-commentsimage${idimage}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
           </div>
           <div> Comment</div>
        </a>
        <!-- <a href="#" class="flex items-center space-x-2 flex-1 justify-end">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" class="dark:text-gray-100">
                   <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
               </svg>
           </div>
           <div> Share</div>
           </a> -->
     </div>
    
     <div class="flex items-center space-x-3 pt-2">
        <div class="flex items-center"> 
           <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"> 
           <img src="../assets/images/avatars/avatar-4.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
           <img src="../assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
        </div>
        <div class="dark:text-gray-100">  
           <a href="" uk-toggle="target: #see_user_liked">
              <strong> 209 Liked it </strong>
           </a>
        
        </div>
     </div>
     <div hidden id="view-commentsimage${idimage}" class="border-t py-4 space-y-4 dark:border-gray-600">
     <!-- COMMENT -->
     ${this.forCommentImage()}
       
      
    </div> 
    
    <!-- <a href="" class="hover:text-blue-600 hover:underline">  View more comments </a> -->
    <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
       <input placeholder="Add your Comment.." class="bg-transparent max-h-10 shadow-none px-5">
       <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
          <a href="">
             <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
          </a>
       
       </div>
    </div>
  </div>
</div>
<br>
  `;
  return html_image
  }
  static html_Video_TimeLine(getvideo)
  {
   let userImageProfile=getvideo.user.image;
   let idvideo=getvideo.id;
   let userName=getvideo.user.name;
   let stringpostedago=getvideo.stringpostedago;
   let urlvideo=getvideo.url;
    let html_video=`
    <div  class="card lg:mx-0 uk-animation-slide-bottom-small">
    <!-- post header-->
    <div class="flex justify-between items-center lg:p-4 p-2.5">
       <div class="flex flex-1 items-center space-x-4">
          <a href="#"> <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
          <div class="flex-1 font-semibold capitalize">
             <a href="#" class="text-black dark:text-gray-100"> ${userName} </a>
             <div class="flex items-center space-x-2">
               <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people"></ion-icon>
           </div>
          </div>
       </div>
       <div>
          <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
            <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
            uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
               <ul class="space-y-1">
                
                  <li>
                     <a href="" uk-toggle="target: #update-video-modal" 
                     onclick="Profile_Login_User.showDataUpdateModalVideo('${idvideo}');"
                     class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                         <i class="uil-edit-alt mr-1"></i> Edit  </a>
                  </li>
                
                  <li>
                     <hr class="-mx-2 my-2 dark:border-gray-800">
                  </li>
                  <li>
                     <a href="" uk-toggle="target: #delete_video_modal"  class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                         <i class="uil-trash-alt mr-1"></i> Delete </a>
                  </li>
               </ul>
            </div>
         </div>
    </div>
    <!-- VIDEO -->
    <div class="w-full h-full">

          <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
         
               <a href="../feed/feed.html">
                <video src="${urlvideo}" autoplay loop muted playsinline >

                </video>
              
                </a>
             
    </div>
       </div>
    <div class="p-4 space-y-3">
       <div class="flex space-x-4 lg:font-bold">
          <a href="#" class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
             </div>
             <div> Like</div>
          </a>
          <a href="" uk-toggle="target: #view-commentsvideo${idvideo}" class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                   <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                </svg>
             </div>
             <div> Comment</div>
          </a>
          <!-- <a href="#" class="flex items-center space-x-2 flex-1 justify-end">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" class="dark:text-gray-100">
                     <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                 </svg>
             </div>
             <div> Share</div>
             </a> -->
       </div>
       <div class="flex items-center space-x-3 pt-2">
          <div class="flex items-center"> 
             <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"> 
             <img src="../assets/images/avatars/avatar-4.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
             <img src="../assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
          </div>
          <div class="dark:text-gray-100">  
             <a href="" uk-toggle="target: #see_user_liked">
                <strong> 209 Liked it </strong>
             </a>
          
          </div>
       </div>
       <div hidden id="view-commentsvideo${idvideo}" class="border-t py-4 space-y-4 dark:border-gray-600">
       ${this.forCommentVideo()}
       </div>

   
       <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
          <input placeholder="Add your Comment.." class="bg-transparent max-h-10 shadow-none px-5">
          <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
             <a href="#">
                <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
             </a>
          </div>
       </div>
    </div>
 </div>
 <br>
    `;
    return html_video
    }
//********************************************* */

 static forCommentsPost(){
   let html_comments_post="";
   for (let i = 0; i < 3; i++) {
   //   const commentpost = getcommentsposts[i];
     html_comments_post += `
     <div >

         
     <div class="flex">
        <div class="w-10 h-10 rounded-full relative flex-shrink-0"> <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="absolute h-full rounded-full w-full"> </div>
        <div>
           <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
              <p class="leading-6">
                sagsdadsagdsgdsg
              
              </p>
              <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
           </div>
           <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
              <button  class="text-black-600">
                 3
                 <iconify-icon icon="ant-design:like-outlined"></iconify-icon>
                 <!-- <iconify-icon icon="ant-design:like-filled"></iconify-icon> -->
              </button>
              <button uk-toggle="target: #view_subcommentpost${i}" >
                 <iconify-icon icon="akar-icons:comment"></iconify-icon>
                 3
              </button>
              <span> 3d </span> 
           </div>
        </div>
     </div>
     <br>
     <!-- SUBCOMMENTS -->
     <div hidden id="view_subcommentpost${i}"  class="flex-col">
       
        <!-- SEND MESSAGE INPUT -->
        <div class="flex">
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
           <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
              <input placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
              <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                 <button>
                    <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                 </button>
              </div>
           </div>
        </div>
        <br>
     </div>
 </div>
     `;
  }
   return html_comments_post
    }
    static forCommentImage(){
      let html_comment_image="";
      for (let i = 0; i < 3; i++) {

      html_comment_image += `
        <div >
   
            
        <div class="flex">
           <div class="w-10 h-10 rounded-full relative flex-shrink-0"> <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="absolute h-full rounded-full w-full"> </div>
           <div>
              <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
                 <p class="leading-6">
                   sagsdadsagdsgdsg
                 
                 </p>
                 <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
              </div>
              <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                 <button  class="text-black-600">
                    3
                    <iconify-icon icon="ant-design:like-outlined"></iconify-icon>
                    <!-- <iconify-icon icon="ant-design:like-filled"></iconify-icon> -->
                 </button>
                 <button uk-toggle="target: #view_subcommentimage${i}" >
                    <iconify-icon icon="akar-icons:comment"></iconify-icon>
                    3
                 </button>
                 <span> 3d </span> 
              </div>
           </div>
        </div>
        <br>
        <!-- SUBCOMMENTS -->
        <div hidden id="view_subcommentimage${i}"  class="flex-col">
          
           <!-- SEND MESSAGE INPUT -->
           <div class="flex">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
              <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                 <input placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
                 <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                    <button>
                       <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                    </button>
                 </div>
              </div>
           </div>
           <br>
        </div>
    </div>
        `;
     }
      return html_comment_image
       }
   static forCommentVideo(){
         let html_comment_video="";
         for (let i = 0; i < 3; i++) {
   
            html_comment_video += `
           <div >
      
               
           <div class="flex">
              <div class="w-10 h-10 rounded-full relative flex-shrink-0"> <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="absolute h-full rounded-full w-full"> </div>
              <div>
                 <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
                    <p class="leading-6">
                      sagsdadsagdsgdsg
                    
                    </p>
                    <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
                 </div>
                 <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                    <button  class="text-black-600">
                       3
                       <iconify-icon icon="ant-design:like-outlined"></iconify-icon>
                       <!-- <iconify-icon icon="ant-design:like-filled"></iconify-icon> -->
                    </button>
                    <button uk-toggle="target: #view_subcommentvideo${i}" >
                       <iconify-icon icon="akar-icons:comment"></iconify-icon>
                       3
                    </button>
                    <span> 3d </span> 
                 </div>
              </div>
           </div>
           <br>
           <!-- SUBCOMMENTS -->
           <div hidden id="view_subcommentvideo${i}"  class="flex-col">
             
              <!-- SEND MESSAGE INPUT -->
              <div class="flex">
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
                 <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                    <input placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
                    <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                       <button>
                          <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                       </button>
                    </div>
                 </div>
              </div>
              <br>
           </div>
       </div>
           `;
        }
         return html_comment_video;
          }
}

window.addEventListener("load",Profile_Login_User.showdata_getLoginUser);
//IMAGE
const addimageform = document.getElementById('form_profileloginuser_addimage');
addimageform.addEventListener('submit', Profile_Login_User.upload_image_modal);
//IMAGE
const addalbumimageform = document.getElementById('form_albumimages_profileloginuser');
addalbumimageform.addEventListener('submit', Profile_Login_User.add_album_image);

// UPDATE ABOUT
const updatedescriptionform = document.getElementById('profileloginuser_form_updateabout');
updatedescriptionform.addEventListener('submit', Profile_Login_User.update_description_modal);

//IMAGE
const updateImageForm = document.getElementById('form_updateimage_profileloginuser');
updateImageForm.addEventListener('submit', Profile_Login_User.updateImage);

//VIDEO
const addalbumvideoform = document.getElementById('form_albumvideo_profileloginuser');
addalbumvideoform.addEventListener('submit', Profile_Login_User.add_album_video);

//VIDEO
const addvideoform = document.getElementById('form_profileloginuser_addvideo');
addvideoform.addEventListener('submit', Profile_Login_User.upload_video_modal);

//VIDEO
const updatevideoform = document.getElementById('form_updatevideo_profileloginuser');
updatevideoform.addEventListener('submit', Profile_Login_User.updateVideo);
//VIDEO
const buttonDeleteVideo = document.getElementById('button_deletevideomodal_profileuser');
buttonDeleteVideo.addEventListener('click', Profile_Login_User.deleteVideo);

//POST
const addpostform = document.getElementById('form_profileloginuser_addpost');
addpostform.addEventListener('submit', Profile_Login_User.add_post);
//POST
const updatepostform = document.getElementById('form_profileloginuser_updatepost');
updatepostform.addEventListener('submit', Profile_Login_User.updatePost);
//POST
const buttonDeletePost= document.getElementById('button_deletepostmodal_profileuser');
buttonDeletePost.addEventListener('click', Profile_Login_User.deletePost);
