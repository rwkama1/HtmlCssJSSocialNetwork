class ChatJS

{
     //LOAD PAGE
  static loadPage=async()=>
  {
 
    try {


          //DARK MODE
          var nightMode = sessionStorage.getItem('gmtNightMode');
          if (nightMode) {
            document.documentElement.classList.add('dark');
          }


        let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
        let iduserchat=sessionStorage.getItem('iduserchat');
        let getuser=await APIRESTUser.getUser(iduserchat
      ,sessionuser.iduser,sessionuser.userrname);

      document.getElementById("chat_h4_nameuserconversation").innerHTML=`${getuser.name}`;
      



        await ChatJS.listChatRoomMessageLoginUser(sessionuser);

        //I CREATE 2 INSTANCES OF ABLY, SINCE THE 2 USERS MUST RECEIVE THE MESSAGES.
         
        // REAL TIME MESSAGES RECEIVED

          const ably = new Ably.Realtime(`rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A`);
          const presenceChannel = ably.channels.get(`sendmessagechanel${sessionuser.iduser}${iduserchat}`);
          // Listen for channel events
          presenceChannel.subscribe(`sendmessage${sessionuser.iduser}${iduserchat}`, async function(message) {
        
            await ChatJS.loadMessagesInChatByUsers(iduserchat,sessionuser.iduser,sessionuser.userrname);

          });

    //********************************************************* */

       // REAL TIME MESSAGES RECEIVED

         
          const presenceChannel2 = ably.channels.get(`sendmessagechanel${iduserchat}${sessionuser.iduser}`);
           // Listen for channel events
           presenceChannel2.subscribe(`sendmessage${iduserchat}${sessionuser.iduser}`, async function(message) {
         
            await ChatJS.loadMessagesInChatByUsers(iduserchat,sessionuser.iduser,sessionuser.userrname);
      
       }); 

        await ChatJS.loadMessagesInChatByUsers(iduserchat,sessionuser.iduser,sessionuser.userrname);

       
    } 
    catch (error) {
    
       // alert(error);
        console.log(error);
    }
  }   
  //LIST USERS CHAT ROOM LOGIN USER
  static listChatRoomMessageLoginUser=async(sessionuser)=>
  {
    let html_chatroom_messages="";
    let getChatRoomsMessagesByUser=await APIRESTChat.getChatRoomsMessagesByUser(sessionuser.iduser,sessionuser.userrname);
   
    for (let i = 0; i < getChatRoomsMessagesByUser.length; i++) {
      let {idchatroom,iduser1,nameuser1,profileimage1,
        iduser2,nameuser2,profileimage2,idmessage,textmessage,datetimemessage,stringmessagedago
      }=getChatRoomsMessagesByUser[i];
     
      if (profileimage2==="") {
        profileimage2="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      if(sessionuser.iduser===iduser2){
 
        html_chatroom_messages+=`
        <li>
          
        </li>
        `;
      }
      else{

      
      html_chatroom_messages+=`
      <li>
            <a
            onclick="ChatJS.showMessagesInChatByUsers('${iduser2}','${sessionuser.iduser}','${sessionuser.userrname}');"
             >
                  <div class="message-avatar"><i class="status-icon status-online"></i>
                      <img src="${profileimage2}" alt=""></div>
    
                  <div class="message-by">
                         <div class="message-by-headline">
                              <h5>${nameuser2}</h5>
                               <span>${stringmessagedago}</span>
                          </div>
                           <p>${textmessage}</p>
                       </div>
              </a>
        </li>
      `;
    }
    }
  document.getElementById("chat_ul_listchatroommessage").innerHTML=html_chatroom_messages;
        

   
  }  

   
  //LOAD MESSAGES CLICK USERS CHAT ROOM
  static async showMessagesInChatByUsers(iduser2,iduserlogin,usernamelogin)
  {
    sessionStorage.setItem("iduserchat", null);
    sessionStorage.setItem("iduserchat", iduser2);
    let getuser=await APIRESTUser.getUser(iduser2
      ,iduserlogin,usernamelogin);
      document.getElementById("chat_h4_nameuserconversation").innerHTML=`${getuser.name}`;

    const messagesByDate = {};
  
    const getMessagesChatRoom = await APIRESTChat.getMessagesChatRoom(iduser2, iduserlogin, usernamelogin);
  
    for (let i = 0; i < getMessagesChatRoom.length; i++) {
      let { idusersender, nameusersender, imageusersender, textt, dateetime } = getMessagesChatRoom[i];
   
      const messageDate = new Date(dateetime);
    
      const messageDateWithoutTime = messageDate.toDateString();
      if (imageusersender === "") {
        imageusersender = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      if (!messagesByDate[messageDateWithoutTime]) {
        messagesByDate[messageDateWithoutTime] = [];
      }
      messagesByDate[messageDateWithoutTime].push({
        idusersender,
        nameusersender,
        imageusersender,
        textt,
        dateetime
      });
    }
  
    let html_messages = "";
    for (const date in messagesByDate) {
      
     const datetext=ChatJS.DiffDateMessageDateNow(date) ;     
      html_messages += `
        <div class="message-time-sign">
          <span>${datetext}</span>
        </div>
      `;
      const messages = messagesByDate[date];
      for (const message of messages) {
        let { idusersender, nameusersender, imageusersender, textt, dateetime } = message;
        if (Number(iduserlogin) === Number(idusersender)) {
          html_messages += `
            <div class="message-bubble me">
              <div class="message-bubble-inner">
                <div class  ="message-avatar"><img src="${imageusersender}" alt=""></div>
                <div class="message-text"><p>${textt}</p></div>
              </div>
              <div class="clearfix"></div>
            </div>
          `;
        } else {
          html_messages += `
            <div class="message-bubble">
              <div class="message-bubble-inner">
                <div class="message-avatar">
                  <img src="${imageusersender}" alt="">
                </div>
                <div class="message-text"><p>${textt}</p></div>
              </div>
              <div class="clearfix"></div>
            </div>
          `;
        }
      }
    }

    document.getElementById("chat_div_listmessagesusers").innerHTML = html_messages;    
}
  //LIST MESSAGES CHAT ROOM
static async loadMessagesInChatByUsers(iduser2,iduserlogin,usernamelogin){
 
    sessionStorage.setItem("iduserchat", null);
    sessionStorage.setItem("iduserchat", iduser2);
  
    const messagesByDate = {};
  
    const getMessagesChatRoom = await APIRESTChat.getMessagesChatRoom(iduser2, iduserlogin, usernamelogin);
  
    for (let i = 0; i < getMessagesChatRoom.length; i++) {
      let { idusersender, nameusersender, imageusersender, textt, dateetime } = getMessagesChatRoom[i];
   
      const messageDate = new Date(dateetime);
    
      const messageDateWithoutTime = messageDate.toDateString();
      if (imageusersender === "") {
        imageusersender = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      if (!messagesByDate[messageDateWithoutTime]) {
        messagesByDate[messageDateWithoutTime] = [];
      }
      messagesByDate[messageDateWithoutTime].push({
        idusersender,
        nameusersender,
        imageusersender,
        textt,
        dateetime
      });
    }
  
    let html_messages = "";
    for (const date in messagesByDate) {
    
     const datetext=ChatJS.DiffDateMessageDateNow(date) ;     
      html_messages += `
        <div class="message-time-sign">
          <span>${datetext}</span>
        </div>
      `;
      const messages = messagesByDate[date];
      for (const message of messages) {
        let { idusersender, nameusersender, imageusersender, textt, dateetime } = message;
        if (Number(iduserlogin) === Number(idusersender)) {
          html_messages += `
            <div class="message-bubble me">
              <div class="message-bubble-inner">
                <div class  ="message-avatar"><img src="${imageusersender}" alt=""></div>
                <div class="message-text"><p>${textt}</p></div>
              </div>
              <div class="clearfix"></div>
            </div>
          `;
        } else {
          html_messages += `
            <div class="message-bubble">
              <div class="message-bubble-inner">
                <div class="message-avatar">
                  <img src="${imageusersender}" alt="">
                </div>
                <div class="message-text"><p>${textt}</p></div>
              </div>
              <div class="clearfix"></div>
            </div>
          `;
        }
      }
    }

    document.getElementById("chat_div_listmessagesusers").innerHTML = html_messages;      

}

//SEND MESSAGE
static async sendMessage()
{
  try {
   
  let iduserchat=sessionStorage.getItem('iduserchat');
  let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
  const textmessage= document.getElementById("chat_textarea_sendmessage").value;
  if(textmessage==="")
  {
    document.getElementById("chat_textarea_sendmessage").setCustomValidity("Please enter a message");
    document.getElementById("chat_textarea_sendmessage").reportValidity();
    return;
  }
  if (sessionuser.image==="") {
    sessionuser.image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
  }
 let addMessage=await APIRESTChat.addMessage(iduserchat,textmessage,sessionuser.iduser,sessionuser.userrname);
 if (addMessage) {

    //#region REAL TIME MESSAGE 

    let ably = new Ably.Realtime('rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A');
    const sendmessageChannelName = `sendmessagechanel${sessionuser.iduser}${iduserchat}`;
    const sendmessageChannel = ably.channels.get(sendmessageChannelName);
    const sendmessageRequestMessage = { name: `sendmessage${sessionuser.iduser}${iduserchat}` };
    sendmessageChannel.publish(sendmessageRequestMessage);
   
    //#endregion REAL TIME MESSAGE 

     //#region REAL TIME NOTI MESSAGE 

    
     const sendmessageChannelName2 = `sendnotimessagechanel${iduserchat}`;
     const sendmessageChannel2 = ably.channels.get(sendmessageChannelName2);
     const sendmessageRequestMessage2 = { name: `sendnotimessage${iduserchat}` };
     sendmessageChannel2.publish(sendmessageRequestMessage2);
    
     //#endregion REAL TIME NOTI MESSAGE 

//   let html_addedmessage=`
//   <div class="message-bubble me">
//   <div class="message-bubble-inner">
//       <div class="message-avatar"><img src="${sessionuser.image}" alt=""></div>
//       <div class="message-text"><p>${textmessage}</p></div>
//   </div>
//   <div class="clearfix"></div>
// </div>

//   `;
  document.getElementById("chat_textarea_sendmessage").value="";
  // let chat_div_listmessagesusers= document.getElementById("chat_div_listmessagesusers");
  // chat_div_listmessagesusers.parentNode.insertAdjacentHTML("beforeend", html_addedmessage);
} 
} 
catch (error) {
    alert(error);
  }
 
}
//TYPING INDICATOR SEND MESSAGE
// static typingindicator_sendMessage()
// {
//   let iduserchat=sessionStorage.getItem('iduserchat');
//   let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
  
//   //#region REAL TIME TYPING MESSAGE 

//   var ably = new Ably.Realtime('rjPGqw.P14V_A:-ZG1cx0oPtx7dmkwnZz1rHYgTPg9C86Ap1Tn4bP_y6A');
//   const typingsendmessageChannelName = `typingsendmessagechanel${sessionuser.iduser}${iduserchat}`;
//   const typingsendmessageChannel = ably.channels.get(typingsendmessageChannelName);
//   const typingsendmessageRequestMessage = { name: `typingsendmessage${sessionuser.iduser}${iduserchat}` };
//   typingsendmessageChannel.publish(typingsendmessageRequestMessage);
 
//   //#endregion REAL TIME TYPING MESSAGE 
// }
//DELETE CHATROOM 
static async deleteChatRoom()
{
  let iduserchat=sessionStorage.getItem('iduserchat');
  let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
  let deleteChatRoom=await  APIRESTChat.deleteChatRoom(iduserchat,sessionuser.iduser,sessionuser.userrname);
  if(deleteChatRoom)
  {
    messagenotification_withoutevent('Chat Room Deleted','success');
    setInterval(location.reload(),1000);
  }
}

//OTHERS
static DiffDateMessageDateNow(datetimemessage) {

  let stringmessagedago = "";
  let localdate = new Date(datetimemessage);

  let dateutcpublish = new Date(
    localdate.getUTCFullYear(),
    localdate.getUTCMonth(),
    localdate.getUTCDate(),
    localdate.getUTCHours(),
    localdate.getUTCMinutes(),
    localdate.getUTCSeconds(),
    localdate.getUTCMilliseconds()
  );

  let now = new Date();
  let nowutc = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  );

  let difmiliseconds = nowutc - dateutcpublish;
  let diffsecond = Math.floor(difmiliseconds / 1000);
  let diffminutes = Math.floor(diffsecond / 60);
  let diffhour = Math.floor(diffminutes / 60);
  let diffdays = Math.floor(diffhour / 24);

  let diffmonth = Math.floor(diffdays / 31);
  let diffyear = Math.floor(diffmonth / 12);
  if (diffsecond < 60) {
    stringmessagedago = `Today`;
  } else if (diffsecond >= 60 && diffminutes < 60) {
    stringmessagedago = `Today`;
  } else if (diffminutes >= 60 && diffhour < 24) {
    stringmessagedago = `Today`;
  } else if (diffhour >= 24 && diffdays < 31) {
    if(diffdays===1)
    {
      stringmessagedago = `Yesterday`;
    }
    else
    {
      stringmessagedago = `${diffdays} days ago`;
    }

  } else if (diffdays >= 31 && diffmonth < 12) {
    stringmessagedago = `${diffmonth} month ago`;
  } else if (diffmonth >= 12) {
    stringmessagedago = `${diffyear} years ago`;
  }
  return stringmessagedago;
}

}
window.addEventListener("load",ChatJS.loadPage);


//SEND MESSAGE
const chat_button_sendmessage = document.getElementById('chat_button_sendmessage');
chat_button_sendmessage.addEventListener('click', ChatJS.sendMessage);

//TYPING SEND MESSAGE
// const chat_textarea_sendmessage = document.getElementById('chat_textarea_sendmessage');
// chat_textarea_sendmessage.addEventListener('keydown', ChatJS.typingindicator_sendMessage);


//DELETE CHAT ROOM
const chat_button_deleteconversation = document.getElementById('chat_button_deleteconversation');
chat_button_deleteconversation.addEventListener('click', ChatJS.deleteChatRoom);