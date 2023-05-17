 class APIRESTUser
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";
    
      
      static  registerUser=async(userdata)=>
      {
        const {name,username,password,email,datebirth,country} = userdata;
        

            let URLUSER=this.RESTAPIURL+"/user/user"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
     
             let bodyContent = JSON.stringify({
              "name": name ,
              "userrname": username,
              "password":password ,
              "country":country ,
              "datebirth":datebirth ,
              "email": email
            });
     
             var requestOptions = {
              method: "POST",
              body: bodyContent,
              headers: headersList
             };
     
          const response=await fetch(URLUSER, requestOptions);
           if(!response.ok)
           {
            const error=await response.text();
            throw new Error(error);
           }
           return true;
      }
     static  updateUser=async(userdata,iduserlogin,username)=>
      {
        const {name,ocupattion,urlfacebook,urllinkedin,urlinstagram
          ,urltwitter,country,description,datebirth,email} 
        = userdata;
        

            let URLUSER=this.RESTAPIURL+"/user/user"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
            let bodyContent = JSON.stringify({
                "name" :name,
                "iduserlogin" :iduserlogin,
                "usernamelogin" :username,
                  "ocupattion" :ocupattion,
                  "urlfacebook":urlfacebook ,
                "urllinkedin" :urllinkedin,
                  "urlinstagram": urlinstagram,
                 "urltwitter":urltwitter,
                  "country" :country,
                 "description":description,
                   "datebirth":datebirth,
                  "email":email
          });
             var requestOptions = {
              method: "PUT",
              body: bodyContent,
              headers: headersList
             };
     
           const response=await fetch(URLUSER, requestOptions);
           if(!response.ok)
           {
            const error=await response.text();
            throw new Error(error);
           }
           return true;
      } 
      static  deleteUser=async(iduserlogin,usernamelogin)=>
      {
      
            let URLUSER=this.RESTAPIURL+"/user/user"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             let bodyContent = JSON.stringify({
              "iduserlogin" :iduserlogin,
              "usernamelogin" :usernamelogin
             
            
            });
           
             var requestOptions = {
              method: "DELETE",
              body:bodyContent,
              headers: headersList
             };
     
           const response=await fetch(URLUSER, requestOptions);
           if(!response.ok)
           {
            const error=await response.text();
            throw new Error(error);
           }
           return true;
      } 
      static  updatePassword=async(userdata,iduserlogin)=>
      {
        const {userrname,oldpassword,newpassword} 
        = userdata;
        

            let URLUSER=this.RESTAPIURL+"/user/updateuserpassword"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
             let bodyContent = JSON.stringify({
              "iduserlogin" :iduserlogin,
              "usernamelogin" :userrname,
              "userrname": userrname,
              "oldpassword": oldpassword,
              "newpassword":newpassword 
            
            });
             var requestOptions = {
              method: "PUT",
              body: bodyContent,
              headers: headersList
             };
     
           const response=await fetch(URLUSER, requestOptions);
           if(!response.ok)
           {
            const error=await response.text();
            throw new Error(error);
           }
           return true;
      } 
      static  updateImageProfileCover=async(profileimage,coverimage,iduserlogin,username)=>
      {
            let URLUSER=this.RESTAPIURL+"/user/insertcoverprofilepicture"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
             let bodyContent = JSON.stringify({
              "iduserlogin" :iduserlogin,
              "usernamelogin" :username,
              "profile": profileimage,
              "cover": coverimage
              
            
            });
             var requestOptions = {
              method: "PUT",
              body: bodyContent,
              headers: headersList
             };
     
           const response=await fetch(URLUSER, requestOptions);
           if(!response.ok)
           {
            const error=await response.text();
            throw new Error(error);
           }
           return true;
      } 
      static  updateDescription=async(description,iduserlogin,username)=>
      {

            let URLUSER=this.RESTAPIURL+"/user/updateDescriptionUser"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
             let bodyContent = JSON.stringify({
              "iduserlogin" :iduserlogin,
              "usernamelogin" :username,
              "description": description
             
            
            });
             var requestOptions = {
              method: "PUT",
              body: bodyContent,
              headers: headersList
             };
     
           const response=await fetch(URLUSER, requestOptions);
           if(!response.ok)
           {
            const error=await response.text();
            throw new Error(error);
           }
           return true;
      } 
      static  blockUser=async(iduserlogin,iduserblockedd,message,usernamelogin)=>
      {
      
            let URLUSER=this.RESTAPIURL+"/user/blockuser"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             let bodyContent = JSON.stringify({
              "iduserlogin" :iduserlogin,
              "usernamelogin" :usernamelogin,
              "iduserblockedd" :iduserblockedd,
              "message" :message
             
            
            });
           
             var requestOptions = {
              method: "POST",
              body:bodyContent,
              headers: headersList
             };
     
           const response=await fetch(URLUSER, requestOptions);
           if(!response.ok)
           {
            const error=await response.text();
            throw new Error(error);
           }
           return true;
      } 
      //GETS
      static getUser=async(iduser,iduserlogin,username)=>
      {
       
      
            let URLUSER=this.RESTAPIURL+`/user/user?pid=${iduser}&iduserlogin=${iduserlogin}&usernamelogin=${username}`;

            let headersList = {
              "Accept": "*/*",
             
             }
             
             let response = await fetch(URLUSER, { 
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

 }     
 