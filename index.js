class IndexJS
{

  static  registerUser=async(event)=>
 {
  event.preventDefault();
  const name = document.getElementById('index_name_user').value;
  const username = document.getElementById('index_username').value;
  const password = document.getElementById('user_password').value;
  const email = document.getElementById('index_email').value;
  const datebirth = document.getElementById('index_datebirth').value;
  const country = document.getElementById('countryinput').value;

  const dataform = {
    name,
    username,
    password,
    email,
    datebirth,
    country
  };

  try {
   const response_register= await APIRESTUser.registerUser(dataform);
   if (response_register) {
    console.log("User Added");
    const response_login= await APIRESTLoginUser.loginUser(dataform);
    if(response_login)
    {
      window.location.href="./usersettings/usersettings.html";
    }
   
   }
   
  } catch (error) {
    alert(error);
  }
  } 

  static  loginUser=async(event)=>
  {
   event.preventDefault();
   
   const username = document.getElementById('index_login_username').value;
   const password = document.getElementById('index_login_password').value;
  
 
   const dataform = {
     username,
     password
   };
 
   try {
    const response= await APIRESTLoginUser.loginUser(dataform);
    if (response) {
     console.log("Login User");
    
     setInterval(() => {
      window.location.href="./feed/feed.html";
     }, 1000);
  
    }
    
   } catch (error) {
    console.error(error);
     alert(error);
   }
   } 

}
//REGISTER USER

const registerform = document.getElementById('formindex_register_user');
registerform.addEventListener('submit', IndexJS.registerUser);

//LOGIN USER 

const loginform = document.getElementById('index_form_login_user');
loginform.addEventListener('submit', IndexJS.loginUser);



