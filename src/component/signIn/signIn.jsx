import React, {useContext, useState } from 'react';
import { Context } from '../../index';
import { Link, useNavigate } from 'react-router-dom';
import './signIn.scss';
import Header from '../header/header';
import Body from '../body/body';
import BodyImg from '../../img/hospital.svg';

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();
  const {store} = useContext(Context);
  
  const authorised = async (name, pass, e) => {
    e.preventDefault();
    let a = store.signIn(name, pass);
    alert('Вход выполнен!');
  } 

  return(
    <form onSubmit={(e) => authorised(name, password,e)} className="signIn-container">
      <Header>
        <h1>Войти в систему</h1>
      </Header>      
      <Body>
        <img src={BodyImg} alt="BodyImg" />
        <div className='signIn-form'>
          <h1>Войти в систему</h1>
          <div className='signIn-form-form'>
            <label htmlFor="signIn-input-name">Логин:</label>
            <input              
            type="text"
            placeholder='Введите логин'
            className='signIn-input-name'
            onChange={(e) => setName(e.target.value)} 
          />
          <div >            
          </div>
          </div>
          <div className='signIn-form-form'>
            <label htmlFor="signIn-input-password">Пароль:</label>
            <input                         
              placeholder='введите пароль'
              className='signIn-input-password'
              onChange={(e) => setPassword(e.target.value)}              
          />         
          </div>
          <input
            type="submit"            
            value="voiti"
            className='submit-signIn'
          />
          <Link to='/signUp'><p className='signIn-text'>Зарегистрироваться</p></Link>
        </div>
      </Body>  

    </form>
  )
}

export default SignIn;