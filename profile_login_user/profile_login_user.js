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
       const {name,email,ocupattion,urlfacebook,country
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

      await this.loadAlbumImagesUser();
   



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



    //#endregion IMAGES


// LOAD
static loadNameDescriptionUser(description, name) {
  let inside_profileloginuser_p_description = `
         ${description} <a href=""
         uk-toggle="target: #update-about-modal">  Edit </a> 
      `;
  document.getElementById("profileloginuser_h1_nameuser").innerHTML = name;
  document.getElementById("profileloginuser_p_description").innerHTML = inside_profileloginuser_p_description;
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

static async loadAlbumImagesUser() {
  let getalbumimagesuser = await APIRESTAlbumImage.getAlbumImageByLoginUser();
  let load_albums_image = "";
  for (let i = 0; i < getalbumimagesuser.length; i++) {
    load_albums_image += `<option>${getalbumimagesuser[i].title}</option>`;
  }

  document.getElementById("profileloginuser_select_albumimages").innerHTML = load_albums_image;
}

}
window.addEventListener("load",Profile_Login_User.showdata_getLoginUser);

const updatedescriptionform = document.getElementById('profileloginuser_form_updateabout');
updatedescriptionform.addEventListener('submit', Profile_Login_User.update_description_modal);

