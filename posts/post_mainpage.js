class PostMainPageJS
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
  
          //await this.loadAlbumImageUserModal();
  
           await this.listPostSearch(response_loginuser.iduser);
  
          await this.listPostMoreLikes();
  
         await this.listPostMoreComments();
  
        } catch (error) {
          // alert(error);
          // window.location.href="../index.html"; 
           }
      },1000);
  
        }
      //SEARCH
      static searchPost=async(event)=>
             {
              let iduserLogin=SelectData.getIdUserLogin();
              const query = event.target.value;
              let getSearchPostExpresion = await APIRESTPost.getSearchPostExpresion(iduserLogin,query);
              let html_load_searchpost="";
              for (let i = 0; i < Math.min(getSearchPostExpresion.length, 15); i++) {
                let {  description, stringpostedago, title,user,idpost } = getSearchPostExpresion[i];
                if(user.image==="")
                {
                  user.image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
                }

                html_load_searchpost += `
                        <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
                        <div class="flex items-start space-x-5 p-7">
                          <img src="${user.image}" alt="" class="w-12 h-12 rounded-full">
                          <div class="flex-1">
                              <a href="../posts/post_watch.html"
                              onclick="PostMainPageJS.passidtoPostWatch('${idpost}');"
                               class="text-lg font-semibold line-clamp-1 mb-1">${title} </a>
                              <p class="text-sm text-gray-400 mb-2">  <span data-href="%40tag-dev.html"></span> ${stringpostedago} </p>
                            <p class="leading-6 line-clamp-2 mt-3">${description}</p>
                          </div>
                          
                      </div>
                        <!-- ----- -->
                    </div>
                    `;
              }
              document.getElementById("postmaingpage_listsearchpost_div").innerHTML = html_load_searchpost;

         }
       //ADD POST
        static addPost=async(event)=>
        {
          try {
           event.preventDefault();
           document.getElementById("create-post-modal").classList.add("cursor-loading");
           const title = document.getElementById('postmainpage_addpost_name').value;
            const description = document.getElementById('postmainpage_addpost_description').value;
            const visibility = document.getElementById('postmainpage_addpost_visibility').value;
          
            const dataform = {title
              ,visibility,description}
          
             const addPost= await APIRESTPost.addPost(dataform);
             if (addPost) {
            
               document.getElementById('postmainpage_addpost_name').value="";
               document.getElementById('postmainpage_addpost_description').value="";
              }
        
          messagenotification('Post Added','success',event);
          setInterval(location.reload(),1000);
          document.getElementById("create-post-modal").classList.remove("cursor-loading");
        
             
         }catch (error) {
           alert(error);
           location.reload();
         }
          
        }
      //LIST
      static async listPostSearch(iduser) {
        let getSearchPostExpresion = await APIRESTPost.getSearchPostExpresion(iduser,"");
        let html_load_searchpost="";
        for (let i = 0; i < Math.min(getSearchPostExpresion.length, 15); i++) {
          let {  description, stringpostedago, title,user,idpost } = getSearchPostExpresion[i];
          if(user.image==="")
          {
            user.image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
          }
          
          html_load_searchpost += `
              <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
                  <div class="flex items-start space-x-5 p-7">
                    <img src="${user.image}" alt="" class="w-12 h-12 rounded-full">
                    <div class="flex-1">
                        <a href="../posts/post_watch.html"
                        onclick="PostMainPageJS.passidtoPostWatch('${idpost}');"
                         class="text-lg font-semibold line-clamp-1 mb-1">${title} </a>
                        <p class="text-sm text-gray-400 mb-2">  <span data-href="%40tag-dev.html"></span> ${stringpostedago} </p>
                      <p class="leading-6 line-clamp-2 mt-3">${description}</p>
                    </div>
                  
                  </div>
                  <!-- ----- -->
              </div>
              `;
        }
        document.getElementById("postmaingpage_listsearchpost_div").innerHTML = html_load_searchpost;
        document.getElementById("postmaingpage_listnewestpost_div").innerHTML = html_load_searchpost;
        
            }
      static async listPostMoreLikes() {
              let getMoreLikePost = await APIRESTPost.getMoreLikePost();
              let html_load_searchpost="";
              for (let i = 0; i < Math.min(getMoreLikePost.length, 15); i++) {
                let {  description, stringpostedago, title,user,idpost } = getMoreLikePost[i];
                if(user.image==="")
                {
                  user.image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
                }
              
                html_load_searchpost += `
                    <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
                        <div class="flex items-start space-x-5 p-7">
                          <img src="${user.image}" alt="" class="w-12 h-12 rounded-full">
                          <div class="flex-1">
                              <a href="../posts/post_watch.html" 
                              onclick="PostMainPageJS.passidtoPostWatch('${idpost}');"
                              class="text-lg font-semibold line-clamp-1 mb-1">${title} </a>
                              <p class="text-sm text-gray-400 mb-2">  <span data-href="%40tag-dev.html"></span> ${stringpostedago} </p>
                            <p class="leading-6 line-clamp-2 mt-3">${description}</p>
                          </div>
                        
                        </div>
                        <!-- ----- -->
                    </div>
                    `;
              }
             
              document.getElementById("postmaingpage_listmorelikespost_div").innerHTML = html_load_searchpost;
              
                  }
     static async listPostMoreComments() {
                    let getMoreCommentPosts = await APIRESTPost.getMoreCommentPosts();
                    let html_load_searchpost="";
                    for (let i = 0; i < Math.min(getMoreCommentPosts.length, 15); i++) {
                      let {  description, stringpostedago, title,user,idpost } = getMoreCommentPosts[i];
                      if(user.image==="")
                      {
                        user.image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
                      }
                    
                      html_load_searchpost += `
                          <div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
                              <div class="flex items-start space-x-5 p-7">
                                <img src="${user.image}" alt="" class="w-12 h-12 rounded-full">
                                <div class="flex-1">
                                    <a href="../posts/post_watch.html" 
                                    onclick="PostMainPageJS.passidtoPostWatch('${idpost}');"
                                    class="text-lg font-semibold line-clamp-1 mb-1">${title} </a>
                                    <p class="text-sm text-gray-400 mb-2">  <span data-href="%40tag-dev.html"></span> ${stringpostedago} </p>
                                  <p class="leading-6 line-clamp-2 mt-3">${description}</p>
                                </div>
                              
                              </div>
                              <!-- ----- -->
                          </div>
                          `;
                    }
                   
                    document.getElementById("postmaingpage_listmorecommentposts_div").innerHTML = html_load_searchpost;
                    
        }
        static passidtoPostWatch=(idpost)=>
        {
          try {
            sessionStorage.setItem('idpostwatch', idpost);

         }catch (error) {
          // alert(error);
          
         }
          
        }
}
window.addEventListener("load",PostMainPageJS.loadPage);

//SEARCH POST

const searchPost = document.getElementById("postmainpage_searchvideo_text");
searchPost.addEventListener("input",PostMainPageJS.searchPost);

//ADD POST

const addpost = document.getElementById("form_postmainpage_addpost");
addpost.addEventListener("submit",PostMainPageJS.addPost)