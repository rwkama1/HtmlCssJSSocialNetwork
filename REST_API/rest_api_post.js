class APIRESTPost
{
     
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 
 static addPost=async(postdata,iduserlogin,username)=>
 {
  
 
  const {title,description,visibility} = postdata;
  

  let POSTURL=this.RESTAPIURL+"/post/post"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "iduserlogin": iduserlogin,
    "usernamelogin":username ,
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
 static updatePost=async(postdata,iduserLogin,username)=>
 {
  

  const {idpost,title,description,visibility} = postdata;
  

  let PUTURLPOST=this.RESTAPIURL+"/post/post"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }

   let bodyContent = JSON.stringify({
    "iduserlogin": iduserLogin,
    "usernamelogin":username ,
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
 static deletePost=async(idpost,iduserlogin,username)=>
       {
        

        let DELETEURLPOST=this.RESTAPIURL+"/post/post"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
          "iduserlogin": iduserlogin,
          "usernamelogin":username ,
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
       //  GETS
 static getPostByLoginUser=async(iduserlogin,username)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/post/getPostbyIdUser?iduserlogin=${iduserlogin}&usernamelogin=${username}`;

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
 static getPostByUser=async(iduser)=>
 {
 
       let URLPOSTS=this.RESTAPIURL+`/post/getPostPublicbyIdUser?pid=${iduser}`;

       let headersList = {
         "Accept": "*/*",
        
        }
        
        let response = await fetch(URLPOSTS, { 
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
 static getPost=async(idpost,iduserlogin,username)=>
 {
  
 
       let URLPOST=this.RESTAPIURL+`/post/post?pid=${idpost}&iduserlogin=${iduserlogin}&usernamelogin=${username}`;

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
 static getSearchPostExpresion=async(iduser,searchtext)=>
       {
             let URLPOST=this.RESTAPIURL+`/post/getSearchPostExpresion?searchtext=${searchtext}&iduser=${iduser}`;
 
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
  static getMoreLikePost=async(iduserlogin,username)=>
       {
             let URLPOST=this.RESTAPIURL+`/post/getPostOrderByLikes?iduserlogin=${iduserlogin}&usernamelogin=${username}`;
 
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
   static getMoreCommentPosts=async(iduserlogin,username)=>
       {
             let URLPOST=this.RESTAPIURL+`/post/getPostsOrderbyComments?iduserlogin=${iduserlogin}&usernamelogin=${username}`;
 
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
       static getPostFollowersUser=async(iduserlogin)=>
       {
             let URLPOST=this.RESTAPIURL+`/post/getUserFollowerPost?iduserlogin=${iduserlogin}`;
 
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
   static getPostFriendUser=async(iduserlogin)=>
       {
             let URLPOST=this.RESTAPIURL+`/post/getPostbyFriendUser?iduserlogin=${iduserlogin}`;
 
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