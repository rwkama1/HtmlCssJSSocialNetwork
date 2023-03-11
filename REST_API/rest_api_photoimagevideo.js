class APIRESTImageVideoPost
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 

 static getPhotoPostVideoByUser=async(iduser)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/postvideoimage/getPhotoPostVideoByUser?iduserlogin=${iduser}&iduser=${iduser}`;

       let headersList = {
         "Accept": "*/*",
        
        }
        
        let response = await fetch(URLPOST, { 
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