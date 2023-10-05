import { useId } from "react";
import "./Header.scss";

import { NavLink, Link } from "react-router-dom";

import { Themes, useThemeContext } from "../../context/theme.context";
import { LINK } from "../../routes/links";

import logo from "../../assets/images/logo.png";
import eye from "../../assets/images/eye.png";
import eye_close from "../../assets/images/eye-close.png";
import nav1 from "../../assets/images/vote-table.png";
import nav2 from "../../assets/images/pet-breeds.png";
import nav3 from "../../assets/images/images-search.png";
import useMatchMedia from "../../hooks/useMatchMedia";

export const HEADER_NAV_LIST_DATA = [
  {
    link: LINK.voting,
    img: nav1,
    name: "VOTING",
  },
  {
    link: LINK.breeds,
    img: nav2,
    name: "BREEDS",
  },
  {
    link: LINK.gallery,
    img: nav3,
    name: "GALLERY",
  },
];

export function HeaderNavListItem({
  img,
  name,
}: {
  img: string;
  name: string;
}) {
  return (
    <>
      <div className="header__nav__list__item__img">
        <img src={img} alt="vote-table" />
      </div>
      <p className="header__nav__list__item__name">{name}</p>
    </>
  );
}

function HeaderNavList() {
  const itemId = useId();
  const { isMobile } = useMatchMedia();

  return (
    <ul
      className={`header__nav__list ${
        isMobile ? "header__nav__list-mobile" : ""
      }`}
    >
      {HEADER_NAV_LIST_DATA.map((item) => (
        <li key={itemId + item.name} className="header__nav__list__item">
          <NavLink to={`/${item.link}`}>
            <HeaderNavListItem img={item.img} name={item.name} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

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
      <nav className="header__nav">
        <HeaderNavList />
      </nav>
    </header>
  );
}

export default Header;
