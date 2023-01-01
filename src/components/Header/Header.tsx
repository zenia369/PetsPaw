import "./Header.scss";

import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/images/Logo.svg";
import nav1 from "../../assets/images/vote-table.svg";
import nav2 from "../../assets/images/pet-breeds.svg";
import nav3 from "../../assets/images/images-search.svg";
import { LINK } from "../../routes/links";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo pets paw" />
      </Link>
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
