class APIRESTPostComment
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 static commentPost=async(idpost,textcomment,iduserlogin,username)=>
 {

  let POSTURL=this.RESTAPIURL+"/comment/commentpost"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idpost": idpost,
    "usernamelogin":username ,
    "text": textcomment,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "POST",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(POSTURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 static editcommentPost=async(idcomment,idpost,text,iduserlogin,usernamelogin)=>
 {

  let POSTURL=this.RESTAPIURL+"/comment/commentpost"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment": idcomment,
    "idpost": idpost,
    "usernamelogin":usernamelogin ,
    "text": text,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "PUT",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(POSTURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 static deletecommentPost=async(idcomment,idpost,iduserlogin,usernamelogin)=>
 {

  let POSTURL=this.RESTAPIURL+"/comment/commentpost"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment": idcomment,
    "idpost": idpost,
    "usernamelogin":usernamelogin ,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "DELETE",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(POSTURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 //GETS
 static getCommentPostByPost=async(idpost,iduserlogin,username)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/comment/commentpost?idpost=${idpost}&iduserlogin=${iduserlogin}&usernamelogin=${username}`;

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
 static NumberOfCommentPost=async(idpost)=>
 {

       let URLPOST=this.RESTAPIURL+`/comment/NumberOfCommentPost?idpost=${idpost}`;

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
 static existCommentPost=async(idpost,idcomment,iduserlogin,usernamelogin)=>
 {

       let URLPOST=this.RESTAPIURL+`/comment/existCommentPost?idpost=${idpost}&idcomment=${idcomment}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

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
 static getIfExistsSubComentsOfCommentsPost=async(idpost,iduserlogin)=>
 {
  
  let URLPOST=this.RESTAPIURL+`/subcomment/getIfExistsSubComentsOfCommentsPost?idpost=${idpost}&iduserlogin=${iduserlogin}`;

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