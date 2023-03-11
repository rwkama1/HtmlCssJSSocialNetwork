class SelectData
{
  //PROPERTIES
  
  static selectMultipleImages=[];//FILES

  static selectMultipleVideos=[];//FILES

  static iduserLogin=0;

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
}