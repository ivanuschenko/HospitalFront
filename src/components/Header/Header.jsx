import './header.scss';
import Logo from '/home/user/Medecine/Front/HospitalFront/src/img/logo.svg';

const Header = ({children}) => {
  return (
    <div className='header-block'>
      <img src={Logo} alt='logo' />
        {children}
    </div>
  )
}
export default Header;