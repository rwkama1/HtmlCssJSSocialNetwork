class APIRESTSubComment
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 static addSubComment=async(idcomment,text,iduserlogin,username)=>
 {
    //idcomment,text,iduserlogin,usernamelogin
  let SUBCOMMENTURL=this.RESTAPIURL+"/subcomment/subcomment"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment": idcomment,
    "usernamelogin":username ,
    "text": text,
    "iduserlogin":iduserlogin 
  });

   let requestOptions = {
    method: "POST",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(SUBCOMMENTURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 static editsubcommentPost=async(idsubcomment,idcomment,text,iduserlogin,usernamelogin)=>
 {
  
  let POSTURL=this.RESTAPIURL+"/subcomment/subcomment"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idsubcomment": idsubcomment,
    "idcomment": idcomment,
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
 static deletesubcommentPost=async(idsubcomment,iduserlogin,usernamelogin)=>
 {

  let POSTURL=this.RESTAPIURL+"/subcomment/subcomment"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idsubcomment": idsubcomment,
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
 static getSubCommentByComment=async(iduserlogin,idcomment)=>
 {
  
 
       let SUBCOMMENTURL=this.RESTAPIURL+`/subcomment/getSubCommentsByComment?idcomment=${idcomment}&iduserlogin=${iduserlogin}`;

       let headersList = {
         "Accept": "*/*",    
        }
        let response = await fetch(SUBCOMMENTURL, { 
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
 static NumberOfSubComments=async(idcomment)=>
 {

       let URLPOST=this.RESTAPIURL+`/subcomment/NumberOfSubComments?idcomment=${idcomment}`;

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
 static existSubComment=async(idsubcomment,iduserlogin,usernamelogin)=>
 {
 
       let URLPOST=this.RESTAPIURL+`/subcomment/existSubComment?idsubcomment=${idsubcomment}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

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