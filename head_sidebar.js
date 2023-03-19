class Head_SidebarJS
{ 

  
static  logout=async()=>
 {
  let getuser = JSON.parse(sessionStorage.getItem('user_login'));

    const response_logout= await APIRESTLoginUser.logout(getuser.iduser,
      getuser.userrname);
    if(response_logout)
    {
      sessionStorage.setItem("user_login",null);
      window.location.href="../index.html";
    }
  } 

  
static  show_image_and_name_user=async()=>
 {
  setTimeout(async () => {
  try {
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
    let getuser= await APIRESTUser.getUser(sessionuser.iduser,sessionuser.iduser,sessionuser.userrname);
  // SHOW NAME AND IMAGE PROFILE
  //const getuser= await APIRESTLoginUser.getLoginUser();

  if(getuser.image==="")
  {
    document.getElementById("header_image_user").src = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
    document.getElementById("header_image_user2").src = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
  }
  else{
    document.getElementById("header_image_user").src = getuser.image;
    document.getElementById("header_image_user2").src = getuser.image;
  }
 
  document.getElementById('header_show_nameuser').innerHTML=getuser.name;

  } 
 catch (error) {
  alert(error);
  window.location.href="../index.html";
 }},200);
}
}
window.addEventListener("load",Head_SidebarJS.show_image_and_name_user);

const a_logout = document.getElementById('usersettings_link_logout');
a_logout.addEventListener('click', Head_SidebarJS.logout);

