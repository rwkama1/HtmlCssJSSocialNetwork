class VideoMainPageJS
{
    //LOAD PAGE
      static loadPage=async()=>
      {
      
      
        try {

        //DARK MODE
        var nightMode = sessionStorage.getItem('gmtNightMode');
        if (nightMode) {
        document.documentElement.classList.add('dark');
        }



          let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
       


        //CHARGE OPERATIONS SIMULTANEOUSLY


    //     await Promise.all([
    //       this.listVideosMoreLike(),
    //       this.listVideoSearch(SelectData.getIdUserLogin())
         
    //   ]);

    //   await Promise.all([
       
    //     this.loadAlbumVideoUserModal(),
    //     this.listVideosMoreComment()
    // ]);
       await this.loadAlbumVideoUserModal(sessionuser);

        await this.listVideoSearch(sessionuser.iduser);

        await this.listVideosMoreLike(sessionuser);

      await this.listVideosMoreComment(sessionuser);

   await this.listVideoFollowersUser(sessionuser);

   await this.listVideoFriendsUser(sessionuser);

      } catch (error) {
        // alert(error);
        // window.location.href="../index.html"; 
         }
 
   
      }
        //SEARCH
      static searchVideos=async(event)=>
      {
        try {
          
      
          let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
        const query = event.target.value;
        let getSearchVideosExpresion= await APIRESTVideo.getSearchVideosExpresion(sessionuser.iduser,query);
        let html_load_seaarchvideos="";
        for (let i = 0; i <  Math.min(getSearchVideosExpresion.length, 20); i++) {
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
    for (let i = 0; i < Math.min(getSearchVideosExpresion.length, 20); i++) {
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
        static async listVideosMoreLike(sessionuser) {
        
          let getVideosOrderByLikes = await APIRESTVideo.getVideosOrderByLikes(sessionuser.iduser,
            sessionuser.userrname);
        
          let html_load_videosmorelike="";
          for (let i = 0; i < Math.min(getVideosOrderByLikes.length, 20); i++) {
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
        static async listVideosMoreComment(sessionuser) {
        
                let getVideosOrderbyComments = await APIRESTVideo.getVideosOrderbyComments(
                  sessionuser.iduser,sessionuser.userrname
                );
              
                let html_load_videosmorecomments="";
                for (let i = 0; i < Math.min(getVideosOrderbyComments.length, 20); i++) {
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
        static async listVideoFollowersUser(sessionuser) {
          
            let getFollowersByUser = await APIRESTVideo.getVideoFollowersofUser(
              sessionuser.iduser);
        
            let html_load_followeruservideos="";
            for (let i = 0; i < Math.min(getFollowersByUser.length, 20); i++) {
              let { urlvideo, description, stringpostedago, title,user,idvideo } = getFollowersByUser[i];
              html_load_followeruservideos += `
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
                  
                  </div>
                  `;
            }
            document.getElementById("videomaingpage_listfolloweruservideos_div").innerHTML = html_load_followeruservideos;  
            
        }
        static async listVideoFriendsUser(sessionuser) {
          
          let getVideoFriendsofUser = await APIRESTVideo.getVideoFriendsofUser(
            sessionuser.iduser);
      
          let html_load_friendsuservideos="";
          for (let i = 0; i < Math.min(getVideoFriendsofUser.length, 20); i++) {
            let { urlvideo, description, stringpostedago, title,user,idvideo } = getVideoFriendsofUser[i];
            html_load_friendsuservideos += `
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
                
                </div>
                `;
          }
          document.getElementById("videomaingpage_listfriendsuservideos_div").innerHTML = html_load_friendsuservideos;  
          
      }
         //ADD VIDEO
         static upload_video_modal=async(event)=>
         {
           try {
            event.preventDefault();
            let getulogin = JSON.parse(sessionStorage.getItem('user_login'));
            document.getElementById("create-video-modal").classList.add("cursor-loading");
            const title = document.getElementById('videomainpage_uploadvideo_title').value;
             const idalbumvideo = document.getElementById('videomainpage_select_albumvideos').value;
             const description = document.getElementById('videomainpage_uploadvideo_description').value;
             const visibility = document.getElementById('videomainpage_uploadvideo_visibility').value;
             let filevideo = document.getElementById('uploadonevideo').files[0];
            
            
           let urlvideo=await APIRESTCloudinary.upload_video(filevideo,getulogin.iduser);
             const dataform = {title
               ,idalbumvideo,visibility,description,urlvideo}
           
              const response_upload_video= await APIRESTVideo.addVideo(dataform
                ,getulogin.iduser,getulogin.userrname);
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
        static async loadAlbumVideoUserModal(sessionuser) {
        
          let getalbumvideosuser = await APIRESTAlbumVideo.getAlbumVideoseByLoginUser(
            sessionuser.iduser,sessionuser.userrname
          );
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
            sessionStorage.setItem("iduserwatch",null);
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