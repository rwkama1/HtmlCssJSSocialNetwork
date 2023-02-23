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

      alert(`Error: ${error.message}`)
    }
  }

  static  upload_image=async(imagefile)=> {
   
   
        let POSTURLCLOUDINARY=this.RESTAPIURL+"/cloudinary/upload_image";
        let base64Image = await this.convertFileToBase64(imagefile);
        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         let bodyContent = JSON.stringify({
          "image" :base64Image
        });
         let response_urlimage= await fetch(POSTURLCLOUDINARY, {
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
      
        return imageUrl;

    
  }
  static convertFileToBase64=async (file)=> {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const result = await new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  

 }
//  let headersList = {
//   "Accept": "*/*",

//  }
//   let GETURLCLOUDINARY=this.RESTAPIURL+`/cloudinary/creategetfolder`;
//  let get_folder_cloudinary_response = await fetch(GETURLCLOUDINARY, {
//    method: "GET",
//    headers: headersList
//  });

// if (get_folder_cloudinary_response) {
// // The folder already exists, we do nothing.
//   return;
// }
// else{