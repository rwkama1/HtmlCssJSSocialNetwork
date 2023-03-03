class APIRESTVideo
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

      
       static addImage=async(imagedata)=>
       {
        
       
        const {idalbumphoto,title,description,urlimage,visibility} = imagedata;
        

        let POSTURLIMAGE=this.RESTAPIURL+"/images/image"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
 
         let bodyContent = JSON.stringify({
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
       static updateImage=async(imagedata)=>
       {
        

        const {idimage,title,description,visibility} = imagedata;
        

        let PUTURLIMAGE=this.RESTAPIURL+"/images/image"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
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
       static deleteImage=async(idimage)=>
       {
        

        let DELETEURLIMAGE=this.RESTAPIURL+"/images/image"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
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
       static getVideosByLoginUser=async()=>
       {
       
             let URLVIDEOS=this.RESTAPIURL+`/video/getVideosbyIdUser`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLVIDEOS, { 
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
       static getVideosByAlbum=async(idalbum)=>
       {
        
       
             let URLIMAGE=this.RESTAPIURL+`/video/getImagesByAlbum?pidalbum=${idalbum}`;
 
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
       static getImage=async(idphoto)=>
       {
        
             let URLIMAGE=this.RESTAPIURL+`/images/image?pid=${idphoto}`;
 
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
  }     
  
     