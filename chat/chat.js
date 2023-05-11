class ChatJS

{
     //LOAD PAGE
  static loadPage=async()=>
  {
 
    try {
        let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
        await ChatJS.listChatRoomMessageLoginUser(sessionuser);
    } 
    catch (error) {
    
        alert(error);
    }
  }   
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
  static async loadMessagesChatRoom(){

  } 
  static async showMessagesInChatByUsers(iduser2,iduserlogin,usernamelogin){
  
    let html_messages="";
    let getMessagesChatRoom=await APIRESTChat.getMessagesChatRoom(iduser2,iduserlogin,usernamelogin);
    for (let i = 0; i < getMessagesChatRoom.length; i++) {
      let {idusersender,nameusersender,imageusersender,textt,
        dateetime
      }=getMessagesChatRoom[i];
      html_messages+=`
      
      `
    }
}
}
window.addEventListener("load",ChatJS.loadPage);