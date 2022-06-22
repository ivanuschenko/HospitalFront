import './style.scss';
import Logo from 'src/img/logo.svg';

const Header = ({children}) => {
  return (
    <div className="header-block">
      <img className="header-img__logo" src={Logo} alt="logo" />
      <div className="header-children">
        {children}
      </div>        
    </div>
  )
}
export default Header;