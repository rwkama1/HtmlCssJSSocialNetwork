class APIRESTImageVideoPost
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 

 static getPhotoPostVideoByLoginUser=async(iduser,iduserlogin)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/postvideoimage/getPhotoPostVideoByLoginUser?iduserlogin=${iduserlogin}&iduser=${iduser}`;

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
 static getPhotoPostVideoSearch=async(iduserlogin,psearch)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/postvideoimage/getPhotoPostVideoUserSearch?iduserlogin=${iduserlogin}&psearch=${psearch}`;

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
 static getPhotoPostVideoUserLike=async(iduserlogin,iduser,usernamelogin)=>
 {
  
       let URLPOST=this.RESTAPIURL+`/postvideoimage/getPhotoPostVideoUserLikes?iduser=${iduser}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

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
 static getPhotoPostVideoMainPage=async(iduserlogin)=>
 {
  
       let URLPOST=this.RESTAPIURL+`/postvideoimage/getPhotoPostVideoMainPage?iduserlogin=${iduserlogin}`;

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