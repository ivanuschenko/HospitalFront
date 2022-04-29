import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import Header from '../header/Header';
import Body from '../body/Body';
import SimpleSnackbar from '../snack/Snack';
import './signIn.scss';
import BodyImg from '../../img/hospital.svg'

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
      const res = store.signIn(name,password)
      res.then(value => setSnackText(value))        
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
      <Body>
        <img src={BodyImg} alt="hospitalLogo" />
        <div className='signin-form'>
          <h1>Войти в систему</h1>
          <div className='signin-block'>
            <label htmlFor="signin-block__input">Логин:</label>
            <input              
              type="text"
              placeholder='Введите логин'
              className='signin-block__input'
              onChange={(e) => handleChange('name', e.target.value)} 
            />       
          </div>
          <div className='signin-block'>
            <label htmlFor="signin-block__input">Пароль:</label>
            <input
              type="password"                         
              placeholder='введите пароль'
              className='signin-block__input'
              onChange={(e) => handleChange('password', e.target.value)}              
            />         
          </div>
          <div className='signin-block__btn'>
            <button className='signin-btn'>Войти</button>
          </div>          
          <Link className='signup-link' to='/signUp'>
            <p>Зарегистрироваться</p>
          </Link>
        </div>
      </Body>  
    <SimpleSnackbar snackText={snackText} open={open} setOpen={setOpen}/>
    </form>
  )
}

export default SignIn;