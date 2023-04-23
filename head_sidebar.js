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
  
static  load_headersidebar=async()=>
 {
  
  try {
    let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));

    // REAL TIME NOTIFICATION PENDING FRIEND RECEIVED

    const ably = new Ably.Realtime(`rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A`);
    const presenceChannel = ably.channels.get(`pending_friend_requests${sessionuser.iduser}`);
    
   // Listen for channel events
    presenceChannel.subscribe(`friend-request${sessionuser.iduser}`, async function(message) {
      // Update the list of pending friend requests 
      //Call the `forPendingFriends` function  to update the list
      await Head_SidebarJS.forPendingFriends(sessionuser);
      messagenotification_withoutevent('You have received a friend request','success');
    }); 
    presenceChannel.subscribe(`friend-deleterequest${sessionuser.iduser}`, async function(message) {
      // Update the list of pending friend requests 
      //Call the `forPendingFriends` function  to update the list
      await Head_SidebarJS.forPendingFriends(sessionuser);
    
    }); 
    await Head_SidebarJS.forPendingFriends(sessionuser);

  
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
  sessionStorage.setItem('iduserwatch', null);
  sessionStorage.setItem('iduserwatch', iduser);
}

  static async forPendingFriends(sessionuser) {

    
    let html_friendrequest="";
    let getPendingFriendsbyUserLoginUser = await APIRESTUserFriends.getPendingFriendsbyUserLoginUser(sessionuser.iduser, sessionuser.userrname);
   document.getElementById("headersidebar_span_numberpendingfriends").innerHTML=getPendingFriendsbyUserLoginUser.length;
    for (let i = 0; i < getPendingFriendsbyUserLoginUser.length; i++) {
      let {iduser,image,name } = getPendingFriendsbyUserLoginUser[i];
      if (image==="") {
        image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      html_friendrequest+=`
      <li>                                                     
      <a 
      href="../profileuser/profileuser.html"
      onclick="Head_SidebarJS.passidtoUserProfile('${iduser}');"  
      >
         <div class="contact-avatar">
            <img src="${image}" alt="">
           
         </div>
         <div class="contact-username">
            ${name}
  
         </div>
        </a>
      </li>
      `;

    }
    document.getElementById("headersidebar_ul_listpendingfriendrequest").innerHTML=html_friendrequest;

  }
}
window.addEventListener("load",Head_SidebarJS.load_headersidebar);


//SEARCH TEXT

const headersidebar_search_text = document.getElementById("headersidebar_search_text");
headersidebar_search_text.addEventListener("input",Head_SidebarJS.searchText);


const a_logout = document.getElementById('usersettings_link_logout');
a_logout.addEventListener('click', Head_SidebarJS.logout);


