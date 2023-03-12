class SelectData
{
  //PROPERTIES
  
  static selectMultipleImages=[];//FILES

  static selectMultipleVideos=[];//FILES

  static iduserLogin=0;

  static selectvideo=0;

  static userlogin={};

  //GETS
  static getSelectMultipleImages()
  {
    return this.selectMultipleImages;
  }
  static getSelectMultipleVideos()
  {
    return this.selectMultipleVideos;
  }
  static getIdUserLogin()
  {
    return this.iduserLogin;
  }
  static getUserLogin()
  {
    return this.userlogin;
  }
  static getselectVideo()
  {
    return this.selectvideo;
  }
}