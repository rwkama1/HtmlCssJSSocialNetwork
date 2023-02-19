class UserSettingsJS
{
static  getLoginUser=async()=>
 {
    try {
        const response_loginuser= await APIRESTLoginUser.getLoginUser();
        if (response_loginuser) {
     document.getElementById("usersettings_nameuser").setAttribute("value", data.name);
    document.getElementById("usersettings_emailuser").setAttribute("value", data.email);
    document.getElementById("usersettings_ocupation").setAttribute("value", data.occupation);
    document.getElementById("usersettings_country").setAttribute("value", data.country);
    document.getElementById("usersettings_urlfacebook").setAttribute("value", data.facebook);
    document.getElementById("usersettings_urlinstagram").setAttribute("value", data.instagram);
    document.getElementById("usersettings_urllinkedin").setAttribute("value", data.linkedin);
    document.getElementById("usersettings_urltwitter").setAttribute("value", data.twitter);
    document.getElementById("usersettings_description").innerHTML = data.description;
    document.getElementById("usersettings_datebirth").setAttribute("value", data.date_of_birth);
        
        }

 
   
  } catch (error) {
    alert(error);
  }
  } 

}

document.addEventListener("DOMContentLoaded",UserSettingsJS.getLoginUser)