class ImageMainPageJS
{
  
      //LOAD PAGE
      static loadPage=async()=>
      {
       
        try {
         let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));


       
        await this.loadAlbumImageUserModal(sessionuser);
        await this.listImageSearch(sessionuser);
     
       await  this.listImageMoreLike(sessionuser);
        await this.listImageMoreComment(sessionuser);
    
       
      } catch (error) {
        // alert(error);
        // window.location.href="../index.html"; 
         }
   

      }
         //SEARCH
         static searchImage=async(event)=>
         {
           try {
             
            let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
           const query = event.target.value;
           let getSearchImagesExpresion = await APIRESTImages.getSearchImagesExpresion(sessionuser.iduser,
            sessionuser.userrname,query);
           let html_load_searchimages="";
           for (let i = 0; i <  Math.min(getSearchImagesExpresion.length, 10); i++) {
            let { urlimage, description, stringpostedago, title,user,idphoto } = getSearchImagesExpresion[i];
             html_load_searchimages+=`
             <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
             <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
                <a href="image_watch.html"
                onclick="ImageMainPageJS.passidtoImageWatch('${idphoto}');"
                >
                   <img src="${urlimage}" 
                   uk-responsive class="w-full h-full absolute object-cover inset-0">
                </a>
             </div>
             <div class="flex-1 space-y-2">
                <a href="image_watch.html" 
                onclick="ImageMainPageJS.passidtoImageWatch('${idphoto}');"
                class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
                <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> ${description} </p>
                <a 
                href="../profileuser/profileuser.html"
                onclick="ImageMainPageJS.passidtoUserProfile('${user.iduser}');"
                 class="font-semibold block text-sm"> ${user.name}</a>
                <div class="flex items-center justify-between">
                   <div class="flex space-x-3 items-center text-sm md:pt-3">
                   <div>${stringpostedago} </div>
                    
                   </div>
                </div>
             </div>
             <!-- ----- -->
          </div> 
             `
           }
         document.getElementById("imagemainpage_listsearchimage_div").innerHTML=html_load_searchimages;
       } catch (error) {
            // alert(error);
            // window.location.href="../index.html"; 
       }
         }
         //LIST
         static listImageSearch=async(sessionuser)=>
         {
            
         let getSearchImagesExpresion = await APIRESTImages.getSearchImagesExpresion(sessionuser.iduser,sessionuser.userrname,"");
         let html_load_seaarchimages="";
         for (let i = 0; i < Math.min(getSearchImagesExpresion.length, 15); i++) {
            let { urlimage, description, stringpostedago, title,user,idphoto } = getSearchImagesExpresion[i];
            
            html_load_seaarchimages += `
            <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
            <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
               <a href="image_watch.html"
               onclick="ImageMainPageJS.passidtoImageWatch('${idphoto}');"
               >
                  <img src="${urlimage}" 
                  uk-responsive class="w-full h-full absolute object-cover inset-0">
               </a>
            </div>
            <div class="flex-1 space-y-2">
               <a href="image_watch.html" 
               onclick="ImageMainPageJS.passidtoImageWatch('${idphoto}');"
               class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
               <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> ${description} </p>
               <a 
               href="../profileuser/profileuser.html"
                  onclick="ImageMainPageJS.passidtoUserProfile('${user.iduser}');"
                class="font-semibold block text-sm"> ${user.name}</a>
               <div class="flex items-center justify-between">
                  <div class="flex space-x-3 items-center text-sm md:pt-3">
                  <div>${stringpostedago} </div>
                  
                  </div>
               </div>
            </div>
            <!-- ----- -->
         </div> 
               `;
         }
         document.getElementById("imagemainpage_listsearchimage_div").innerHTML = html_load_seaarchimages;
         document.getElementById("imagemainpage_listnewestimage_div").innerHTML = html_load_seaarchimages;
         }
         static listImageMoreLike=async(sessionuser)=>
         {
         let getImagesOrderByLikes = await APIRESTImages.getImagesOrderByLikes(sessionuser.iduser,sessionuser.userrname);
         let html_load_imageslike="";
         for (let i = 0; i < Math.min(getImagesOrderByLikes.length, 15); i++) {
            let { urlimage, description, stringpostedago, title,user,idphoto } = getImagesOrderByLikes[i];
            
            html_load_imageslike += `
            <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
            <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
               <a href="image_watch.html"
               onclick="ImageMainPageJS.passidtoImageWatch('${idphoto}');"
               >
                  <img src="${urlimage}" 
                  uk-responsive class="w-full h-full absolute object-cover inset-0">
               </a>
            </div>
            <div class="flex-1 space-y-2">
               <a href="image_watch.html"
               onclick="ImageMainPageJS.passidtoImageWatch('${idphoto}');"
                class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
               <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> ${description} </p>
               <a 
               href="../profileuser/profileuser.html"
               onclick="ImageMainPageJS.passidtoUserProfile('${user.iduser}');"
                class="font-semibold block text-sm"> ${user.name}</a>
               <div class="flex items-center justify-between">
                  <div class="flex space-x-3 items-center text-sm md:pt-3">
                  <div>${stringpostedago} </div>
                  
                  </div>
               </div>
            </div>
            <!-- ----- -->
         </div> 
               `;
         }
         document.getElementById("imagemainpage_listmorelikesimage_div").innerHTML = html_load_imageslike;
         
         }
         static listImageMoreComment=async(sessionuser)=>
         {
         let getImagesOrderbyComments = await APIRESTImages.getImagesOrderbyComments(sessionuser.iduser,
            sessionuser.userrname);
         let html_load_commentsimages="";
         for (let i = 0; i < Math.min(getImagesOrderbyComments.length, 15); i++) {
            let { urlimage, description, stringpostedago, title,user,idphoto } = getImagesOrderbyComments[i];
          
            html_load_commentsimages += `
            <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
            <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
               <a href="image_watch.html"
               onclick="ImageMainPageJS.passidtoImageWatch('${idphoto}');"
               >
                  <img src="${urlimage}" 
                  uk-responsive class="w-full h-full absolute object-cover inset-0">
               </a>
            </div>
            <div class="flex-1 space-y-2">
               <a href="image_watch.html" 
               onclick="ImageMainPageJS.passidtoImageWatch('${idphoto}');"
               class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
               <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> ${description} </p>
               <a 
               href="../profileuser/profileuser.html"
               onclick="ImageMainPageJS.passidtoUserProfile('${user.iduser}');"
               class="font-semibold block text-sm"> ${user.name}</a>
               <div class="flex items-center justify-between">
                  <div class="flex space-x-3 items-center text-sm md:pt-3">
                  <div>${stringpostedago} </div>
                  
                  </div>
               </div>
            </div>
            <!-- ----- -->
         </div> 
               `;
         }
         document.getElementById("imagemainpage_listmorecommentimage_div").innerHTML = html_load_commentsimages;
         
         }
            //ADD IMAGE
        static upload_image_modal=async(event)=>
            {
              try {
               event.preventDefault();
               let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
               document.getElementById("create-image-modal").classList.add("cursor-loading");
               const title = document.getElementById('imagemainpage_uploadimage_title').value;
                const idalbumphoto = document.getElementById('imagemainpage_select_albumimages').value;
                const description = document.getElementById('imagemainpage_uploadimage_description').value;
                const visibility = document.getElementById('imagemainpage_uploadimage_visibility').value;
                let fileimage = document.getElementById('uploadoneimage').files[0];
                
               
              let urlimage=await APIRESTCloudinary.upload_image(fileimage,sessionuser.iduser);
                const dataform = {title
                  ,idalbumphoto,visibility,description,urlimage}
              
                 const response_upload_image= await APIRESTImages.addImage(dataform,sessionuser.iduser,
                  sessionuser.userrname);
                 if (response_upload_image) {
                
                   document.getElementById('imagemainpage_uploadimage_title').value="";
                   document.getElementById('imagemainpage_uploadimage_description').value="";
                  }
            
                  messagenotification('Image Added','success',event);
                  document.getElementById("create-image-modal").classList.remove("cursor-loading");
                  setInterval(location.reload(),1000);
                 
             }catch (error) {
               alert(error);
               location.reload();
             }
              
            }
         //GET TITLE ALBUM IN ADD MODAL IMAGE
         static async loadAlbumImageUserModal(sessionuser) {
            let getAlbumImage = await APIRESTAlbumImage.getAlbumImageByLoginUser(sessionuser.iduser,
               sessionuser.userrname);
            let load_albums_image = "";
            for (let i = 0; i < getAlbumImage.length; i++) {
            
               load_albums_image += `<option value=${getAlbumImage[i].idalbumphoto}>${getAlbumImage[i].title}</option>`;
            }

            document.getElementById("imagemainpage_select_albumimages").innerHTML = load_albums_image;
         }

         //OTHERS
         static passidtoImageWatch=(idimage)=>
        {
          try {
            sessionStorage.setItem("iduserwatch",null);
            sessionStorage.setItem('idimagewatch', idimage);

         }catch (error) {
          // alert(error);
          
         }
          
        }
        static passidtoUserProfile=(iduser)=>
        {
          try {
            sessionStorage.setItem("iduserwatch",null);
            sessionStorage.setItem('iduserwatch', iduser);
          

       

         }catch (error) {
          // alert(error);
          
         }
          
        }

}
window.addEventListener("load",ImageMainPageJS.loadPage);

//SEARCH IMAGE

const searchImage = document.getElementById("imagemainpage_searchvideo_text");
searchImage.addEventListener("input",ImageMainPageJS.searchImage);

//ADD IMAGE

const addimage = document.getElementById("form_imagemainpage_addimage");
addimage.addEventListener("submit",ImageMainPageJS.upload_image_modal)