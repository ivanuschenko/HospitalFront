import { useState, useContext } from 'react';
import SimpleSnackbar from '../snack/Snack';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import Header from '../header/Header';
import Body from '../body/Body';
import './SignUp.scss';
import BodyImg from '../../img/hospital.svg';

const SignUp = () => {  
  const [newUser, setNewUser] = useState({
    name: '',
    password : '',
    confirmPassword: '',
  })
  const [snackText, setSnackText] = useState('');
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  const {store} = useContext(Context);  
   
  const createNewPatient = async (e) => { 
    setOpen(true);
    e.preventDefault();    
    if (newUser.password === newUser.confirmPassword ) {
      const res = store.registration(newUser.name, newUser.password);
      res.then(value => (setSnackText(value)))      
    }
    else {
      setSnackText(`password and confirm password are different!`);
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
        <img src={BodyImg} alt='image'/>
        <div className='signUp__form'>
          <h1>Зарегистрироваться</h1>
          <div className='signUp__block'>
            <label htmlFor='signUp__input'>Логин:</label>
            <input 
              type='text'
              className='signUp__input'
              placeholder='Введите логин'
              pattern="[a-z]{4,8}" title="4 to 8 lowercase letters"              
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className='signUp__block'>
            <label htmlFor='signUp__input'>Пароль:</label>
            <input 
              type='password'
              className='signUp__input'
              placeholder='введите пароль'
              pattern='[0-9]{4,12}'
              title="password should consist 4 to 12 numbers"                  
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <div className='signUp__block'>
            <label htmlFor='signUp__input'>Повторите пароль:</label>
            <input 
              type='password'
              className='signUp__input'
              placeholder='Повторите пароль'
              pattern='[0-9]{4,12}'
              title="password should consist 4 to 12 numbers"                           
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />              
          </div>                    
            <input
              className='signUp__btn'                  
              value='Зарегистрироваться'
              type = 'submit'
            />                       
          <Link className='signUp__a' to='/signIn'>
            <h3>Войти</h3>
          </Link>
        </div>
      </Body> 
      <SimpleSnackbar snackText = {snackText} open = {open} setOpen ={setOpen}/>         
    </form>
  )
}

export default SignUp;