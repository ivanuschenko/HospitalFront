const validateLogin = /^[0-9A-Za-z]{6,}$/;
const validatePassword = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/

export const checkValidationLogin = (login) => {
  if (!validateLogin.test(login)) {
  return false;
  }  
  else {
    return true;  
  }
};

export const checkValidationPassword = (password) => {
  if (!validatePassword.test(password)) {    
    return false;
  }  
  else {
    return true; 
  }
};

