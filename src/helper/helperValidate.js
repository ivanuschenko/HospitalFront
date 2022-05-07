const validateLogin = /^[0-9A-Za-z]{6,}$/;
const validatePassword = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;

// use arrow func for bind 'this' to function instead of this from called context and for brevity with es6 

export const checkValidationLogin = (login) => {
  return validateLogin.test(login);  
};

export const checkValidationPassword = (password) => {
  return validatePassword.test(password); 
};

