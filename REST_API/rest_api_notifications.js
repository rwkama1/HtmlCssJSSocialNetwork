class APIRESTNotifications
{
    static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

    //COMMENT NOTIFICATIONS
    static getNotificationComments=async(iduserLogin,usernamelogin)=>
    {
       
          let URLNOTIFICATION=this.RESTAPIURL+`/notifications/notificationcomment?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}`;

          let headersList = {
            "Accept": "*/*",
           
           }
           
           let response = await fetch(URLNOTIFICATION, { 
             method: "GET",
             headers: headersList
           });
           
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         let data = await response.json();
         return data;
    } 
    static updateSeenNotificationCommentImage=async(iduserLogin,usernamelogin,idnotification)=>
    {
       
          let URLNOTIFICATION=this.RESTAPIURL+`/notifications/updateSeenNotificationCommentImage?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}&idnotification=${idnotification}`;

          let headersList = {
            "Accept": "*/*",
           
           }
           
           let response = await fetch(URLNOTIFICATION, { 
             method: "PUT",
             headers: headersList
           });
           
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         let data = await response.json();
         return data;
    } 
    static updateSeenNotificationCommentVideo=async(iduserLogin,usernamelogin,idnotification)=>
    {
       
          let URLNOTIFICATION=this.RESTAPIURL+`/notifications/updateSeenNotificationCommentVideo?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}&idnotification=${idnotification}`;

          let headersList = {
            "Accept": "*/*",
           
           }
           
           let response = await fetch(URLNOTIFICATION, { 
             method: "PUT",
             headers: headersList
           });
           
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
        
         return true;
    } 
    static updateSeenNotificationCommentPost=async(iduserLogin,usernamelogin,idnotification)=>
    {
       
          let URLNOTIFICATION=this.RESTAPIURL+`/notifications/updateSeenNotificationCommentPost?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}&idnotification=${idnotification}`;

          let headersList = {
            "Accept": "*/*",
           
           }
           
           let response = await fetch(URLNOTIFICATION, { 
             method: "PUT",
             headers: headersList
           });
           
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         let data = await response.json();
         return data;
    } 
    static updateSeenNotificationSubComment=async(iduserLogin,usernamelogin,idnotification)=>
    {
       
          let URLNOTIFICATION=this.RESTAPIURL+`/notifications/updateSeenNotificationSubComment?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}&idnotification=${idnotification}`;

          let headersList = {
            "Accept": "*/*",
           
           }
           
           let response = await fetch(URLNOTIFICATION, { 
             method: "PUT",
             headers: headersList
           });
           
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         let data = await response.json();
         return data;
    } 
    static deleteNotiCommentsByUser=async(iduserLogin,usernamelogin)=>
    {
       
          let URLNOTIFICATION=this.RESTAPIURL+`/notifications/notificationcomment?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}`;

          let headersList = {
            "Accept": "*/*",
           
           }
           
           let response = await fetch(URLNOTIFICATION, { 
             method: "DELETE",
             headers: headersList
           });
           
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         return true
    } 

    //MESSAGES NOTIFICATIONS
    
    static getNotificationMessages=async(iduserLogin,usernamelogin)=>
    {
       
          let URLNOTIFICATION=this.RESTAPIURL+`/notifications/getNotificationMessagesByUser?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}`;

          let headersList = {
            "Accept": "*/*",
           
           }
           
           let response = await fetch(URLNOTIFICATION, { 
             method: "GET",
             headers: headersList
           });
           
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         let data = await response.json();
         return data;
    } 
    static deleteNotiMessageByUser=async(iduserLogin,usernamelogin)=>
    {
       
          let URLNOTIFICATION=this.RESTAPIURL+`/notifications/notificationsmessage?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}`;

          let headersList = {
            "Accept": "*/*",
           
           }
           
           let response = await fetch(URLNOTIFICATION, { 
             method: "DELETE",
             headers: headersList
           });
           
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         return true
    } 


}
