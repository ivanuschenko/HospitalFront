import React from 'react';
import './header.scss';
import Logo from '../../img/logo.svg';

const Header = ({children}) => {
  return(
    <div className='header-form'>
      <img src={Logo} alt="logo" />
        {children}
    </div>
  )
}
export default Header