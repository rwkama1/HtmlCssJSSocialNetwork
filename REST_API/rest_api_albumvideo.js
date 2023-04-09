class APIRESTAlbumVideo
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

        static add_album_video=async(title,urlvideos,iduserlogin,username)=>
        {
          let POSTURLVIDEOS=this.RESTAPIURL+"/albumvideo/albumvideo"
  
          let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
           }
           
   
           let bodyContent = JSON.stringify({
            "iduserlogin": iduserlogin ,
            "usernamelogin": username ,
            "urlvideos": urlvideos ,
            "title": title
           
          });
   
           var requestOptions = {
            method: "POST",
            body: bodyContent,
            headers: headersList
           };
   
        const response=await fetch(POSTURLVIDEOS, requestOptions);
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         return true;
        }

       //GETS
       static getAlbumVideoseByLoginUser=async(iduserlogin,username)=>
       {
        
       
             let URLALBUMVIDEO=this.RESTAPIURL+`/albumvideo/getAlbumVideobyUser?iduserlogin=${iduserlogin}&usernamelogin=${username}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLALBUMVIDEO, { 
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
  
     
