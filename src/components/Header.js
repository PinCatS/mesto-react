import '../index.css';
import logoPath from '../images/logo.svg';

function Header() {
    return (
        <header className="header page__header">
          <img src={logoPath} alt="Лого Mesto" className="header__logo" />
        </header>
    );
}

export default Header;