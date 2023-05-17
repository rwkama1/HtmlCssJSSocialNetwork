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

    await Head_SidebarJS.loadNotificationsCommentsUser(sessionuser);

    await Head_SidebarJS.loadNotificationsMessageUser(sessionuser);

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

  await Head_SidebarJS.loadChatUsersByLoginUser(sessionuser);
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
static passidtoChatUser=async(iduserconversation)=>
{
    sessionStorage.setItem('iduserchat', null);
    sessionStorage.setItem('iduserchat', iduserconversation);
    window.location.href="../chat/chat.html";
  
}

//NOTIFICATIONS COMMENT USERS PASS

static passidtoVideoWatchCommentUser= async (idvideo,iduserlogin,usernamelogin,idnotification)=>
    {

      let updateNotificationCommentVideo=await APIRESTNotifications.updateSeenNotificationCommentVideo
      (iduserlogin,usernamelogin,idnotification);   
      if(updateNotificationCommentVideo)
      {
        sessionStorage.setItem('idvideowatch', null);
        sessionStorage.setItem('idvideowatch', idvideo);
        window.location.href="../videos/video_watch.html";
      }

  }    
static passidtoImageWatchCommentUser=async (idimage,iduserlogin,usernamelogin,idnotification)=>
{
  let updateSeenNotificationCommentImage=await APIRESTNotifications.updateSeenNotificationCommentImage
  (iduserlogin,usernamelogin,idnotification);
  if(updateSeenNotificationCommentImage)
  {
    sessionStorage.setItem('idimagewatch', null);
    sessionStorage.setItem('idimagewatch', idimage);
    window.location.href="../images/image_watch.html";
  }
  
}
static passidtoPostWatchCommentUser=async(idpost,iduserlogin,usernamelogin,idnotification)=>
{
  let updateSeenNotificationCommentPost=await APIRESTNotifications.updateSeenNotificationCommentPost
  (iduserlogin,usernamelogin,idnotification);
  if(updateSeenNotificationCommentPost)
  {
   sessionStorage.setItem('idpostwatch', null);
    sessionStorage.setItem('idpostwatch', idpost);
    window.location.href="../posts/post_watch.html";
  }
  
}
static passidWatchSubCommentUser=async(type,idpostimagevideo,iduserlogin,usernamelogin,idnotification)=>
{
  let updateSeenNotificationCommentPost=await APIRESTNotifications.updateSeenNotificationSubComment
  (iduserlogin,usernamelogin,idnotification);
  if(updateSeenNotificationCommentPost)
  {
    if(type==='P')
    {
      sessionStorage.setItem('idpostwatch', null);
      sessionStorage.setItem('idpostwatch', idpostimagevideo);
      window.location.href="../posts/post_watch.html";
    }
    else if(type==='I')
    {
      sessionStorage.setItem('idimagewatch', null);
      sessionStorage.setItem('idimagewatch', idpostimagevideo);
      window.location.href="../images/image_watch.html";
    }
    else 
        {
      sessionStorage.setItem('idvideowatch', null);
      sessionStorage.setItem('idvideowatch', idpostimagevideo);
      window.location.href="../videos/video_watch.html";
    }
  
  }
  
}


//DELETE COMMENT NOTIFICATIONS

static deleteCommentNotifications=()=>
{
  let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
  let deleteNotiCommentsByUser= APIRESTNotifications.deleteNotiCommentsByUser(sessionuser.iduser,sessionuser.userrname);
  if(deleteNotiCommentsByUser)
  {
    
    document.getElementById("headersidebar_span_numbernoticomments").innerHTML=0;
    document.getElementById("headesidebar_ul_listcommentsusers").innerHTML="";
  }
 

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
  static async forCommentUsersNotification(getNotificationComments,iduserlogin,usernamelogin) {
    let html_commentsuser="";
    for (let i = 0; i < getNotificationComments.length; i++) {
      let {IdNotification , IdImagePostVideo ,IdUserSender ,ImageSender ,NameSender ,stringnotificationago,TitleImagePostVideo,Typee,Subcomment } = getNotificationComments[i];
     
      if (ImageSender==="") {
        ImageSender="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      if(Number(iduserlogin)===Number(IdUserSender))
      {
        html_commentsuser=``;
      }
      if(Typee==='P')
      {


          if (Subcomment===1) {
            html_commentsuser+=`
            <li >
            <a
              
             onclick="Head_SidebarJS.passidWatchSubCommentUser('P','${IdImagePostVideo}','${iduserlogin}','${usernamelogin}','${IdNotification}');" 
      
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
            onclick="Head_SidebarJS.passidtoPostWatchCommentUser('${IdImagePostVideo}','${iduserlogin}','${usernamelogin}','${IdNotification}');"           
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
       
           onclick="Head_SidebarJS.passidWatchSubCommentUser('I','${IdImagePostVideo}','${iduserlogin}','${usernamelogin}','${IdNotification}');"    
    
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
      
          onclick="Head_SidebarJS.passidtoImageWatchCommentUser('${IdImagePostVideo}','${iduserlogin}','${usernamelogin}','${IdNotification}');"    
    
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
          onclick="Head_SidebarJS.passidWatchSubCommentUser('V','${IdImagePostVideo}','${iduserlogin}','${usernamelogin}','${IdNotification}');"    
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
          onclick="Head_SidebarJS.passidtoVideoWatchCommentUser('${IdImagePostVideo}','${iduserlogin}','${usernamelogin}','${IdNotification}');"    
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
  static async loadNotificationsCommentsUser(sessionuser) {

     const ably = new Ably.Realtime(`rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A`);
   
     //************************************************* */

     // REAL TIME NOTIFICATION  COMMENT POST

     const presenceChannel = ably.channels.get(`comments_user_notificationsP`);
     
   // Listen for channel events
     presenceChannel.subscribe(`comments_user_notifications_messageP`, async function(message) {
       
       let getNotificationComments = await APIRESTNotifications.getNotificationComments(sessionuser.iduser, sessionuser.userrname);
  
       document.getElementById("headersidebar_span_numbernoticomments").innerHTML=getNotificationComments.length;
      await Head_SidebarJS.forCommentUsersNotification(getNotificationComments,sessionuser.iduser,sessionuser.userrname);
     });  

     //******************************************** */

      // REAL TIME NOTIFICATION  COMMENT IMAGE

     const presenceChannel2 = ably.channels.get(`comments_user_notificationsI`);
     
     // Listen for channel events
     presenceChannel2.subscribe(`comments_user_notifications_messageI`, async function(message) {
         
         let getNotificationComments = await APIRESTNotifications.getNotificationComments(sessionuser.iduser, sessionuser.userrname);
    
         document.getElementById("headersidebar_span_numbernoticomments").innerHTML=getNotificationComments.length;
         await  Head_SidebarJS.forCommentUsersNotification(getNotificationComments,sessionuser.iduser,sessionuser.userrname);
       });  

       //**************************************************** */

    // REAL TIME NOTIFICATION  COMMENT VIDEO

       const presenceChannel3 = ably.channels.get(`comments_user_notificationsV`);
     
       // Listen for channel events
       presenceChannel3.subscribe(`comments_user_notifications_messageV`, async function(message) {
           
           let getNotificationComments = await APIRESTNotifications.getNotificationComments(sessionuser.iduser, sessionuser.userrname);
      
           document.getElementById("headersidebar_span_numbernoticomments").innerHTML=getNotificationComments.length;
           await  Head_SidebarJS.forCommentUsersNotification(getNotificationComments,sessionuser.iduser,sessionuser.userrname);
         });  
     //********************************************************* */
     // REAL TIME NOTIFICATION SUBCOMMENT

     const presenceChannel4 = ably.channels.get(`comments_user_notificationsSubComment`);
     
     // Listen for channel events
     presenceChannel4.subscribe(`comments_user_notifications_messageSubComment`, async function(message) {
         
         let getNotificationComments = await APIRESTNotifications.getNotificationComments(sessionuser.iduser, sessionuser.userrname);
    
         document.getElementById("headersidebar_span_numbernoticomments").innerHTML=getNotificationComments.length;
         await  Head_SidebarJS.forCommentUsersNotification(getNotificationComments,sessionuser.iduser,sessionuser.userrname);
       });  

   //********************************************************* */
      let getNotificationComments = await APIRESTNotifications.getNotificationComments(sessionuser.iduser, sessionuser.userrname);
        document.getElementById("headersidebar_span_numbernoticomments").innerHTML=getNotificationComments.length;
        await  Head_SidebarJS.forCommentUsersNotification(getNotificationComments,sessionuser.iduser,sessionuser.userrname);

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
  //LOAD CHAT USERS BY LOGIN USER

  static async loadChatUsersByLoginUser(sessionuser) {

   
  
      let html_chatusers="";
      let getChatRoomsMessagesByUser=await APIRESTChat.getChatRoomsMessagesByUser(sessionuser.iduser,sessionuser.userrname);
  
      for (let i = 0; i < getChatRoomsMessagesByUser.length; i++) {
        let {idchatroom ,iduser2,nameuser2,profileimage2 } = getChatRoomsMessagesByUser[i];
        if (profileimage2==="") {
          profileimage2="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
        }
        if(sessionuser.iduser===iduser2){
 
          html_chatusers+=`
          
          `;
        }
        else
        {
          html_chatusers+=`
          <a 
          onclick="Head_SidebarJS.passidtoChatUser('${iduser2}');" 
          >
                <div class="contact-avatar">
                      <img src="${profileimage2}" alt="">
                           
                 </div>
               <div class="contact-username">${nameuser2}</div>
           </a>
          `;
        }
      
  
      }
      document.getElementById("headersidebar_div_chatusers").innerHTML=html_chatusers;
  
    }


    //NOTIFICATION MESSAGES

    static async loadNotificationsMessageUser(sessionuser) {

      const ably = new Ably.Realtime(`rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A`);
    
      //************************************************* */
 
      // REAL TIME NOTIFICATION  MESSAGE 
 
      const presenceChannel = ably.channels.get(`sendnotimessagechanel${sessionuser.iduser}`);
      
   
      presenceChannel.subscribe(`sendnotimessage${sessionuser.iduser}`, async function(message) {
        
        let getNotificationMessages = await APIRESTNotifications.getNotificationMessages(sessionuser.iduser, sessionuser.userrname);
        document.getElementById("headersidebar_span_numbernotimessages").innerHTML=getNotificationMessages.length;
       await Head_SidebarJS.forMessageUsersNotification(getNotificationMessages,sessionuser.iduser,sessionuser.userrname);
      });  
 
      //******************************************** */

       let getNotificationMessages = await APIRESTNotifications.getNotificationMessages(sessionuser.iduser, sessionuser.userrname);
         document.getElementById("headersidebar_span_numbernotimessages").innerHTML=getNotificationMessages.length;
         await  Head_SidebarJS.forMessageUsersNotification(getNotificationMessages,sessionuser.iduser,sessionuser.userrname);
 
   }
   static async forMessageUsersNotification(getNotificationMessage,iduserlogin,usernamelogin) {
    let html_messageuser="";
   
    for (let i = 0; i < getNotificationMessage.length; i++) {
      let {IdNotification  ,IdUserSender ,ImageSender ,NameSender ,Message, DateeTime,stringnotificationago} = getNotificationMessage[i];
     
      if (ImageSender==="") {
        ImageSender="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      if(Number(iduserlogin)===Number(IdUserSender))
      {
        html_messageuser=``;
      }
      else
      {
        html_messageuser+=`
        <li >
        <a 
         onclick="Head_SidebarJS.passidtoChatUser(${IdUserSender});" 
        >
           <div class="drop_avatar">
               <img src="${ImageSender}" alt=""> </div>
           <div class="drop_text">
              <strong> ${NameSender} </strong>
              <time>${stringnotificationago}</time>
              <p> ${Message} </p>
           </div>
        </a>
        </li>
        
        `;
       }

    }
    document.getElementById("headesidebar_ul_listnotimessages").innerHTML=html_messageuser;
   

  }
  static deleteNotificationMessage=()=>
{
  let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
  let deleteNotiMessageByUser= APIRESTNotifications.deleteNotiMessageByUser(sessionuser.iduser,sessionuser.userrname);
  if(deleteNotiMessageByUser)
  {
    
    document.getElementById("headersidebar_span_numbernotimessages").innerHTML=0;
    document.getElementById("headesidebar_ul_listnotimessages").innerHTML="";
  }
 

  }


}
window.addEventListener("load",Head_SidebarJS.load_headersidebar);


//SEARCH TEXT

const headersidebar_search_text = document.getElementById("headersidebar_search_text");
headersidebar_search_text.addEventListener("input",Head_SidebarJS.searchText);

//DELETE COMMENT NOTIFICATIONS

const headersidebar_button_deletenotifications = document.getElementById("headersidebar_button_deletenotifications");
headersidebar_button_deletenotifications.addEventListener("click",Head_SidebarJS.deleteCommentNotifications);


//DELETE MESSAGE NOTIFICATIONS

const headersidebar_button_deletenotimessages = document.getElementById("headersidebar_button_deletenotimessages");
headersidebar_button_deletenotimessages.addEventListener("click",Head_SidebarJS.deleteNotificationMessage);

const a_logout = document.getElementById('usersettings_link_logout');
a_logout.addEventListener('click', Head_SidebarJS.logout);


