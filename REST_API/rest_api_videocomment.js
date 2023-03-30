class APIRESTVideoComment
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 static commmentVideo=async(idvideo,textcomment,iduserlogin,username)=>
 {

  let VIDEOURL=this.RESTAPIURL+"/comment/commentvideo"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idvideo": idvideo,
    "usernamelogin":username ,
    "text": textcomment,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "POST",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(VIDEOURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 static editcommentVideo=async(idcomment,idvideo,text,iduserlogin,usernamelogin)=>
 {

  let VIDEOURL=this.RESTAPIURL+"/comment/commentvideo"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment": idcomment,
    "idvideo": idvideo,
    "usernamelogin":usernamelogin ,
    "text": text,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "PUT",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(VIDEOURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 static deletecommentVideo=async(idcomment,idvideo,iduserlogin,usernamelogin)=>
 {

  let VIDEOURL=this.RESTAPIURL+"/comment/commentvideo"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment": idcomment,
    "idvideo": idvideo,
    "usernamelogin":usernamelogin ,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "DELETE",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(VIDEOURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 //GETS
 static getCommentVideoByVideo=async(idvideo,iduserlogin,username)=>
 {
  
 
       let VIDEOURL=this.RESTAPIURL+`/comment/commentvideo?idvideo=${idvideo}&iduserlogin=${iduserlogin}&usernamelogin=${username}`;

       let headersList = {
         "Accept": "*/*",
        
        }
        
        let response = await fetch(VIDEOURL, { 
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
 static NumberOfCommentVideo=async(idvideo)=>
 {

       let VIDEOURL=this.RESTAPIURL+`/comment/NumberOfCommentVideo?idvideo=${idvideo}`;

       let headersList = {
         "Accept": "*/*",
        
        }
        
        let response = await fetch(VIDEOURL, { 
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
 static existCommentVideo=async(idvideo,idcomment,iduserlogin,usernamelogin)=>
 {
 
       let VIDEOURL=this.RESTAPIURL+`/comment/existCommentVideo?idvideo=${idvideo}&idcomment=${idcomment}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

       let headersList = {
         "Accept": "*/*",
        
        }
        
        let response = await fetch(VIDEOURL, { 
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