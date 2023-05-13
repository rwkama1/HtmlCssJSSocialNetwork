class ChatJS

{
     //LOAD PAGE
  static loadPage=async()=>
  {
 
    try {
        let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
        let iduserchat=sessionStorage.getItem('iduserchat');
        await ChatJS.listChatRoomMessageLoginUser(sessionuser);
        await ChatJS.loadMessagesInChatByUsers(iduserchat,sessionuser.iduser,sessionuser.userrname);
    } 
    catch (error) {
    
        alert(error);
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
    document.getElementById("chat_div_listmessagesusers").innerHTML="";
    sessionStorage.setItem("iduserchat",null);
    sessionStorage.setItem("iduserchat",iduser2);
    let html_messages="";
   
    let getMessagesChatRoom=await APIRESTChat.getMessagesChatRoom(iduser2,iduserlogin,usernamelogin);
  
    for (let i = 0; i < getMessagesChatRoom.length; i++) {
      let {idusersender,nameusersender,imageusersender,textt,
        dateetime
      }=getMessagesChatRoom[i];
      if(imageusersender==="")
      {
        imageusersender="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
     
      if (Number(iduserlogin)===Number(idusersender)) 
      {
        html_messages+=`
        <div class="message-time-sign">
        <span>${dateetime}</span>
         </div>
        <div class="message-bubble me">
          <div class="message-bubble-inner">
              <div class="message-avatar"><img src="${imageusersender}" alt=""></div>
              <div class="message-text"><p>${textt}</p></div>
          </div>
          <div class="clearfix"></div>
  
         </div>
        `;
      }
       else {
        html_messages+=`
        <div class="message-time-sign">
        <span>${dateetime}</span>
         </div>
        <div class="message-bubble">
          <div class="message-bubble-inner">
              <div class="message-avatar">
              <img src="${imageusersender}" alt=""></div>
              <div class="message-text"><p> ${textt}</p></div>
          </div>
          <div class="clearfix"></div>
        </div>
    `;
      }
   
    }
    document.getElementById("chat_div_listmessagesusers").innerHTML=html_messages;
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
      console.log(date);
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
static async loadMessagesInChatByUsers2(iduser2,iduserlogin,usernamelogin){
  sessionStorage.setItem("iduserchat",null);
  sessionStorage.setItem("iduserchat",iduser2);
  let html_messages="";
  let getMessagesChatRoom=await APIRESTChat.getMessagesChatRoom(iduser2,iduserlogin,usernamelogin);


  for (let i = 0; i < getMessagesChatRoom.length; i++) {
    let {idusersender,nameusersender,imageusersender,textt,
      dateetime //DATEFORMAT: 2023-02-11T02:06:09.787Z
    }=getMessagesChatRoom[i];
 

    if(imageusersender==="")
    {
      imageusersender="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
    }
    if (Number(iduserlogin)===Number(idusersender)) 
    {
      html_messages+=`
      <div class="message-time-sign">
      <span>${dateText}</span>
       </div>
      <div class="message-bubble me">
        <div class="message-bubble-inner">
            <div class="message-avatar"><img src="${imageusersender}" alt=""></div>
            <div class="message-text"><p>${textt}</p></div>
        </div>
        <div class="clearfix"></div>

       </div>
      `;
    }
     else {
      html_messages+=`
      <div class="message-time-sign">
      <span>${dateetime}</span>
       </div>
      <div class="message-bubble">
        <div class="message-bubble-inner">
            <div class="message-avatar">
            <img src="${imageusersender}" alt=""></div>
            <div class="message-text"><p> ${textt}</p></div>
        </div>
        <div class="clearfix"></div>
      </div>
  `;
    }
 
  }
  document.getElementById("chat_div_listmessagesusers").innerHTML=html_messages;
}
//SEND MESSAGE
static async sendMessage()
{
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
  let html_addedmessage=`
  <div class="message-bubble me">
  <div class="message-bubble-inner">
      <div class="message-avatar"><img src="${sessionuser.image}" alt=""></div>
      <div class="message-text"><p>${textmessage}</p></div>
  </div>
  <div class="clearfix"></div>
</div>

  `;
  document.getElementById("chat_textarea_sendmessage").value="";
  let chat_div_listmessagesusers= document.getElementById("chat_div_listmessagesusers");
  chat_div_listmessagesusers.parentNode.insertAdjacentHTML("beforeend", html_addedmessage);
 }
}
//OTHERS
static DiffDateMessageDateNow(datetimemessage) {
  console.log(datetimemessage);
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