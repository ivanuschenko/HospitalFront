import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SimpleSnackbar from '../Snack/Snack';
import './signUp.scss';
import BodyImg from '../../img/hospital.svg';
import { checkValidationLogin , checkValidationPassword } from '../../helper/helperValidate';

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
   
    if (!checkValidationLogin(name)) {
      setSnackText('login should consist min 6 letters');
    } else if (!checkValidationPassword(password)) {
      setSnackText('password should consist min 6 numbers and 1 letter');
    } else if(password !== confirmPassword) {
      setSnackText('Password and confirm pasword are different!');
    } else {
      const res = store.registration(name, password);
      res.then(value => setSnackText(value));
    }    
  }
   
  const handleChange = (key, value) => {
    setNewUser({...newUser, [key]:value});
  }

  return (    
    <form className='signup' onSubmit={(e)=> createNewPatient(e)}>
      <Header>
        <div className='header-block__title'>
          <h1>Зарегистрироваться в системе</h1>   
        </div>               
      </Header>
      <Main>
        <img src={BodyImg} alt='hospitalLogo'/>
        <div className='signup-body'>
          <h1>Регистрация</h1>
          <div className='signup-block'>
            <label>Логин:</label>
            <input 
              type='text'
              className='signup-block__input'
              placeholder='Введите логин'                         
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className='signup-block'>
            <label>Пароль:</label>
            <input 
              type='password'
              className='signup-block__input'
              placeholder='Введите пароль'
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <div className='signup-block'>
            <label>Повторите пароль:</label>
            <input 
              type='password'
              className='signup-block__input'
              placeholder='Повторите пароль' 
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />              
          </div>
          <div className='signup-block'>
            <button className='signup-block signup-button__registrate'>Зарегистрироваться</button>
            <Link className='signup-block signup-link__login' to='/signIn'>
              Войти
            </Link> 
          </div>
        </div>
      </Main> 
      <SimpleSnackbar snackText={snackText} open={open} setOpen={setOpen}/>         
    </form>
  )
}

export default SignUp;