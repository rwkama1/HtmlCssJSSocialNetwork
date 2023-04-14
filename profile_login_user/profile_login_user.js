 class  Profile_Login_User

{ 
 
   static async sessionLoginUser() {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
      let getuser = await APIRESTUser.getUser(sessionuser.iduser, sessionuser.iduser, sessionuser.userrname);
      return getuser;
    }

    //LOAD PAGE
    
    static showdata_getLoginUser=async()=>
    {
      setTimeout(async () => {
      try {
      
      let getuserlogin=await this.sessionLoginUser();
      
       let {iduser,name,email,ocupattion,urlfacebook,country
         ,urlinstagram,urllinkedin,urltwitter,description,
         userrname,image,coverphoto
       }=getuserlogin;


  

   //SHOW IMAGE COVER PROFILE


   this.showImageCoverProfile(image, coverphoto);
   
   //  //SHOW NAME DESCRIPTION PROFILE
 
     this.loadNameDescriptionUser(description, name);

         // SHOW  IMAGE PROFILE TIMELINE ADD POST
         if(image==="")
         {
            image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
         }
         let addpost_imageprofile= document.getElementById("profileloginuser_imageprofile_timeline_addpost");
         addpost_imageprofile.src=image;
   

      // LOAD DESCRIPTION MODAL UPDATE DESCRIPTION

      document.getElementById("profileloginuser_txtarea_updateabout").value= description;


     


       //TIMELINE
       await this.load_timeline(iduser,userrname);

    

        // LOAD VIDEOS LOGIN USER
        await this.loadVideosLoginUser(iduser);


     // LOAD ALBUM VIDEOS LOGIN USER
     await this.loadAlbumVideosLoginUser();


         // LOAD ALBUM VIDEOS MODAL ADD VIDEOS
      await this.loadAlbumVideoUserModal();

    


      //LOAD ALBUM IMAGES MODAL ADD IMAGE

      await this.loadAlbumImagesUserModal();

   

      //LOAD ALBUMIMAGES LOGIN USER
  
          await this.loadAlbumImagesLoginUser();
   
      //LOAD IMAGES LOGIN USER
  
      await this.loadImagesLoginUser(iduser);



    //LOAD POST LOGIN USER
  
      await this.loadPostLoginUser();
      

      const buttonDeleteImage = document.getElementById('button_deleteimagemodal_profileuser');
      buttonDeleteImage.addEventListener('click', Profile_Login_User.deleteImage);



     } catch (error) {
      console.error(error);
   //   alert(error);
   //   window.location.href="../index.html";
   
     }
   },1000);
     } 

//TIMELINE

static load_timeline=async(iduser,usernamelogin)=>
{
  let getPhotoPostVideoByUser = await APIRESTImageVideoPost.getPhotoPostVideoByLoginUser(iduser);
  // console.log(getPhotoPostVideoByUser);
  let html_load_postvideoimage = '';
  let html_load_postvideoimage_more = '';
  for (let i = 0; i < Math.min(getPhotoPostVideoByUser.length, 15); i++) {
    let getpostimagevideo=getPhotoPostVideoByUser[i];
 
    if (i >= 3) {
     
        if (getpostimagevideo.type==="P") {

         // let commentposts=await APIRESTPostComment.getCommentPostByPost(getpostimagevideo.id);
         html_load_postvideoimage_more+= await this.html_Post_TimeLine(getpostimagevideo,usernamelogin);
         
       } else if (getpostimagevideo.type==="I"){
         html_load_postvideoimage_more+= await this.html_Image_TimeLine(getpostimagevideo,usernamelogin);
       }
       else
       {
         html_load_postvideoimage_more+= await this.html_Video_TimeLine(getpostimagevideo,usernamelogin);
       }
  

    } else {
      if (getpostimagevideo.type==="P") {
        
         html_load_postvideoimage+= await this.html_Post_TimeLine(getpostimagevideo,usernamelogin);
     
      } else if (getpostimagevideo.type==="I"){
        html_load_postvideoimage+= await this.html_Image_TimeLine(getpostimagevideo,usernamelogin);
      }
      else
      {
        html_load_postvideoimage+= await this.html_Video_TimeLine(getpostimagevideo,usernamelogin);
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
         let getuserlogin=await this.sessionLoginUser();
          const response_update= await APIRESTUser.updateDescription(description,getuserlogin.iduser,getuserlogin.userrname);
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
        let getuserlogin = JSON.parse(sessionStorage.getItem('user_login'));
        document.getElementById("create-image-modal").classList.add("cursor-loading");
       const title = document.getElementById('profileloginuser_uploadimage_title').value;
        const idalbumphoto = document.getElementById('profileloginuser_select_albumimages').value;
        const description = document.getElementById('profileloginuser_uploadimage_description').value;
        const visibility = document.getElementById('profileloginuser_uploadimage_visibility').value;
        let fileimageprofile = document.getElementById('uploadoneimage').files[0];
  
       
      let urlimage=await APIRESTCloudinary.upload_image(fileimageprofile,getuserlogin.iduser);
        const dataform = {title
          ,idalbumphoto,visibility,description,urlimage}
      


         const response_upload_image= await APIRESTImages.addImage(dataform,
            getuserlogin.iduser,getuserlogin.userrname);
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
        let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
        document.getElementById("create_album_images_modal").classList.add("cursor-loading");
          let arrayurlimages=[];
        const title=  document.getElementById('titlealbum_profileloginuser').value; 
          let filesalbumimages = SelectData.getSelectMultipleImages();
          for (let i = 0; i < filesalbumimages.length; i++) {
              const fileimage = filesalbumimages[i] ;
           
              let urlimage=await APIRESTCloudinary.upload_image(fileimage,getulogin.iduser);
              arrayurlimages.push(urlimage);
          }
      
        //      let urlimage=await APIRESTCloudinary.upload_image(fileimageprofile);
         
         
         const response_upload_albumimage= await APIRESTAlbumImage.add_album_image(title,arrayurlimages,getulogin.iduser,
            getulogin.userrname);
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
        let getuserlogin = JSON.parse(sessionStorage.getItem('user_login'));
        const idimage = document.getElementById('idphoto_updateimage_profileloginuser').value;
        const title = document.getElementById('title_updateimage_profileloginuser').value;
         const description = document.getElementById('description_updateimage_profileloginuser').value;
       
         const visibility = document.getElementById('visibility_updateimage_profileloginuser').value;
        
           
         const dataform = {idimage,title
           ,description,visibility}
       
          const response_upload_image= await APIRESTImages.updateImage(dataform,getuserlogin.iduser
            ,getuserlogin.userrname);
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
         let getuserlogin = JSON.parse(sessionStorage.getItem('user_login'));
        const idimage = document.getElementById('idphoto_deleteimagemodal_profileloginuser').value;
       
       
          const response_delete_image= await APIRESTImages.deleteImage(idimage,getuserlogin.iduser,getuserlogin.userrname);
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
      let getuserlogin = JSON.parse(sessionStorage.getItem('user_login'));
      const response_getimage= await APIRESTImages.getImage(id,getuserlogin.iduser
         ,getuserlogin.userrname);
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
       let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
       document.getElementById("create-video-modal").classList.add("cursor-loading");
       const title = document.getElementById('profileloginuser_uploadvideo_title').value;
        const idalbumvideo = document.getElementById('profileloginuser_select_albumvideos').value;
        const description = document.getElementById('profileloginuser_uploadvideo_description').value;
        const visibility = document.getElementById('profileloginuser_uploadvideo_visibility').value;
        let filevideo = document.getElementById('uploadonevideo').files[0];
   
       
      let urlvideo=await APIRESTCloudinary.upload_video(filevideo,getulogin.iduser);
        const dataform = {title
          ,idalbumvideo,visibility,description,urlvideo}
      
         const response_upload_video= await APIRESTVideo.addVideo(dataform,getulogin.iduser,getulogin.userrname);
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
       let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
       document.getElementById("create-album-video-modal").classList.add("cursor-loading");
          let arrayurlvideo=[];
          const title=  document.getElementById('titlealbumvideo_profileloginuser').value; 
          let filesalbumvideos= SelectData.getSelectMultipleVideos();
          for (let i = 0; i < filesalbumvideos.length; i++) {
              const filevideos = filesalbumvideos[i] ;
             
              let urlvideo=await APIRESTCloudinary.upload_video(filevideos,getulogin.iduser);
              arrayurlvideo.push(urlvideo);
          }
      
        //      let urlimage=await APIRESTCloudinary.upload_image(fileimageprofile);
         
         
         const response_upload_albumvideo= await APIRESTAlbumVideo.add_album_video(title,arrayurlvideo,
            getulogin.iduser,getulogin.userrname);
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
        let getuserlogin = JSON.parse(sessionStorage.getItem('user_login'));
        const idvideo = document.getElementById('profileloginuser_updatevideo_idvideo').value;
        const title = document.getElementById('profileloginuser_updatevideo_name').value;
         const description = document.getElementById('profileloginuser_updatevideo_description').value;       
         const visibility = document.getElementById('profileloginuser_updatevideo_visibility').value;
        
           
         const dataform = {idvideo,title
           ,description,visibility}
       
          const response_upload_video= await APIRESTVideo.updateVideo(dataform,getuserlogin.iduser,
            getuserlogin.userrname);
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
         let getuserlogin = JSON.parse(sessionStorage.getItem('user_login'));
        const idvideo = document.getElementById('idvideo_deletevideomodal_profileloginuser').value;
       
       
          const response_delete_video= await APIRESTVideo.deleteVideo(idvideo,getuserlogin.iduser,
            getuserlogin.userrname);
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
      let getuserlogin = JSON.parse(sessionStorage.getItem('user_login'));
      const response_getvideo= await APIRESTVideo.getVideo(id,getuserlogin.iduser,
         getuserlogin.userrname);
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
      document.getElementById('idvideo_deletevideomodal_profileloginuser').value=id;
   
    }

    //#endregion VIDEOS

    //#region POST

    static add_post=async(event)=>
    {
      try {
        event.preventDefault();
        let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
       const title = document.getElementById('profileloginuser_addpost_name').value;
    
        const description = document.getElementById('profileloginuser_addpost_description').value;
        const visibility = document.getElementById('profileloginuser_addpost_visibility').value;
   
        const dataform = {title
          ,visibility,description}
      
         const response_post= await APIRESTPost.addPost(dataform,getulogin.iduser,
            getulogin.userrname);
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
        let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
        const idpost = document.getElementById('idpost_updatepost_profileloginuser').value;
        const title = document.getElementById('profileloginuser_updatepost_name').value;
         const description = document.getElementById('profileloginuser_updatepost_description').value;       
         const visibility = document.getElementById('profileloginuser_updatepost_visibility').value;
        
           
         const dataform = {idpost,title
           ,description,visibility}
       
          const response_upload_post= await APIRESTPost.updatePost(dataform,
            getulogin.iduser,
            getulogin.userrname);
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
         let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
        const idpost = document.getElementById('idpost_deletepostmodal_profileloginuser').value;
       
       
          const response_delete_post= await APIRESTPost.deletePost(idpost,
            getulogin.iduser,
            getulogin.userrname);
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
      let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
      const response_getpost= await APIRESTPost.getPost(id,
         getulogin.iduser,
         getulogin.userrname);
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
   let getuser = JSON.parse(sessionStorage.getItem('user_login'));
  let getalbumimagesuser = await APIRESTAlbumImage.getAlbumImageByLoginUser(getuser.iduser,getuser.userrname);
  
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
              <a 
              href="../images/image_watch.html"
              onclick="Profile_Login_User.passidtoImageWatch('${getimagesuser[i].idphoto}');"
              >
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
              <a
              href="../images/image_watch.html"
              onclick="Profile_Login_User.passidtoImageWatch('${getimagesuser[i].idphoto}');"
              >
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
static async loadPostLoginUser() {
   let getuser=await this.sessionLoginUser();
   let getpostuser = await APIRESTPost.getPostByLoginUser(getuser.iduser,getuser.userrname);
   document.getElementById("profileloginuser_span_postcount").innerHTML = getpostuser.length;
   let html_load_post = '';
 
   for (let i = 0; i < getpostuser.length; i++) {
     let userProfileImage = getpostuser[i].user.image;
     if(userProfileImage==="")
     {
      userProfileImage=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
     }
    
    let idpost=getpostuser[i].idpost;
     let postTitle = getpostuser[i].title;
     let stringpostedago = getpostuser[i].stringpostedago;
     
     let postdescription = getpostuser[i].description;
     // let postdescription = getpostuser[i].description;

 let countpostcomments=await APIRESTPostComment.NumberOfCommentPost(idpost);
     if (i >= 3) {
       html_load_post += `
           <li hidden id="morepost">
           <div class="flex items-start space-x-5 p-7">
               <img src="${userProfileImage}" alt="" class="w-12 h-12 rounded-full">
               <div class="flex-1">
                   <a
                    href="../posts/post_watch.html"
                   onclick="Profile_Login_User.passidtoPostWatch('${idpost}');"
                    class="text-lg font-semibold line-clamp-1 mb-1"> ${postTitle} </a>
                   <p class="text-sm text-gray-400 mb-2"><span data-href="%40tag-dev.html">${stringpostedago}</span></p>
                 <p class="leading-6 line-clamp-2 mt-3">${postdescription}</p>
               </div>
               <div class="sm:flex items-center space-x-4 hidden">
                   <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                   <span class="text-xl"> ${countpostcomments} </span>
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
                     <a 
                     href="../posts/post_watch.html"
                     onclick="Profile_Login_User.passidtoPostWatch('${idpost}');"
                     class="text-lg font-semibold line-clamp-1 mb-1">${postTitle}  </a>
                     <p class="text-sm text-gray-400 mb-2">  <span data-href="%40tag-dev.html">${stringpostedago}</span>  </p>
                     <p class="leading-6 line-clamp-2 mt-3">${postdescription}</p>
                 </div>
                 <div class="sm:flex items-center space-x-4 hidden">
                     <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" 
                     xmlns="http://www.w3.org/2000/svg">
                     <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                     <span class="text-xl"> ${countpostcomments} </span>
                 </div>
             </div>
         </li>

         `;
     }
   }
 
 
   document.getElementById("profileloginuser_listposts_ul").innerHTML = html_load_post;
 }
//GET ALBUM VIDEOS LOGIN USER
static async loadAlbumVideosLoginUser() {
   let getuser = JSON.parse(sessionStorage.getItem('user_login'));
  let getalbumvideosuser = await APIRESTAlbumVideo.getAlbumVideoseByLoginUser(getuser.iduser,getuser.userrname);
  
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
         <a 
         href="../videos/video_watch.html"
         onclick="Profile_Login_User.passidtoVideoWatch('${getVideosByLoginUser[i].idvideo}');"

               >
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
         <a 
         href="../videos/video_watch.html"
         onclick="Profile_Login_User.passidtoVideoWatch('${getVideosByLoginUser[i].idvideo}');"

         >
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
   let getuser = JSON.parse(sessionStorage.getItem('user_login'));
  let getalbumimagesuser = await APIRESTAlbumImage.getAlbumImageByLoginUser(getuser.iduser,getuser.userrname);
  let load_albums_image = "";
  for (let i = 0; i < getalbumimagesuser.length; i++) {
    load_albums_image += `<option value=${getalbumimagesuser[i].idalbumphoto}>${getalbumimagesuser[i].title}</option>`;
  }

  document.getElementById("profileloginuser_select_albumimages").innerHTML = load_albums_image;
}




//GET TITLE ALBUM IN ADD MODAL VIDEO
static async loadAlbumVideoUserModal() {
   let getuser = JSON.parse(sessionStorage.getItem('user_login'));
   let getalbumvideosuser = await APIRESTAlbumVideo.getAlbumVideoseByLoginUser(getuser.iduser,getuser.userrname);
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
            <a 
            href="../images/image_watch.html"
              onclick="Profile_Login_User.passidtoImageWatch('${images[i].idphoto}');"
            >
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
      <a 
      href="../videos/video_watch.html"
         onclick="Profile_Login_User.passidtoVideoWatch('${videos[i].idvideo}');"
      >
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
// SHOW POST VIDEO IMAGE HTML
  static async html_Post_TimeLine(getpost,usernamelogin)
{

   //GET POST
   let userImageProfile=getpost.user.image;
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idpost=getpost.id;
   let likespost=getpost.likes;
   let iduserlogin=getpost.user.iduser;
   let userName=getpost.user.name;
   let stringpostedago=getpost.stringpostedago;
   let description=getpost.description;

 
//NUMBER COMMENT POSTS
 
      let NumberOfCommentPost=await  APIRESTPostComment.NumberOfCommentPost(idpost);


 // let forCommentsPost=await this.forCommentsPost(listcommentpost,idpost,iduserlogin,usernamelogin) 
//  ${forCommentsPost}
  //SHOW EXISTLIKEPOST
  let existLikePost=await this.exist_like_post(idpost,iduserlogin,usernamelogin);

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
        <button 
        onclick="Profile_Login_User.like_dislike_Post('${idpost}','${iduserlogin}','${usernamelogin}',event);"  
        class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
              <svg
              id="svg_profileloginuser_timeline_likepost${idpost}"
               xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="${existLikePost}" 
              width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
           </div>
           <div id="profileloginuser_timeline_numberlikespost${idpost}"> ${likespost}</div>
        </button>
        <button 
        onclick="Profile_Login_User.show_comment_posts('${idpost}','${iduserlogin}','${usernamelogin}');"  
         uk-toggle="target: #view-commentspost${idpost}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
              </svg>
           </div>
           <div id="profileloginuser_timeline_numbercommentpost${idpost}"> ${NumberOfCommentPost} </div>
        </button>


     </div>
    
     <div hidden id="view-commentspost${idpost}" class="border-t py-4 space-y-4 dark:border-gray-600">
        <div id="profileloginuser_commentspost${idpost}">  
    
        <!-- COMMENT -->
        </div>   
     </div> 
       <!-- END VIEWCOMMENTPOST -->
     
     <!-- <a href="" class="hover:text-blue-600 hover:underline">  View more comments </a> -->
     

     <form
     id="form_profileloginuser_addCommentPost${idpost}"
     onsubmit="Profile_Login_User.addCommentPost('${idpost}','${iduserlogin}','${usernamelogin}', event);"
     >
     <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
        <input id="profileloginuser_textcommentpost${idpost}" required placeholder="Add your Comment.." required required class="bg-transparent max-h-10 shadow-none px-5">
        <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
           <button id="profiloginuser_buttonaddcomment_${idpost}" type="submit">
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
  static async html_Image_TimeLine(getimage,usernamelogin)
{
   let userImageProfile=getimage.user.image;
   
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idimage=getimage.id;
   let likeimage=getimage.likes;
   let userName=getimage.user.name;
   let iduserlogin=getimage.user.iduser;
   let stringpostedago=getimage.stringpostedago;
   let urlimage=getimage.url;

//NUMBER COMMENT IMAGE
 
let NumberOfCommentImage=await  APIRESTImageComment.NumberOfCommentImage(idimage);


// let forCommentsPost=await this.forCommentsPost(listcommentpost,idpost,iduserlogin,usernamelogin) 
//  ${forCommentsPost}
 //SHOW EXISTLIKEIMAGE
 let exist_like_image=await this.exist_like_image(idimage,iduserlogin,usernamelogin);


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
       
              <a href="../images/image_watch.html"
              onclick="Profile_Login_User.passidtoImageWatch('${idimage}');"
              >
                 <img src="${urlimage}" alt="" uk-responsive>
                 </a>
      
     </div>
 
  <!-- </div> -->
  <div class="p-4 space-y-3">
     <div class="flex space-x-4 lg:font-bold">
        <button 
        onclick="Profile_Login_User.like_dislike_Image('${idimage}','${iduserlogin}','${usernamelogin}',event);"  
         class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg 
              id="svg_profileloginuser_timeline_likeimage${idimage}"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" fill="${exist_like_image}"
               width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
           </div>
           <div id="profileloginuser_timeline_numberlikesimage${idimage}"> ${likeimage}</div>
        </button>
        <a href=""
        onclick="Profile_Login_User.show_comment_images('${idimage}','${iduserlogin}','${usernamelogin}');"  
         uk-toggle="target: #view-commentsimage${idimage}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
           </div>
           <div id="profileloginuser_timeline_numbercommentimage${idimage}"> ${NumberOfCommentImage}</div>
        </a>
      
     </div>
    
     <div hidden id="view-commentsimage${idimage}" class="border-t py-4 space-y-4 dark:border-gray-600">
     <!-- COMMENT -->
     <div id="profileloginuser_commentimage${idimage}">  
    
   
     </div>  
 
       
      
    </div> 
    
    <form
    id="form_profileloginuser_addCommentImage${idimage}"
    onsubmit="Profile_Login_User.addCommentImage('${idimage}','${iduserlogin}','${usernamelogin}', event);"
    >
    <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
       <input id="profileloginuser_textcommentimage${idimage}" placeholder="Add your Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
       <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
          <button id="profiloginuser_buttonaddcomment_${idimage}" type="submit">
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
  static async html_Video_TimeLine(getvideo,usernamelogin)
  {
   let userImageProfile=getvideo.user.image;
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idvideo=getvideo.id;
   let likevideo=getvideo.likes;
   let userName=getvideo.user.name;
   let iduserlogin=getvideo.user.iduser;
   let stringpostedago=getvideo.stringpostedago;
   let urlvideo=getvideo.url;

  // NUMBER COMMENT VIDEO
 
let NumberOfCommentVideo=await  APIRESTVideoComment.NumberOfCommentVideo(idvideo);


 //SHOW EXISTLIKEVIDEO
 let exist_like_video=await this.exist_like_video(idvideo,iduserlogin,usernamelogin);
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
                     <a href="" uk-toggle="target: #delete_video_modal"
                     onclick="Profile_Login_User.showIdDeleteModalVideo('${idvideo}');"
                       class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                         <i class="uil-trash-alt mr-1"></i> Delete </a>
                  </li>
               </ul>
            </div>
         </div>
    </div>
    <!-- VIDEO -->
    <div class="w-full h-full">

          <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
         
               <a 
               href="../videos/video_watch.html"
               onclick="Profile_Login_User.passidtoVideoWatch('${idvideo}');"
               >
                <video src="${urlvideo}" autoplay loop muted playsinline >

                </video>
              
                </a>
             
    </div>
       </div>
    <div class="p-4 space-y-3">
       <div class="flex space-x-4 lg:font-bold">
          <button 
          onclick="Profile_Login_User.like_dislike_Video('${idvideo}','${iduserlogin}','${usernamelogin}',event);"  
          
          class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg 
                id="svg_profileloginuser_timeline_likevideo${idvideo}"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="${exist_like_video}"
                 width="22" height="22" class="dark:text-gray-100">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
             </div>
             <div id="profileloginuser_timeline_numberlikesvideo${idvideo}" > ${likevideo}</div>
          </button>

          <a href="" 
          onclick="Profile_Login_User.show_comment_videos('${idvideo}','${iduserlogin}','${usernamelogin}');"  
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
             <div id="profileloginuser_timeline_numbercommentvideo${idvideo}"> ${NumberOfCommentVideo}</div>
          </a>
          
       </div>
      
       <div hidden id="view-commentsvideo${idvideo}" class="border-t py-4 space-y-4 dark:border-gray-600">
     
       <div id="profileloginuser_commentvideo${idvideo}">  
    
   
       </div>  
     
       </div>

       <form
       id="form_profileloginuser_addCommentVideo${idvideo}"
       onsubmit="Profile_Login_User.addCommentVideo('${idvideo}','${iduserlogin}','${usernamelogin}', event);"
       >
       <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
          <input id="profileloginuser_textcommentvideo${idvideo}" placeholder="Add your Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
          <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
             <button id="profiloginuser_buttonaddcomment_${idvideo}" type="submit">
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
 document.getElementById(`profileloginuser_commentspost${idpost}`).innerHTML=forCommentsPost;
// profileloginuser_commentspost${idpost}
}
static async show_comment_images(idimage,iduserlogin,usernamelogin)
{
   let listcommentimage=await  APIRESTImageComment.getCommentImageByImage(idimage,
      iduserlogin,usernamelogin);
 let forCommentImage=await this.forCommentImage(listcommentimage,idimage,iduserlogin,usernamelogin);
 document.getElementById(`profileloginuser_commentimage${idimage}`).innerHTML=forCommentImage;
// profileloginuser_commentspost${idpost}
}
static async show_comment_videos(idvideo,iduserlogin,usernamelogin)
{
   let listcommentvideo=await  APIRESTVideoComment.getCommentVideoByVideo(idvideo,
      iduserlogin,usernamelogin);
 let forCommentVideo=await this.forCommentVideo(listcommentvideo,idvideo,iduserlogin,usernamelogin);
 document.getElementById(`profileloginuser_commentvideo${idvideo}`).innerHTML=forCommentVideo;
// profileloginuser_commentspost${idpost}
}
//LOAD COMMENTS
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
      // let listsubcommentpost=await APIRESTSubComment.getSubCommentByComment(
      //    iduserlogin,
      //    idcomment);
      //    let numberofsubcomments=listsubcommentpost.length;
      //    let forSubCommentPost="";
      //    if(numberofsubcomments!==0)
      //    {
      //       forSubCommentPost = await this.forSubCommentPost(listsubcommentpost,idcomment, iduserlogin,username);
      //    }
            let NumberOfSubComments=await APIRESTSubComment.NumberOfSubComments
            (idcomment);
   
         const exist_like_comment = await this.exist_like_comment(idcomment,iduserlogin,username);
         let show_edit_delete_comment =await this.show_edit_delete_comment(idpost,idcomment,iduserlogin,username);
         html_comments_post += `
         <div id="profileloginuser_div_listcommentpost${idcomment}" >

               
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="profileloginuser_p_textcommentpost${idcomment}" class="leading-6">
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
                              onclick="Profile_Login_User.showtextcommentUpdateModalComment_Post
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
                              onclick="Profile_Login_User.showIdDeleteModalComment_Post('${idcomment}',
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
                  onclick="Profile_Login_User.like_dislike_Comment('${idcomment}',
                    '${iduserlogin}','${username}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="profileloginuser_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                     <span id="profileloginuser_span_likecomment${idcomment}">${likescomment}</span>
                  

                  </button>
                  <button 
                  onclick="Profile_Login_User.show_subcomment_post('${idcomment}',
                    '${iduserlogin}','${username}');"
                  uk-toggle="target: #view_subcommentpost${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="profileloginuser_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentpost${idcomment}" class="flex-col">
            
               <div>
                  <div id="profileloginuser_listupdatesubcomments${idcomment}">
                 
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_profileloginuser_addSubCommentPost${idcomment}"
           onsubmit="Profile_Login_User.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="profileloginuser_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
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
         let NumberOfSubComments=await APIRESTSubComment.NumberOfSubComments
         (idcomment);

      const exist_like_comment = await this.exist_like_comment(idcomment,iduserlogin,username);
      let show_edit_delete_comment =await this.show_edit_delete_commentImage(idimage,idcomment,iduserlogin,username);

         html_comment_image += `
         <div id="profileloginuser_div_listcommentimage${idcomment}" >

               
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="profileloginuser_p_textcommentimage${idcomment}" class="leading-6">
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
                              onclick="Profile_Login_User.showtextcommentUpdateModalComment_Image
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
                              onclick="Profile_Login_User.showIdDeleteModalComment_Image('${idcomment}',
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
                  onclick="Profile_Login_User.like_dislike_Comment('${idcomment}',
                    '${iduserlogin}','${username}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="profileloginuser_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                     <span id="profileloginuser_span_likecomment${idcomment}">${likescomment}</span>
                  

                  </button>
                  <button 
                  onclick="Profile_Login_User.show_subcomment_post('${idcomment}',
                    '${iduserlogin}','${username}');"
                  uk-toggle="target: #view_subcommentimage${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="profileloginuser_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentimage${idcomment}" class="flex-col">
            
               <div>
                  <div id="profileloginuser_listupdatesubcomments${idcomment}">
                 
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_profileloginuser_addSubCommentPost${idcomment}"
           onsubmit="Profile_Login_User.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="profileloginuser_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
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
            let NumberOfSubComments=await APIRESTSubComment.NumberOfSubComments
            (idcomment);
   
         const exist_like_comment = await this.exist_like_comment(idcomment,iduserlogin,username);
         let show_edit_delete_comment =await this.show_edit_delete_commentVideo(idvideo,idcomment,iduserlogin,username);
   
            html_comment_video += `
            <div id="profileloginuser_div_listcommentvideo${idcomment}" >

               
            <div class="flex">
               <div class="w-10 h-10 rounded-full relative flex-shrink-0">
                  <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
                  </div>
               <div >
                  <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
                  <div class="flex">
                  <p id="profileloginuser_p_textcommentvideo${idcomment}" class="leading-6">
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
                                 onclick="Profile_Login_User.showtextcommentUpdateModalComment_Video
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
                                 onclick="Profile_Login_User.showIdDeleteModalComment_Video('${idcomment}',
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
                     onclick="Profile_Login_User.like_dislike_Comment('${idcomment}',
                       '${iduserlogin}','${username}',event);"
                      class="text-black-600">
                    
                        <iconify-icon id="profileloginuser_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                        <span id="profileloginuser_span_likecomment${idcomment}">${likescomment}</span>
                     
   
                     </button>
                     <button 
                     onclick="Profile_Login_User.show_subcomment_post('${idcomment}',
                       '${iduserlogin}','${username}');"
                     uk-toggle="target: #view_subcommentvideo${idcomment}" >
                        <iconify-icon icon="akar-icons:comment"></iconify-icon>
                        <span id="profileloginuser_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                        
                     </button>
                     <span> ${stringpostedago} </span> 
                  </div>
               </div>
            </div>
            <br>
            <!-- SUBCOMMENTS -->
            <div hidden id="view_subcommentvideo${idcomment}" class="flex-col">
               
                  <div>
                     <div id="profileloginuser_listupdatesubcomments${idcomment}">
                    
                     </div>
                  </div>
               <!-- SEND MESSAGE INPUT -->
               <form 
               id="form_profileloginuser_addSubCommentPost${idcomment}"
              onsubmit="Profile_Login_User.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
              >
               <div class="flex">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
                  <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                     <input id="profileloginuser_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
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
  static show_edit_delete_comment=async(idpost,idcomment,iduserlogin,userrname)=>
          {
            let hidden="";
            let existLikeComment=await APIRESTPostComment.existCommentPost(idpost,idcomment,iduserlogin,userrname);
            if (existLikeComment) {
              hidden="";
            } else {
              hidden="hidden"  
            }
            return hidden;
          }
 static show_edit_delete_commentImage=async(idimage,idcomment,iduserlogin,userrname)=>
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
 static show_edit_delete_commentVideo=async(idvideo,idcomment,iduserlogin,userrname)=>
          {
            let hidden="";
            let existLikeComment=await APIRESTVideoComment.existCommentVideo(idvideo,idcomment,iduserlogin,userrname);
            if (existLikeComment) {
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
        const textcomment = document.getElementById(`profileloginuser_textcommentpost${idpost}`).value;

        const commentPost= await APIRESTPostComment.commentPost(idpost,
         textcomment,iduserlogin,usernamelogin);
          if (commentPost) {
   
          messagenotification('Comment Added','success',event);
   
         await this.showAddedCommentPost(idpost,iduserlogin,usernamelogin);
         
          document.getElementById(`profileloginuser_textcommentpost${idpost}`).value="";
         }
     }catch (error) {
       alert(error);
     }
     }
     static addCommentImage=async(idimage,iduserlogin,usernamelogin,event)=>
     {
       try {
         event.preventDefault();
        const textcomment = document.getElementById(`profileloginuser_textcommentimage${idimage}`).value;

        const commmentImage= await APIRESTImageComment.commmentImage(idimage,
         textcomment,iduserlogin,usernamelogin);
          if (commmentImage) {
   
          messagenotification('Comment Added','success',event);
   
         await this.showAddedCommentImage(idimage,iduserlogin,usernamelogin);
         
          document.getElementById(`profileloginuser_textcommentimage${idimage}`).value="";
         }
     }catch (error) {
       alert(error);
     }
     }
     static addCommentVideo=async(idvideo,iduserlogin,usernamelogin,event)=>
     {
       try {
         event.preventDefault();
        const textcomment = document.getElementById(`profileloginuser_textcommentvideo${idvideo}`).value;

        const commmentVideo= await APIRESTVideoComment.commmentVideo(idvideo,
         textcomment,iduserlogin,usernamelogin);
          if (commmentVideo) {
   
          messagenotification('Comment Added','success',event);
   
         await this.showAddedCommentVideo(idvideo,iduserlogin,usernamelogin);
         
          document.getElementById(`profileloginuser_textcommentvideo${idvideo}`).value="";
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
    let idcomment=document.getElementById("profileloginuser_idcomment_updatecomment").value;
    let idpost=document.getElementById("profileloginuser_idpost_updatecomment").value;
    let iduserlogin=document.getElementById("profileloginuser_iduserlogin_updatecomment").value;
    let usernamelogin=document.getElementById("profileloginuser_usernamelogin_updatecomment").value;
   const textcomment = document.getElementById('profileloginuser_text_updatecomment').value;

   const editcommentPost= await APIRESTPostComment.editcommentPost(idcomment,idpost,
    textcomment,iduserlogin,usernamelogin);
   if (editcommentPost) {
 
     messagenotification('Comment Updated','success',event);

   this.showUpdatedCommentPost(idcomment,textcomment);
     
 

    //  setInterval(() => {
    //   location.reload();
    //  }, 1000);
     document.getElementById('profileloginuser_text_updatecomment').value="";
    }
}catch (error) {
  alert(error);
}
}   
static updateCommentImage=async(event)=>
{
  try {
    event.preventDefault();
    let idcomment=document.getElementById("profileloginuser_idcomment_updatecommentImage").value;
    let idimage=document.getElementById("profileloginuser_idimage_updatecommentImage").value;
    let iduserlogin=document.getElementById("profileloginuser_iduserlogin_updatecommentImage").value;
    let usernamelogin=document.getElementById("profileloginuser_usernamelogin_updatecommentImage").value;
   const textcomment = document.getElementById('profileloginuser_text_updatecommentImage').value;

   const editcommentImage= await APIRESTImageComment.editcommentImage(idcomment,idimage,
    textcomment,iduserlogin,usernamelogin);
   if (editcommentImage) {
 
     messagenotification('Comment Updated','success',event);

   this.showUpdatedCommentImage(idcomment,textcomment);
     
 

    //  setInterval(() => {
    //   location.reload();
    //  }, 1000);
     document.getElementById('profileloginuser_text_updatecommentImage').value="";
    }
}catch (error) {
  alert(error);
}
}  
static updateCommentVideo=async(event)=>
{
  try {
    event.preventDefault();
    let idcomment=document.getElementById("profileloginuser_idcomment_updatecommentVideo").value;
    let idvideo=document.getElementById("profileloginuser_idvideo_updatecommentVideo").value;
    let iduserlogin=document.getElementById("profileloginuser_iduserlogin_updatecommentVideo").value;
    let usernamelogin=document.getElementById("profileloginuser_usernamelogin_updatecommentVideo").value;
   const textcomment = document.getElementById('profileloginuser_text_updatecommentVideo').value;

   const editcommentVideo= await APIRESTVideoComment.editcommentVideo(idcomment,idvideo,
    textcomment,iduserlogin,usernamelogin);
   if (editcommentVideo) {
 
     messagenotification('Comment Updated','success',event);

   this.showUpdatedCommentVideo(idcomment,textcomment);
     
 

    //  setInterval(() => {
    //   location.reload();
    //  }, 1000);
     document.getElementById('profileloginuser_text_updatecommentVideo').value="";
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
    let idcomment=document.getElementById("profileloginuser_idcomment_deletecommentmodal").value;
    let idpost=document.getElementById("profileloginuser_idpost_deletecommentmodal").value;
    let iduserlogin=document.getElementById("profileloginuser_iduserlogin_deletecommentmodal").value;
    let usernamelogin=document.getElementById("profileloginuser_usernamelogin_deletecommentmodal").value;
  

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
    let idcomment=SelectData.showcommentDeleteModal.idcomment;
    let idimage=SelectData.showcommentDeleteModal.idimage;
    let iduserlogin=SelectData.showcommentDeleteModal.iduserlogin;
    let usernamelogin=SelectData.showcommentDeleteModal.usernamelogin;
  

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
    let idcomment=document.getElementById("profileloginuser_idcomment_deletecommentmodalVideo").value;
    let idvideo=document.getElementById("profileloginuser_idvideo_deletecommentmodalVideo").value;
    let iduserlogin=document.getElementById("profileloginuser_iduserlogin_deletecommentmodalVideo").value;
    let usernamelogin=document.getElementById("profileloginuser_usernamelogin_deletecommentmodalVideo").value;

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
         <div id="profileloginuser_div_listcommentpost${idcomment}" >

               
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="profileloginuser_p_textcommentpost${idcomment}" class="leading-6">
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
                              onclick="Profile_Login_User.showtextcommentUpdateModalComment_Post
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
                              onclick="Profile_Login_User.showIdDeleteModalComment_Post('${idcomment}',
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
                  onclick="Profile_Login_User.like_dislike_Comment('${idcomment}',
                    '${iduser}','${userrname}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="profileloginuser_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                     <span id="profileloginuser_span_likecomment${idcomment}">${likescomment}</span>
                  
                    
              
                     
                  </button>
                  <button uk-toggle="target: #view_subcommentpost${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="profileloginuser_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentpost${idcomment}" class="flex-col">
            
               <div>
                  <div id="profileloginuser_listupdatesubcomments${idcomment}">
                  
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_profileloginuser_addSubCommentPost${idcomment}"
           onsubmit="Profile_Login_User.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="profileloginuser_textsubcommentpost${idcomment}" placeholder="Reply Comment.." required  class="bg-transparent max-h-10 shadow-none px-5">
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
 
  
  let profileloginuser_commentspost= document.getElementById(`profileloginuser_commentspost${idpost}`);

  profileloginuser_commentspost.parentNode.insertAdjacentHTML("beforeend", html_comments_post);
 
   
 //NUMBER COMMENT 
 let NumberOfComment=listcommentpost.length;
 document.getElementById(`profileloginuser_timeline_numbercommentpost${idpost}`).innerHTML=`${NumberOfComment}`;

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
         <div id="profileloginuser_div_listcommentimage${idcomment}" >

               
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="profileloginuser_p_textcommentimage${idcomment}" class="leading-6">
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
                              onclick="Profile_Login_User.showtextcommentUpdateModalComment_Image
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
                              onclick="Profile_Login_User.showIdDeleteModalComment_Image('${idcomment}',
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
                  onclick="Profile_Login_User.like_dislike_Comment('${idcomment}',
                    '${iduser}','${userrname}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="profileloginuser_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                     <span id="profileloginuser_span_likecomment${idcomment}">${likescomment}</span>
                  
                    
              
                     
                  </button>
                  <button uk-toggle="target: #view_subcommentimage${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="profileloginuser_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentimage${idcomment}" class="flex-col">
            
               <div>
                  <div id="profileloginuser_listupdatesubcomments${idcomment}">
                  
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_profileloginuser_addSubCommentPost${idcomment}"
           onsubmit="Profile_Login_User.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="profileloginuser_textsubcommentpost${idcomment}" required placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
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
 
  
  let profileloginuser_commentsimage= document.getElementById(`profileloginuser_commentimage${idimage}`);

  profileloginuser_commentsimage.parentNode.insertAdjacentHTML("beforeend", html_comments_image);
 
   
 //NUMBER COMMENT 
 let NumberOfComment=listcommentimage.length;
 document.getElementById(`profileloginuser_timeline_numbercommentimage${idimage}`).innerHTML=`${NumberOfComment}`;

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
        <div id="profileloginuser_div_listcommentvideo${idcomment}" >

               
            <div class="flex">
               <div class="w-10 h-10 rounded-full relative flex-shrink-0">
                  <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
                  </div>
               <div >
                  <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
                  <div class="flex">
                  <p id="profileloginuser_p_textcommentvideo${idcomment}" class="leading-6">
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
                                 onclick="Profile_Login_User.showtextcommentUpdateModalComment_Video
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
                                 onclick="Profile_Login_User.showIdDeleteModalComment_Video('${idcomment}',
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
                     onclick="Profile_Login_User.like_dislike_Comment('${idcomment}',
                       '${iduser}','${userrname}',event);"
                      class="text-black-600">
                    
                        <iconify-icon id="profileloginuser_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                        <span id="profileloginuser_span_likecomment${idcomment}">${likescomment}</span>
                     
   
                     </button>
                     <button 
                     onclick="Profile_Login_User.show_subcomment_post('${idcomment}',
                       '${iduser}','${userrname}');"
                     uk-toggle="target: #view_subcommentvideo${idcomment}" >
                        <iconify-icon icon="akar-icons:comment"></iconify-icon>
                        <span id="profileloginuser_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                        
                     </button>
                     <span> ${stringpostedago} </span> 
                  </div>
               </div>
            </div>
            <br>
            <!-- SUBCOMMENTS -->
            <div hidden id="view_subcommentvideo${idcomment}" class="flex-col">
               
                  <div>
                     <div id="profileloginuser_listupdatesubcomments${idcomment}">
                    
                     </div>
                  </div>
               <!-- SEND MESSAGE INPUT -->
               <form 
               id="form_profileloginuser_addSubCommentPost${idcomment}"
              onsubmit="Profile_Login_User.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
              >
               <div class="flex">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
                  <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                     <input id="profileloginuser_textsubcommentpost${idcomment}" placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
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
 
  
  let profileloginuser_commentvideo= document.getElementById(`profileloginuser_commentvideo${idvideo}`);

  profileloginuser_commentvideo.parentNode.insertAdjacentHTML("beforeend", html_comment_video);
 
   
 //NUMBER COMMENT 
 let NumberOfComment=listcommentvideo.length;
 document.getElementById(`profileloginuser_timeline_numbercommentvideo${idvideo}`).innerHTML=`${NumberOfComment}`;

}
//SHOW COMMENT AFTER UPDATE

static  showUpdatedCommentPost(idcomment,textcomment) {
   document.getElementById(`profileloginuser_p_textcommentpost${idcomment}`).innerHTML=textcomment;
  }
  static  showUpdatedCommentImage(idcomment,textcomment) {
   document.getElementById(`profileloginuser_p_textcommentimage${idcomment}`).innerHTML=textcomment;
  }
  static  showUpdatedCommentVideo(idcomment,textcomment) {
   document.getElementById(`profileloginuser_p_textcommentvideo${idcomment}`).innerHTML=textcomment;
  }
//SHOW COMMENT AFTER DELETE
  static  showRemoveCommentPost(idpost,idcomment) {
   //ADD NUMBER COMMENTS HTML
   let textcontent_numbercomments= document.getElementById(`profileloginuser_timeline_numbercommentpost${idpost}`);
   let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
   let numcomments=Number(stringnumcomments);
   textcontent_numbercomments.innerHTML=`${numcomments-1}`;

  document.getElementById(`profileloginuser_div_listcommentpost${idcomment}`).remove();
 }
 static  showRemoveCommentImage(idimage,idcomment) {
   //ADD NUMBER COMMENTS HTML
   let textcontent_numbercomments= document.getElementById(`profileloginuser_timeline_numbercommentimage${idimage}`);
   let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
   let numcomments=Number(stringnumcomments);
   textcontent_numbercomments.innerHTML=`${numcomments-1}`;

  document.getElementById(`profileloginuser_div_listcommentimage${idcomment}`).remove();
 }
 static  showRemoveCommentVideo(idvideo,idcomment) {
   //ADD NUMBER COMMENTS HTML
   let textcontent_numbercomments= document.getElementById(`profileloginuser_timeline_numbercommentvideo${idvideo}`);
   let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
   let numcomments=Number(stringnumcomments);
   textcontent_numbercomments.innerHTML=`${numcomments-1}`;

  document.getElementById(`profileloginuser_div_listcommentvideo${idcomment}`).remove();
 }
//SHOW INFORMATION UPDATE COMMENT MODAL

static  showtextcommentUpdateModalComment_Image=(idcomment,textcomment,idimage,iduserlogin,username)=>
{
  document.getElementById("profileloginuser_idcomment_updatecommentImage").value=idcomment;
   document.getElementById("profileloginuser_idimage_updatecommentImage").value=idimage;
   document.getElementById("profileloginuser_iduserlogin_updatecommentImage").value=iduserlogin;
  document.getElementById("profileloginuser_usernamelogin_updatecommentImage").value=username;
  document.getElementById('profileloginuser_text_updatecommentImage').value=textcomment;
  
}
static  showtextcommentUpdateModalComment_Post=async(idcomment,textcomment,idpost,iduserlogin,username)=>
{
  
  document.getElementById('profileloginuser_idcomment_updatecomment').value=idcomment;
  document.getElementById('profileloginuser_iduserlogin_updatecomment').value=iduserlogin;
  document.getElementById('profileloginuser_usernamelogin_updatecomment').value=username;
  document.getElementById('profileloginuser_text_updatecomment').value=textcomment;
  document.getElementById('profileloginuser_idpost_updatecomment').value=idpost;
  
 
  
}
static  showtextcommentUpdateModalComment_Video=async(idcomment,textcomment,idvideo,iduserlogin,username)=>
{
  document.getElementById('profileloginuser_idcomment_updatecommentVideo').value=idcomment;
  document.getElementById('profileloginuser_iduserlogin_updatecommentVideo').value=iduserlogin;
  document.getElementById('profileloginuser_usernamelogin_updatecommentVideo').value=username;
  document.getElementById('profileloginuser_text_updatecommentVideo').value=textcomment;
  document.getElementById('profileloginuser_idvideo_updatecommentVideo').value=idvideo;
  
}

//SHOW INFORMATION DELETE  COMMENT MODAL

static showIdDeleteModalComment_Post=async(idcomment,iduserlogin,usernamelogin,idpost)=>
{
  document.getElementById('profileloginuser_idcomment_deletecommentmodal').value=idcomment;
  document.getElementById('profileloginuser_iduserlogin_deletecommentmodal').value=iduserlogin;
  document.getElementById('profileloginuser_usernamelogin_deletecommentmodal').value=usernamelogin;
  document.getElementById('profileloginuser_idpost_deletecommentmodal').value=idpost;
}
static showIdDeleteModalComment_Image=async(idcomment,iduserlogin,usernamelogin,idimage)=>
{
   SelectData.showcommentDeleteModal={
      idcomment,iduserlogin,usernamelogin,idimage
   };
}
static showIdDeleteModalComment_Video=async(idcomment,iduserlogin,usernamelogin,idvideo)=>
{
   document.getElementById('profileloginuser_idcomment_deletecommentmodalVideo').value=idcomment;
  document.getElementById('profileloginuser_iduserlogin_deletecommentmodalVideo').value=iduserlogin;
  document.getElementById('profileloginuser_usernamelogin_deletecommentmodalVideo').value=usernamelogin;
  document.getElementById('profileloginuser_idvideo_deletecommentmodalVideo').value=idvideo;
}


//********************************** */
//SUBCOMMENTS
static async show_subcomment_post(idcomment,iduserlogin,usernamelogin)
{
   let listsubcommentpost=await APIRESTSubComment.getSubCommentByComment(
         iduserlogin,
         idcomment);

 let forSubCommentPost=await this.forSubCommentPost(listsubcommentpost,idcomment,iduserlogin,usernamelogin);
 document.getElementById(`profileloginuser_listupdatesubcomments${idcomment}`).innerHTML=forSubCommentPost;
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
        const exist_like_subcomment = await this.exist_like_subcomment(idsubusercomment,iduser,userrname);
        
        let show_edit_delete_subcomment =await this.show_edit_delete_subcomment(idsubusercomment,iduser,userrname);

        html_subcomments_posts+=`
        <div id="profileloginuser_div_subcomment${idsubusercomment}">

        <div  class="flex">
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
                 <small id="profileloginuser_small_textsubcommentpost${idsubusercomment}"   class="leading-6"> 
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
                       
                         onclick="Profile_Login_User.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}','${iduser}','${userrname}');"
                          uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                             <i class="uil-edit-alt mr-1"></i>
                              Edit  </a>
                      </li>
                
                      <li>
                         <hr class="-mx-2 my-2 dark:border-gray-800">
                      </li>
                      <li>
                         <a href=""
                         onclick="Profile_Login_User.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}','${iduser}','${userrname}');"
                          uk-toggle="target: #deletesubcommentmodal" class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                             <i class="uil-trash-alt mr-1"></i> Delete </a>
                      </li>
                   </ul>
                </div>
              </div>
              </div>
              <div class="text-xs flex items-center space-x-3 mt-2 ml-5">
                 <button  
                 onclick="Profile_Login_User.like_dislike_SubComment('${idcomment}','${idsubusercomment}',
                    '${iduser}','${userrname}',event);"
                 class="text-black-600">
                  
                 
                 <iconify-icon id="profileloginuser_icon_likesubcomment${idsubusercomment}" icon="ant-design:like-${exist_like_subcomment}"></iconify-icon>               
                 <span id="profileloginuser_span_likesubcomment${idsubusercomment}">${likessubcomment}</span>
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
  
    const textsubcomment = document.getElementById(`profileloginuser_textsubcommentpost${idcomment}`).value;

    const addSubComment= await APIRESTSubComment.addSubComment
    (idcomment,
      textsubcomment,iduserlogin,usernamelogin);
    if (addSubComment) {
  
      messagenotification('Added comment answer','success',event);

      await this.showAddedSubComment(idcomment,iduserlogin,usernamelogin);
      
     //await this.loadSubCommentPost(idcomment,sessionuser.iduser);
      
  

     //  setInterval(() => {
     //   location.reload();a
     //  }, 1000);
      document.getElementById(`profileloginuser_textsubcommentpost${idcomment}`).value="";
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
   <div id="profileloginuser_div_subcomment${idsubusercomment}">
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
                 <small id="profileloginuser_small_textsubcommentpost${idsubusercomment}"   class="leading-6"> 
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
                         onclick="Profile_Login_User.showsubcommentUpdateModal('${idcomment}','${idsubusercomment}','${textsubcomment}','${iduser}','${userrname}');"
                          uk-toggle="target: #update_subcomment_modal" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                             <i class="uil-edit-alt mr-1"></i>
                              Edit  </a>
                      </li>
                
                      <li>
                         <hr class="-mx-2 my-2 dark:border-gray-800">
                      </li>
                      <li>
                         <a href=""
                         onclick="Profile_Login_User.showsubcommentDeleteModal('${idcomment}','${idsubusercomment}','${iduser}','${userrname}');"
                          uk-toggle="target: #deletesubcommentmodal" class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                             <i class="uil-trash-alt mr-1"></i> Delete </a>
                      </li>
                   </ul>
                </div>
              </div>
              </div>
              <div class="text-xs flex items-center space-x-3 mt-2 ml-5">
                 <button  
                 onclick="Profile_Login_User.like_dislike_SubComment('${idcomment}','${idsubusercomment}',
                 '${iduser}','${userrname}',event);"
                 class="text-black-600">
                  
                 <iconify-icon id="profileloginuser_icon_likesubcomment${idsubusercomment}" icon="ant-design:like-outlined"></iconify-icon>  
                    <span id="profileloginuser_span_likesubcomment${idsubusercomment}"> ${likessubcomment} </span>  
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
   let profileloginuser_listupdatesubcomments= document.getElementById(`profileloginuser_listupdatesubcomments${idcomment}`);
   profileloginuser_listupdatesubcomments.parentNode.insertAdjacentHTML("beforeend", html_subcomment);

    
//NUMBER SUBCOMMENT 
let NumberOfSubComment=listsubcomment.length;
document.getElementById(`profileloginuser_span_numbersubcomments${idcomment}`).innerHTML=`${NumberOfSubComment}`;
 }
 static  showUpdatedSubComment(idsubcomment,textsubcomment) {
   document.getElementById(`profileloginuser_small_textsubcommentpost${idsubcomment}`).innerHTML=textsubcomment;
  }
  static  showRemoveSubComment(idcomment,idsubcomment) {
   document.getElementById(`profileloginuser_div_subcomment${idsubcomment}`).remove();


   let numbercommenthtml= document.getElementById(`profileloginuser_span_numbersubcomments${idcomment}`).textContent;
   let numbercomments=Number(numbercommenthtml);
    document.getElementById(`profileloginuser_span_numbersubcomments${idcomment}`).innerHTML=numbercomments-1;
 }
//SHOW EDIT DELETE SUBCOMMENT 

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
  document.getElementById('profileloginuser_textsubcomment_updatesubcomment').value=textsubcomment;
 
 
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
   const textsubcomment = document.getElementById('profileloginuser_textsubcomment_updatesubcomment').value;

   const editsubcommentPost= await APIRESTSubComment.editsubcommentPost(idsubcomment,idcomment,
    textsubcomment,iduserlogin,usernamelogin);
   if (editsubcommentPost) {
 
     messagenotification('SubComment Updated','success',event);

     this.showUpdatedSubComment(idsubcomment,textsubcomment);
    //await this.loadCommentPost(idpostwatch,iduser,userrname);
    SelectData.showsubcommentUpdateModal={};
     document.getElementById('profileloginuser_textsubcomment_updatesubcomment').value="";
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

//************************************************************* */
//#region LIKES

// LIKES POST IMAGE VIDEOS COMMENTS SUBCOMMENTS

  static like_dislike_Post= async(idpost,iduserlogin,usernamelogin,event)=>
  {
    try {
      event.preventDefault();

      let existLikePost=await APIRESTLikes.existLikePost(idpost,iduserlogin,usernamelogin)
     if (existLikePost) {
      const deletelikePost= await APIRESTLikes.deletelikePost(idpost,iduserlogin,usernamelogin);
       if (deletelikePost) {
      
         document.getElementById(`svg_profileloginuser_timeline_likepost${idpost}`).setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_timeline_numberlikespost${idpost}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`profileloginuser_timeline_numberlikespost${idpost}`).innerHTML=numberoflikes;
       }
      } 
     else{
      const likePost= await APIRESTLikes.likePost(idpost,iduserlogin,usernamelogin);
       if (likePost) {
      
         document.getElementById(`svg_profileloginuser_timeline_likepost${idpost}`).setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_timeline_numberlikespost${idpost}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`profileloginuser_timeline_numberlikespost${idpost}`).innerHTML=numberoflikes;
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
      
         document.getElementById(`svg_profileloginuser_timeline_likevideo${idvideo}`).setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_timeline_numberlikesvideo${idvideo}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`profileloginuser_timeline_numberlikesvideo${idvideo}`).innerHTML=numberoflikes;
       }
      } 
     else{
      const likeVideo= await APIRESTLikes.likeVideo(idvideo,iduserlogin,usernamelogin);
       if (likeVideo) {
      
         document.getElementById(`svg_profileloginuser_timeline_likevideo${idvideo}`).setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_timeline_numberlikesvideo${idvideo}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`profileloginuser_timeline_numberlikesvideo${idvideo}`).innerHTML=numberoflikes;
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
      
         document.getElementById(`svg_profileloginuser_timeline_likeimage${idimage}`).setAttribute("fill","grey");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_timeline_numberlikesimage${idimage}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`profileloginuser_timeline_numberlikesimage${idimage}`).innerHTML=numberoflikes;
       }
      } 
     else{
      const likeImage= await APIRESTLikes.likeImage(idimage,iduserlogin,usernamelogin);
       if (likeImage) {
      
         document.getElementById(`svg_profileloginuser_timeline_likeimage${idimage}`).setAttribute("fill","black");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_timeline_numberlikesimage${idimage}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`profileloginuser_timeline_numberlikesimage${idimage}`).innerHTML=numberoflikes;
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
         
         document.getElementById(`profileloginuser_icon_likecomment${idcomment}`).setAttribute("icon","ant-design:like-outlined");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_span_likecomment${idcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`profileloginuser_span_likecomment${idcomment}`).innerHTML=numberoflikes;
       }
      } 
 
     else{
 
      const likeComment= await APIRESTLikes.likeComment(idcomment,
         iduserlogin,usernamelogin);
       if (likeComment) {
      
         document.getElementById(`profileloginuser_icon_likecomment${idcomment}`).setAttribute("icon","ant-design:like-filled");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_span_likecomment${idcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`profileloginuser_span_likecomment${idcomment}`).innerHTML=numberoflikes;
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
      
         document.getElementById(`profileloginuser_icon_likesubcomment${idsubcomment}`).setAttribute("icon","ant-design:like-outlined");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_span_likesubcomment${idsubcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)-1;
         document.getElementById(`profileloginuser_span_likesubcomment${idsubcomment}`).innerHTML=numberoflikes;
       }
      } 

     else{

      const likeSubComment= await APIRESTLikes.likeSubComment(idsubcomment,
         iduserlogin,usernamelogin );
       if (likeSubComment) {
      
         document.getElementById(`profileloginuser_icon_likesubcomment${idsubcomment}`).setAttribute("icon","ant-design:like-filled");
         //ADD LIKE HTML
         let textcontent_numberlikes= document.getElementById(`profileloginuser_span_likesubcomment${idsubcomment}`).textContent;
         let numberoflikes=Number(textcontent_numberlikes)+1;
         document.getElementById(`profileloginuser_span_likesubcomment${idsubcomment}`).innerHTML=numberoflikes;
       }
     }
  
       
    
     
    }catch (error) {
      alert(error);
    }
  }

//EXIST LIKE 
static exist_like_post=async(idpost,iduser,username)=>
{
 let fill="";
 let existLikeComment=await APIRESTLikes.existLikePost(idpost,iduser,username);
 if(existLikeComment)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_image=async(idimage,iduser,username)=>
{
 let fill="";
 let existLikeImage=await APIRESTLikes.existLikeImage(idimage,iduser,username);
 if(existLikeImage)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_video=async(idvideo,iduser,username)=>
{
 let fill="";
 let existLikeVideo=await APIRESTLikes.existLikeVideo(idvideo,iduser,username);
 if(existLikeVideo)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_comment=async(idcomment,iduser,username)=>
{
 let fill="";
 let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,iduser,username);
 if(existLikeComment)
 {
  fill="filled"
 }
 else{
   fill="outlined"
 }
 return fill;
}
static exist_like_subcomment=async(idsubcomment,iduser,username)=>
{
 let fill="";
 let existLikeSubComment=await APIRESTLikes.existLikeSubComment(idsubcomment,iduser,username);
 if(existLikeSubComment)
 {
  fill="filled"
 }
 else{
   fill="outlined"
 }
 return fill;
}
//#endregion LIKES
 //*************************************************** */
//  REDIRECT TO IMAGE POST VIDEO WATCH

static passidtoPostWatch=(idpost)=>
        {
          try {
            sessionStorage.setItem('idpostwatch', idpost);

         }catch (error) {
          // alert(error);
          
         }
          
}
static passidtoImageWatch=(idimage)=>
{
  try {
    sessionStorage.setItem('idimagewatch', idimage);

 }catch (error) {
  // alert(error);
  
 }
  
}
static passidtoVideoWatch=(idvideo)=>
{
  try {
    sessionStorage.setItem('idvideowatch', idvideo);
  



 }catch (error) {
  // alert(error);
  
 }
  
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

//UPDATE COMMENT
const form_profileloginuser_updatecomment= document.getElementById('form_profileloginuser_updatecomment');
form_profileloginuser_updatecomment.addEventListener('submit', Profile_Login_User.updateCommentPost);

const form_profileloginuser_updatecommentImage= document.getElementById('form_profileloginuser_updatecommentImage');
form_profileloginuser_updatecommentImage.addEventListener('submit', Profile_Login_User.updateCommentImage);

const form_profileloginuser_updatecommentVideo= document.getElementById('form_profileloginuser_updatecommentVideo');
form_profileloginuser_updatecommentVideo.addEventListener('submit', Profile_Login_User.updateCommentVideo);

//DELETE COMMENT
const button_profileloginuser_deletecomment= document.getElementById('button_profileloginuser_deletecomment');
button_profileloginuser_deletecomment.addEventListener('click', Profile_Login_User.deleteCommentPost);

const button_profileloginuser_deletecommentImage= document.getElementById('button_profileloginuser_deletecommentImage');
button_profileloginuser_deletecommentImage.addEventListener('click', Profile_Login_User.deleteCommentImage);


const button_profileloginuser_deletecommentVideo= document.getElementById('button_profileloginuser_deletecommentVideo');
button_profileloginuser_deletecommentVideo.addEventListener('click', Profile_Login_User.deleteCommentVideo);

//UPDATE SUBCOMMENT


const form_profileloginuser_updatesubcomment = document.getElementById('form_profileloginuser_updatesubcomment');
form_profileloginuser_updatesubcomment.addEventListener('submit', Profile_Login_User.updateSubComment);

//DELETE SUBCOMMENT
const profileloginuser_button_deletesubcomment = document.getElementById('profileloginuser_button_deletesubcomment');
profileloginuser_button_deletesubcomment.addEventListener('click', Profile_Login_User.deleteSubComment);
