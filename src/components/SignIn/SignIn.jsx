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
    const {
      name,
      password      
    } = newUser;  
    const res = await store.signIn(name, password);
        
    if (res) {
      setOpenSnack(true);
      setSnackText(res);
    } else {      
      navigate('/appoinment');  
    }            
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
              <label htmlFor='signin-block__input-name'>Логин:</label>
              <input              
                type='text'
                placeholder='Введите логин'                
                className='signin-block__input-name'
                onChange={(e) => handleChange('name', e.target.value)} 
              />       
            </div>
            <div className='signin-block'>
              <label htmlFor='signin-block__input-password'>Пароль:</label>
              <input
                type='password'                         
                placeholder='введите пароль'                
                className='signin-block__input-password'
                onChange={(e) => handleChange('password', e.target.value)}              
              />         
            </div>
            <div className='signin-block'>
              <button className='signin-block__button-login'>Войти</button>
              <Link className='signin-block__link-registrate' to='/signUp'>
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