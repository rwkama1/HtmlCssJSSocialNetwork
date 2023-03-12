class VideoWatchJS
{
   //LOAD PAGE
   static loadPage=async()=>
   {
    setTimeout(async () => {
     try {
        let getuserlogin=await APIRESTLoginUser.getLoginUser();
        let idvideowatch = sessionStorage.getItem('idvideowatch');
        let getVideo=await APIRESTVideo.getVideo(idvideowatch);
        let getuser=await APIRESTUser.getUser(getVideo.user.iduser);

        let iduserlogin=getuserlogin.iduser;
        let iduservideo=getuser.iduser;
        //SHOW EDIT DELETE VIDEO DIV
         const editDeleteDiv = document.getElementById('videowatch_editdeletevideo_div');

                if (iduserlogin===iduservideo) {
               
                editDeleteDiv.removeAttribute('hidden');
                } else {
              
                editDeleteDiv.setAttribute('hidden', true);
                }


        this.loadVideo(getVideo,getuser.image);



   } catch (error) {
     alert(error);
     window.location.href="../index.html"; 
        }
    },1000);
   } 
   static loadVideo=async(getVideo,userimage)=>
   {
    
    
    let { urlvideo, description, DateTimePublish, title,user,idvideo,visibility} = getVideo;
  
    //CONERT FORMAT DATE

   const dt = new Date(DateTimePublish);
   const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if(userimage==="")
      {
        userimage="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      //GET VIDEO
    document.getElementById("videowatch_video").setAttribute("src", urlvideo);
    document.getElementById("videowatch_titlevideo").innerHTML=title;
    document.getElementById("videowatch_userimageprofile").setAttribute("src", userimage);
    document.getElementById("videowatch_username_div").innerHTML=user.name;
    document.getElementById("videowatch_publishedvideo").innerHTML=`Published on ${formatted_date}`;
    document.getElementById("videowatch_descriptionvideo_p").innerHTML=description;
    // document.getElementById("usersettings_urltwitter").setAttribute("value", urltwitter);

    //GET UPDATE VIDEO MODAL
    document.getElementById("videowatch_updatevideo_idvideo").setAttribute("value", idvideo);
    document.getElementById("videowatch_updatevideo_name").setAttribute("value", title);
    document.getElementById("videowatch_updatevideo_description").innerHTML=description;
    const visibilitySelect = document.getElementById('videowatch_updatevideo_visibility');
    if (visibility === 'Private') {
      visibilitySelect.value = 'Private';
    } else {
      visibilitySelect.value = 'Public';
    }


   }
   static updateVideo= async(event)=>
   {
     try {
       event.preventDefault();
       const idvideo = document.getElementById('videowatch_updatevideo_idvideo').value;
       const title = document.getElementById('videowatch_updatevideo_name').value;
        const description = document.getElementById('videowatch_updatevideo_description').value;       
        const visibility = document.getElementById('videowatch_updatevideo_visibility').value;
       
          
        const dataform = {idvideo,title
          ,description,visibility}
      
         const response_upload_video= await APIRESTVideo.updateVideo(dataform);
         if (response_upload_video) {
       
           messagenotification('Video Updated','success',event);
           location.reload();
           document.getElementById('videowatch_updatevideo_name').value="";
           document.getElementById('videowatch_updatevideo_description').value="";
          }
    
      
     }catch (error) {
       alert(error);
     }
   }



   
}
window.addEventListener("load",VideoWatchJS.loadPage);
//VIDEO
const updatevideoform = document.getElementById('form_updatevideo_videowatch');
updatevideoform.addEventListener('submit', VideoWatchJS.updateVideo);