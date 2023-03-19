class APIRESTLoginUser
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";
    
      
    static loginUser=async(userdata)=>
      {
        const {username,password} = userdata;
        

            let URLUSER=this.RESTAPIURL+"/user/loginuser";

            let headersList = {
              "Accept": "*/*",
              "Content-Type": "application/json"
             }
             
     
             let bodyContent = JSON.stringify({
             
              "username": username,
              "password":password 
             
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
           let user=await response.json();
           const userjson = JSON.stringify(user);
           return userjson;
      }
   
      static existloginuser=async(iduser,username)=>
      {
       
      
            let URLUSER=this.RESTAPIURL+`/user/existloginuser?iduserlogin=${iduser}&username=${username}`;

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
      static logout=async(iduser,username)=>
      {
       
         
            let URLUSER=this.RESTAPIURL+`/user/logout?iduserlogin=${iduser}&username=${username}`;

            let headersList = {
              "Accept": "*/*",
             
             }
             
             let response = await fetch(URLUSER, { 
               method: "POST",
               headers: headersList
             });
             
           if(!response.ok)
           {
            const error=await response.text();
            throw new Error(error);
           }
           let data = await response.text();
           return data;
      }  
        
 }     
 