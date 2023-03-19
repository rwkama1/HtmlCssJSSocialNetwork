class APIRESTImages
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

      
       static addImage=async(imagedata,iduserlogin,username)=>
       {
        
       
        const {idalbumphoto,title,description,urlimage,visibility} = imagedata;
        

        let POSTURLIMAGE=this.RESTAPIURL+"/images/image"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
 
         let bodyContent = JSON.stringify({
          "iduserlogin" :iduserlogin,
              "usernamelogin" :username,
          "idalbumphoto": idalbumphoto ,
          "title": title,
          "description":description ,
          "urlimage":urlimage ,
          "visibility":visibility 
        
        });
 
         var requestOptions = {
          method: "POST",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(POSTURLIMAGE, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       return true;
       } 
       
       static updateImage=async(imagedata,iduserlogin,username)=>
       {
        

        const {idimage,title,description,visibility} = imagedata;
        

        let PUTURLIMAGE=this.RESTAPIURL+"/images/image"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
          "iduserlogin" :iduserlogin,
              "usernamelogin" :username,
          "idimage": idimage ,
          "title": title,
          "description":description ,
          "visibility":visibility 
        
        });
 
         var requestOptions = {
          method: "PUT",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(PUTURLIMAGE, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       return true;
       }  


       static deleteImage=async(idimage,iduserlogin,username)=>
       {
        

        let DELETEURLIMAGE=this.RESTAPIURL+"/images/image"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
          "iduserlogin" :iduserlogin,
              "usernamelogin" :username,
          "idimage": idimage 
        });
 
         var requestOptions = {
          method: "DELETE",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(DELETEURLIMAGE, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       return true;
       }  

        //GETS
       static getImagesByLoginUser=async(iduserLogin,iduser)=>
       {
        
       
             let URLIMAGE=this.RESTAPIURL+`/images/getImagesbyIdUser?piduser=${iduser}&iduserlogin=${iduserLogin}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLIMAGE, { 
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
         static getImagesByUser=async(iduserlogin,iduser)=>
       {
       
             let URLIMAGES=this.RESTAPIURL+`/images/getImagesPublicbyIdUser?piduser=${iduser}&iduserlogin=${iduserlogin}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLIMAGES, { 
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
       static getImagesByAlbum=async(idalbum)=>
       {
        
       
             let URLIMAGE=this.RESTAPIURL+`/images/getImagesByAlbum?pidalbum=${idalbum}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLIMAGE, { 
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
       static getImage=async(idphoto,iduserlogin,username)=>
       {
        
             let URLIMAGE=this.RESTAPIURL+`/images/image?pid=${idphoto}&iduserlogin=${iduserlogin}&usernamelogin=${username}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLIMAGE, { 
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
       static getSearchImagesExpresion=async(iduser,searchtext)=>
       {
             let URLIMAGE=this.RESTAPIURL+`/images/getSearchImagesExpresion?searchtext=${searchtext}&iduser=${iduser}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLIMAGE, { 
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

       static getImagesOrderByLikes=async()=>
       {
       
             let URLIMAGES=this.RESTAPIURL+`/images/getImagesOrderByLikes`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLIMAGES, { 
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
       static getImagesOrderbyComments=async()=>
       {
       
             let URLIMAGES=this.RESTAPIURL+`/images/getImagessOrderbyComments`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLIMAGES, { 
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
  
     