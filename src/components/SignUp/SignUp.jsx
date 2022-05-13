import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from 'src/index';
import Header from 'src/components/Header/Header';
import Main from 'src/components/Main/Main';
import SimpleSnackbar from 'src/components/Snack/Snack';
import './style.scss';
import BodyImg from 'src/img/hospital.svg';
import { checkValidationLogin , checkValidationPassword } from 'src/helper/helperValidate';

const SignUp = () => {  
  const [newUser, setNewUser] = useState({
    name: '',
    password : '',
    confirmPassword: '',
  });
  const [snackText, setSnackText] = useState('');
  const [openSnack, setOpenSnack] = useState(false);  
  const navigate = useNavigate();
  const {store} = useContext(Context);
  
  const createNewPatient = async (e) => {       
    e.preventDefault();
    setOpenSnack(true);
    const {
      name,
      password,
      confirmPassword
    } = newUser;     
    
    if (!checkValidationLogin(name)) {
      setSnackText('login should consist min 6 letters');
      return;               
    } 
    if (!checkValidationPassword(password)) {
      setSnackText('password should consist min 6 numbers and 1 letter');
      return;                 
    }        
    if (password !== confirmPassword) {
      setSnackText('Password and confirm pasword are different!');
      return;      
    }    
    const res = await store.registration(name, password);
    !res ? navigate('/signIn') : setSnackText(res);    
  }  
   
  const handleChange = (key, value) => {
    setNewUser({...newUser, [key]:value});
  }

  return (    
    <div className='signup'>
      <Header>
        <div className='header-block__title'>
          <h1>Зарегистрироваться в системе</h1>   
        </div>               
      </Header>
      <Main>
        <img src={BodyImg} alt='hospitalLogo'/>
        <div className='signup-body'>
          <h1>Регистрация</h1>
          <form className='signup-form' onSubmit={createNewPatient}>          
            <div className='signup-block'>
              <label htmlFor='signup-block__input-login'>Логин:</label>
              <input 
                type='text'
                id='signup-block__input-login'
                className='signup-block__input'                
                placeholder='Введите логин'                         
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className='signup-block'>
              <label htmlFor='signup-block__input-password'>Пароль:</label>
              <input 
                type='password'
                id='signup-block__input-password'
                className='signup-block__input'                
                placeholder='Введите пароль'
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </div>
            <div className='signup-block'>
              <label htmlFor='signup-block__input-confirmPassword'>Повторите пароль:</label>
              <input
                type='password'
                id='signup-block__input-confirmPassword'
                className='signup-block__input'                
                placeholder='Повторите пароль' 
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
              />              
            </div>
            <div className='signup-block'>
              <button className='signup-block__button-registrate'>Зарегистрироваться</button>
              <Link className='signup-block__link-login' to='/signIn'>
                Войти
              </Link> 
            </div>
          </form>
        </div>
      </Main> 
      <SimpleSnackbar snackText={snackText} openSnack={openSnack} setOpenSnack={setOpenSnack}/>         
    </div>
  )
}

export default SignUp;