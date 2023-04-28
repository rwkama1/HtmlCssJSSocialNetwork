class APIRESTVideo
{
  
 static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

      
       static addVideo=async(videodata,iduserlogin,username)=>

       {
       
        const {idalbumvideo,title,description,urlvideo,visibility} = videodata;

        let POSTURLVIDEO=this.RESTAPIURL+"/video/video"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
 
         let bodyContent = JSON.stringify({
          "iduserlogin": iduserlogin ,
          "usernamelogin": username,
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
       static updateVideo=async(videodata,iduserlogin,username)=>
       {
        

        const {idvideo,title,description,visibility} = videodata;
        

        let PUTURLVIDEO=this.RESTAPIURL+"/video/video"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
          "iduserlogin": iduserlogin ,
          "usernamelogin": username,
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
       static deleteVideo=async(idvideo,iduserlogin,usernamelogin)=>
       {
        

        let DELETEURLVIDEO=this.RESTAPIURL+"/video/video"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
      
         let bodyContent = JSON.stringify({
          "iduserlogin": iduserlogin ,
          "usernamelogin": usernamelogin,
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
       //GETS 
       static getVideosOrderByLikes=async(iduserLogin,usernamelogin)=>
       {
       
             let URLVIDEOS=this.RESTAPIURL+`/video/getVideosOrderByLikes?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}`;
 
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
       static getVideosOrderbyComments=async(iduserLogin,usernamelogin)=>
       {
       
             let URLVIDEOS=this.RESTAPIURL+`/video/getVideosOrderbyComments?iduserlogin=${iduserLogin}&usernamelogin=${usernamelogin}`;
 
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
       
       static getVideosByLoginUser=async(iduserLogin)=>
       {
       
             let URLVIDEOS=this.RESTAPIURL+`/video/getVideosbyIdUser?iduserlogin=${iduserLogin}`;
 
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
       static getVideosByUser=async(iduser)=>
       {
       
             let URLVIDEOS=this.RESTAPIURL+`/video/getVideosPublicbyIdUser?iduserlogin=${iduser}`;
 
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
       static getSearchVideosExpresion=async(iduser,searchtext)=>
       {
             let URLVIDEO=this.RESTAPIURL+`/video/getSearchVideosExpresion?searchtext=${searchtext}&iduser=${iduser}`;
 
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
       static getVideo=async(idvideo,iduserLogin,username)=>
       {
        
             let URLVIDEO=this.RESTAPIURL+`/video/video?pidvideo=${idvideo}&iduserlogin=${iduserLogin}&usernamelogin=${username}`;
 
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
       static getVideoFollowersofUser=async(iduserLogin)=>
       {
       
             let URLVIDEOS=this.RESTAPIURL+`/video/getUserFollowerVideos?iduserlogin=${iduserLogin}`;
 
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
       static getVideoFriendsofUser=async(iduserLogin)=>
       {
       
             let URLVIDEOS=this.RESTAPIURL+`/video/getVideosbyFriendUser?iduserlogin=${iduserLogin}`;
 
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
       static getVideoSuggestedUser=async(iduserLogin,iduser,usernamelogin)=>
       {
      
             let URLVIDEOS=this.RESTAPIURL+`/video/getVideosSuggestedUser?iduserlogin=${iduserLogin}&iduser=${iduser}&usernamelogin=${usernamelogin}`;
 
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


       
  }     
  
     