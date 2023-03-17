class VideoMainPageJS
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


        //CHARGE OPERATIONS SIMULTANEOUSLY


        await Promise.all([
          this.listVideosMoreLike(),
          this.listVideoSearch(SelectData.getIdUserLogin())
         
      ]);

      await Promise.all([
       
        this.loadAlbumVideoUserModal(),
        this.listVideosMoreComment()
    ]);
       // await this.loadAlbumVideoUserModal();

        //await this.listVideoSearch(SelectData.getIdUserLogin());

        //await this.listVideosMoreLike();

      //await this.listVideosMoreComment();

      } catch (error) {
        // alert(error);
        // window.location.href="../index.html"; 
         }
    },1000);

      }
        //SEARCH
      static searchVideos=async(event)=>
      {
        try {
          
      
        let iduserLogin=SelectData.getIdUserLogin();
        const query = event.target.value;
        let getSearchVideosExpresion= await APIRESTVideo.getSearchVideosExpresion(iduserLogin,query);
        let html_load_seaarchvideos="";
        for (let i = 0; i <  Math.min(getSearchVideosExpresion.length, 10); i++) {
          let {urlvideo,description,stringpostedago,title,user,idvideo}=getSearchVideosExpresion[i];
          html_load_seaarchvideos+=`
              <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
              <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
                <a 
                href="./video_watch.html"
                onclick="VideoMainPageJS.passidtoVideoWatch('${idvideo}');"

                >
                    <video src="${urlvideo}" autoplay loop muted playsinline uk-cover></video>
                </a>
              </div>
              <div class="flex-1 space-y-2">
                <a 
                href="./video_watch.html"
                onclick="VideoMainPageJS.passidtoVideoWatch('${idvideo}');"

                class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
                <p class="leading-6 pr-4 line-clamp-2 md:block hidden">${description} </p>
                <a 
                href="../profileuser/profileuser.html"
                onclick="VideoMainPageJS.passidtoUserProfile('${user.iduser}');"
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
      document.getElementById("videomaingpage_listsearchvideos_div").innerHTML=html_load_seaarchvideos;
    } catch (error) {
        //  alert(error);
        //  window.location.href="../index.html"; 
    }
      }
      //LIST
      static async listVideoSearch(iduser) {
    let getSearchVideosExpresion = await APIRESTVideo.getSearchVideosExpresion(iduser,"");
    let html_load_seaarchvideos="";
    for (let i = 0; i < Math.min(getSearchVideosExpresion.length, 10); i++) {
      let { urlvideo, description, stringpostedago, title,user,idvideo } = getSearchVideosExpresion[i];
     
      html_load_seaarchvideos += `
              <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
              <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
                <a
                 href="./video_watch.html"
                onclick="VideoMainPageJS.passidtoVideoWatch('${idvideo}');"
                >
                    <video src="${urlvideo}" autoplay loop muted playsinline uk-cover></video>
                </a>
              </div>
              <div class="flex-1 space-y-2">
                <a href="./video_watch.html"
                onclick="VideoMainPageJS.passidtoVideoWatch('${idvideo}');"
                 class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
                <p class="leading-6 pr-4 line-clamp-2 md:block hidden">${description} </p>
                <a 
                href="../profileuser/profileuser.html"
                onclick="VideoMainPageJS.passidtoUserProfile('${user.iduser}');"
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
    document.getElementById("videomaingpage_listsearchvideos_div").innerHTML = html_load_seaarchvideos;
    document.getElementById("videomaingpage_listnewestvideos_div").innerHTML = html_load_seaarchvideos;
    
        }
        static async listVideosMoreLike() {
          let getVideosOrderByLikes = await APIRESTVideo.getVideosOrderByLikes();
        
          let html_load_videosmorelike="";
          for (let i = 0; i < Math.min(getVideosOrderByLikes.length, 10); i++) {
            let { urlvideo, description, stringpostedago, title,user,idvideo } = getVideosOrderByLikes[i];
            html_load_videosmorelike += `
                    <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
                    <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
                    
                      <a href="./video_watch.html"
                      onclick="VideoMainPageJS.passidtoVideoWatch('${idvideo}');"

                      >
                          <video src="${urlvideo}" autoplay loop muted playsinline uk-cover></video>
                      </a>
                    </div>
                    <div class="flex-1 space-y-2">
                    <a href="./video_watch.html"
                    onclick="VideoMainPageJS.passidtoVideoWatch('${idvideo}');"

                       class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
                      <p class="leading-6 pr-4 line-clamp-2 md:block hidden">${description} </p>
                     
                      <a 
                      href="../profileuser/profileuser.html"
                     onclick="VideoMainPageJS.passidtoUserProfile('${user.iduser}');"
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
          document.getElementById("videomaingpage_listmorelikesvideos_div").innerHTML = html_load_videosmorelike;  
          
              }
        static async listVideosMoreComment() {
                let getVideosOrderbyComments = await APIRESTVideo.getVideosOrderbyComments();
              
                let html_load_videosmorecomments="";
                for (let i = 0; i < Math.min(getVideosOrderbyComments.length, 10); i++) {
                  let { urlvideo, description, stringpostedago, title,user,idvideo } = getVideosOrderbyComments[i];
                  html_load_videosmorecomments += `
                          <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
                          <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
                         
                            <a href="./video_watch.html"
                            onclick="VideoMainPageJS.passidtoVideoWatch('${idvideo}');"
                            >
                                <video src="${urlvideo}" autoplay loop muted playsinline uk-cover></video>
                            </a>
                          </div>
                          <div class="flex-1 space-y-2">
                           
                            <a href="./video_watch.html"
                            onclick="VideoMainPageJS.passidtoVideoWatch('${idvideo}');"

                            class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
                            <p class="leading-6 pr-4 line-clamp-2 md:block hidden">${description} </p>
                          
                            <a 
                            href="../profileuser/profileuser.html"
                              onclick="VideoMainPageJS.passidtoUserProfile('${user.iduser}');"
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
                document.getElementById("videomaingpage_listmorecommentsvideos_div").innerHTML = html_load_videosmorecomments;  
                
         }

         //ADD VIDEO
         static upload_video_modal=async(event)=>
         {
           try {
            event.preventDefault();
            document.getElementById("create-video-modal").classList.add("cursor-loading");
            const title = document.getElementById('videomainpage_uploadvideo_title').value;
             const idalbumvideo = document.getElementById('videomainpage_select_albumvideos').value;
             const description = document.getElementById('videomainpage_uploadvideo_description').value;
             const visibility = document.getElementById('videomainpage_uploadvideo_visibility').value;
             let filevideo = document.getElementById('uploadonevideo').files[0];
             let getulogin=await this.getLoginUser();
            
           let urlvideo=await APIRESTCloudinary.upload_video(filevideo,getulogin.iduser);
             const dataform = {title
               ,idalbumvideo,visibility,description,urlvideo}
           
              const response_upload_video= await APIRESTVideo.addVideo(dataform);
              if (response_upload_video) {
             
                document.getElementById('videomainpage_uploadvideo_title').value="";
                document.getElementById('videomainpage_uploadvideo_description').value="";
               }
         
               messagenotification('Video Added','success',event);
               document.getElementById("create-video-modal").classList.remove("cursor-loading");
               setInterval(location.reload(),1000);
              
          }catch (error) {
            alert(error);
            location.reload();
          }
           
         }
         //GET TITLE ALBUM IN ADD MODAL VIDEO
        static async loadAlbumVideoUserModal() {
          let getalbumvideosuser = await APIRESTAlbumVideo.getAlbumVideoseByLoginUser();
          let load_albums_video = "";
          for (let i = 0; i < getalbumvideosuser.length; i++) {
            load_albums_video += `<option value=${getalbumvideosuser[i].idalbumvideo}>${getalbumvideosuser[i].title}</option>`;
          }

          document.getElementById("videomainpage_select_albumvideos").innerHTML = load_albums_video;
        }

        static passidtoVideoWatch=(idvideo)=>
        {
          try {
            sessionStorage.setItem('idvideowatch', idvideo);
          

       

         }catch (error) {
          // alert(error);
          
         }
          
        }
        static passidtoUserProfile=(iduser)=>
        {
          try {
            sessionStorage.setItem('iduserwatch', iduser);
          

       

         }catch (error) {
          // alert(error);
          
         }
          
        }
}
window.addEventListener("load",VideoMainPageJS.loadPage);

//SEARCH VIDEO

const searchVideo = document.getElementById("videomainpage_searchvideo_text");
searchVideo.addEventListener("input",VideoMainPageJS.searchVideos);


//ADD VIDEO

const addvideo = document.getElementById("form_videomainpage_addvideo");
addvideo.addEventListener("submit",VideoMainPageJS.upload_video_modal)