function messagenotification(message,status,event) {
    UIkit.notification({
        message: message,
        status: status,
      
        timeout: 2000
    });
    event.preventDefault();

}

function messagenotification_withoutevent(message,status) {
    UIkit.notification({
        message: message,
        status: status,
      
        timeout: 2000
    });
  

}


