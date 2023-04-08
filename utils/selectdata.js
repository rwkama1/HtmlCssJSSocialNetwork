class SelectData
{
  //PROPERTIES
  
  static selectMultipleImages=[];//FILES

  static selectMultipleVideos=[];//FILES

  static loadSubCommentByComment=[];

  static iduserLogin=0;

  static selectvideo=0;

  static userlogin={};
   
  static showsubcommentUpdateModal={};

  static showsubcommentDeleteModal={};

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
  static getloadSubCommentByComment()
  {
    return this.loadSubCommentByComment;
  }
  
}