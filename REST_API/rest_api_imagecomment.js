class APIRESTImageComment
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 static commmentImage=async(idimage,textcomment,iduserlogin,username)=>
 {

  let IMAGEURL=this.RESTAPIURL+"/comment/commentimage"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idimage": idimage,
    "usernamelogin":username ,
    "text": textcomment,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "POST",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(IMAGEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 static editcommentImage=async(idcomment,idimage,text,iduserlogin,usernamelogin)=>
 {

  let IMAGEURL=this.RESTAPIURL+"/comment/commentimage"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment": idcomment,
    "idimage": idimage,
    "usernamelogin":usernamelogin ,
    "text": text,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "PUT",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(IMAGEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 static deletecommentImage=async(idcomment,idimage,iduserlogin,usernamelogin)=>
 {

  let IMAGEURL=this.RESTAPIURL+"/comment/commentimage"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment": idcomment,
    "idimage": idimage,
    "usernamelogin":usernamelogin ,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "DELETE",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(IMAGEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 //GETS
 static getCommentImageByImage=async(idimage,iduserlogin,username)=>
 {
  
       let IMAGEURL=this.RESTAPIURL+`/comment/commentimage?idimage=${idimage}&iduserlogin=${iduserlogin}&usernamelogin=${username}`;

       let headersList = {
         "Accept": "*/*",
        
        }
        
        let response = await fetch(IMAGEURL, { 
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
 static NumberOfCommentImage=async(idimage)=>
 {

       let IMAGEURL=this.RESTAPIURL+`/comment/NumberOfCommentImage?idimage=${idimage}`;

       let headersList = {
         "Accept": "*/*",
        
        }
        
        let response = await fetch(IMAGEURL, { 
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
 static existCommentImage=async(idimage,idcomment,iduserlogin,usernamelogin)=>
 {
 
       let IMAGEURL=this.RESTAPIURL+`/comment/existCommentImage?idimage=${idimage}&idcomment=${idcomment}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

       let headersList = {
         "Accept": "*/*",
        
        }
        
        let response = await fetch(IMAGEURL, { 
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