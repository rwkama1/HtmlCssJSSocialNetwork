class APIRESTUserFriends
{
     static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

      
       static addUserRelation=async(idfriend,iduserlogin,usernamelogin)=>
       {
    

        let USERFRIENDURL=this.RESTAPIURL+"/userrelation/adduserrelation"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
        
         let bodyContent = JSON.stringify({
          "idfriend" :idfriend,
          "iduserlogin" :iduserlogin,
          "usernamelogin": usernamelogin 
          
        
        });
 
         var requestOptions = {
          method: "POST",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(USERFRIENDURL, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       let data = await response.json();
       return data;
       } 
       static deleteUserRelation=async(idfriend,iduserlogin,usernamelogin)=>
       {
        let USERFRIENDURL=this.RESTAPIURL+"/userrelation/deleteuserrelation"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }

         let bodyContent = JSON.stringify({
          "idfriend" :idfriend,
          "iduserlogin" :iduserlogin,
          "usernamelogin": usernamelogin 
          
        
        });
 
         var requestOptions = {
          method: "DELETE",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(USERFRIENDURL, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       
       return true;
       } 


       static existconfirmfriendloginusersender=async(idfriend,iduserlogin,usernamelogin)=>
       {
        let USERFRIENDURL=this.RESTAPIURL+`/userrelation/existconfirmfriendloginusersender?pidfriend=${idfriend}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`

        let headersList = {
          "Accept": "*/*"
         }
         
         var requestOptions = {
          method: "GET",

          headers: headersList
         };
 
        const response=await fetch(USERFRIENDURL, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       let data = await response.json();
       return data;
       } 
       static getPendingFriendsbyUserLoginUser=async(iduserlogin,usernamelogin)=>
       {
        let USERFRIENDURL=this.RESTAPIURL+`/userrelation/getsentpendingusersbyuser?iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

        let headersList = {
          "Accept": "*/*"
         }
         
         var requestOptions = {
          method: "GET",

          headers: headersList
         };
 
        const response=await fetch(USERFRIENDURL, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       let data = await response.json();
       return data;
       } 
       
       
}