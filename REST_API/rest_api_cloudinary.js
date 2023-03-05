class APIRESTCloudinary
{


  static RESTAPIURL ="https://api-next-social-network-private.vercel.app/api";

 static  createFolder=async()=> {
    try {

   
        let POSTURLCLOUDINARY=this.RESTAPIURL+"/cloudinary/creategetfolder"

        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         let post_folder_cloudinary_response = await fetch(POSTURLCLOUDINARY, {
          method: "POST",
          headers: headersList
        });
     

    } catch (error) {
      console.error(error);

      // alert(`Error: ${error.message}`)
    }
  }

  static  upload_image=async(imagefile,iduserlogin)=> {
   
    let headersList = {
      "Accept": "*/*"
     }
     
     let bodyContent = new FormData();
     bodyContent.append("upload_preset", "eibi5tao");
     bodyContent.append("folder", `socialnetworkk/${iduserlogin}`);
     bodyContent.append("file", imagefile);
     
     let response_urlimage = await fetch("https://api.cloudinary.com/v1_1/rwkama27/image/upload", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
   
      
        if(!response_urlimage.ok)
        {
         const error=await response_urlimage.text();
         throw new Error(error);
        }
        let imageUrl  = await response_urlimage.json();
       return imageUrl.secure_url;
        //console.log(base64Image);

    
  }

  static  upload_video=async(videofile,iduserlogin)=> {
   
    let headersList = {
      "Accept": "*/*"
     }
     
     let bodyContent = new FormData();
     bodyContent.append("upload_preset", "eibi5tao");
     bodyContent.append("folder", `socialnetworkk/${iduserlogin}`);
     bodyContent.append("file", videofile);
     
     let response_urlvideo = await fetch("https://api.cloudinary.com/v1_1/rwkama27/video/upload", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
   
      
        if(!response_urlvideo.ok)
        {
         const error=await response_urlvideo.text();
         throw new Error(error);
        }
        let videoURL  = await response_urlvideo.json();
       return videoURL.secure_url;

  }
}
