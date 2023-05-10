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
    
    let getChatRoomsMessagesByUser=await APIRESTChat.getChatRoomsMessagesByUser(sessionuser.iduser,sessionuser.userrname);
    console.log(getChatRoomsMessagesByUser);
        

   
  }   

}
window.addEventListener("load",ChatJS.loadPage);