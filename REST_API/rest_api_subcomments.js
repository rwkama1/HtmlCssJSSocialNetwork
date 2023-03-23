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

 //GETS
 static getSubCommentPostByPost=async(idcomment,iduser)=>
 {
  
 
       let SUBCOMMENTURL=this.RESTAPIURL+`/subcomment/getSubCommentsByUserComment?idcomment=${idcomment}&iduser=${iduser}`;

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
}