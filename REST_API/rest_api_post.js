class APIRESTPost
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 
 static addPost=async(postdata)=>
 {
  
 
  const {title,description,visibility} = postdata;
  

  let POSTURL=this.RESTAPIURL+"/post/post"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
 
    "title": title,
    "description":description ,
    "visibility":visibility 
  
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
 static getPostByLoginUser=async(iduser)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/post/getPostbyIdUser?pid=${iduser}`;

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