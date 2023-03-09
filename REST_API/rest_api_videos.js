class APIRESTVideo
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

      
       static addVideo=async(videodata)=>

       {
       
        const {idalbumvideo,title,description,urlvideo,visibility} = videodata;

        let POSTURLVIDEO=this.RESTAPIURL+"/video/video"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
 
         let bodyContent = JSON.stringify({
          "idalbumvideo": idalbumvideo ,
          "title": title,
          "description":description ,
          "urlvideo":urlvideo ,
          "visibility":visibility 
        
        });
 
         var requestOptions = {
          method: "POST",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(POSTURLVIDEO, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       return true;
       }  
       static updateVideo=async(videodata)=>
       {
        

        const {idvideo,title,description,visibility} = videodata;
        

        let PUTURLVIDEO=this.RESTAPIURL+"/video/video"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
          "idvideo": idvideo ,
          "title": title,
          "description":description ,
          "visibility":visibility 
        
        });
 
         var requestOptions = {
          method: "PUT",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(PUTURLVIDEO, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       return true;
       }  
       static deleteVideo=async(idvideo)=>
       {
        

        let DELETEURLVIDEO=this.RESTAPIURL+"/video/video"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
          "idvideo": idvideo 
        });
 
         var requestOptions = {
          method: "DELETE",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(DELETEURLVIDEO, requestOptions);
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
             let URLVIDEO=this.RESTAPIURL+`/video/getVideosbyAlbum?pidalbum=${idalbum}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLVIDEO, { 
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
       static getVideo=async(idvideo)=>
       {
        
             let URLVIDEO=this.RESTAPIURL+`/video/video?pidvideo=${idvideo}`;
 
             let headersList = {
               "Accept": "*/*",
              
              }
              
              let response = await fetch(URLVIDEO, { 
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
  
     