function preview_multiples_images() 
{
  var total_file=document.getElementById("uploadimagealbum");

  for(var i=0;i<total_file.files.length;i++)
  {
    
    $('#ulimage_preview').append(
      `<li> <img src='${URL.createObjectURL(total_file.files[i])}' alt="" 'uk-cover'> </li>`
    );
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
      `<li> <img src='${URL.createObjectURL(total_file.files[i])}' alt="" 'uk-cover'> </li>`
    );
 }
}

 function preview_video() 
 {
    document.getElementById("videopreview").style.visibility="visible"
   var total_file=document.getElementById("uploadonevideo");
   $('#videopreview').attr("src", `${URL.createObjectURL(total_file.files[0])}`);
    
  }
 
 