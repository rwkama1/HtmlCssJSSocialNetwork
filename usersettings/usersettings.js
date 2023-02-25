class UserSettingsJS

{ 
// LOAD PAGE
  static  getLoginUser=async()=>
 {
   try {
     const response_loginuser= await APIRESTLoginUser.getLoginUser();
     const getuser= await APIRESTUser.getUser(response_loginuser.iduser);
   
    const {name,email,ocupattion,urlfacebook,country
      ,urlinstagram,urllinkedin,urltwitter,description,
      datebirth,userrname,image,coverphoto
    }=getuser;

   //CONVERT DATE
    const isoDate = datebirth;
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + date.getUTCDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    //SHOW DATA PROFILE
    document.getElementById("usersettings_nameuser").setAttribute("value", name);
    document.getElementById("usersettings_emailuser").setAttribute("value", email);
    document.getElementById("usersettings_ocupation").setAttribute("value", ocupattion);
    document.getElementById("countryinput").setAttribute("value", country);
    document.getElementById("usersettings_urlfacebook").setAttribute("value", urlfacebook);
    document.getElementById("usersettings_urlinstagram").setAttribute("value", urlinstagram);
    document.getElementById("usersettings_urllinkedin").setAttribute("value", urllinkedin);
    document.getElementById("usersettings_urltwitter").setAttribute("value", urltwitter);
    document.getElementById("usersettings_description").value = description;
    document.getElementById("usersettings_datebirth").setAttribute("value", formattedDate);
        
   //SHOW DATA UPDATE PASSWORD
   document.getElementById("updatepassword_username").setAttribute("value", userrname);

         
   //SHOW IMAGE COVER PROFILE
   if(image==="")
   {
    document.getElementById("image_profile").src = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   else{
    document.getElementById("image_profile").src = image;
   }
  
   if (coverphoto==="") {
    document.getElementById("image_cover").src = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/no-image-slide_nclriy.jpg";
   } else {
    document.getElementById("image_cover").src = coverphoto;
   }
 
 
   
  } catch (error) {
    alert(error);
    window.location.href="../index.html";

  }
  } 


  
 static  updateUser=async(event)=>
 {
    event.preventDefault();
    const name = document.getElementById('usersettings_nameuser').value;
    const ocupattion = document.getElementById('usersettings_ocupation').value;
    const urlfacebook = document.getElementById('usersettings_urlfacebook').value;
    const urllinkedin = document.getElementById('usersettings_urlinstagram').value;
    const urlinstagram = document.getElementById('usersettings_urlinstagram').value;
    const urltwitter = document.getElementById('usersettings_urltwitter').value;
    const country = document.getElementById('countryinput').value;
    const description = document.getElementById('usersettings_description').value;
    const datebirth = document.getElementById('usersettings_datebirth').value;
    const email = document.getElementById('usersettings_emailuser').value;

    const dataform = {name
      ,ocupattion,urlfacebook,urllinkedin,urlinstagram
      ,urltwitter,country,description,datebirth,email}

    try {
    const response_update= await APIRESTUser.updateUser(dataform);
    if (response_update) {
      console.log("User Updated");
      messagenotification('Data Updated','success',event)
    
    }
    
    } catch (error) {
      alert(error);
    }
  } 
  static  updatePassword=async(event)=>
  {
     event.preventDefault();
     const userrname = document.getElementById('updatepassword_username').value;
     const oldpassword = document.getElementById('updatepassword_currentpassword').value;
     const newpassword = document.getElementById('user_password').value;
  
     const dataform = {
      userrname,
      oldpassword,
      newpassword
     }
 
     try {
     const response_update= await APIRESTUser.updatePassword(dataform);
     if (response_update) {
       console.log("Password Updated");
       messagenotification('Password Updated','success',event)
     
     }
     
     } catch (error) {
       alert(error);
     }
   } 
   static  updateProfileCoverImage=async(event)=>
   {
      event.preventDefault();
      const response_loginuser= await APIRESTLoginUser.getLoginUser();
   
      
  
      try {

        let fileimageprofile = document.getElementById('upload_image_profile').files[0];
        let fileimagecover = document.getElementById('upload_image_cover').files[0];
        await APIRESTCloudinary.createFolder();
        if (fileimagecover&&fileimageprofile) {

          const urlimagePROFILE=await APIRESTCloudinary.upload_image(fileimageprofile);
          const urlimageCOVER=await APIRESTCloudinary.upload_image(fileimagecover);
          await APIRESTUser.updateImageProfileCover(urlimagePROFILE,urlimageCOVER);
          messagenotification('Images Updated','success',event);
        }
        else if (fileimageprofile) {
            let urlimagePROFILE=await APIRESTCloudinary.upload_image(fileimageprofile);
            await APIRESTUser.updateImageProfileCover(urlimagePROFILE,response_loginuser.coverphoto);
            messagenotification('Profile Image Updated','success',event);
          
        }
        
        else if (fileimagecover) {
        
          let urlimageCOVER=await APIRESTCloudinary.upload_image(fileimagecover);
          await APIRESTUser.updateImageProfileCover(response_loginuser.image,urlimageCOVER);
          messagenotification('Cover Image Updated','success',event);
         
        }
      
      }
      catch (error) {
        console.error(error);
        alert(error);
      }
    } 

   static  deleteUser=async(event)=>
    {
       event.preventDefault();
      
       try {
       const response_delete= await APIRESTUser.deleteUser();
       if (response_delete) {
         
        window.location.href="../index.html";
       
       }
       
       } catch (error) {
         alert(error);
       }
   }  
}


window.addEventListener("load",UserSettingsJS.getLoginUser);

const updateform = document.getElementById('usersettings_updateuser');
updateform.addEventListener('submit', UserSettingsJS.updateUser);

const updatepasswordform = document.getElementById('form_updatepassword');
updatepasswordform.addEventListener('submit', UserSettingsJS.updatePassword);

const saveProfileCoverImage = document.getElementById('updateprofilecover_save');
saveProfileCoverImage.addEventListener('click', UserSettingsJS.updateProfileCoverImage);

const deleteUser = document.getElementById('button_userrsettings_deleteuser');
deleteUser.addEventListener('click', UserSettingsJS.deleteUser)
