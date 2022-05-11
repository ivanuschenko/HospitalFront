import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from 'src/index';
import Header from 'src/components/Header/Header';
import Main from 'src/components/Main/Main';
import SimpleSnackbar from 'src/components/Snack/Snack';
import './style.scss';
import BodyImg from 'src/img/hospital.svg';

const SignIn = () => {  
  const [newUser, setNewUser] = useState({
    name: '',
    password : ''    
  });
  const [openSnack, setOpenSnack] = useState(false);
  const [snackText, setSnackText] = useState(''); 
  const navigate = useNavigate();
  const {store} = useContext(Context);

  const authorised = async (e) => {
    e.preventDefault(); 
    setOpenSnack(true);
    const {
      name,
      password      
    } = newUser;  
    const res = await store.signIn(name, password);
    localStorage.getItem('token') ? navigate('/appoinment') : setSnackText(res)         
  };
  
  const handleChange = (key, value) => {
    setNewUser({...newUser, [key]:value});
  };

  return (
    <div className='signin'>
      <Header>
      <div className='header-block__title'>
        <h1>Войти в систему</h1>
      </div>
      </Header>
      <Main>
        <img src={BodyImg} alt='hospitalLogo' />
        <div className='signin-body'>
          <h1>Войти в систему</h1>
          <form className='signin-form' onSubmit={authorised}>          
            <div className='signin-block'>
              <label htmlFor='signin-input__name'>Логин:</label>
              <input              
                type='text'
                placeholder='Введите логин'
                id='signin-input__name'
                className='signin-block__input'
                onChange={(e) => handleChange('name', e.target.value)} 
              />       
            </div>
            <div className='signin-block'>
              <label htmlFor='signin-input__password'>Пароль:</label>
              <input
                type='password'                         
                placeholder='введите пароль'
                id='signin-input__password'
                className='signin-block__input'
                onChange={(e) => handleChange('password', e.target.value)}              
              />         
            </div>
            <div className='signin-block'>
              <button className='signin-block signin-button__login'>Войти</button>
              <Link className='signin-block signin-link__registrate' to='/signUp'>
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>
      </Main>  
    <SimpleSnackbar snackText={snackText} openSnack={openSnack} setOpenSnack={setOpenSnack}/>
    </div>
  )
}

export default SignIn;