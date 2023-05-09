class APIRESTChat
{
    static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";
    //CHAT 
    static addChatRoom=async(iduserreceived,iduserlogin,usernamelogin)=>
    {
        // const {iduserreceived,iduserlogin,c} = req.body;
          let URLCHATROOM=this.RESTAPIURL+`/chatroom/chatroom`;

          let bodyContent = JSON.stringify({
            "iduserreceived": iduserreceived ,
            "iduserlogin": iduserlogin ,
            "usernamelogin": usernamelogin 
            
           
          });
   
           var requestOptions = {
            method: "POST",
            body: bodyContent,
            headers: headersList
           };
   
        const response=await fetch(URLCHATROOM, requestOptions);
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         return true;
    } 
    static getUsersChatRoomsByUser=async(iduserLogin,usernamelogin)=>
    {
       
      let URLCHATROOM=this.RESTAPIURL+`/chatroom/getUsersChatRoomsByUser?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}`;
 
      let headersList = {
        "Accept": "*/*"
       }
       
       var requestOptions = {
        method: "GET",

        headers: headersList
       };

      const response=await fetch(URLCHATROOM, requestOptions);
     if(!response.ok)
     {
      const error=await response.text();
      throw new Error(error);
     }
     let data = await response.json();
     return data;
    }


    // static updateSeenNotificationCommentImage=async(iduserLogin,usernamelogin,idnotification)=>
    // {
       
    //       let URLNOTIFICATION=this.RESTAPIURL+`/notifications/updateSeenNotificationCommentImage?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}&idnotification=${idnotification}`;

    //       let headersList = {
    //         "Accept": "*/*",
           
    //        }
           
    //        let response = await fetch(URLNOTIFICATION, { 
    //          method: "PUT",
    //          headers: headersList
    //        });
           
    //      if(!response.ok)
    //      {
    //       const error=await response.text();
    //       throw new Error(error);
    //      }
    //      let data = await response.json();
    //      return data;
    // } 
    // static updateSeenNotificationCommentVideo=async(iduserLogin,usernamelogin,idnotification)=>
    // {
       
    //       let URLNOTIFICATION=this.RESTAPIURL+`/notifications/updateSeenNotificationCommentVideo?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}&idnotification=${idnotification}`;

    //       let headersList = {
    //         "Accept": "*/*",
           
    //        }
           
    //        let response = await fetch(URLNOTIFICATION, { 
    //          method: "PUT",
    //          headers: headersList
    //        });
           
    //      if(!response.ok)
    //      {
    //       const error=await response.text();
    //       throw new Error(error);
    //      }
        
    //      return true;
    // } 
    // static updateSeenNotificationCommentPost=async(iduserLogin,usernamelogin,idnotification)=>
    // {
       
    //       let URLNOTIFICATION=this.RESTAPIURL+`/notifications/updateSeenNotificationCommentPost?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}&idnotification=${idnotification}`;

    //       let headersList = {
    //         "Accept": "*/*",
           
    //        }
           
    //        let response = await fetch(URLNOTIFICATION, { 
    //          method: "PUT",
    //          headers: headersList
    //        });
           
    //      if(!response.ok)
    //      {
    //       const error=await response.text();
    //       throw new Error(error);
    //      }
    //      let data = await response.json();
    //      return data;
    // } 
    // static updateSeenNotificationSubComment=async(iduserLogin,usernamelogin,idnotification)=>
    // {
       
    //       let URLNOTIFICATION=this.RESTAPIURL+`/notifications/updateSeenNotificationSubComment?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}&idnotification=${idnotification}`;

    //       let headersList = {
    //         "Accept": "*/*",
           
    //        }
           
    //        let response = await fetch(URLNOTIFICATION, { 
    //          method: "PUT",
    //          headers: headersList
    //        });
           
    //      if(!response.ok)
    //      {
    //       const error=await response.text();
    //       throw new Error(error);
    //      }
    //      let data = await response.json();
    //      return data;
    // } 
    // static deleteNotiCommentsByUser=async(iduserLogin,usernamelogin)=>
    // {
       
    //       let URLNOTIFICATION=this.RESTAPIURL+`/notifications/notificationcomment?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}`;

    //       let headersList = {
    //         "Accept": "*/*",
           
    //        }
           
    //        let response = await fetch(URLNOTIFICATION, { 
    //          method: "DELETE",
    //          headers: headersList
    //        });
           
    //      if(!response.ok)
    //      {
    //       const error=await response.text();
    //       throw new Error(error);
    //      }
    //      return true
    // } 
}
