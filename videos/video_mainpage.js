class VideoMainPageJS
{
    static  getLoginUser=async()=>
    {
      let response_loginuser= await APIRESTLoginUser.getLoginUser();
      let getuser= await APIRESTUser.getUser(response_loginuser.iduser);
      return getuser
  
    }
      //LOAD PAGE
      static loadPage=async()=>
      {
        await this.listVideoSearch();
      }

      static searchVideos=async(event)=>
      {
        const query = event.target.value;
        let getSearchVideosExpresion= await APIRESTVideo.getSearchVideosExpresion(query);
        let html_load_seaarchvideos="";
        for (let i = 0; i < getSearchVideosExpresion.length; i++) {
          let {urlvideo,description,stringpostedago,title}=getSearchVideosExpresion[i];
          html_load_seaarchvideos+=`
              <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
              <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
                <a href="../videos/video_watch.html">
                    <video src="${urlvideo}" autoplay loop muted playsinline uk-cover></video>
                </a>
              </div>
              <div class="flex-1 space-y-2">
                <a href="../videos/video_watch.html" class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
                <p class="leading-6 pr-4 line-clamp-2 md:block hidden">${description} </p>
                <a href="#" class="font-semibold block text-sm"> ${title}</a>
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
      
      }


  static async listVideoSearch() {
    let getSearchVideosExpresion = await APIRESTVideo.getSearchVideosExpresion("");
    let html_load_seaarchvideos="";
    for (let i = 0; i < getSearchVideosExpresion.length; i++) {
      let { urlvideo, description, stringpostedago, title } = getSearchVideosExpresion[i];
      html_load_seaarchvideos += `
              <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
              <div class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm">
                <a href="../videos/video_watch.html">
                    <video src="${urlvideo}" autoplay loop muted playsinline uk-cover></video>
                </a>
              </div>
              <div class="flex-1 space-y-2">
                <a href="../videos/video_watch.html" class="md:text-xl font-semibold line-clamp-2"> ${title} </a>
                <p class="leading-6 pr-4 line-clamp-2 md:block hidden">${description} </p>
                <a href="#" class="font-semibold block text-sm"> ${title}</a>
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
}
window.addEventListener("load",VideoMainPageJS.loadPage);

//SEARCH VIDEO

const searchVideo = document.getElementById("videomainpage_searchvideo_text");
searchVideo.addEventListener("input",VideoMainPageJS.searchVideos)