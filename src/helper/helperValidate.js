const validateLogin = /^[0-9A-Za-z]{6,}$/;
const validatePassword = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/

export const checkValidationLogin = (login) => {
  return validateLogin.test(login);  
};

export const checkValidationPassword = (password) => {
  return validatePassword.test(password); 
};

