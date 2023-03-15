class APIRESTPostComment
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 static getCommentPostByPost=async(idpost)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/comment/commentpost?idpost=${idpost}`;

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
}