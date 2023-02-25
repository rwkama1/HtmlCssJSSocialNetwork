class APIRESTImages
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
 
  }     
  
     