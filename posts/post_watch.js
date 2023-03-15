class PostWatchJS
{
  //LOAD PAGE
  static loadPage=async()=>
  {
   setTimeout(async () => {
    try {
     let getuserlogin=await APIRESTLoginUser.getLoginUser();
        let idpostwatch = sessionStorage.getItem('idpostwatch');
      
       let getPost=await APIRESTPost.getPost(idpostwatch);
        let getuser=await APIRESTUser.getUser(getPost.user.iduser);
         
    let iduserlogin=getuserlogin.iduser;
        let iduserpost=getuser.iduser;
       //SHOW EDIT DELETE POST DIV
        const editDeleteDiv = document.getElementById('postwatch_editdeletepost_div');

               if (iduserlogin===iduserpost) {
              
               editDeleteDiv.removeAttribute('hidden');
               } else {
             
               editDeleteDiv.setAttribute('hidden', true);
               }


       this.loadPost(getPost,getuser.image);



  } catch (error) {
    console.log(error);
    //window.location.href="../index.html"; 
       }
   },1000);
  }
  static loadPost=async(getPost,userimage)=>
  {
   
   
   let {  description, DateTimePublish, title,user,idpost,visibility} = getPost;
 
   //CONERT FORMAT DATE

  const dt = new Date(DateTimePublish);
  const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
   if(userimage==="")
     {
       userimage="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
     }
     //GET IMAGE
  
   document.getElementById("postwatch_title").innerHTML=title;
   document.getElementById("postwatch_userimage").setAttribute("src", userimage);
   document.getElementById("postwatch_username_div").innerHTML=user.name;
   document.getElementById("postwatch_publishedpost").innerHTML=`Published on ${formatted_date}`;
   document.getElementById("postwatch_description").innerHTML=description;
   // document.getElementById("usersettings_urltwitter").setAttribute("value", urltwitter);

   //GET UPDATE POST MODAL
   document.getElementById("idpost_updatepost_postwatch").setAttribute("value",idpost );
   document.getElementById("postwatch_updatepost_name").setAttribute("value", title);
   document.getElementById("postwatch_updatepost_description").innerHTML=description;
   const visibilitySelect = document.getElementById('postwatch_updatepost_visibility');
   if (visibility === 'Private') {
     visibilitySelect.value = 'Private';
   } else {
     visibilitySelect.value = 'Public';
   }

   //GET ID POST DELETE
   document.getElementById("idpost_deletepost_postwatch").setAttribute("value", idpost);

  } 
     //UPDATE POST
     static updatePost= async(event)=>
     {
       try {
         event.preventDefault();
         const idpost = document.getElementById('idpost_updatepost_postwatch').value;
         const title = document.getElementById('postwatch_updatepost_name').value;
          const description = document.getElementById('postwatch_updatepost_description').value;       
          const visibility = document.getElementById('postwatch_updatepost_visibility').value;
         
            
          const dataform = {idpost,title
            ,description,visibility}
        
           const updatePost= await APIRESTPost.updatePost(dataform);
           if (updatePost) {
         
             messagenotification('Post Updated','success',event);
             location.reload();
             document.getElementById('postwatch_updatepost_name').value="";
             document.getElementById('postwatch_updatepost_description').value="";
            }
      
        
       }catch (error) {
         alert(error);
       }
     }
     //DELETE POST
     static deletePost= async(event)=>
     {
       try {
        
         const idimage = document.getElementById('idphoto_deleteimagemodal_imagewatch').value;
        
        
           const response_delete_image= await APIRESTImages.deleteImage(idimage);
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
  
  
}
window.addEventListener("load",PostWatchJS.loadPage);


const updatepostform = document.getElementById('form_postwatch_updatepost');
updatepostform.addEventListener('submit', PostWatchJS.updatePost);

const buttonDeletePost = document.getElementById('button_deletepostmodal_postwatch');
buttonDeletePost.addEventListener('click', PostWatchJS.deletePost);