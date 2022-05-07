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
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState(''); 
  const navigate = useNavigate();
  const {store} = useContext(Context);

  const authorised = async (e) => {
    e.preventDefault(); 
    setOpen(true);
    const {
      name,
      password      
    } = newUser;  
    const res = await store.signIn(name, password);
    res ? navigate('/appointment') : setSnackText('Untracked error')       
  };
  
  const handleChange = (key, value) => {
    setNewUser({...newUser, [key]:value});
  };

  return(
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
              <label>Логин:</label>
              <input              
                type='text'
                placeholder='Введите логин'
                className='signin-block__input'
                onChange={(e) => handleChange('name', e.target.value)} 
              />       
            </div>
            <div className='signin-block'>
              <label>Пароль:</label>
              <input
                type='password'                         
                placeholder='введите пароль'
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
    <SimpleSnackbar snackText={snackText} open={open} setOpen={setOpen}/>
    </div>
  )
}

export default SignIn;