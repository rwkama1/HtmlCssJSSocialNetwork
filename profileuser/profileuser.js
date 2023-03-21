class ProfileUserJS
{
  
  //LOAD PAGE
    
  static loadPage=async()=>
  {
    setTimeout(async () => {
    try {
      let sessionuser = JSON.parse(sessionStorage.getItem('user_login'));
      let getuser=await APIRESTUser.getUser(sessionStorage.getItem('iduserwatch')
      ,sessionuser.iduser,sessionuser.userrname);
    
     let {iduser,name,email,ocupattion,urlfacebook,country
       ,urlinstagram,urllinkedin,urltwitter,description,
       userrname,image,coverphoto
     }=getuser;


   //EXIST LOGIN USER
   let existloginuser=await APIRESTLoginUser.existloginuser(getuser.iduser,getuser.userrname);
   const div_green_circle = document.getElementById('profileuser_existloginuser');

   if (existloginuser) {
  
   div_green_circle.removeAttribute('hidden');
   
   } else {
 
      div_green_circle.setAttribute('hidden', true);
   }

 //SHOW IMAGE COVER PROFILE


this.showImageCoverProfile(image, coverphoto);
 
 //  //SHOW NAME DESCRIPTION PROFILE

   this.loadNameDescriptionUser(description, name);

 
    //SHOW COUNTRY , OCUPATION , URLS

    this.load_country_ocupation_urls(country,ocupattion,urlfacebook,
      urlinstagram,urltwitter,urllinkedin);

     await  this.load_timeline(iduser);
      await this.loadVideosUser(iduser);
      await this.loadImagesUser(sessionuser.iduser,iduser);
     await  this.loadPostUser(iduser);

   } catch (error) {
    //console.error(error);
   alert(error);
   window.location.href="../index.html";
 
   }
 },1000);
   }
   //GET VIDEOS  USER
static async loadVideosUser(iduser) {
   let getVideosByUser = await APIRESTVideo.getVideosByUser(iduser);
   document.getElementById("profileuser_span_countvideos").innerHTML = getVideosByUser.length;
   let html_load_videos = '';
 
   for (let i = 0; i < getVideosByUser.length; i++) {
      let {idvideo,urlvideo
       }=getVideosByUser[i];

 
     if (i >= 3) {
       html_load_videos += `
       <div hidden id="morevideo" >
       <div class="uk-position-relative uk-visible-toggle uk-light" >
          <a 
          href="../videos/video_watch.html"
          onclick="ProfileUserJS.passidtoVideoWatch('${idvideo}');"
 
                >
                 <video src="${urlvideo}" autoplay loop muted playsinline>
 
                 </video>
               
                 </a>
       
       </div>
    </div>
         `;
     } else {
       html_load_videos += `
       <div>
       <div class="uk-position-relative uk-visible-toggle uk-light" >
          <a 
          href="../videos/video_watch.html"
          onclick="ProfileUserJS.passidtoVideoWatch('${idvideo}');"
 
          >
             <video src="${urlvideo}" autoplay loop muted playsinline>
 
             </video>
           
             </a>
       </div>
    </div>
         `;
     }
   }
 
 
   document.getElementById("profileuser_listallvideos_div").innerHTML = html_load_videos;
 }
 //GET IMAGES  USER
static async loadImagesUser(iduserLogin,iduser) {
   let getimagesuser = await APIRESTImages.getImagesByUser(iduserLogin,iduser);
   document.getElementById("profileuser_span_countimages").innerHTML = getimagesuser.length;
   let html_load_images = '';
 
   for (let i = 0; i < getimagesuser.length; i++) {
      let {idphoto ,urlimage
      }=getimagesuser[i];
   
 
     if (i >= 3) {
       html_load_images += `
           <div id="morephotos" hidden class="card lg:mx-0 uk-animation-slide-bottom-small">
             <div class="bg-green-400 max-w-full lg:h-44 h-36 rounded-lg relative overflow-hidden shadow uk-transition-toggle">
               <a 
               href="../images/image_watch.html"
               onclick="ProfileUserJS.passidtoImageWatch('${idphoto}');"
               >
                 <img src="${urlimage}" class="w-full h-full absolute object-cover inset-0">
               </a>
              
             </div>
           </div>
         `;
     } else {
       html_load_images += `
           <div>
             <div class="bg-green-400 max-w-full lg:h-44 h-36 rounded-lg relative overflow-hidden shadow uk-transition-toggle">
               <a
               href="../images/image_watch.html"
               onclick="ProfileUserJS.passidtoImageWatch('${idphoto}');"
               >
                 <img src="${urlimage}" class="w-full h-full absolute object-cover inset-0">
               </a>
              
             </div>
           </div>
         `;
     }
   }
 
 
   document.getElementById("profileuser_listallimages_div").innerHTML = html_load_images;
 }

 //GET POST  USER
 static async loadPostUser(iduser) {
   let getpostuser = await APIRESTPost.getPostByUser(iduser);
   document.getElementById("profileuser_span_countpost").innerHTML = getpostuser.length;
   let html_load_post = '';
 
   for (let i = 0; i < getpostuser.length; i++) {
     let userProfileImage = getpostuser[i].user.image;
     if(userProfileImage==="")
     {
      userProfileImage=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
     }
    
    let idpost=getpostuser[i].idpost;
     let postTitle = getpostuser[i].title;
     let stringpostedago = getpostuser[i].stringpostedago;
     
     let postdescription = getpostuser[i].description;
     // let postdescription = getpostuser[i].description;

 let countpostcomments=await APIRESTPostComment.NumberOfCommentPost(idpost);
     if (i >= 3) {
       html_load_post += `
           <li hidden id="morepost">
           <div class="flex items-start space-x-5 p-7">
               <img src="${userProfileImage}" alt="" class="w-12 h-12 rounded-full">
               <div class="flex-1">
                   <a
                    href="../posts/post_watch.html"
                   onclick="ProfileUserJS.passidtoPostWatch('${idpost}');"
                    class="text-lg font-semibold line-clamp-1 mb-1"> ${postTitle} </a>
                   <p class="text-sm text-gray-400 mb-2"><span data-href="%40tag-dev.html">${stringpostedago}</span></p>
                 <p class="leading-6 line-clamp-2 mt-3">${postdescription}</p>
               </div>
               <div class="sm:flex items-center space-x-4 hidden">
                   <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                   <span class="text-xl"> ${countpostcomments} </span>
               </div>
           </div>
       </li>
         `;
     } else {
       html_load_post += `
         <li>
             <div class="flex items-start space-x-5 p-7">
                 <img src="${userProfileImage}" alt="" class="w-12 h-12 rounded-full">
                 <div class="flex-1">
                     <a 
                     href="../posts/post_watch.html"
                     onclick="ProfileUserJS.passidtoPostWatch('${idpost}');"
                     class="text-lg font-semibold line-clamp-1 mb-1">${postTitle}  </a>
                     <p class="text-sm text-gray-400 mb-2">  <span data-href="%40tag-dev.html">${stringpostedago}</span>  </p>
                     <p class="leading-6 line-clamp-2 mt-3">${postdescription}</p>
                 </div>
                 <div class="sm:flex items-center space-x-4 hidden">
                     <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" 
                     xmlns="http://www.w3.org/2000/svg">
                     <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                     <span class="text-xl"> ${countpostcomments} </span>
                 </div>
             </div>
         </li>

         `;
     }
   }
 
 
   document.getElementById("profileuser_listposts_ul").innerHTML = html_load_post;
 }
    //SHOW COUNTRY , OCUPATION , URLS

   static load_country_ocupation_urls=(country,ocupation,urlfacebook
    ,urlinstagram,urltwitter,urllinkedin)=>
   {
    document.getElementById("profileuser_strong_country").innerHTML=country;

   if (ocupation!=="") {
    const li_ocupation_hidden = document.getElementById('profileuser_li_ocupation');
    li_ocupation_hidden.removeAttribute('hidden');
    document.getElementById("profileuser_strong_ocupation").innerHTML=ocupation;
   }
   if (urlfacebook!=="") {
    const li_urlfacebook_hidden = document.getElementById('profileuser_li_urlfacebook');
    li_urlfacebook_hidden.removeAttribute('hidden');
    document.getElementById("profileuser_strong_urlfacebook").innerHTML=urlfacebook;
   }
   if (urlinstagram!=="") {
    const li_urlinstagram_hidden = document.getElementById('profileuser_li_urlinstagram');
    li_urlinstagram_hidden.removeAttribute('hidden');
    document.getElementById("profileuser_strong_urlinstagram").innerHTML=urlinstagram;
   }
   if (urllinkedin!=="") {
    const li_urllinkedin_hidden = document.getElementById('profileuser_li_urllinkedin');
    li_urllinkedin_hidden.removeAttribute('hidden');
    document.getElementById("profileuser_strong_urllinkedin").innerHTML=urllinkedin;
   }
   if (urltwitter!=="") {
    const li_twitter_hidden = document.getElementById('profileuser_li_urltwitter');
    li_twitter_hidden.removeAttribute('hidden');
    document.getElementById("profileuser_strong_urltwitter").innerHTML=urltwitter;
   }
   }

   //TIMELINE

static load_timeline=async(iduser)=>
{
  let getPhotoPostVideoByUser = await APIRESTImageVideoPost.getPhotoPostVideoByLoginUser(iduser);
  // console.log(getPhotoPostVideoByUser);
  let html_load_postvideoimage = '';
  let html_load_postvideoimage_more = '';
  for (let i = 0; i < Math.min(getPhotoPostVideoByUser.length, 20); i++) {
    let getpostimagevideo=getPhotoPostVideoByUser[i];
  

    if (i >= 3) {
     
        if (getpostimagevideo.type==="P") {
         // let commentposts=await APIRESTPostComment.getCommentPostByPost(getpostimagevideo.id);
         html_load_postvideoimage_more+=this.html_Post_TimeLine(getpostimagevideo);
         
       } else if (getpostimagevideo.type==="I"){
         html_load_postvideoimage_more+=this.html_Image_TimeLine(getpostimagevideo);
       }
       else
       {
         html_load_postvideoimage_more+=this.html_Video_TimeLine(getpostimagevideo);
       }
  

    } else {
      if (getpostimagevideo.type==="P") {
        
         html_load_postvideoimage+=this.html_Post_TimeLine(getpostimagevideo);
     
      } else if (getpostimagevideo.type==="I"){
        html_load_postvideoimage+=this.html_Image_TimeLine(getpostimagevideo);
      }
      else
      {
        html_load_postvideoimage+=this.html_Video_TimeLine(getpostimagevideo);
      }
    }
  }
  document.getElementById("profileuser_timelinelist_div").innerHTML= html_load_postvideoimage + 
  '<div id="profileuser_timeline_user" hidden>' + 
  html_load_postvideoimage_more + 
  '</div>';
  
}

 
  //GET IMAGE COVER PROFILE
  static showImageCoverProfile(image, coverphoto) {
    if (image === "") {
      document.getElementById("profileuser_coverimage").src = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
    }
    else {
      document.getElementById("profileuser_coverimage").src = image;
    }

    if (coverphoto === "") {
      document.getElementById("profileuser_profileimage").src = "https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/no-image-slide_nclriy.jpg";
    } else {
      document.getElementById("profileuser_profileimage").src = coverphoto;
    }
  }

  //GET NAME ABOUT USER
static loadNameDescriptionUser(description, name) {

  document.getElementById("profileuser_h1_nameuser").innerHTML = name;
  document.getElementById("profileuser_p_description").innerHTML = description;
}

static html_Post_TimeLine(getpost)
{
   let userImageProfile=getpost.user.image;
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idpost=getpost.id;
   let userName=getpost.user.name;
   let stringpostedago=getpost.stringpostedago;
   let description=getpost.description;
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
        <a href="" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
           </div>
           <div> Like</div>
        </a>
        <a href="" uk-toggle="target: #view-commentspost${idpost}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
              </svg>
           </div>
           <div> Comments </div>
        </a>


     </div>
     <div class="flex items-center space-x-3 pt-2">
        <div class="flex items-center"> 
           <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"> 
           <img src="../assets/images/avatars/avatar-4.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
           <img src="../assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
        </div>
        <div class="dark:text-gray-100">  
           <a href="" uk-toggle="target: #see_user_liked">
              <strong> 209 Liked it </strong>
           </a>
        
        </div>
     </div>
     <div hidden id="view-commentspost${idpost}" class="border-t py-4 space-y-4 dark:border-gray-600">
         
      ${this.forCommentsPost()}
        <!-- COMMENT -->
       
     </div>   <!-- END VIEWCOMMENTPOST -->
     
     <!-- <a href="" class="hover:text-blue-600 hover:underline">  View more comments </a> -->
     <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
        <input placeholder="Add your Comment.." class="bg-transparent max-h-10 shadow-none px-5">
        <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
           <a href="">
              <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
           </a>
        
        </div>
     </div>
  </div>
</div>
<br>
  `;
  return html_post;
}
  static html_Image_TimeLine(getimage)
{
   let userImageProfile=getimage.user.image;
   
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idimage=getimage.id;
   let userName=getimage.user.name;
   let stringpostedago=getimage.stringpostedago;
   let urlimage=getimage.url;
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
     <div>
      
          
       </div>
  </div>
  <!-- <div uk-lightbox>     -->
     <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: pull">
       
              <a 
              href="../images/image_watch.html"
              onclick="ProfileUserJS.passidtoImageWatch('${idimage}');"
              >
                 <img src="${urlimage}" alt="" uk-responsive>
                 </a>
      
     </div>
 
  <!-- </div> -->
  <div class="p-4 space-y-3">
     <div class="flex space-x-4 lg:font-bold">
        <a href="" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
           </div>
           <div> Like</div>
        </a>
        <a href="" uk-toggle="target: #view-commentsimage${idimage}" class="flex items-center space-x-2">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                 <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
           </div>
           <div> Comment</div>
        </a>
        <!-- <a href="#" class="flex items-center space-x-2 flex-1 justify-end">
           <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" class="dark:text-gray-100">
                   <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
               </svg>
           </div>
           <div> Share</div>
           </a> -->
     </div>
    
     <div class="flex items-center space-x-3 pt-2">
        <div class="flex items-center"> 
           <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"> 
           <img src="../assets/images/avatars/avatar-4.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
           <img src="../assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
        </div>
        <div class="dark:text-gray-100">  
           <a href="" uk-toggle="target: #see_user_liked">
              <strong> 209 Liked it </strong>
           </a>
        
        </div>
     </div>
     <div hidden id="view-commentsimage${idimage}" class="border-t py-4 space-y-4 dark:border-gray-600">
     <!-- COMMENT -->
     ${this.forCommentImage()}
       
      
    </div> 
    
    <!-- <a href="" class="hover:text-blue-600 hover:underline">  View more comments </a> -->
    <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
       <input placeholder="Add your Comment.." class="bg-transparent max-h-10 shadow-none px-5">
       <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
          <a href="">
             <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
          </a>
       
       </div>
    </div>
  </div>
</div>
<br>
  `;
  return html_image
  }
  static html_Video_TimeLine(getvideo)
  {
   let userImageProfile=getvideo.user.image;
   if(userImageProfile==="")
   {
      userImageProfile=" https://res.cloudinary.com/rwkama27/image/upload/v1676421046/socialnetworkk/public/avatars/nouser_mzezf8.jpg";
   }
   let idvideo=getvideo.id;
   let userName=getvideo.user.name;
   let stringpostedago=getvideo.stringpostedago;
   let urlvideo=getvideo.url;
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
          <a href="#" class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
             </div>
             <div> Like</div>
          </a>
          <a href="" uk-toggle="target: #view-commentsvideo${idvideo}" class="flex items-center space-x-2">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="22" height="22" class="dark:text-gray-100">
                   <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                </svg>
             </div>
             <div> Comment</div>
          </a>
          <!-- <a href="#" class="flex items-center space-x-2 flex-1 justify-end">
             <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" class="dark:text-gray-100">
                     <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                 </svg>
             </div>
             <div> Share</div>
             </a> -->
       </div>
       <div class="flex items-center space-x-3 pt-2">
          <div class="flex items-center"> 
             <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"> 
             <img src="../assets/images/avatars/avatar-4.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
             <img src="../assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2">
          </div>
          <div class="dark:text-gray-100">  
             <a href="" uk-toggle="target: #see_user_liked">
                <strong> 209 Liked it </strong>
             </a>
          
          </div>
       </div>
       <div hidden id="view-commentsvideo${idvideo}" class="border-t py-4 space-y-4 dark:border-gray-600">
       ${this.forCommentVideo()}
       </div>

   
       <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
          <input placeholder="Add your Comment.." class="bg-transparent max-h-10 shadow-none px-5">
          <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
             <a href="#">
                <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
             </a>
          </div>
       </div>
    </div>
 </div>
 <br>
    `;
    return html_video
    }

//********************************************* */

 static forCommentsPost(){
   let html_comments_post="";
   for (let i = 0; i < 3; i++) {
   //   const commentpost = getcommentsposts[i];
     html_comments_post += `
     <div >

         
     <div class="flex">
        <div class="w-10 h-10 rounded-full relative flex-shrink-0"> <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="absolute h-full rounded-full w-full"> </div>
        <div>
           <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
              <p class="leading-6">
                sagsdadsagdsgdsg
              
              </p>
              <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
           </div>
           <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
              <button  class="text-black-600">
                 3
                 <iconify-icon icon="ant-design:like-outlined"></iconify-icon>
                 <!-- <iconify-icon icon="ant-design:like-filled"></iconify-icon> -->
              </button>
              <button uk-toggle="target: #view_subcommentpost${i}" >
                 <iconify-icon icon="akar-icons:comment"></iconify-icon>
                 3
              </button>
              <span> 3d </span> 
           </div>
        </div>
     </div>
     <br>
     <!-- SUBCOMMENTS -->
     <div hidden id="view_subcommentpost${i}"  class="flex-col">
       
        <!-- SEND MESSAGE INPUT -->
        <div class="flex">
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
           <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
              <input placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
              <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                 <button>
                    <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                 </button>
              </div>
           </div>
        </div>
        <br>
     </div>
 </div>
     `;
  }
   return html_comments_post
    }
    static forCommentImage(){
      let html_comment_image="";
      for (let i = 0; i < 3; i++) {

      html_comment_image += `
        <div >
   
            
        <div class="flex">
           <div class="w-10 h-10 rounded-full relative flex-shrink-0"> <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="absolute h-full rounded-full w-full"> </div>
           <div>
              <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
                 <p class="leading-6">
                   sagsdadsagdsgdsg
                 
                 </p>
                 <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
              </div>
              <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                 <button  class="text-black-600">
                    3
                    <iconify-icon icon="ant-design:like-outlined"></iconify-icon>
                    <!-- <iconify-icon icon="ant-design:like-filled"></iconify-icon> -->
                 </button>
                 <button uk-toggle="target: #view_subcommentimage${i}" >
                    <iconify-icon icon="akar-icons:comment"></iconify-icon>
                    3
                 </button>
                 <span> 3d </span> 
              </div>
           </div>
        </div>
        <br>
        <!-- SUBCOMMENTS -->
        <div hidden id="view_subcommentimage${i}"  class="flex-col">
          
           <!-- SEND MESSAGE INPUT -->
           <div class="flex">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
              <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                 <input placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
                 <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                    <button>
                       <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                    </button>
                 </div>
              </div>
           </div>
           <br>
        </div>
    </div>
        `;
     }
      return html_comment_image
       }
   static forCommentVideo(){
         let html_comment_video="";
         for (let i = 0; i < 3; i++) {
   
            html_comment_video += `
           <div >
      
               
           <div class="flex">
              <div class="w-10 h-10 rounded-full relative flex-shrink-0"> <img src="../assets/images/avatars/avatar-1.jpg" alt="" class="absolute h-full rounded-full w-full"> </div>
              <div>
                 <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">
                    <p class="leading-6">
                      sagsdadsagdsgdsg
                    
                    </p>
                    <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>
                 </div>
                 <div class="text-sm flex items-center space-x-3 mt-2 ml-5">
                    <button  class="text-black-600">
                       3
                       <iconify-icon icon="ant-design:like-outlined"></iconify-icon>
                       <!-- <iconify-icon icon="ant-design:like-filled"></iconify-icon> -->
                    </button>
                    <button uk-toggle="target: #view_subcommentvideo${i}" >
                       <iconify-icon icon="akar-icons:comment"></iconify-icon>
                       3
                    </button>
                    <span> 3d </span> 
                 </div>
              </div>
           </div>
           <br>
           <!-- SUBCOMMENTS -->
           <div hidden id="view_subcommentvideo${i}"  class="flex-col">
             
              <!-- SEND MESSAGE INPUT -->
              <div class="flex">
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                                       
                 <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">
                    <input placeholder="Reply Comment.." class="bg-transparent max-h-10 shadow-none px-5">
                    <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">
                       <button>
                          <ion-icon name="paper-plane-outline" class="hover:bg-gray-200 p-1.5 rounded-full md hydrated" role="img" aria-label="happy outline"></ion-icon>
                       </button>
                    </div>
                 </div>
              </div>
              <br>
           </div>
       </div>
           `;
        }
         return html_comment_video;
          }

/******************************************* */      

static passidtoVideoWatch=(idvideo)=>
          {
            try {
              sessionStorage.setItem('idvideowatch', idvideo);
            
          
          
          
           }catch (error) {
            // alert(error);
            
           }
            
          }    
static passidtoImageWatch=(idimage)=>
{
  try {
    sessionStorage.setItem('idimagewatch', idimage);

 }catch (error) {
  // alert(error);
  
 }
  
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

window.addEventListener("load",ProfileUserJS.loadPage);