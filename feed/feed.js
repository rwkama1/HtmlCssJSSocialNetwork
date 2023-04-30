class FeedJS
{
      //LOAD PAGE
    
  static loadPage=async()=>
  {
    
    try {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));


     await  this.load_timeline(sessionuser.iduser,sessionuser.userrname);
     

   } catch (error) {
  
   alert(error);
  
   }
 
   }
//TIMELINE
static  load_timeline=async(iduserlogin,usernamelogin)=>
{
  let getPhotoPostVideoMainPage = await APIRESTImageVideoPost.getPhotoPostVideoMainPage(iduserlogin);
console.log(getPhotoPostVideoMainPage);
  let html_load_postvideoimage = '';
  let html_load_postvideoimage_more = '';
  for (let i = 0; i < getPhotoPostVideoMainPage.length; i++) {
    let getpostimagevideo=getPhotoPostVideoMainPage[i];
  

    if (i >= 3) {
     
        if (getpostimagevideo.type==="P") {
       
         html_load_postvideoimage_more+= await this.html_Post_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
         
       } else if (getpostimagevideo.type==="I"){
       //  html_load_postvideoimage_more+= await this.html_Image_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
       }
       else
       {
        // html_load_postvideoimage_more+= await this.html_Video_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
       }
  

    } else {
      if (getpostimagevideo.type==="P") {
        
         html_load_postvideoimage+=await this.html_Post_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
     
      } else if (getpostimagevideo.type==="I"){
       // html_load_postvideoimage+= await this.html_Image_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
      }
      else
      {
       // html_load_postvideoimage+=await this.html_Video_TimeLine(getpostimagevideo,iduserlogin,usernamelogin);
      }
    }
  }
  document.getElementById("feed_timeline_div").innerHTML= html_load_postvideoimage + 
  '<div id="feed_timeline_user" hidden>' + 
  html_load_postvideoimage_more + 
  '</div>';
  
}

static  async html_Post_TimeLine(getpost,iduserlogin,usernamelogin)
{
   //GET POST
   let userImageProfile=getpost.user.image;
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idpost=getpost.id;
   let likespost=getpost.likes;
   let iduser=getpost.user.iduser;
   let userName=getpost.user.name;
   let stringpostedago=getpost.stringpostedago;
   let description=getpost.description;

 //NUMBER COMMENT POSTS
 
     
      let NumberOfCommentPost=getpost.numbercomments;

      //SHOW EXISTLIKEPOST
     let existLikePost= this.exist_like_post(getpost.existlikeloginuser);

  let html_post=`
  <div class="card lg:mx-0 uk-animation-slide-bottom-small">
               
  <div class="flex justify-between items-center lg:p-4 p-2.5">
     <div class="flex flex-1 items-center space-x-4">
        <a href="#"> <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
        <div class="flex-1 font-semibold capitalize">
           <a href="#" class="text-black dark:text-gray-100"> ${userName} </a>
           <div class="flex items-center space-x-2">
           <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people" role="img" class="md hydrated" aria-label="people"></ion-icon>
           </div>
        </div>
     </div>
  
  </div>
  <div class="p-5 pt-0 border-b dark:border-gray-700">
    ${description}
  </div>
  <div class="p-4 space-y-3">
     <div class="flex space-x-4 lg:font-bold">
        <button 
        onclick="FeedJS.like_dislike_Post('${idpost}','${iduserlogin}','${usernamelogin}',event);"  
        class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
              <svg
              id="svg_feed_timeline_likepost${idpost}"
               xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="${existLikePost}" 
              width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
           </div>
           <div id="feed_timeline_numberlikespost${idpost}"> ${likespost}</div>
        </button>
        <button 
        onclick="FeedJS.show_comment_posts('${idpost}','${iduserlogin}','${usernamelogin}');"  
         uk-toggle="target: #view-commentspost${idpost}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
              </svg>
           </div>
           <div id="feed_timeline_numbercommentpost${idpost}"> ${NumberOfCommentPost} </div>
        </button>


     </div>
    
     <div hidden id="view-commentspost${idpost}" class="border-t py-4 space-y-4 dark:border-gray-600">
        <div id="feed_commentspost${idpost}">  
    
        <!-- COMMENT -->
        </div>   
     </div> 
      
     <form
     id="form_feed_addCommentPost${idpost}"
     onsubmit="FeedJS.addCommentPost('${idpost}','${iduserlogin}','${usernamelogin}', event);"
     >
     <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
        <input id="feed_textcommentpost${idpost}" required placeholder="Add your Comment.." required required class="bg-transparent max-h-10 shadow-none px-5">
        <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
           <button id="feed_buttonaddcomment_${idpost}" type="submit">
              <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
           </button>
        
        </div>
     </div>
     </form>
  </div>
</div>
<br>
  `;
  return html_post;
}
  static async html_Image_TimeLine(getimage,iduserlogin,usernamelogin)
{
   let userImageProfile=getimage.user.image;
   
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idimage=getimage.id;
   let likeimage=getimage.likes;
   let userName=getimage.user.name;
   let iduser=getimage.user.iduser;
   let stringpostedago=getimage.stringpostedago;
   let urlimage=getimage.url;
//NUMBER COMMENT IMAGE
 
//let NumberOfCommentImage=await  APIRESTImageComment.NumberOfCommentImage(idimage);

let NumberOfCommentImage=getimage.numbercomments;

// let forCommentsPost=await this.forCommentsPost(listcommentpost,idpost,iduserlogin,usernamelogin) 
//  ${forCommentsPost}

 //SHOW EXISTLIKEIMAGE


 let exist_like_image= this.exist_like_image(getimage.existlikeloginuser);


  let html_image=`
  <div class="card lg:mx-0 uk-animation-slide-bottom-small">
  <!-- post header-->
  <div class="flex justify-between items-center lg:p-4 p-2.5">
     <div class="flex flex-1 items-center space-x-4">
        <a href="#"> <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
        <div class="flex-1 font-semibold capitalize">
           <a href="#" class="text-black dark:text-gray-100"> ${userName} </a>
           <div class="flex items-center space-x-2">
           <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people"></ion-icon>
           </div>
        </div>
     </div>
    
  </div>
  <!-- <div uk-lightbox>     -->
     <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
       
              <a href="../images/image_watch.html"
              onclick="ProfileUserJS.passidtoImageWatch('${idimage}');"
              >
                 <img src="${urlimage}" alt="" uk-responsive>
                 </a>
      
     </div>
 
  <!-- </div> -->
  <div class="p-4 space-y-3">
     <div class="flex space-x-4 lg:font-bold">
        <button 
        onclick="ProfileUserJS.like_dislike_Image('${idimage}','${iduserlogin}','${usernamelogin}',event);"  
         class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg 
              id="svg_profileuser_timeline_likeimage${idimage}"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" fill="${exist_like_image}"
               width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
           </div>
           <div id="profileuser_timeline_numberlikesimage${idimage}"> ${likeimage}</div>
        </button>
        <a href=""
        onclick="ProfileUserJS.show_comment_images('${idimage}','${iduserlogin}','${usernamelogin}');"  
         uk-toggle="target: #view-commentsimage${idimage}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
           </div>
           <div id="profileuser_timeline_numbercommentimage${idimage}"> ${NumberOfCommentImage}</div>
        </a>
      
     </div>
    
     <div hidden id="view-commentsimage${idimage}" class="border-t py-4 space-y-4 dark:border-gray-600">
     <!-- COMMENT -->
     <div id="profileuser_commentimage${idimage}">  
    
   
     </div>  
 
       
      
    </div> 
    
    <form
    id="form_profileuser_addCommentImage${idimage}"
    onsubmit="ProfileUserJS.addCommentImage('${idimage}','${iduserlogin}','${usernamelogin}', event);"
    >
    <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
       <input id="profileuser_textcommentimage${idimage}" placeholder="Add your Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
       <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
          <button id="profileuser_buttonaddcomment_${idimage}" type="submit">
             <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
          </button>
       
       </div>
    </div>
    </form>
  </div>
</div>
<br>
  `;
  return html_image
  }
  static async html_Video_TimeLine(getvideo,iduserlogin,usernamelogin)
  {
   let userImageProfile=getvideo.user.image;
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idvideo=getvideo.id;
   let likevideo=getvideo.likes;
   let userName=getvideo.user.name;
   let iduser=getvideo.user.iduser;
   let stringpostedago=getvideo.stringpostedago;
   let urlvideo=getvideo.url;

 
  // NUMBER COMMENT VIDEO
 
//let NumberOfCommentVideo=await  APIRESTVideoComment.NumberOfCommentVideo(idvideo);

let NumberOfCommentVideo=getvideo.numbercomments;

//SHOW EXISTLIKEVIDEO

let exist_like_video= this.exist_like_video(getvideo.existlikeloginuser);

//let exist_like_video=getvideo.existlikeloginuser;

    let html_video=`
    <div  class="card lg:mx-0 uk-animation-slide-bottom-small">
    <!-- post header-->
    <div class="flex justify-between items-center lg:p-4 p-2.5">
       <div class="flex flex-1 items-center space-x-4">
          <a href="#"> <img src="${userImageProfile}" class="bg-gray-200 border border-white rounded-full w-10 h-10"> </a>
          <div class="flex-1 font-semibold capitalize">
             <a href="#" class="text-black dark:text-gray-100"> ${userName} </a>
             <div class="flex items-center space-x-2">
               <span class="text-gray-500 text-sm"> ${stringpostedago} </span>
              <ion-icon name="people"></ion-icon>
           </div>
          </div>
       </div>
   
    </div>
    <!-- VIDEO -->
    <div class="w-full h-full">

          <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
         
               <a 
               href="../videos/video_watch.html"
               onclick="ProfileUserJS.passidtoVideoWatch('${idvideo}');"
               >
                <video src="${urlvideo}" autoplay loop muted playsinline >

                </video>
              
                </a>
             
    </div>
       </div>
    <div class="p-4 space-y-3">
       <div class="flex space-x-4 lg:font-bold">
          <button 
          onclick="ProfileUserJS.like_dislike_Video('${idvideo}','${iduserlogin}','${usernamelogin}',event);"  
          
          class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg 
                id="svg_profileuser_timeline_likevideo${idvideo}"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="${exist_like_video}"
                 width="22" height="22" class="dark:text-gray-100">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
             </div>
             <div id="profileuser_timeline_numberlikesvideo${idvideo}" > ${likevideo}</div>
          </button>

          <a href="" 
          onclick="ProfileUserJS.show_comment_videos('${idvideo}','${iduserlogin}','${usernamelogin}');"  
          uk-toggle="target: #view-commentsvideo${idvideo}"
           class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20"
                 fill="gray"
                 width="22" height="22" class="dark:text-gray-100">
                   <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                </svg>
             </div>
             <div id="profileuser_timeline_numbercommentvideo${idvideo}"> ${NumberOfCommentVideo}</div>
          </a>
          
       </div>
      
       <div hidden id="view-commentsvideo${idvideo}" class="border-t py-4 space-y-4 dark:border-gray-600">
     
       <div id="profileuser_commentvideo${idvideo}">  
    
   
       </div>  
     
       </div>

       <form
       id="form_profileuser_addCommentVideo${idvideo}"
       onsubmit="ProfileUserJS.addCommentVideo('${idvideo}','${iduserlogin}','${usernamelogin}', event);"
       >
       <div  class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
          <input id="profileuser_textcommentvideo${idvideo}" placeholder="Add your Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
          <div   class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
             <button id="profileuser_buttonaddcomment_${idvideo}" type="submit">
                <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
             </button>
          
          </div>
       </div>
       </form>
    </div>
 </div>
 <br>
    `;
    return html_video
}

//********************************************* */
//#region COMMENTS
//COMMENTS

//SHOW COMMENTS 
static async show_comment_posts(idpost,iduserlogin,usernamelogin)
{
   let listcommentpost=await  APIRESTPostComment.getCommentPostByPost(idpost,
      iduserlogin,usernamelogin);
 let forCommentsPost=await this.forCommentsPost(listcommentpost,idpost,iduserlogin,usernamelogin);
 document.getElementById(`feed_commentspost${idpost}`).innerHTML=forCommentsPost;

}
static async show_comment_images(idimage,iduserlogin,usernamelogin)
{
   let listcommentimage=await  APIRESTImageComment.getCommentImageByImage(idimage,
      iduserlogin,usernamelogin);
 let forCommentImage=await this.forCommentImage(listcommentimage,idimage,iduserlogin,usernamelogin);
 document.getElementById(`feed_commentimage${idimage}`).innerHTML=forCommentImage;
// profileloginuser_commentspost${idpost}
}
static async show_comment_videos(idvideo,iduserlogin,usernamelogin)
{
   let listcommentvideo=await  APIRESTVideoComment.getCommentVideoByVideo(idvideo,
      iduserlogin,usernamelogin);
 let forCommentVideo=await this.forCommentVideo(listcommentvideo,idvideo,iduserlogin,usernamelogin);
 document.getElementById(`feed_commentvideo${idvideo}`).innerHTML=forCommentVideo;
// profileloginuser_commentspost${idpost}
}
//FOR COMMENTS
static async forCommentsPost(listcommentpost,idpost,iduserlogin,username){
   let html_comments_post=""; 
   for (let i = 0; i < listcommentpost.length; i++) {
      const commentpost = listcommentpost[i];
      let idcomment=commentpost.idusercomment ;
      let textcomment=commentpost.textcomment ;
      let stringpostedago=commentpost.stringpostedago;
      let likescomment =commentpost.likescomment;
      let datepublishcomment =commentpost.datepublishcomment;


      //CONVERT FORMAT DATE

      const dt = new Date(datepublishcomment);
      const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      //USER
      let idcommentuser  =commentpost.idcommentuser ;
      let namecommentuser  =commentpost.namecommentuser ;
      let imagecommentuser  =commentpost.imagecommentuser ;
      if (imagecommentuser==="") {
        imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
   
      let NumberOfSubComments=commentpost.numbersubcomment;
     
   const exist_like_comment =  this.exist_like_comment(commentpost.existlikeloginuser);
   
  // let show_edit_delete_comment =commentpost.existcommentloginuser;
   let show_edit_delete_comment = this.show_edit_delete_comment(commentpost.existcommentloginuser);
         html_comments_post += `
         <div id="feed_div_listcommentpost${idcomment}" >

               
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">
            <a 
            title="${namecommentuser}"
            onclick="Head_SidebarJS.passidtoUserProfile('${idcommentuser}');" 
            href="../profileuser/profileuser.html"
            >
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </a>
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="feed_p_textcommentpost${idcomment}" class="leading-6">
                  ${textcomment}
                  
                  </p>
                  <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
                  <div ${show_edit_delete_comment} class="ml-auto">
                  <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                     <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                     uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                        <ul class="space-y-1">
                        
                           <li>
                              <a href=""
                              onclick="FeedJS.showtextcommentUpdateModalComment_Post
                              ('${idcomment}','${textcomment}','${idpost}','${iduserlogin}'
                              ,'${username}');"
                              uk-toggle="target: #update_comment_modal" 
                              class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                 <i class="uil-edit-alt mr-1"></i>
                                    Edit  </a>
                           </li>
                     
                           <li>
                              <hr class="-mx-2 my-2 dark:border-gray-800">
                           </li>
                           <li>
                           
                              <a href="" 
                              onclick="FeedJS.showIdDeleteModalComment_Post('${idcomment}',
                              '${iduserlogin}','${username}','${idpost}');"
                              uk-toggle="target: #deletecommentmodal" 
                              class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                                 <i class="uil-trash-alt mr-1"></i> Delete </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               </div>
               <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                  <button 
                  onclick="FeedJS.like_dislike_Comment('${idcomment}',
                    '${iduserlogin}','${username}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="feed_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                     <span id="feed_span_likecomment${idcomment}">${likescomment}</span>
                  

                  </button>
                  <button 
                  onclick="FeedJS.show_subcomment_post('${idcomment}',
                    '${iduserlogin}','${username}');"
                  uk-toggle="target: #view_subcommentpost${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="feed_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentpost${idcomment}" class="flex-col">
            
               <div>
                  <div id="feed_listupdatesubcomments${idcomment}">
                 
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_feed_addSubCommentPost${idcomment}"
           onsubmit="FeedJS.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="feed_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
                  <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                     <button type="submit">
                        <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                     </button>
                  </div>
               </div>
            </div>
            </form>
            <br>
         </div>
      </div>
         `;

  }
  
   return html_comments_post
    }
   static async forCommentImage(listcommentimage,idimage,iduserlogin,username){
      let html_comment_image="";
      for (let i = 0; i < listcommentimage.length; i++) {
         const commentimage = listcommentimage[i];
         let idcomment=commentimage.IdUserComment  ;
         let textcomment=commentimage.Textt  ;
         let stringpostedago=commentimage.stringpostedago;
         let likescomment =commentimage.Likes;
         let datepublishcomment =commentimage.datepublishcomment;
   
   
         //CONVERT FORMAT DATE
   
         const dt = new Date(datepublishcomment);
         const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
   
         //USER
         let idcommentuser  =commentimage.idcommentuser ;
         let namecommentuser  =commentimage.namecommentuser ;
         let imagecommentuser  =commentimage.imagecommentuser ;
         if (imagecommentuser==="") {
           imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
         }
         let NumberOfSubComments=commentimage.numbersubcomment;
         // let NumberOfSubComments=await APIRESTSubComment.NumberOfSubComments
         // (idcomment);

      //const exist_like_comment = commentpost.existlikeloginuser;
      const exist_like_comment =  this.exist_like_comment(commentimage.existlikeloginuser);
      
     // let show_edit_delete_comment =commentpost.existcommentloginuser;
      let show_edit_delete_comment = this.show_edit_delete_comment(commentimage.existcommentloginuser);

         html_comment_image += `
         <div id="profileuser_div_listcommentimage${idcomment}" >

               
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">

               <a 
            title="${namecommentuser}"
            onclick="Head_SidebarJS.passidtoUserProfile('${idcommentuser}');" 
            href="../profileuser/profileuser.html">
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </a>
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="profileuser_p_textcommentimage${idcomment}" class="leading-6">
                  ${textcomment}
                  
                  </p>
                  <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
                  <div ${show_edit_delete_comment} class="ml-auto">
                  <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                     <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                     uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                        <ul class="space-y-1">
                        
                           <li>
                              <a href=""
                              onclick="ProfileUserJS.showtextcommentUpdateModalComment_Image
                              ('${idcomment}','${textcomment}','${idimage}','${iduserlogin}'
                              ,'${username}');"
                              uk-toggle="target: #update_comment_modalImage" 
                              class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                 <i class="uil-edit-alt mr-1"></i>
                                    Edit  </a>
                           </li>
                     
                           <li>
                              <hr class="-mx-2 my-2 dark:border-gray-800">
                           </li>
                           <li>
                           
                              <a href="" 
                              onclick="ProfileUserJS.showIdDeleteModalComment_Image('${idcomment}',
                              '${iduserlogin}','${username}','${idimage}');"
                              uk-toggle="target: #deletecommentmodalImage" 
                              class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                                 <i class="uil-trash-alt mr-1"></i> Delete </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               </div>
               <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                  <button 
                  onclick="ProfileUserJS.like_dislike_Comment('${idcomment}',
                    '${iduserlogin}','${username}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="profileuser_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                     <span id="profileuser_span_likecomment${idcomment}">${likescomment}</span>
                  

                  </button>
                  <button 
                  onclick="ProfileUserJS.show_subcomment_post('${idcomment}',
                    '${iduserlogin}','${username}');"
                  uk-toggle="target: #view_subcommentimage${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="profileuser_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentimage${idcomment}" class="flex-col">
            
               <div>
                  <div id="profileuser_listupdatesubcomments${idcomment}">
                 
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_profileuser_addSubCommentPost${idcomment}"
           onsubmit="ProfileUserJS.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="profileuser_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
                  <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                     <button type="submit">
                        <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                     </button>
                  </div>
               </div>
            </div>
            </form>
            <br>
         </div>
      </div>
         `;
     }
      return html_comment_image
  }
  static async forCommentVideo(listcommentvideos,idvideo,iduserlogin,username){
   let html_comment_video="";
   for (let i = 0; i < listcommentvideos.length; i++) {
      const commentvideo = listcommentvideos[i];
      let idcomment=commentvideo.idusercomment ;
      let textcomment=commentvideo.textcomment;
      let stringpostedago=commentvideo.stringpostedago;
      let likescomment =commentvideo.likescomment ;
      let datepublishcomment =commentvideo.datepublishcomment;


      //CONVERT FORMAT DATE

      const dt = new Date(datepublishcomment);
      const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      //USER
      let idcommentuser  =commentvideo.idcommentuser ;
      let namecommentuser  =commentvideo.namecommentuser ;
      let imagecommentuser  =commentvideo.imagecommentuser ;
      if (imagecommentuser==="") {
        imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
      }
      let NumberOfSubComments=commentvideo.numbersubcomment;
            // let NumberOfSubComments=await APIRESTSubComment.NumberOfSubComments
            // (idcomment);
   
         //const exist_like_comment = commentpost.existlikeloginuser;
         const exist_like_comment =  this.exist_like_comment(commentvideo.existlikeloginuser);
         
        // let show_edit_delete_comment =commentpost.existcommentloginuser;
         let show_edit_delete_comment = this.show_edit_delete_comment(commentvideo.existcommentloginuser);
      html_comment_video += `
      <div id="profileuser_div_listcommentvideo${idcomment}" >

         
      <div class="flex">
         <div class="w-10 h-10 rounded-full relative flex-shrink-0">
         
         <a 
         title="${namecommentuser}"
         onclick="Head_SidebarJS.passidtoUserProfile('${idcommentuser}');" 
         href="../profileuser/profileuser.html">
            <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
            </a>
            </div>
         <div >
            <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
            <div class="flex">
            <p id="profileuser_p_textcommentvideo${idcomment}" class="leading-6">
               ${textcomment}
               
               </p>
               <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
               <div ${show_edit_delete_comment} class="ml-auto">
               <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                  <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                  uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                     <ul class="space-y-1">
                     
                        <li>
                           <a href=""
                           onclick="ProfileUserJS.showtextcommentUpdateModalComment_Video
                           ('${idcomment}','${textcomment}','${idvideo}','${iduserlogin}'
                           ,'${username}');"
                           uk-toggle="target: #update_comment_modalVideo" 
                           class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                              <i class="uil-edit-alt mr-1"></i>
                                 Edit  </a>
                        </li>
                  
                        <li>
                           <hr class="-mx-2 my-2 dark:border-gray-800">
                        </li>
                        <li>
                        
                           <a href="" 
                           onclick="ProfileUserJS.showIdDeleteModalComment_Video('${idcomment}',
                           '${iduserlogin}','${username}','${idvideo}');"
                           uk-toggle="target: #deletecommentmodalVideo" 
                           class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                              <i class="uil-trash-alt mr-1"></i> Delete </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            </div>
            <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
               <button 
               onclick="ProfileUserJS.like_dislike_Comment('${idcomment}',
                 '${iduserlogin}','${username}',event);"
                class="text-black-600">
              
                  <iconify-icon id="profileuser_icon_likecomment${idcomment}" icon="ant-design:like-${exist_like_comment}"></iconify-icon>               
                  <span id="profileuser_span_likecomment${idcomment}">${likescomment}</span>
               

               </button>
               <button 
               onclick="ProfileUserJS.show_subcomment_post('${idcomment}',
                 '${iduserlogin}','${username}');"
               uk-toggle="target: #view_subcommentvideo${idcomment}" >
                  <iconify-icon icon="akar-icons:comment"></iconify-icon>
                  <span id="profileuser_span_numbersubcomments${idcomment}" > ${NumberOfSubComments} </span>
                  
               </button>
               <span> ${stringpostedago} </span> 
            </div>
         </div>
      </div>
      <br>
      <!-- SUBCOMMENTS -->
      <div hidden id="view_subcommentvideo${idcomment}" class="flex-col">
         
            <div>
               <div id="profileuser_listupdatesubcomments${idcomment}">
              
               </div>
            </div>
         <!-- SEND MESSAGE INPUT -->
         <form 
         id="form_profileuser_addSubCommentPost${idcomment}"
        onsubmit="ProfileUserJS.addSubComment('${idcomment}','${iduserlogin}','${username}', event);"
        >
         <div class="flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
            <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input id="profileuser_textsubcommentpost${idcomment}" required  placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
               <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                  <button type="submit">
                     <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                  </button>
               </div>
            </div>
         </div>
         </form>
         <br>
      </div>
   </div>
     `;
  }
   return html_comment_video;
    }

    // SHOW EDIT DELETE COMMENT
 static show_edit_delete_comment=(existcommentpost)=>
    {
      let hidden="";
     // let existLikeComment=await APIRESTPostComment.existCommentPost(idpost,idcomment,iduserlogin,userrname);
      if (existcommentpost) {
        hidden="";
      } else {
        hidden="hidden"  
      }
      return hidden;
    }
static show_edit_delete_commentImage=(existcommentimage)=>
    {
      let hidden="";
      //let existLikeComment=await APIRESTImageComment.existCommentImage(idimage,idcomment,iduserlogin,userrname);
      if (existcommentimage) {
        hidden="";
      } else {
        hidden="hidden"  
      }
      return hidden;
}
static show_edit_delete_commentVideo=(existcommentvideo)=>
    {
      let hidden="";
     // let existLikeComment=await APIRESTVideoComment.existCommentVideo(idvideo,idcomment,iduserlogin,userrname);
      if (existcommentvideo) {
        hidden="";
      } else {
        hidden="hidden"  
      }
      return hidden;
}


//ADD COMMENT
static addCommentPost=async(idpost,iduserlogin,usernamelogin,event)=>
  {
    try {
      event.preventDefault();
     const textcomment = document.getElementById(`feed_textcommentpost${idpost}`).value;

     const commentPost= await APIRESTPostComment.commentPost(idpost,
      textcomment,iduserlogin,usernamelogin);
       if (commentPost) {

       messagenotification('Comment Added','success',event);

      await this.showAddedCommentPost(idpost,iduserlogin,usernamelogin);
      
       document.getElementById(`feed_textcommentpost${idpost}`).value="";
      }
  }catch (error) {
    alert(error);
  }
  }
  static addCommentImage=async(idimage,iduserlogin,usernamelogin,event)=>
  {
    try {
      event.preventDefault();
     const textcomment = document.getElementById(`profileuser_textcommentimage${idimage}`).value;

     const commmentImage= await APIRESTImageComment.commmentImage(idimage,
      textcomment,iduserlogin,usernamelogin);
       if (commmentImage) {

       messagenotification('Comment Added','success',event);

      await this.showAddedCommentImage(idimage,iduserlogin,usernamelogin);
      
       document.getElementById(`profileuser_textcommentimage${idimage}`).value="";
      }
  }catch (error) {
    alert(error);
  }
  }
  static addCommentVideo=async(idvideo,iduserlogin,usernamelogin,event)=>
  {
    try {
      event.preventDefault();
     const textcomment = document.getElementById(`profileuser_textcommentvideo${idvideo}`).value;

     const commmentVideo= await APIRESTVideoComment.commmentVideo(idvideo,
      textcomment,iduserlogin,usernamelogin);
       if (commmentVideo) {

       messagenotification('Comment Added','success',event);

      await this.showAddedCommentVideo(idvideo,iduserlogin,usernamelogin);
      
       document.getElementById(`profileuser_textcommentvideo${idvideo}`).value="";
      }
  }
  catch (error) {
    alert(error);
  }
  }    
  
  //UPDATE COMMENT

static updateCommentPost=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("profileuser_idcomment_updatecomment").value;
 let idpost=document.getElementById("profileuser_idpost_updatecomment").value;
 let iduserlogin=document.getElementById("profileuser_iduserlogin_updatecomment").value;
 let usernamelogin=document.getElementById("profileuser_usernamelogin_updatecomment").value;
const textcomment = document.getElementById('profileuser_text_updatecomment').value;

const editcommentPost= await APIRESTPostComment.editcommentPost(idcomment,idpost,
 textcomment,iduserlogin,usernamelogin);
if (editcommentPost) {

  messagenotification('Comment Updated','success',event);

this.showUpdatedCommentPost(idcomment,textcomment);
  


 //  setInterval(() => {
 //   location.reload();
 //  }, 1000);
  document.getElementById('profileuser_text_updatecomment').value="";
 }
}catch (error) {
alert(error);
}
}   
static updateCommentImage=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("profileuser_idcomment_updatecommentImage").value;
 let idimage=document.getElementById("profileuser_idimage_updatecommentImage").value;
 let iduserlogin=document.getElementById("profileuser_iduserlogin_updatecommentImage").value;
 let usernamelogin=document.getElementById("profileuser_usernamelogin_updatecommentImage").value;
const textcomment = document.getElementById('profileuser_text_updatecommentImage').value;

const editcommentImage= await APIRESTImageComment.editcommentImage(idcomment,idimage,
 textcomment,iduserlogin,usernamelogin);
if (editcommentImage) {

  messagenotification('Comment Updated','success',event);

this.showUpdatedCommentImage(idcomment,textcomment);
  


 //  setInterval(() => {
 //   location.reload();
 //  }, 1000);
  document.getElementById('profileuser_text_updatecommentImage').value="";
 }
}catch (error) {
alert(error);
}
}  
static updateCommentVideo=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("profileuser_idcomment_updatecommentVideo").value;
 let idvideo=document.getElementById("profileuser_idvideo_updatecommentVideo").value;
 let iduserlogin=document.getElementById("profileuser_iduserlogin_updatecommentVideo").value;
 let usernamelogin=document.getElementById("profileuser_usernamelogin_updatecommentVideo").value;
const textcomment = document.getElementById('profileuser_text_updatecommentVideo').value;

const editcommentVideo= await APIRESTVideoComment.editcommentVideo(idcomment,idvideo,
 textcomment,iduserlogin,usernamelogin);
if (editcommentVideo) {

  messagenotification('Comment Updated','success',event);

this.showUpdatedCommentVideo(idcomment,textcomment);
  


 //  setInterval(() => {
 //   location.reload();
 //  }, 1000);
  document.getElementById('profileuser_text_updatecommentVideo').value="";
 }
}catch (error) {
alert(error);
}
}



//DELETE COMMENT  
static deleteCommentPost=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("profileuser_idcomment_deletecommentmodal").value;
 let idpost=document.getElementById("profileuser_idpost_deletecommentmodal").value;
 let iduserlogin=document.getElementById("profileuser_iduserlogin_deletecommentmodal").value;
 let usernamelogin=document.getElementById("profileuser_usernamelogin_deletecommentmodal").value;


const deletecommentPost= await APIRESTPostComment.deletecommentPost(idcomment,idpost,
   iduserlogin,usernamelogin);
if (deletecommentPost) {

  messagenotification('Comment Deleted','success',event);

 this.showRemoveCommentPost(idpost,idcomment);
  

 
 }
}catch (error) {
alert(error);
}
}
static deleteCommentImage=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("profileuser_idcomment_deletecommentmodalImage").value;
 let idimage=document.getElementById("profileuser_idimage_deletecommentmodalImage").value;
 let iduserlogin=document.getElementById("profileuser_iduserlogin_deletecommentmodalImage").value;
 let usernamelogin=document.getElementById("profileuser_usernamelogin_deletecommentmodalImage").value;


const deletecommentImage= await APIRESTImageComment.deletecommentImage(idcomment,idimage,
   iduserlogin,usernamelogin);
if (deletecommentImage) {

  messagenotification('Comment Deleted','success',event);

 this.showRemoveCommentImage(idimage,idcomment);
  

 
 }
}catch (error) {
alert(error);
}
}
static deleteCommentVideo=async(event)=>
{
try {
 event.preventDefault();
 let idcomment=document.getElementById("profileuser_idcomment_deletecommentmodalVideo").value;
 let idvideo=document.getElementById("profileuser_idvideo_deletecommentmodalVideo").value;
 let iduserlogin=document.getElementById("profileuser_iduserlogin_deletecommentmodalVideo").value;
 let usernamelogin=document.getElementById("profileuser_usernamelogin_deletecommentmodalVideo").value;

const deletecommentVideo= await APIRESTVideoComment.deletecommentVideo(idcomment,idvideo,
   iduserlogin,usernamelogin);
if (deletecommentVideo) {

  messagenotification('Comment Deleted','success',event);

 this.showRemoveCommentVideo(idvideo,idcomment);
  

 
 }
}catch (error) {
alert(error);
}
}
//SHOW COMMENT AFTER ADD

static  showAddedCommentPost=async(idpost,iduser,userrname)=>
{
 let listcommentpost=await  APIRESTPostComment.getCommentPostByPost(idpost,
   iduser,userrname);
   let lastcommentpost = listcommentpost[listcommentpost.length - 1];
     const commentpost = lastcommentpost;
     let idcomment=commentpost.idusercomment ;
     let textcomment=commentpost.textcomment ;
     let likescomment =commentpost.likescomment;
     let datepublishcomment =commentpost.datepublishcomment;
     let stringpostedago=commentpost.stringpostedago;
     //CONVERT FORMAT DATE

     const dt = new Date(datepublishcomment);
     const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

     //USER
     let idcommentuser  =commentpost.idcommentuser ;
     let namecommentuser  =commentpost.namecommentuser ;
     let imagecommentuser  =commentpost.imagecommentuser ;
     if (imagecommentuser==="") {
       imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
     }

  
      let numberofsubcomments=0;
    


     let html_comments_post = `
      <div id="feed_div_listcommentpost${idcomment}" >

            
      <div class="flex">
         <div class="w-10 h-10 rounded-full relative flex-shrink-0">
            <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
            </div>
         <div >
            <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
            <div class="flex">
            <p id="feed_p_textcommentpost${idcomment}" class="leading-6">
               ${textcomment}
               
               </p>
               <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
               <div  class="ml-auto">
               <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                  <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                  uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                     <ul class="space-y-1">
                     
                        <li>
                           <a href=""
                           onclick="FeedJS.showtextcommentUpdateModalComment_Post
                           ('${idcomment}','${textcomment}','${idpost}','${iduser}'
                           ,'${userrname}');"
                           uk-toggle="target: #update_comment_modal" 
                           class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                              <i class="uil-edit-alt mr-1"></i>
                                 Edit  </a>
                        </li>
                  
                        <li>
                           <hr class="-mx-2 my-2 dark:border-gray-800">
                        </li>
                        <li>
                        
                           <a href="" 
                           onclick="FeedJS.showIdDeleteModalComment_Post('${idcomment}',
                           '${iduser}','${userrname}','${idpost}');"
                           uk-toggle="target: #deletecommentmodal" 
                           class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                              <i class="uil-trash-alt mr-1"></i> Delete </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            </div>
            <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
               <button 
               onclick="FeedJS.like_dislike_Comment('${idcomment}',
                 '${iduser}','${userrname}',event);"
                class="text-black-600">
              
                  <iconify-icon id="feed_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                  <span id="feed_span_likecomment${idcomment}">${likescomment}</span>
               
                 
           
                  
               </button>
               <button uk-toggle="target: #view_subcommentpost${idcomment}" >
                  <iconify-icon icon="akar-icons:comment"></iconify-icon>
                  <span id="feed_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                  
               </button>
               <span> ${stringpostedago} </span> 
            </div>
         </div>
      </div>
      <br>
      <!-- SUBCOMMENTS -->
      <div hidden id="view_subcommentpost${idcomment}" class="flex-col">
         
            <div>
               <div id="feed_listupdatesubcomments${idcomment}">
               
               </div>
            </div>
         <!-- SEND MESSAGE INPUT -->
         <form 
         id="form_feed_addSubCommentPost${idcomment}"
        onsubmit="FeedJS.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
        >
         <div class="flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
            <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input id="feed_textsubcommentpost${idcomment}" placeholder="Reply Comment.." required  class="bg-transparent max-h-10 shadow-none px-5">
               <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                  <button type="submit">
                     <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                  </button>
               </div>
            </div>
         </div>
         </form>
         <br>
      </div>
   </div>
      `;
 
let feed_commentspost= document.getElementById(`feed_commentspost${idpost}`);

feed_commentspost.parentNode.insertAdjacentHTML("beforeend", html_comments_post);


//NUMBER COMMENT 
let NumberOfComment=listcommentpost.length;
document.getElementById(`feed_timeline_numbercommentpost${idpost}`).innerHTML=`${NumberOfComment}`;

}
static  showAddedCommentImage=async(idimage,iduser,userrname)=>
{
 let listcommentimage=await  APIRESTImageComment.getCommentImageByImage(idimage,
   iduser,userrname);
   let lastcommentimage = listcommentimage[listcommentimage.length - 1];
   const commentimage = lastcommentimage;
   let idcomment=commentimage.IdUserComment  ;
   let textcomment=commentimage.Textt  ;
   let stringpostedago=commentimage.stringpostedago;
   let likescomment =commentimage.Likes;
   let datepublishcomment =commentimage.datepublishcomment;


   //CONVERT FORMAT DATE

   const dt = new Date(datepublishcomment);
   const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

   //USER
   let idcommentuser  =commentimage.idcommentuser ;
   let namecommentuser  =commentimage.namecommentuser ;
   let imagecommentuser  =commentimage.imagecommentuser ;
   if (imagecommentuser==="") {
     imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
  
      let numberofsubcomments=0;
    


     let html_comments_image = `
      <div id="profileuser_div_listcommentimage${idcomment}" >

            
      <div class="flex">
         <div class="w-10 h-10 rounded-full relative flex-shrink-0">
            <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
            </div>
         <div >
            <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
            <div class="flex">
            <p id="profileuser_p_textcommentimage${idcomment}" class="leading-6">
               ${textcomment}
               
               </p>
               <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
               <div  class="ml-auto">
               <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                  <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                  uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                     <ul class="space-y-1">
                     
                        <li>
                           <a href=""
                           onclick="ProfileUserJS.showtextcommentUpdateModalComment_Image
                           ('${idcomment}','${textcomment}','${idimage}','${iduser}'
                           ,'${userrname}');"
                           uk-toggle="target: #update_comment_modalImage" 
                           class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                              <i class="uil-edit-alt mr-1"></i>
                                 Edit  </a>
                        </li>
                  
                        <li>
                           <hr class="-mx-2 my-2 dark:border-gray-800">
                        </li>
                        <li>
                        
                           <a href="" 
                           onclick="ProfileUserJS.showIdDeleteModalComment_Image('${idcomment}',
                           '${iduser}','${userrname}','${idimage}');"
                           uk-toggle="target: #deletecommentmodalImage" 
                           class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                              <i class="uil-trash-alt mr-1"></i> Delete </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            </div>
            <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
               <button 
               onclick="ProfileUserJS.like_dislike_Comment('${idcomment}',
                 '${iduser}','${userrname}',event);"
                class="text-black-600">
              
                  <iconify-icon id="profileuser_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                  <span id="profileuser_span_likecomment${idcomment}">${likescomment}</span>
               
                 
           
                  
               </button>
               <button uk-toggle="target: #view_subcommentimage${idcomment}" >
                  <iconify-icon icon="akar-icons:comment"></iconify-icon>
                  <span id="profileuser_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                  
               </button>
               <span> ${stringpostedago} </span> 
            </div>
         </div>
      </div>
      <br>
      <!-- SUBCOMMENTS -->
      <div hidden id="view_subcommentimage${idcomment}" class="flex-col">
         
            <div>
               <div id="profileuser_listupdatesubcomments${idcomment}">
               
               </div>
            </div>
         <!-- SEND MESSAGE INPUT -->
         <form 
         id="form_profileuser_addSubCommentPost${idcomment}"
        onsubmit="ProfileUserJS.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
        >
         <div class="flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
            <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
               <input id="profileuser_textsubcommentpost${idcomment}" required placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
               <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                  <button type="submit">
                     <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                  </button>
               </div>
            </div>
         </div>
         </form>
         <br>
      </div>
   </div>
      `;
 //  //SHOW EXISTLIKECOMMENT
 //  let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,sessionuser.iduser,sessionuser.userrname);


 //  if(existLikeComment)
 //  {
 //    document.getElementById("svg_postwatch_likecomment").setAttribute("fill","black");
 //  }


let profileuser_commentsimage= document.getElementById(`profileuser_commentimage${idimage}`);

profileuser_commentsimage.parentNode.insertAdjacentHTML("beforeend", html_comments_image);


//NUMBER COMMENT 
let NumberOfComment=listcommentimage.length;
document.getElementById(`profileuser_timeline_numbercommentimage${idimage}`).innerHTML=`${NumberOfComment}`;

}
static  showAddedCommentVideo=async(idvideo,iduser,userrname)=>
{
 let listcommentvideo=await  APIRESTVideoComment.getCommentVideoByVideo(idvideo,
   iduser,userrname);
   let lastcommentvideo = listcommentvideo[listcommentvideo.length - 1];
   const commentvideo = lastcommentvideo;
         let idcomment=commentvideo.idusercomment ;
         let textcomment=commentvideo.textcomment;
   
         let likescomment =commentvideo.likescomment ;
         let datepublishcomment =commentvideo.datepublishcomment;
         let stringpostedago=commentvideo.stringpostedago;
   
         //CONVERT FORMAT DATE
   
         const dt = new Date(datepublishcomment);
         const formatted_date = dt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
   
         //USER
         let idcommentuser  =commentvideo.idcommentuser ;
         let namecommentuser  =commentvideo.namecommentuser ;
         let imagecommentuser  =commentvideo.imagecommentuser ;
         if (imagecommentuser==="") {
           imagecommentuser="https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
         }
      let numberofsubcomments=0;
    


     let html_comment_video = `
     <div id="profileuser_div_listcommentvideo${idcomment}" >

            
         <div class="flex">
            <div class="w-10 h-10 rounded-full relative flex-shrink-0">
               <img src="${imagecommentuser}" alt="" class="absolute h-full rounded-full w-full">
               </div>
            <div >
               <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
               <div class="flex">
               <p id="profileuser_p_textcommentvideo${idcomment}" class="leading-6">
                  ${textcomment}
                  
                  </p>
                  <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
                  <div  class="ml-auto">
                  <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> 
                     <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop" 
                     uk-drop="mode: hover;pos: bottom-right;animation: uk-animation-slide-bottom-small">
                        <ul class="space-y-1">
                        
                           <li>
                              <a href=""
                              onclick="ProfileUserJS.showtextcommentUpdateModalComment_Video
                              ('${idcomment}','${textcomment}','${idvideo}','${iduser}'
                              ,'${userrname}');"
                              uk-toggle="target: #update_comment_modalVideo" 
                              class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                 <i class="uil-edit-alt mr-1"></i>
                                    Edit  </a>
                           </li>
                     
                           <li>
                              <hr class="-mx-2 my-2 dark:border-gray-800">
                           </li>
                           <li>
                           
                              <a href="" 
                              onclick="ProfileUserJS.showIdDeleteModalComment_Video('${idcomment}',
                              '${iduser}','${userrname}','${idvideo}');"
                              uk-toggle="target: #deletecommentmodalVideo" 
                              class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                                 <i class="uil-trash-alt mr-1"></i> Delete </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               </div>
               <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                  <button 
                  onclick="ProfileUserJS.like_dislike_Comment('${idcomment}',
                    '${iduser}','${userrname}',event);"
                   class="text-black-600">
                 
                     <iconify-icon id="profileuser_icon_likecomment${idcomment}" icon="ant-design:like-outlined"></iconify-icon>               
                     <span id="profileuser_span_likecomment${idcomment}">${likescomment}</span>
                  

                  </button>
                  <button 
                  onclick="ProfileUserJS.show_subcomment_post('${idcomment}',
                    '${iduser}','${userrname}');"
                  uk-toggle="target: #view_subcommentvideo${idcomment}" >
                     <iconify-icon icon="akar-icons:comment"></iconify-icon>
                     <span id="profileuser_span_numbersubcomments${idcomment}" > ${numberofsubcomments} </span>
                     
                  </button>
                  <span> ${stringpostedago} </span> 
               </div>
            </div>
         </div>
         <br>
         <!-- SUBCOMMENTS -->
         <div hidden id="view_subcommentvideo${idcomment}" class="flex-col">
            
               <div>
                  <div id="profileuser_listupdatesubcomments${idcomment}">
                 
                  </div>
               </div>
            <!-- SEND MESSAGE INPUT -->
            <form 
            id="form_profileuser_addSubCommentPost${idcomment}"
           onsubmit="ProfileUserJS.addSubComment('${idcomment}','${iduser}','${userrname}', event);"
           >
            <div class="flex">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
               <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                  <input id="profileuser_textsubcommentpost${idcomment}" placeholder="Reply Comment.." required class="bg-transparent max-h-10 shadow-none px-5">
                  <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                     <button type="submit">
                        <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                     </button>
                  </div>
               </div>
            </div>
            </form>
            <br>
         </div>
      </div>
      `;
 //  //SHOW EXISTLIKECOMMENT
 //  let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,sessionuser.iduser,sessionuser.userrname);


 //  if(existLikeComment)
 //  {
 //    document.getElementById("svg_postwatch_likecomment").setAttribute("fill","black");
 //  }


let profileuser_commentvideo= document.getElementById(`profileuser_commentvideo${idvideo}`);

profileuser_commentvideo.parentNode.insertAdjacentHTML("beforeend", html_comment_video);


//NUMBER COMMENT 
let NumberOfComment=listcommentvideo.length;
document.getElementById(`profileuser_timeline_numbercommentvideo${idvideo}`).innerHTML=`${NumberOfComment}`;

}
//SHOW COMMENT AFTER UPDATE

static  showUpdatedCommentPost(idcomment,textcomment) {
document.getElementById(`feed_p_textcommentpost${idcomment}`).innerHTML=textcomment;
}
static  showUpdatedCommentImage(idcomment,textcomment) {
document.getElementById(`profileuser_p_textcommentimage${idcomment}`).innerHTML=textcomment;
}
static  showUpdatedCommentVideo(idcomment,textcomment) {
document.getElementById(`profileuser_p_textcommentvideo${idcomment}`).innerHTML=textcomment;
}

//SHOW COMMENT AFTER DELETE
static  showRemoveCommentPost(idpost,idcomment) {
//ADD NUMBER COMMENTS HTML
let textcontent_numbercomments= document.getElementById(`feed_timeline_numbercommentpost${idpost}`);
let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
let numcomments=Number(stringnumcomments);
textcontent_numbercomments.innerHTML=`${numcomments-1}`;

document.getElementById(`feed_div_listcommentpost${idcomment}`).remove();
}
static  showRemoveCommentImage(idimage,idcomment) {
//ADD NUMBER COMMENTS HTML
let textcontent_numbercomments= document.getElementById(`feed_timeline_numbercommentimage${idimage}`);
let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
let numcomments=Number(stringnumcomments);
textcontent_numbercomments.innerHTML=`${numcomments-1}`;

document.getElementById(`feed_div_listcommentimage${idcomment}`).remove();
}
static  showRemoveCommentVideo(idvideo,idcomment) {
//ADD NUMBER COMMENTS HTML
let textcontent_numbercomments= document.getElementById(`feed_timeline_numbercommentvideo${idvideo}`);
let stringnumcomments = parseInt(textcontent_numbercomments.textContent.match(/\d+/)[0]);
let numcomments=Number(stringnumcomments);
textcontent_numbercomments.innerHTML=`${numcomments-1}`;

document.getElementById(`feed_div_listcommentvideo${idcomment}`).remove();
}


//SHOW INFORMATION UPDATE COMMENT MODAL

static  showtextcommentUpdateModalComment_Image=(idcomment,textcomment,idimage,iduserlogin,username)=>
{
document.getElementById("feed_idcomment_updatecommentImage").value=idcomment;
document.getElementById("feed_idimage_updatecommentImage").value=idimage;
document.getElementById("feed_iduserlogin_updatecommentImage").value=iduserlogin;
document.getElementById("feed_usernamelogin_updatecommentImage").value=username;
document.getElementById('feed_text_updatecommentImage').value=textcomment;

}
static  showtextcommentUpdateModalComment_Post=async(idcomment,textcomment,idpost,iduserlogin,username)=>
{

document.getElementById('feed_idcomment_updatecomment').value=idcomment;
document.getElementById('feed_iduserlogin_updatecomment').value=iduserlogin;
document.getElementById('feed_usernamelogin_updatecomment').value=username;
document.getElementById('feed_text_updatecomment').value=textcomment;
document.getElementById('feed_idpost_updatecomment').value=idpost;



}
static  showtextcommentUpdateModalComment_Video=async(idcomment,textcomment,idvideo,iduserlogin,username)=>
{
document.getElementById('feed_idcomment_updatecommentVideo').value=idcomment;
document.getElementById('feed_iduserlogin_updatecommentVideo').value=iduserlogin;
document.getElementById('feed_usernamelogin_updatecommentVideo').value=username;
document.getElementById('feed_text_updatecommentVideo').value=textcomment;
document.getElementById('feed_idvideo_updatecommentVideo').value=idvideo;

}
//SHOW INFORMATION DELETE  COMMENT MODAL

static showIdDeleteModalComment_Post=async(idcomment,iduserlogin,usernamelogin,idpost)=>
{
document.getElementById('feed_idcomment_deletecommentmodal').value=idcomment;
document.getElementById('feed_iduserlogin_deletecommentmodal').value=iduserlogin;
document.getElementById('feed_usernamelogin_deletecommentmodal').value=usernamelogin;
document.getElementById('feed_idpost_deletecommentmodal').value=idpost;
}
static showIdDeleteModalComment_Image=async(idcomment,iduserlogin,usernamelogin,idimage)=>
{
document.getElementById('feed_idcomment_deletecommentmodalImage').value=idcomment;
document.getElementById('feed_iduserlogin_deletecommentmodalImage').value=iduserlogin;
document.getElementById('feed_usernamelogin_deletecommentmodalImage').value=usernamelogin;
document.getElementById('feed_idimage_deletecommentmodalImage').value=idimage;
}
static showIdDeleteModalComment_Video=async(idcomment,iduserlogin,usernamelogin,idvideo)=>
{
document.getElementById('feed_idcomment_deletecommentmodalVideo').value=idcomment;
document.getElementById('feed_iduserlogin_deletecommentmodalVideo').value=iduserlogin;
document.getElementById('feed_usernamelogin_deletecommentmodalVideo').value=usernamelogin;
document.getElementById('feed_idvideo_deletecommentmodalVideo').value=idvideo;
}



//#endregion COMMENTS

//*********************************************** */

//#region LIKES
static like_dislike_Post= async(idpost,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();

    let existLikePost=await APIRESTLikes.existLikePost(idpost,iduserlogin,usernamelogin)
   if (existLikePost) {
    const deletelikePost= await APIRESTLikes.deletelikePost(idpost,iduserlogin,usernamelogin);
     if (deletelikePost) {
    
       document.getElementById(`svg_feed_timeline_likepost${idpost}`).setAttribute("fill","grey");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikespost${idpost}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_timeline_numberlikespost${idpost}`).innerHTML=numberoflikes;
     }
    } 
   else{
    const likePost= await APIRESTLikes.likePost(idpost,iduserlogin,usernamelogin);
     if (likePost) {
    
       document.getElementById(`svg_feed_timeline_likepost${idpost}`).setAttribute("fill","black");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikespost${idpost}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_timeline_numberlikespost${idpost}`).innerHTML=numberoflikes;
     }
   }

     
  
   
  }catch (error) {
    alert(error);
  }
}
static like_dislike_Video= async(idvideo,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();

    let existLikeVideo=await APIRESTLikes.existLikeVideo(idvideo,iduserlogin,usernamelogin)
   if (existLikeVideo) {
    const deletelikeVideo= await APIRESTLikes.deletelikeVideo(idvideo,iduserlogin,usernamelogin);
     if (deletelikeVideo) {
    
       document.getElementById(`svg_feed_timeline_likevideo${idvideo}`).setAttribute("fill","grey");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikesvideo${idvideo}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_timeline_numberlikesvideo${idvideo}`).innerHTML=numberoflikes;
     }
    } 
   else{
    const likeVideo= await APIRESTLikes.likeVideo(idvideo,iduserlogin,usernamelogin);
     if (likeVideo) {
    
       document.getElementById(`svg_feed_timeline_likevideo${idvideo}`).setAttribute("fill","black");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikesvideo${idvideo}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_timeline_numberlikesvideo${idvideo}`).innerHTML=numberoflikes;
     }
   }

     
  
   
  }catch (error) {
    alert(error);
  }
}
static like_dislike_Image= async(idimage,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();

    let existLikeImage=await APIRESTLikes.existLikeImage(idimage,iduserlogin,usernamelogin)
   if (existLikeImage) {
    const deletelikeImage= await APIRESTLikes.deletelikeImage(idimage,iduserlogin,usernamelogin);
     if (deletelikeImage) {
    
       document.getElementById(`svg_feed_timeline_likeimage${idimage}`).setAttribute("fill","grey");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikesimage${idimage}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_timeline_numberlikesimage${idimage}`).innerHTML=numberoflikes;
     }
    } 
   else{
    const likeImage= await APIRESTLikes.likeImage(idimage,iduserlogin,usernamelogin);
     if (likeImage) {
    
       document.getElementById(`svg_feed_timeline_likeimage${idimage}`).setAttribute("fill","black");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_timeline_numberlikesimage${idimage}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_timeline_numberlikesimage${idimage}`).innerHTML=numberoflikes;
     }
   }

     
  
   
  }catch (error) {
    alert(error);
  }
}
static like_dislike_Comment= async(idcomment,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();

  
    let existLikeComment=await APIRESTLikes.existLikeComment(idcomment,iduserlogin,usernamelogin)
   
    if (existLikeComment) {

    const deleteComment= await APIRESTLikes.deleteComment(idcomment,
       iduserlogin,usernamelogin );
     if (deleteComment) {
       
       document.getElementById(`feed_icon_likecomment${idcomment}`).setAttribute("icon","ant-design:like-outlined");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_span_likecomment${idcomment}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_span_likecomment${idcomment}`).innerHTML=numberoflikes;
     }
    } 

   else{

    const likeComment= await APIRESTLikes.likeComment(idcomment,
       iduserlogin,usernamelogin);
     if (likeComment) {
    
       document.getElementById(`feed_icon_likecomment${idcomment}`).setAttribute("icon","ant-design:like-filled");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_span_likecomment${idcomment}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_span_likecomment${idcomment}`).innerHTML=numberoflikes;
     }
   }

   
  }catch (error) {
    alert(error);
  }
}
static like_dislike_SubComment= async(idcomment,idsubcomment,iduserlogin,usernamelogin,event)=>
{
  try {
    event.preventDefault();
 
  
    let existLikeSubComment=await APIRESTLikes.existLikeSubComment(idsubcomment,iduserlogin,usernamelogin)
   
    if (existLikeSubComment) {

    const deleteSubComment= await APIRESTLikes.deleteSubComment(idsubcomment,
      iduserlogin,usernamelogin );
     if (deleteSubComment) {
    
       document.getElementById(`feed_icon_likesubcomment${idsubcomment}`).setAttribute("icon","ant-design:like-outlined");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_span_likesubcomment${idsubcomment}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)-1;
       document.getElementById(`feed_span_likesubcomment${idsubcomment}`).innerHTML=numberoflikes;
     }
    } 

   else{

    const likeSubComment= await APIRESTLikes.likeSubComment(idsubcomment,
       iduserlogin,usernamelogin );
     if (likeSubComment) {
    
       document.getElementById(`feed_icon_likesubcomment${idsubcomment}`).setAttribute("icon","ant-design:like-filled");
       //ADD LIKE HTML
       let textcontent_numberlikes= document.getElementById(`feed_span_likesubcomment${idsubcomment}`).textContent;
       let numberoflikes=Number(textcontent_numberlikes)+1;
       document.getElementById(`feed_span_likesubcomment${idsubcomment}`).innerHTML=numberoflikes;
     }
   }

     
  
   
  }catch (error) {
    alert(error);
  }
}


//EXIST LIKE 
static exist_like_post=(existlikepost)=>
{
 let fill="";
 
 if(existlikepost)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_image=(existlikeimage)=>
{
 let fill="";
 
 if(existlikeimage)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_video=(existlikevideo)=>
{
 let fill="";
 
 if(existlikevideo)
 {
  fill="black"
 }
 else{
   fill="grey"
 }
 return fill;
}
static exist_like_comment=(existlikecomment)=>
{
 let fill="";
 
 if(existlikecomment)
 {
  fill="filled"
 }
 else{
   fill="outlined"
 }
 return fill;
}
static exist_like_subcomment=(existlikesubcomment)=>
{
 let fill="";
 
 if(existlikesubcomment)
 {
  fill="filled"
 }
 else{
   fill="outlined"
 }
 return fill;
}

//#endregion LIKES
}

window.addEventListener("load",FeedJS.loadPage);