function preview_multiples_images() 
{
  var total_file=document.getElementById("uploadimagealbum");
 
  for(var i=0;i<total_file.files.length;i++)
  {
    
    $('#ulimage_preview').append(
      `<li> <img src='${URL.createObjectURL(total_file.files[i])}' 
      alt="" 'uk-responsive'> </li>`
    );
    SelectData.selectMultipleImages.push(total_file.files[i])
 }
}

function preview_image() 
{
  var total_file=document.getElementById("uploadoneimage");
  $('#uploadoneimagepreview').attr("src",`${window.URL.createObjectURL(total_file.files[0])}`);
   
 }
 
 function preview_multiples_videos() 
{
  var total_file=document.getElementById("upload_video_album");
  for(var i=0;i<total_file.files.length;i++)
  {
    
    $('#ul_video_preview').append(
      `<li> 
      <video src='${URL.createObjectURL(total_file.files[i])}' autoplay loop muted playsinline >
 
      </video>
    
      </li>`
    );
    SelectData.selectMultipleVideos.push(total_file.files[i])
 }
}
 
 function preview_video() 
 {
    document.getElementById("uploadvideopreview").style.visibility="visible";
   var total_file=document.getElementById("uploadonevideo");
   if (total_file.files[0].size > 110000000) {
    document.getElementById("uploadvideopreview").style.visibility="hidden";
    alert("Only videos under 100 MB can be uploaded");
    return;
  }
   $('#uploadvideopreview').attr("src", `${URL.createObjectURL(total_file.files[0])}`);
    
  }
 



//#region USER PROFILE

  function select_profile_image(){
    document.getElementById('upload_image_profile').click();
  
  } 
 
   function upload_image_profile(){
    
      var file=document.getElementById("upload_image_profile");
      $('#image_profile').attr("src", `${URL.createObjectURL(file.files[0])}`);


    } 


    function select_cover_image(){
      document.getElementById('upload_image_cover').click();
    
    } 
    function upload_image_cover(){
      var file=document.getElementById("upload_image_cover");
      $('#image_cover').attr("src", `${URL.createObjectURL(file.files[0])}`);
    
    } 
 //#endregion USER PROFILE