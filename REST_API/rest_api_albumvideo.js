class APIRESTAlbumVideo
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

        static add_album_image=async(title,urlimages)=>
        {
          let POSTURLIMAGE=this.RESTAPIURL+"/albumimage/albumimage"
  
          let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
           }
           
   
           let bodyContent = JSON.stringify({
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
       static getAlbumVideoseByLoginUser=async()=>
       {
        
       
             let URLALBUMVIDEO=this.RESTAPIURL+`/albumvideo/getAlbumVideobyUser`;
 
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
  
     
