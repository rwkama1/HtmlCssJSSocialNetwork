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

      // LOAD DESCRIPTION MODAL UPDATE DESCRIPTION

      document.getElementById("profileloginuser_txtarea_updateabout").value= description;

      //LOAD ALBUM IMAGES MODAL ADD IMAGE

      await this.loadAlbumImagesUserModal();

      //LOAD ALBUM VIDEOS MODAL ADD VIDEOS
      await this.loadAlbumVideoUserModal();

      // LOAD ALBUMIMAGES LOGIN USER
  
           await this.loadAlbumImagesLoginUser();
   
      // LOAD IMAGES LOGIN USER
  
      await this.loadImagesLoginUser(iduser);

      // LOAD ALBUM VIDEOS LOGIN USER
      await this.loadAlbumVideosLoginUser();


      // LOAD VIDEOS LOGIN USER
        await this.loadVideosLoginUser();


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
  let getimagesuser = await APIRESTImages.getImagesByLoginUser(iduser);
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

}
document.addEventListener("DOMContentLoaded",Profile_Login_User.showdata_getLoginUser);


const addimageform = document.getElementById('form_profileloginuser_addimage');
addimageform.addEventListener('submit', Profile_Login_User.upload_image_modal);

const addalbumimageform = document.getElementById('form_albumimages_profileloginuser');
addalbumimageform.addEventListener('submit', Profile_Login_User.add_album_image);

const updatedescriptionform = document.getElementById('profileloginuser_form_updateabout');
updatedescriptionform.addEventListener('submit', Profile_Login_User.update_description_modal);


const updateImageForm = document.getElementById('form_updateimage_profileloginuser');
updateImageForm.addEventListener('submit', Profile_Login_User.updateImage);


const addalbumvideoform = document.getElementById('form_albumvideo_profileloginuser');
addalbumvideoform.addEventListener('submit', Profile_Login_User.add_album_video);

const addvideoform = document.getElementById('form_profileloginuser_addvideo');
addvideoform.addEventListener('submit', Profile_Login_User.upload_video_modal);


const addpostform = document.getElementById('form_profileloginuser_addpost');
addpostform.addEventListener('submit', Profile_Login_User.add_post);