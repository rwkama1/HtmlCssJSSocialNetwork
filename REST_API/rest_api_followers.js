class APIRESTFollowers
{
      static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";
  
       static addFollow=async(iduserfollowed,iduserlogin,usernamelogin)=>
       {
    

        let USERFOLLOWURL=this.RESTAPIURL+"/followers/followers"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
        
         let bodyContent = JSON.stringify({
          "iduserfollowed" :iduserfollowed,
          "iduserlogin" :iduserlogin,
          "usernamelogin": usernamelogin 
          
        
        });
 
         var requestOptions = {
          method: "POST",
          body: bodyContent,
          headers: headersList
         };
 
        const response=await fetch(USERFOLLOWURL, requestOptions);
        if(!response.ok)
        {
          const error=await response.text();
          throw new Error(error);
        }

       return true;
       } 
       static deleteFollow=async(iduserfollowed,iduserlogin,usernamelogin)=>
       {
    

        let USERFOLLOWURL=this.RESTAPIURL+"/followers/followers"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
        
         let bodyContent = JSON.stringify({
          "iduserfollowed" :iduserfollowed,
          "iduserlogin" :iduserlogin,
          "usernamelogin": usernamelogin 
          
        
        });
 
         var requestOptions = {
          method: "DELETE",
          body: bodyContent,
          headers: headersList
         };
 
      const response=await fetch(USERFOLLOWURL, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
      return true;
       } 
       static existfollow=async(iduserfollower,iduserfollowed)=>
       {
        let USERFOLLOWURL=this.RESTAPIURL+`/followers/existfollow?iduserfollower=${iduserfollower}&iduserfollowed=${iduserfollowed}`
 
        let headersList = {
          "Accept": "*/*"
         }
         
         var requestOptions = {
          method: "GET",

          headers: headersList
         };
 
        const response=await fetch(USERFOLLOWURL, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       let data = await response.json();
       return data;
       } 
       static number_of_followers=async(iduser)=>
       {
        let USERFOLLOWURL=this.RESTAPIURL+`/followers/numberoffollowers?iduser=${iduser}`;
 
        let headersList = {
          "Accept": "*/*"
         }
         
         var requestOptions = {
          method: "GET",

          headers: headersList
         };
 
        const response=await fetch(USERFOLLOWURL, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       let data = await response.json();
       return data;
       } 
       static getFollowersByUser=async(piduser)=>
       {
        let USERFOLLOWURL=this.RESTAPIURL+`/followers/numberoffollowers?piduser=${piduser}`;
 
        let headersList = {
          "Accept": "*/*"
         }
         
         var requestOptions = {
          method: "GET",

          headers: headersList
         };
 
        const response=await fetch(USERFOLLOWURL, requestOptions);
       if(!response.ok)
       {
        const error=await response.text();
        throw new Error(error);
       }
       let data = await response.json();
       return data;
       } 
}