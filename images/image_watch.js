class ImageWatchJS
{
  //LOAD PAGE
  static loadPage=async()=>
  {
   setTimeout(async () => {
    try {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
   
      let getImage=await APIRESTImages.getImage(sessionStorage.getItem('idimagewatch'),sessionuser.iduser,
      sessionuser.userrname)
       let getuser=await APIRESTUser.getUser(getImage.user.iduser,sessionuser.iduser,sessionuser.userrname);
         
       let iduserlogin=sessionuser.iduser;
       let iduserimage=getuser.iduser;
       //SHOW EDIT DELETE IMAGE DIV
        const editDeleteDiv = document.getElementById('imagewatch_editdeleteimage_div');

               if (iduserlogin===iduserimage) {
              
               editDeleteDiv.removeAttribute('hidden');
               } else {
             
               editDeleteDiv.setAttribute('hidden', true);
               }

    // GET ID USER

    document.getElementById("imagewatch_iduser").value=iduserimage;

    //LOAD IMAGE
          this.loadImage(getImage,getuser.image);



  } catch (error) {
    console.log(error);
    //window.location.href="../index.html"; 
       }
   },1000);
  }

  
   static loadImage=async(getImage,userimage)=>
  {
   
   
   let { urlimage, description, DateTimePublish, title,user,idphoto,visibility} = getImage;
 
   //CONERT FORMAT DATE

  const dt = new Date(DateTimePublish);
  const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
   if(userimage==="")
     {
       userimage="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
     }
     //GET IMAGE
   document.getElementById("imagewatch_image").src= urlimage;
   document.getElementById("imagewatch_titleimage").innerHTML=title;
   document.getElementById("imagewatch_userimageprofile").setAttribute("src", userimage);
   document.getElementById("imagewatch_username_div").innerHTML=user.name;
   document.getElementById("imagewatch_publishedimage").innerHTML=`Published on ${formatted_date}`;
   document.getElementById("imagewatch_descriptionimage_p").innerHTML=description;
   // document.getElementById("usersettings_urltwitter").setAttribute("value", urltwitter);

   //GET UPDATE IMAGE MODAL
   document.getElementById("imagewatch_updateimage_idimage").setAttribute("value", idphoto);
   document.getElementById("imagewatch_updateimage_name").setAttribute("value", title);
   document.getElementById("imagewatch_updateimage_description").innerHTML=description;
   const visibilitySelect = document.getElementById('imagewatch_updateimage_visibility');
   if (visibility === 'Private') {
     visibilitySelect.value = 'Private';
   } else {
     visibilitySelect.value = 'Public';
   }

   //GET ID IMAGE DELETE
   document.getElementById("idphoto_deleteimagemodal_imagewatch").setAttribute("value", idphoto);

  } 
     //UPDATE IMAGE
     static updateImage= async(event)=>
     {
       try {
         event.preventDefault();
         let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
         const idimage = document.getElementById('imagewatch_updateimage_idimage').value;
         const title = document.getElementById('imagewatch_updateimage_name').value;
          const description = document.getElementById('imagewatch_updateimage_description').value;       
          const visibility = document.getElementById('imagewatch_updateimage_visibility').value;
         
            
          const dataform = {idimage,title
            ,description,visibility}
        
           const response_upload_image= await APIRESTImages.updateImage(dataform,sessionuser.iduser,
            sessionuser.userrname);
           if (response_upload_image) {
         
             messagenotification('Image Updated','success',event);
             setInterval(() => {
              location.reload()
             }, 1000);
          
             document.getElementById('imagewatch_updateimage_name').value="";
             document.getElementById('imagewatch_updateimage_description').value="";
            }
      
        
       }catch (error) {
         alert(error);
       }
     }
     //DELETE IMAGE
     static deleteImage= async(event)=>
     {
       try {
        
         const idimage = document.getElementById('idphoto_deleteimagemodal_imagewatch').value;
         let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
        
           const response_delete_image= await APIRESTImages.deleteImage(idimage,
            sessionuser.iduser,sessionuser.userrname );
           if (response_delete_image) {
         
             messagenotification('Image Deleted','success',event);
             setInterval(() => {
              window.location.href="./image_mainpage.html"; 
             }, 1000);
           
            }
      
        
       }catch (error) {
         alert(error);
       }
     }
  //REDIRECT TO PROFILE USER
    static passidtoUserProfile=()=>
    {
       try {
        const iduser=document.getElementById("imagewatch_iduser").value;
        sessionStorage.setItem("iduserwatch",null);
          sessionStorage.setItem('iduserwatch', iduser);
      
         }catch (error) {
          // alert(error);
          
         }
          
    }  
}
window.addEventListener("load",ImageWatchJS.loadPage);


const updateimageform = document.getElementById('form_updateimage_imagewatch');
updateimageform.addEventListener('submit', ImageWatchJS.updateImage);

const buttonDeleteImage = document.getElementById('button_deleteimagemodal_imagewatch');
buttonDeleteImage.addEventListener('click', ImageWatchJS.deleteImage);

const a_userprofile= document.getElementById('imagewatch_a_userprofile');
a_userprofile.addEventListener('click', ImageWatchJS.passidtoUserProfile);