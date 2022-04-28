export const validateLogin = /^[0-9A-Za-z]{6,}$/;
export const validatePassword = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/

export const checkValidationLogin = (login) => {  
  if (!login) {    
    return ('please input login');
  } 
  else if (!validateLogin.test(login)) {
    return ('login should consist min 6 letters');
  }  
  else {
    return true;  
  }
};

export const checkValidationPassword = (password) => {   
  if (!password) {
   return ('please input password');   
  } 
  else if (!validatePassword.test(password)) {    
    return ("password should consist min 6 numbers and 1 letter");
  }  
  else {
    return true; 
  }
};

