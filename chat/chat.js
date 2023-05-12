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
    sessionStorage.setItem("iduserchat",null);
    sessionStorage.setItem("iduserchat",iduser2);
    let html_messages="";
    let getMessagesChatRoom=await APIRESTChat.getMessagesChatRoom(iduser2,iduserlogin,usernamelogin);
    console.log(getMessagesChatRoom);
    for (let i = 0; i < getMessagesChatRoom.length; i++) {
      let {idusersender,nameusersender,imageusersender,textt,
        dateetime
      }=getMessagesChatRoom[i];
     
      if (!(iduserlogin===idusersender)) {
        html_messages+=`
        <div class="message-bubble me">
          <div class="message-bubble-inner">
              <div class="message-avatar"><img src="${imageusersender}" alt=""></div>
              <div class="message-text"><p>${textt}</p></div>
          </div>
          <div class="clearfix"></div>

         </div>
        `
      } else {
        html_messages+=`
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
  sessionStorage.setItem("iduserchat",null);
  sessionStorage.setItem("iduserchat",iduser2);
  let html_messages="";
  let getMessagesChatRoom=await APIRESTChat.getMessagesChatRoom(iduser2,iduserlogin,usernamelogin);
  console.log(getMessagesChatRoom);
  for (let i = 0; i < getMessagesChatRoom.length; i++) {
    let {idusersender,nameusersender,imageusersender,textt,
      dateetime
    }=getMessagesChatRoom[i];
    if (iduserlogin===idusersender) {
      html_messages+=`
      <div class="message-bubble me">
        <div class="message-bubble-inner">
            <div class="message-avatar"><img src="${imageusersender}" alt=""></div>
            <div class="message-text"><p>${textt}</p></div>
        </div>
        <div class="clearfix"></div>

       </div>
      `
    } else {
      html_messages+=`
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
  let chat_div_listmessagesusers= document.getElementById("chat_div_listmessagesusers");
  chat_div_listmessagesusers.parentNode.insertAdjacentHTML("beforeend", html_addedmessage);
 }
}

}
window.addEventListener("load",ChatJS.loadPage);


//SEND MESSAGE
const chat_button_sendmessage = document.getElementById('chat_button_sendmessage');
chat_button_sendmessage.addEventListener('click', ChatJS.sendMessage);