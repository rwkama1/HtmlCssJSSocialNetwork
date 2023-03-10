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
 static updatePost=async(postdata)=>
 {
  

  const {idpost,title,description,visibility} = postdata;
  

  let PUTURLPOST=this.RESTAPIURL+"/post/post"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }

   let bodyContent = JSON.stringify({
    "idpost": idpost ,
    "title": title,
    "description":description ,
    "visibility":visibility 
  
  });

   var requestOptions = {
    method: "PUT",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(PUTURLPOST, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
 }  
 static deletePost=async(idpost)=>
       {
        

        let DELETEURLPOST=this.RESTAPIURL+"/post/post"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
          "idpost": idpost 
        });
 
         var requestOptions = {
          method: "DELETE",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(DELETEURLPOST, requestOptions);
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
 static getPost=async(idpost)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/post/post?pid=${idpost}`;

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