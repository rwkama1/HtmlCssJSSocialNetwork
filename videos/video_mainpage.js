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

      }

      static searchVideos=async(event)=>
      {
        const query = event.target.value;
        let getSearchVideosExpresion= await APIRESTVideo.getSearchVideosExpresion();
        for (let i = 0; i < getSearchVideosExpresion.length; i++) {
          let {}=getSearchVideosExpresion[i];

        }
        console.log(query);
      
      }

}
window.addEventListener("load",VideoMainPageJS.loadPage);

//SEARCH VIDEO

const searchVideo = document.getElementById("videomainpage_searchvideo_text");
searchVideo.addEventListener("input",VideoMainPageJS.searchVideos)