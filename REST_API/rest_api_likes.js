class APIRESTLikes
{

static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

//IMAGE
 
static  likeImage=async(idimage,iduserlogin,usernamelogin)=> {
   
  let LIKEURL=this.RESTAPIURL+"/likes/likeimage"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idimage" :idimage,
  "iduserlogin" :iduserlogin,
    "usernamelogin": usernamelogin 
  });

   var requestOptions = {
    method: "POST",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(LIKEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
}
static  deletelikeImage=async(idimage,iduserlogin,usernamelogin)=> {
 
  let LIKEURL=this.RESTAPIURL+"/likes/likeimage"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idimage" :idimage,
  "iduserlogin" :iduserlogin,
    "usernamelogin": usernamelogin 
  });

   var requestOptions = {
    method: "DELETE",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(LIKEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
}
static existLikeImage=async(idimage,iduserlogin,usernamelogin)=>
{
  
      let LIKEURL=this.RESTAPIURL+`/likes/existLikeImage?idimage=${idimage}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

      let headersList = {
        "Accept": "*/*",
       
       }
       
       let response = await fetch(LIKEURL, { 
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

//POSTS
 
  static  likePost=async(idpost,iduserlogin,usernamelogin)=> {
   
    let LIKEURL=this.RESTAPIURL+"/likes/likepost"

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     

     let bodyContent = JSON.stringify({
      "idpost" :idpost,
    "iduserlogin" :iduserlogin,
      "usernamelogin": usernamelogin 
    });

     var requestOptions = {
      method: "POST",
      body: bodyContent,
      headers: headersList
     };

  const response=await fetch(LIKEURL, requestOptions);
   if(!response.ok)
   {
    const error=await response.text();
    throw new Error(error);
   }
   return true;
  }
  static  deletelikePost=async(idpost,iduserlogin,usernamelogin)=> {
   
    let LIKEURL=this.RESTAPIURL+"/likes/likepost"

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     

     let bodyContent = JSON.stringify({
      "idpost" :idpost,
    "iduserlogin" :iduserlogin,
      "usernamelogin": usernamelogin 
    });

     var requestOptions = {
      method: "DELETE",
      body: bodyContent,
      headers: headersList
     };

  const response=await fetch(LIKEURL, requestOptions);
   if(!response.ok)
   {
    const error=await response.text();
    throw new Error(error);
   }
   return true;
  }
  static existLikePost=async(idpost,iduserlogin,usernamelogin)=>
  {
    
        let LIKEURL=this.RESTAPIURL+`/likes/existLikePost?idpost=${idpost}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

        let headersList = {
          "Accept": "*/*",
         
         }
         
         let response = await fetch(LIKEURL, { 
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

//VIDEO

static  likeVideo=async(idvideo,iduserlogin,usernamelogin)=> {
   
    let LIKEURL=this.RESTAPIURL+"/likes/likevideo"

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     

     let bodyContent = JSON.stringify({
      "idvideo" :idvideo,
    "iduserlogin" :iduserlogin,
      "usernamelogin": usernamelogin 
    });

     var requestOptions = {
      method: "POST",
      body: bodyContent,
      headers: headersList
     };

  const response=await fetch(LIKEURL, requestOptions);
   if(!response.ok)
   {
    const error=await response.text();
    throw new Error(error);
   }
   return true;
  }
  static  deletelikeVideo=async(idvideo,iduserlogin,usernamelogin)=> {
   
    let LIKEURL=this.RESTAPIURL+"/likes/likevideo"

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     

     let bodyContent = JSON.stringify({
      "idvideo" :idvideo,
    "iduserlogin" :iduserlogin,
      "usernamelogin": usernamelogin 
    });

     var requestOptions = {
      method: "DELETE",
      body: bodyContent,
      headers: headersList
     };

  const response=await fetch(LIKEURL, requestOptions);
   if(!response.ok)
   {
    const error=await response.text();
    throw new Error(error);
   }
   return true;
  }
  static existLikeVideo=async(idvideo,iduserlogin,usernamelogin)=>
  {
    
        let LIKEURL=this.RESTAPIURL+`/likes/existLikeVideo?idvideo=${idvideo}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

        let headersList = {
          "Accept": "*/*",
         
         }
         
         let response = await fetch(LIKEURL, { 
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
  

//COMMENTS

static  likeComment=async(idcomment,iduserlogin,usernamelogin)=> {
   
  let LIKEURL=this.RESTAPIURL+"/likes/likecomment"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment" :idcomment,
  "iduserlogin" :iduserlogin,
    "usernamelogin": usernamelogin 
  });

   var requestOptions = {
    method: "POST",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(LIKEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
}
static  deleteComment=async(idcomment,iduserlogin,usernamelogin)=> {
   
  let LIKEURL=this.RESTAPIURL+"/likes/likecomment"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idcomment" :idcomment,
  "iduserlogin" :iduserlogin,
    "usernamelogin": usernamelogin 
  });

   var requestOptions = {
    method: "DELETE",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(LIKEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
}
static existLikeComment=async(idcomment,iduserlogin,usernamelogin)=>
{
  
      let LIKEURL=this.RESTAPIURL+`/likes/existLikeComment?idcomment=${idcomment}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

      let headersList = {
        "Accept": "*/*",
       
       }
       
       let response = await fetch(LIKEURL, { 
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

//SUBCOMMENTS

static  likeSubComment=async(idsubcomment,iduserlogin,usernamelogin)=> {
   
  let LIKEURL=this.RESTAPIURL+"/likes/likesubcomment"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idsubcomment" :idsubcomment,
  "iduserlogin" :iduserlogin,
    "usernamelogin": usernamelogin 
  });

   var requestOptions = {
    method: "POST",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(LIKEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
}
static  deleteSubComment=async(idsubcomment,iduserlogin,usernamelogin)=> {
   
  let LIKEURL=this.RESTAPIURL+"/likes/likesubcomment"

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }
   

   let bodyContent = JSON.stringify({
    "idsubcomment" :idsubcomment,
  "iduserlogin" :iduserlogin,
    "usernamelogin": usernamelogin 
  });

   var requestOptions = {
    method: "DELETE",
    body: bodyContent,
    headers: headersList
   };

const response=await fetch(LIKEURL, requestOptions);
 if(!response.ok)
 {
  const error=await response.text();
  throw new Error(error);
 }
 return true;
}
static existLikeSubComment=async(idsubcomment,iduserlogin,usernamelogin)=>
{
  
      let LIKEURL=this.RESTAPIURL+`/likes/existLikeSubComment?idsubcomment=${idsubcomment}&iduserlogin=${iduserlogin}&usernamelogin=${usernamelogin}`;

      let headersList = {
        "Accept": "*/*",
       
       }
       
       let response = await fetch(LIKEURL, { 
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
