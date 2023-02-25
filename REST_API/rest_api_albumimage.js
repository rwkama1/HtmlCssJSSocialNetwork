class APIRESTAlbumImage
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

       //GETS
       static getAlbumImageByLoginUser=async()=>
       {
        
       
             let URLALBUMIMAGE=this.RESTAPIURL+`/albumimage/getAlbumImagebyUser`;
 
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
  
     
