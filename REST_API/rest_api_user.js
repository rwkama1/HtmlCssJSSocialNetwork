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
     static  updateUser=async(userdata)=>
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
      static  deleteUser=async()=>
      {
      
            let URLUSER=this.RESTAPIURL+"/user/user"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
           
             var requestOptions = {
              method: "DELETE",
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
      static  updatePassword=async(userdata)=>
      {
        const {userrname,oldpassword,newpassword} 
        = userdata;
        

            let URLUSER=this.RESTAPIURL+"/user/updateuserpassword"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
             let bodyContent = JSON.stringify({
 
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
      static  updateImageProfileCover=async(profileimage,coverimage)=>
      {
            let URLUSER=this.RESTAPIURL+"/user/insertcoverprofilepicture"

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
             let bodyContent = JSON.stringify({
 
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
      static getUser=async(iduser)=>
      {
       
      
            let URLUSER=this.RESTAPIURL+`/user/user?pid=${iduser}`;

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
 