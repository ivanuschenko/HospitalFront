import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import Header from '../header/Header';
import Body from '../body/Body';
import SimpleSnackbar from '../snack/Snack';
import './signUp.scss';
import BodyImg from '../../img/hospital.svg';
import { validateLogin, validatePassword } from '../../helper/helperSignUp';

const SignUp = () => {  
  const [newUser, setNewUser] = useState({
    name: '',
    password : '',
    confirmPassword: '',
  });
  const [snackText, setSnackText] = useState('');
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  const {store} = useContext(Context);
  
  const createNewPatient = (e) => {
    e.preventDefault();
    setOpen(true)
    const {
      name,
      password,
      confirmPassword
    } = newUser;

    if (!name) {
      setSnackText('please input name')
    } else if (!validateLogin.test(name)) {      
      setSnackText('login should consist min 6 letters')
    }
    else if (!password) {
      setSnackText('please input password')
    }
    else if (!validatePassword.test(password)) {
      setSnackText("password should consist min 6 numbers and 1 letter")
    }
    else if (password != confirmPassword) {
      setSnackText(`password and confirm password are different!`);
    }
    else {
      const res = store.registration(name, password);
      res.then(value => (setSnackText(value)))    
    }
  }
  
  const handleChange = (key, value) => {
    setNewUser({...newUser, [key]:value})
  }

  return (    
    <form className='signUp' onSubmit={(e)=> createNewPatient(e)}>
      <Header>
        <div className='header-title'>
          <h1>Зарегистрироваться в системе</h1>   
        </div>               
      </Header>
      <Body>
        <img src={BodyImg} alt='hospitalLogo'/>
        <div className='signUp-form'>
          <h1>Зарегистрироваться</h1>
          <div className='signUp-block'>
            <label htmlFor='signUp-block__input'>Логин:</label>
            <input 
              type='text'
              className='signUp-block__input'
              placeholder='Введите логин'                         
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className='signUp-block'>
            <label htmlFor='signUp-block__input'>Пароль:</label>
            <input 
              type='password'
              className='signUp-block__input'
              placeholder='Введите пароль'
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <div className='signUp-block'>
            <label htmlFor='signUp-block__input'>Повторите пароль:</label>
            <input 
              type='password'
              className='signUp-block__input'
              placeholder='Повторите пароль' 
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />              
          </div>
          <div className='signUp-block__btn'>
            <input
              className='signUp-btn'                  
              value='Зарегистрироваться'
              type='button'
            /> 
          </div>                                
          <Link className='signUp-block__link' to='/signIn'>
            <h3>Войти</h3>
          </Link>
        </div>
      </Body> 
      <SimpleSnackbar snackText={snackText} open={open} setOpen={setOpen}/>         
    </form>
  )
}

export default SignUp;