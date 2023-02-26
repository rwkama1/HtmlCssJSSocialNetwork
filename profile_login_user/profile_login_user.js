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

      // LOAD ALBUMIMAGES LOGIN USER
  
           await this.loadAlbumImagesLoginUser();
   
      // LOAD IMAGES LOGIN USER
  
      await this.loadImagesLoginUser(iduser);


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
       const title = document.getElementById('profileloginuser_uploadimage_title').value;
        const idalbumphoto = document.getElementById('profileloginuser_select_albumimages').value;
        const description = document.getElementById('profileloginuser_uploadimage_description').value;
        const visibility = document.getElementById('profileloginuser_uploadimage_visibility').value;
        let fileimageprofile = document.getElementById('uploadoneimage').files[0];
             let urlimage=await APIRESTCloudinary.upload_image(fileimageprofile);
        const dataform = {title
          ,idalbumphoto,visibility,description,urlimage}
      
         const response_upload_image= await APIRESTImages.addImage(dataform);
         if (response_upload_image) {
       
           messagenotification('Image Added','success',event);
           document.getElementById('profileloginuser_uploadimage_title').value="";
           document.getElementById('profileloginuser_uploadimage_description').value="";
          }
    
      
     }catch (error) {
       alert(error);
     }
      
    }

 

    //#endregion IMAGES


// LOAD PAGE

static loadNameDescriptionUser(description, name) {
  let inside_profileloginuser_p_description = `
         ${description} <a href=""
         uk-toggle="target: #update-about-modal">  Edit </a> 
      `;
  document.getElementById("profileloginuser_h1_nameuser").innerHTML = name;
  document.getElementById("profileloginuser_p_description").innerHTML = inside_profileloginuser_p_description;
}
static async loadAlbumImagesLoginUser() {
  let getalbumimagesuser = await APIRESTAlbumImage.getAlbumImageByLoginUser();

  let html_load_albumimage = '';

  for (let i = 0; i < getalbumimagesuser.length; i++) {
    // const imageUrl = getalbumimagesuser[i].urlimage;


    if (i >= 3) {
      html_load_albumimage += `
      <div hidden id="morealbumimage" >
      <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
         <ul class="uk-slideshow-items">
            <li> 
              <a href="">
               <img src="../assets/images/post/img-1.jpg" alt="" uk-cover>
               </a>
            </li>
           
            <li> 
               <a href="">
                  <img src="../assets/images/post/img-2.jpg" alt="" uk-cover>
                  </a> 
            </li>
            <li>
               <a href="">
                  <img src="../assets/images/post/img-3.jpg" alt="" uk-cover>
                  </a> 
            </li>
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
            <li> 
              <a href="">
               <img src="../assets/images/post/img-1.jpg" alt="" uk-cover>
               </a>
            </li>
           
            <li> 
               <a href="">
                  <img src="../assets/images/post/img-2.jpg" alt="" uk-cover>
                  </a> 
            </li>
            <li>
               <a href="">
                  <img src="../assets/images/post/img-3.jpg" alt="" uk-cover>
                  </a> 
            </li>
         </ul>
         <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
         <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
      </div>
     
   </div>
        `;
    }
  }


  document.getElementById("profileloginuser_listalbumimages_div").innerHTML = html_load_albumimage;
}
static async loadImagesLoginUser(iduser) {
  let getimagesuser = await APIRESTImages.getImagesByLoginUser(iduser);

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
                  <a uk-toggle="target: #update-image-modal" href="">  Update </a>
                  <a uk-toggle="target: #deleteimagemodal" href="">  Delete </a> 
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
                  <a uk-toggle="target: #update-image-modal" href="">  Update </a>
                  <a uk-toggle="target: #deleteimagemodal" href="">  Delete </a> 
                </div>
              </div>
            </div>
          </div>
        `;
    }
  }


  document.getElementById("profileloginuser_listallimages_div").innerHTML = html_load_images;
}
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
static async loadAlbumImagesUserModal() {
  let getalbumimagesuser = await APIRESTAlbumImage.getAlbumImageByLoginUser();
  let load_albums_image = "";
  for (let i = 0; i < getalbumimagesuser.length; i++) {
    load_albums_image += `<option value=${getalbumimagesuser[i].idalbumphoto}>${getalbumimagesuser[i].title}</option>`;
  }

  document.getElementById("profileloginuser_select_albumimages").innerHTML = load_albums_image;
}

}
window.addEventListener("load",Profile_Login_User.showdata_getLoginUser);


const addimageform = document.getElementById('form_profileloginuser_addimage');
addimageform.addEventListener('submit', Profile_Login_User.upload_image_modal);


const updatedescriptionform = document.getElementById('profileloginuser_form_updateabout');
updatedescriptionform.addEventListener('submit', Profile_Login_User.update_description_modal);


