class ImageMainPageJS
{
    static  getLoginUser=async()=>
    {
      let response_loginuser= await APIRESTLoginUser.getLoginUser();
    

      return response_loginuser
  
    }
      //LOAD PAGE
      static loadPage=async()=>
      {
        setTimeout(async () => {
        try {
        let response_loginuser= await this.getLoginUser();
        SelectData.iduserLogin=response_loginuser.iduser;

       // await this.loadAlbumImageUserModal();

        await this.listImageSearch(response_loginuser.iduser);

        await this.listImageMoreLike();

        await this.listImageMoreComment();

      } catch (error) {
        // alert(error);
        // window.location.href="../index.html"; 
         }
    },1000);

      }
         //SEARCH
         static searchImage=async(event)=>
         {
           try {
             
            let iduserLogin=SelectData.getIdUserLogin();
           const query = event.target.value;
           let getSearchImagesExpresion = await APIRESTImages.getSearchImagesExpresion(iduserLogin,query);
           let html_load_searchimages="";
           for (let i = 0; i <  Math.min(getSearchImagesExpresion.length, 10); i++) {
            let { urlimage, description, stringpostedago, title,user,idphoto } = getSearchImagesExpresion[i];
             html_load_searchimages+=`
             <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
             <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
                <a href="image_watch.html">
                   <img src="${urlimage}" 
                   uk-responsive class="w-full h-full absolute object-cover inset-0">
                </a>
             </div>
             <div class="flex-1 space-y-2">
                <a href="image_watch.html" class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
                <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> ${description} </p>
                <a href="#" class="font-semibold block text-sm"> ${user.name}</a>
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
         static listImageSearch=async(iduser)=>
         {
         let getSearchImagesExpresion = await APIRESTImages.getSearchImagesExpresion(iduser,"");
         let html_load_seaarchimages="";
         for (let i = 0; i < Math.min(getSearchImagesExpresion.length, 15); i++) {
            let { urlimage, description, stringpostedago, title,user,idphoto } = getSearchImagesExpresion[i];
            
            html_load_seaarchimages += `
            <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
            <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
               <a href="image_watch.html">
                  <img src="${urlimage}" 
                  uk-responsive class="w-full h-full absolute object-cover inset-0">
               </a>
            </div>
            <div class="flex-1 space-y-2">
               <a href="image_watch.html" class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
               <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> ${description} </p>
               <a href="#" class="font-semibold block text-sm"> ${user.name}</a>
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
         static listImageMoreLike=async()=>
         {
         let getImagesOrderByLikes = await APIRESTImages.getImagesOrderByLikes();
         let html_load_imageslike="";
         for (let i = 0; i < Math.min(getImagesOrderByLikes.length, 15); i++) {
            let { urlimage, description, stringpostedago, title,user,idphoto } = getImagesOrderByLikes[i];
            
            html_load_imageslike += `
            <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
            <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
               <a href="image_watch.html">
                  <img src="${urlimage}" 
                  uk-responsive class="w-full h-full absolute object-cover inset-0">
               </a>
            </div>
            <div class="flex-1 space-y-2">
               <a href="image_watch.html" class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
               <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> ${description} </p>
               <a href="#" class="font-semibold block text-sm"> ${user.name}</a>
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
         static listImageMoreComment=async()=>
         {
         let getImagesOrderbyComments = await APIRESTImages.getImagesOrderbyComments();
         let html_load_commentsimages="";
         for (let i = 0; i < Math.min(getImagesOrderbyComments.length, 15); i++) {
            let { urlimage, description, stringpostedago, title,user,idphoto } = getImagesOrderbyComments[i];
          
            html_load_commentsimages += `
            <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
            <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
               <a href="image_watch.html">
                  <img src="${urlimage}" 
                  uk-responsive class="w-full h-full absolute object-cover inset-0">
               </a>
            </div>
            <div class="flex-1 space-y-2">
               <a href="image_watch.html" class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
               <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> ${description} </p>
               <a href="#" class="font-semibold block text-sm"> ${user.name}</a>
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

}
window.addEventListener("load",ImageMainPageJS.loadPage);

//SEARCH IMAGE

const searchImage = document.getElementById("imagemainpage_searchvideo_text");
searchImage.addEventListener("input",ImageMainPageJS.searchImage)