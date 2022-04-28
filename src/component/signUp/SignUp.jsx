import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import Header from '../header/Header';
import Body from '../body/Body';
import SimpleSnackbar from '../snack/Snack';
import './signUp.scss';
import BodyImg from '../../img/hospital.svg';
import { checkValidationName, checkValidationPassword } from '../../helper/helperValidate';

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

    const resultValidationName = checkValidationName(name);
    const resultValidationPass = checkValidationPassword(password)
    if (resultValidationName !== true) {
      setSnackText(resultValidationName) 
    } else if (resultValidationPass !== true) {
      setSnackText(resultValidationPass)
    } else if(password !== confirmPassword) {
      setSnackText('Password and confirm pasword are different!')
    } else {
      const res = store.registration(name, password);
      res.then(value => (setSnackText(value)))
    }    
  }
   
  const handleChange = (key, value) => {
    setNewUser({...newUser, [key]:value})
  }

  return (    
    <form className='signup' onSubmit={(e)=> createNewPatient(e)}>
      <Header>
        <div className='header-block__title'>
          <h1>Зарегистрироваться в системе</h1>   
        </div>               
      </Header>
      <Body>
        <img src={BodyImg} alt='hospitalLogo'/>
        <div className='signup-form'>
          <h1>Регистрация</h1>
          <div className='signup-block'>
            <label htmlFor='signup-block__input'>Логин:</label>
            <input 
              type='text'
              className='signup-block__input'
              placeholder='Введите логин'                         
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className='signup-block'>
            <label htmlFor='signup-block__input'>Пароль:</label>
            <input 
              type='password'
              className='signup-block__input'
              placeholder='Введите пароль'
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <div className='signup-block'>
            <label htmlFor='signup-block__input'>Повторите пароль:</label>
            <input 
              type='password'
              className='signup-block__input'
              placeholder='Повторите пароль' 
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />              
          </div>
          <div className='signup-block__btn'>
            <input
              className='signup-btn'                  
              value='Зарегистрироваться'
              type='submit'
            /> 
          </div>                                
          <Link className='signup-block__link' to='/signIn'>
            <h3>Войти</h3>
          </Link>
        </div>
      </Body> 
      <SimpleSnackbar snackText={snackText} open={open} setOpen={setOpen}/>         
    </form>
  )
}

export default SignUp;