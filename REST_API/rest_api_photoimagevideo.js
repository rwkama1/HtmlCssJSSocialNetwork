class APIRESTImageVideoPost
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 

 static getPhotoPostVideoByLoginUser=async(iduserlogin)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/postvideoimage/getPhotoPostVideoByLoginUser?iduserlogin=${iduserlogin}`;

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