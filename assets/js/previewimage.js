function preview_multiples_images() 
{
  var total_file=document.getElementById("uploadimagealbum");
  for(var i=0;i<total_file.files.length;i++)
  {
    
    $('#ulimage_preview').append(
      `<li> <img src='${window.URL.createObjectURL(total_file.files[i])}' alt="" 'uk-cover'> </li>`
    );
 }
}

function preview_image() 
{
  var total_file=document.getElementById("uploadoneimage");
  $('#upload_one_image_preview').attr("src", `${window.URL.createObjectURL(total_file.files[0])}`);
   
 }


