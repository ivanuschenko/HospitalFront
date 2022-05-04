import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '/home/user/Medecine/Front/HospitalFront/src/index';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SimpleSnackbar from '../Snack/Snack';
import './signIn.scss';
import BodyImg from '/home/user/Medecine/Front/HospitalFront/src/img/hospital.svg';

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
    setOpen(true)
    const {
      name,
      password      
    } = newUser;
    
    e.preventDefault();   
      const res = store.signIn(name,password);
      res.then(value => setSnackText(value));        
  }
  
  const handleChange = (key, value) => {
    setNewUser({...newUser, [key]:value})
  }

  return(
    <form className='signin' onSubmit={(e) => authorised(e)}>
      <Header>
      <div className='header-block__title'>
        <h1>Войти в систему</h1>
      </div>
      </Header>
      <Main>
        <img src={BodyImg} alt="hospitalLogo" />
        <div className='signin-body '>
          <h1>Войти в систему</h1>
          <div className='signin-block'>
            <label>Логин:</label>
            <input              
              type="text"
              placeholder='Введите логин'
              className='signin-block__input'
              onChange={(e) => handleChange('name', e.target.value)} 
            />       
          </div>
          <div className='signin-block'>
            <label>Пароль:</label>
            <input
              type="password"                         
              placeholder='введите пароль'
              className='signin-block__input'
              onChange={(e) => handleChange('password', e.target.value)}              
            />         
          </div>
          <div className='signin-block'>
            <button className='signin-block signup-button__login'>Войти</button>
            <Link className='signin-block signup-link__registrate' to='/signUp'>
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </Main>  
    <SimpleSnackbar snackText={snackText} open={open} setOpen={setOpen}/>
    </form>
  )
}

export default SignIn;