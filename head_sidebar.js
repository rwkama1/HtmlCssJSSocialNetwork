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
        if (url==="") {
          url="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }
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
   
      await Head_SidebarJS.forPendingFriends(sessionuser);
    
    }); 
    
    await Head_SidebarJS.forPendingFriends(sessionuser);

    await Head_SidebarJS.forCommentsUser(sessionuser);

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


  await Head_SidebarJS.loadConfirmedFriend_SideBar(sessionuser);
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
  static async forCommentsUser(sessionuser) {

    
    let html_commentsuser="";
    let getNotificationComments = await APIRESTNotifications.getNotificationComments(sessionuser.iduser, sessionuser.userrname);
   
   document.getElementById("headersidebar_span_numbernoticomments").innerHTML=getNotificationComments.length;
    for (let i = 0; i < getNotificationComments.length; i++) {
      let {IdNotification ,ImageSender ,NameSender ,stringnotificationago,TitleImagePostVideo,Typee,Subcomment } = getNotificationComments[i];
     
      if (ImageSender==="") {
        ImageSender="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      if(Typee==='P')
      {
          if (Subcomment===1) {
            html_commentsuser+=`
            <li >
            <a
             href="#"
      
            >
               <div class="drop_avatar status-online">
                <img src="${ImageSender}" alt=""> 
               </div>
               <span class="drop_icon bg-gradient-primary">
                  <i class="icon-feather-message-square"></i>
                  </span>
               <div class="drop_text">
                  <p> <strong>${NameSender}</strong> Replay Your Comment in <span class="text-link">${TitleImagePostVideo}</span> </p>
                  <time> ${stringnotificationago}</time>
               </div>
            </a>
          </li>
            `;
          }
         
          
          else {
            html_commentsuser+=`
            <li >
            <a
             href="#"
      
            >
               <div class="drop_avatar status-online">
                <img src="${ImageSender}" alt=""> 
               </div>
               <span class="drop_icon bg-gradient-primary">
                  <i class="icon-feather-message-square"></i>
                  </span>
               <div class="drop_text">
                  <p> <strong>${NameSender}</strong> Comment your Post <span class="text-link">${TitleImagePostVideo}</span> </p>
                  <time> ${stringnotificationago}</time>
               </div>
            </a>
          </li>
            `;
           }
          }
      else if(Typee==='I')
      {
        if (Subcomment===1) {
          html_commentsuser+=`
          <li >
          <a
           href="#"
    
          >
             <div class="drop_avatar status-online">
              <img src="${ImageSender}" alt=""> 
             </div>
             <span class="drop_icon bg-gradient-primary">
                <i class="icon-feather-message-square"></i>
                </span>
             <div class="drop_text">
                <p> <strong>${NameSender}</strong> Replay Your Comment in <span class="text-link">${TitleImagePostVideo}</span> </p>
                <time> ${stringnotificationago}</time>
             </div>
          </a>
        </li>
          `;
        }
       
        
        else {
          html_commentsuser+=`
          <li >
          <a
           href="#"
    
          >
             <div class="drop_avatar status-online">
              <img src="${ImageSender}" alt=""> 
             </div>
             <span class="drop_icon bg-gradient-primary">
                <i class="icon-feather-message-square"></i>
                </span>
             <div class="drop_text">
                <p> <strong>${NameSender}</strong> Comment your Image <span class="text-link">${TitleImagePostVideo}</span> </p>
                <time> ${stringnotificationago}</time>
             </div>
          </a>
        </li>
          `;
         }
      }
      else 
      {
        if (Subcomment===1) {
          html_commentsuser+=`
          <li >
          <a
           href="#"
    
          >
             <div class="drop_avatar status-online">
              <img src="${ImageSender}" alt=""> 
             </div>
             <span class="drop_icon bg-gradient-primary">
                <i class="icon-feather-message-square"></i>
                </span>
             <div class="drop_text">
                <p> <strong>${NameSender}</strong> Replay Your Comment in <span class="text-link">${TitleImagePostVideo}</span> </p>
                <time> ${stringnotificationago}</time>
             </div>
          </a>
        </li>
          `;
        }
       
        
        else {
          html_commentsuser+=`
          <li >
          <a
           href="#"
    
          >
             <div class="drop_avatar status-online">
              <img src="${ImageSender}" alt=""> 
             </div>
             <span class="drop_icon bg-gradient-primary">
                <i class="icon-feather-message-square"></i>
                </span>
             <div class="drop_text">
                <p> <strong>${NameSender}</strong> Comment your Video <span class="text-link">${TitleImagePostVideo}</span> </p>
                <time> ${stringnotificationago}</time>
             </div>
          </a>
        </li>
          `;
         }
      }
     

    }
    document.getElementById("headesidebar_ul_listcommentsusers").innerHTML=html_commentsuser;

  }
  static async loadConfirmedFriend_SideBar(sessionuser) {

  //  existloginuser

    let html_confirmedfriend="";
    let getConfirmedFriendByUserSideBar = await APIRESTUserFriends.getConfirmedFriendByUserSideBar(sessionuser.iduser);
 
    for (let i = 0; i < getConfirmedFriendByUserSideBar.length; i++) {
      let {iduser,image,name,existloginuser } = getConfirmedFriendByUserSideBar[i];
      if (image==="") {
        image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      let user_status_online="";
      if (existloginuser) {
        user_status_online=`<span class="user_status status_online"></span>`;
      }
      html_confirmedfriend+=`
      <a 
        onclick="Head_SidebarJS.passidtoUserProfile('${iduser}');" 
        href="../profileuser/profileuser.html"
      >
        <div class="contact-avatar"> 
          <img src="${image}" alt="">
            ${user_status_online}
        </div>
        <div class="contact-username">${name}</div>
      </a>
      `;

    }
    document.getElementById("headersidebar_friendconfirmedslist").innerHTML=html_confirmedfriend;

  }
}
window.addEventListener("load",Head_SidebarJS.load_headersidebar);


//SEARCH TEXT

const headersidebar_search_text = document.getElementById("headersidebar_search_text");
headersidebar_search_text.addEventListener("input",Head_SidebarJS.searchText);


const a_logout = document.getElementById('usersettings_link_logout');
a_logout.addEventListener('click', Head_SidebarJS.logout);


