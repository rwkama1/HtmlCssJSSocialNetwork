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