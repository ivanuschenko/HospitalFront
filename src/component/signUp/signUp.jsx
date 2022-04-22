import Header from '../header/header';
import Body from '../body/body';
import { useState, useContext } from 'react';
import SimpleSnackbar from '../snack/snack';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import './signUp.scss';
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
    if (newUser.password === newUser.confirmPassword) {      
      store.registration(newUser.name, newUser.password);
      setSnackText('success!');          
    }
    else {
      setSnackText('Incorect password!!!!');
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
        <img src={BodyImg} alt='BodyImg'/>
        <div className='signUp__form'>
            <h1>Зарегистрироваться</h1>
            <div className='signUp__block'>
              <label htmlFor='signUp__input'>Логин:</label>
              <input 
                type='text'
                className='signUp__input'
                placeholder='Введите логин'                
                onChange={(e) => handleChange('name',e.target.value)}
              />
            </div>
            <div className='signUp__block'>
              <label htmlFor='signUp__input'>Пароль:</label>
              <input 
                type='password'
                className='signUp__input'
                placeholder='введите пароль'                
                onChange={(e) => handleChange('password',e.target.value)}
              />
            </div>
            <div className='signUp__block'>
              <label htmlFor='signUp__input'>Повторите пароль:</label>
              <input 
                type='password'
                className='signUp__input'
                placeholder='Повторите пароль'                
                onChange={(e) => handleChange('confirmPassword',e.target.value)}
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