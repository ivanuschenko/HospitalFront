import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import Header from '../header/header';
import Body from '../body/body';
import BodyImg from '../../img/hospital.svg'
import './signUp.scss';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const {store} = useContext(Context);
   
  const createNewPatient = async (name, pass, confirmPass, e) => {    
    if (pass === confirmPass) {
      e.preventDefault();
      store.registration(name, pass)
      navigate('/Appoinment');     
    }
    else {
      alert('Incorect password!!!!');
    }  
}

  return(
    <form className='signUp-container' onSubmit={(e)=> createNewPatient(name, password, confirmPassword, e)}>
      <Header>
        <h1>Зарегистрироваться в системе</h1>        
      </Header>
      <Body>
        <img src={BodyImg} alt="BodyImg"/>
        <form className='signUp-form'>
            <h1>Зарегистрироваться</h1>
            <div className='signUp-form-form'>
              <label htmlFor="signUp-input-name">Логин:</label>
              <input 
                type="text"
                className='signUp-input-name'
                placeholder='Введите логин'                
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className='signUp-form-form'>
              <label htmlFor="signUp-input-password">Пароль:</label>
              <input 
                type="password"
                className='signUp-input-password'
                placeholder='введите пароль'                
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='signUp-form-form'>
              <label htmlFor="signUp-input-repeat-password">Повторите пароль:</label>
              <input 
                type="password"
                className='signUp-input-repeat-password'
                placeholder='Повторите пароль'                
                onChange={(e) => setConfirmPassword(e.target.value)}
              />              
            </div>  
            <Link to='/Appoinment'>
              <input
                className='signUp-btn'
                value='Зарегистрироваться'
                type = 'submit'
              />              
            </Link>
            <Link to='/signIn'><h3>Войти</h3></Link>
        </form>
      </Body>      
    </form>
  )
}

export default SignUp;