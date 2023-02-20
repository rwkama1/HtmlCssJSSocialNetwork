class Head_SidebarJS

{ 


static  logout=async()=>
 {
   
    const response_logout= await APIRESTLoginUser.logout();
    if(response_logout)
    {
    
      window.location.href="../index.html";
    }
  } 

}

const a_logout = document.getElementById('usersettings_link_logout');
a_logout.addEventListener('click', Head_SidebarJS.logout);