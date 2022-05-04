import './header.scss';
import Logo from '../../img/logo.svg';

const Header = ({children}) => {
  return (
    <div className='header-block'>
      <img src={Logo} alt='logo' />
        {children}
    </div>
  )
}
export default Header;