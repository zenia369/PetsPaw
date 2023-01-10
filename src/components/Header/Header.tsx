import "./Header.scss";

import { NavLink, Link } from "react-router-dom";

import { Themes, useThemeContext } from "../../context/theme.context";

import logo from "../../assets/images/logo.png";
import eye from "../../assets/images/eye.png";
import eye_close from "../../assets/images/eye-close.png";
import nav1 from "../../assets/images/vote-table.svg";
import nav2 from "../../assets/images/pet-breeds.svg";
import nav3 from "../../assets/images/images-search.svg";
import { LINK } from "../../routes/links";

function Header() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="header">
      <div className="header__head">
        <Link to="/" className="header__head__logo">
          <img src={logo} alt="Logo pets paw" />
          <p>PetsPaw</p>
        </Link>
        <div className="header__head__theme">
          <div className="header__head__theme__icon">
            <img
              src={theme !== Themes.light ? eye : eye_close}
              alt="eye icon"
            />
          </div>
          <button
            className={`header__head__theme__toggle ${
              theme !== Themes.light ? "" : "header__head__theme__toggle-active"
            }`}
            type="button"
            onClick={toggleTheme}
          >
            <span></span>
          </button>
        </div>
      </div>
      <h1>Hi intern!</h1>
      <p>Welcome to MI 2022 Front-end test</p>
      <h4>Lets start using The Cat API</h4>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to={`/${LINK.voting}`}>
              <div className="img">
                <img src={nav1} alt="vote-table" />
              </div>
              <p>VOTING</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${LINK.breeds}`}>
              <div className="img">
                <img src={nav2} alt="pet-breeds" />
              </div>
              <p>BREEDS</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${LINK.gallery}`}>
              <div className="img">
                <img src={nav3} alt="images-search" />
              </div>
              <p>GALLERY</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
