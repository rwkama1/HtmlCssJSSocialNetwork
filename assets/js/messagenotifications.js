function messagenotification(message,status,event) {
    UIkit.notification({
        message: message,
        status: status,
      
        timeout: 2000
    });
    event.preventDefault();

}