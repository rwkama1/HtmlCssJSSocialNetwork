class APIRESTAlbumImage
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

        static add_album_image=async(title,urlimages,iduserlogin,username)=>
        {
          let POSTURLIMAGE=this.RESTAPIURL+"/albumimage/albumimage"
  
          let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
           }
           
   
           let bodyContent = JSON.stringify({
            "iduserlogin": iduserlogin ,
            "usernamelogin": username ,
            "urlimages": urlimages ,
            "title": title
           
          });
   
           var requestOptions = {
            method: "POST",
            body: bodyContent,
            headers: headersList
           };
   
        const response=await fetch(POSTURLIMAGE, requestOptions);
         if(!response.ok)
         {
          const error=await response.text();
          throw new Error(error);
         }
         return true;
        }    
       //GETS
       static getAlbumImageByLoginUser=async(iduserlogin,username)=>
       {
        
       
             let URLALBUMIMAGE=this.RESTAPIURL+`/albumimage/getAlbumImagebyUser?iduserlogin=${iduserlogin}&usernamelogin=${username}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLALBUMIMAGE, { 
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

       static getAlbumImageWithImagesByLoginUser=async(iduserlogin,username)=>
       {
        
             let URLALBUMIMAGE=this.RESTAPIURL+`/albumimage/getAlbumImagebyUserWithImages?iduserlogin=${iduserlogin}&usernamelogin=${username}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLALBUMIMAGE, { 
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
  
     
