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

  static searchText=async(event)=>
  {
   
             
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
     const text = event.target.value;
     let getPhotoPostVideoSearch = await APIRESTImageVideoPost.getPhotoPostVideoSearch(sessionuser.iduser,
      text);
     let html_load_search="";
     for (let i = 0; i <  Math.min(getPhotoPostVideoSearch.length, 10); i++) {
      let { id , nameortitle , url, type  } = getPhotoPostVideoSearch[i];
      if (type==='U') {
        html_load_search+=
        `
        <!-- USER -->
        <li>
          <a 
          onclick="Head_SidebarJS.passidtoUserProfile('${id}');" 
          href="../profileuser/profileuser.html"

          >
              <img src="${url}"
               alt="" class="list-avatar">
              <div class="list-name"> ${nameortitle} </div>
          
          </a>
          
        </li>
        `
      }
      else if (type==='I') {
        html_load_search+=
        `
        <!-- IMAGES -->
        <li>
           <a 
           onclick="Head_SidebarJS.passidtoImageWatch('${id}');" 
           href="../images/image_watch.html">
              <img src="${url}" alt="" class="list-avatar">
              <div class="list-name"> ${nameortitle} </div>
           </a>
        </li>
        `
      }
      else if (type==='V') {
        html_load_search+=
        `
        <!-- VIDEO -->
        <li>
           <a 
           onclick="Head_SidebarJS.passidtoVideoWatch('${id}');" 
           href="../videos/video_watch.html">
              <video src="${url}" class="list-avatar" autoplay loop muted playsinline >
  
              </video> 
              <div class="list-name"> ${nameortitle} </div>
           </a>
        </li>
        `
      }
      else if (type==='P') {
        html_load_search+=
        `
        <!-- POST -->
        <li>
           <a 
           onclick="Head_SidebarJS.passidtoPostWatch('${id}');" 
           href="../posts/post_watch.html">
            
              <div class="list-name"> ${nameortitle} </div>
           </a>
        </li>
        `
      }
   
     }
   document.getElementById("headsidebar_ul_search").innerHTML=html_load_search;
 
  }
  
static  show_image_and_name_user=async()=>
 {
  
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
 }
}

//  REDIRECT TO IMAGE POST VIDEO WATCH AND USER
static passidtoVideoWatch=(idvideo)=>
    {
      sessionStorage.setItem('idvideowatch', null);
sessionStorage.setItem('idvideowatch', idvideo);
                 
  }    
static passidtoImageWatch=(idimage)=>
{
  sessionStorage.setItem('idimagewatch', null);
    sessionStorage.setItem('idimagewatch', idimage);
  
}
static passidtoPostWatch=(idpost)=>
{
  sessionStorage.setItem('idpostwatch', null);
    sessionStorage.setItem('idpostwatch', idpost);
  
}

static passidtoUserProfile=(iduser)=>
{
  sessionStorage.setItem('idpostwatch', null);
  sessionStorage.setItem('idpostwatch', iduser);
}
}
window.addEventListener("load",Head_SidebarJS.show_image_and_name_user);


//SEARCH TEXT

const headersidebar_search_text = document.getElementById("headersidebar_search_text");
headersidebar_search_text.addEventListener("input",Head_SidebarJS.searchText);


const a_logout = document.getElementById('usersettings_link_logout');
a_logout.addEventListener('click', Head_SidebarJS.logout);


