import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import Header from '../header/Header';
import Body from '../body/Body';
import SimpleSnackbar from '../snack/Snack';
import './signUp.scss';
import BodyImg from '../../img/hospital.svg';

const SignUp = () => {  
  const [newUser, setNewUser] = useState({
    name: '',
    password : '',
    confirmPassword: '',
  });
  const [checkValid, setCheckValid] = useState ({
    validName: /^[0-9A-Za-z]{6,}$/,
    validPassword : /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/                       
  });  
  const [snackText, setSnackText] = useState('');
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  const {store} = useContext(Context);  
   
  const createNewPatient = async (e) => {
    e.preventDefault();  
    const {
      validName,
      validPassword
    } = checkValid;   
    const {
      name,
      password,
      confirmPassword
    } = newUser;

    if (name && password && confirmPassword) {
      setOpen(true)
      if(!validName.test(name)){      
        setSnackText('login should consist min 6 letters')
      } else {
        if (!validPassword.test(password)){
          setSnackText("password should consist min 6 numbers and 1 letter")
        } else {
          if (password === confirmPassword ) {
            const res = store.registration(name, password);
            res.then(value => (setSnackText(value)))      
          }
          else {
            setSnackText(`password and confirm password are different!`);
          } 
        }         
      }     
    } else {
      setSnackText('please input all values')
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
        <div className='signUp__form'>
          <h1>Зарегистрироваться</h1>
          <div className='signUp__block'>
            <label htmlFor='signUp__input'>Логин:</label>
            <input 
              type='text'
              className='signUp__input'
              placeholder='Введите логин'                         
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className='signUp__block'>
            <label htmlFor='signUp__input'>Пароль:</label>
            <input 
              type='password'
              className='signUp__input'
              placeholder='введите пароль'
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <div className='signUp__block'>
            <label htmlFor='signUp__input'>Повторите пароль:</label>
            <input 
              type='password'
              className='signUp__input'
              placeholder='Повторите пароль' 
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />              
          </div>                    
          <input
            className='signUp__btn'                  
            value='Зарегистрироваться'
            type='submit'
          />                       
          <Link className='signUp__a' to='/signIn'>
            <h3>Войти</h3>
          </Link>
        </div>
      </Body> 
      <SimpleSnackbar snackText={snackText} open={open} setOpen={setOpen}/>         
    </form>
  )
}

export default SignUp;