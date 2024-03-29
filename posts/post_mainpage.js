class PostMainPageJS
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

  
          //await this.loadAlbumImageUserModal();
        
           await  this.listPostSearch(sessionuser);
           await this.listPostMoreLikes(sessionuser);
           await this.listPostMoreComments(sessionuser);
           
           await this.listPostFriendsUser(sessionuser);
           await this.listPostFollowerUser(sessionuser);
   

  
        } catch (error) {
          // alert(error);
          // window.location.href="../index.html"; 
           }
    
  
        }
      //SEARCH
      static searchPost=async(event)=>
             {
              let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
              const query = event.target.value;
              let getSearchPostExpresion = await APIRESTPost.getSearchPostExpresion(sessionuser.iduser,query);
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
           let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
           document.getElementById("create-post-modal").classList.add("cursor-loading");
           const title = document.getElementById('postmainpage_addpost_name').value;
            const description = document.getElementById('postmainpage_addpost_description').value;
            const visibility = document.getElementById('postmainpage_addpost_visibility').value;
          
            const dataform = {title
              ,visibility,description}
          
             const addPost= await APIRESTPost.addPost(dataform,
              sessionuser.iduser,sessionuser.userrname);
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
      static async listPostSearch(sessionuser) {
        let getSearchPostExpresion = await APIRESTPost.getSearchPostExpresion
        (sessionuser.iduser,"");
        let html_load_searchpost="";
        for (let i = 0; i < Math.min(getSearchPostExpresion.length, 30); i++) {
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
      static async listPostMoreLikes(sessionuser) {
              let getMoreLikePost = await APIRESTPost.getMoreLikePost(sessionuser.iduser,sessionuser.userrname);
              let html_load_searchpost="";
              for (let i = 0; i < Math.min(getMoreLikePost.length, 30); i++) {
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
     static async listPostMoreComments(sessionuser) {
                    let getMoreCommentPosts = await APIRESTPost.getMoreCommentPosts(sessionuser.iduser,
                      sessionuser.userrname);
                    let html_load_searchpost="";
                    for (let i = 0; i < Math.min(getMoreCommentPosts.length, 30); i++) {
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
        static async listPostFollowerUser(sessionuser) {
          let getPostFollowersUser = await APIRESTPost.getPostFollowersUser(sessionuser.iduser);
          let html_load_followeruserpost="";
          for (let i = 0; i < Math.min(getPostFollowersUser.length, 30); i++) {
            let {  description, stringpostedago, title,user,idpost } = getPostFollowersUser[i];
            if(user.image==="")
            {
              user.image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
            }
          
            html_load_followeruserpost += `
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
         
          document.getElementById("postmaingpage_listfolloweruserposts_div").innerHTML = html_load_followeruserpost;
          
        }
        static async listPostFriendsUser(sessionuser) {
          let getPostFriendUser = await APIRESTPost.getPostFriendUser(sessionuser.iduser);
          let html_load_frienduserpost="";
          for (let i = 0; i < Math.min(getPostFriendUser.length, 30); i++) {
            let {  description, stringpostedago, title,user,idpost } = getPostFriendUser[i];
            if(user.image==="")
            {
              user.image="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
            }
          
            html_load_frienduserpost += `
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
         
          document.getElementById("postmaingpage_listfriendsuserposts_div").innerHTML = html_load_frienduserpost;
          
        }
        static passidtoPostWatch=(idpost)=>
        {
          try {
            sessionStorage.setItem("iduserwatch",null);
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