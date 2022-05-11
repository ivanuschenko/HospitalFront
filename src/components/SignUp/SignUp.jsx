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
      return setSnackText('login should consist min 6 letters');               
    } 
    if (!checkValidationPassword(password)) {
      return setSnackText('password should consist min 6 numbers and 1 letter');                 
    }        
    if (password !== confirmPassword) {
      return setSnackText('Password and confirm pasword are different!');      
    }    
    const res = await store.registration(name, password);
    res === true ? navigate('/signIn') : setSnackText(res);    
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
              <label htmlFor='signup-block__input'>Логин:</label>
              <input 
                type='text'
                className='signup-block__input'
                id='signup-block__input'
                placeholder='Введите логин'                         
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className='signup-block'>
              <label htmlFor='signup-block__password'>Пароль:</label>
              <input 
                type='password'
                className='signup-block__input'
                id='signup-block__password'
                placeholder='Введите пароль'
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </div>
            <div className='signup-block'>
              <label htmlFor='signup-block__confirm'>Повторите пароль:</label>
              <input
                type='password'
                className='signup-block__input'
                id='signup-block__confirm'
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
          </form>
        </div>
      </Main> 
      <SimpleSnackbar snackText={snackText} openSnack={openSnack} setOpenSnack={setOpenSnack}/>         
    </div>
  )
}

export default SignUp;