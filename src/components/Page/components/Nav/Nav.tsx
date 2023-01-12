import { useId } from "react";
import "./Nav.scss";

import { NavLink } from "react-router-dom";

import { LINK } from "../../../../routes/links";

import useMatchMedia from "../../../../hooks/useMatchMedia";

import Menu from "../Menu/Menu";
import Search from "../../../Search/Search";
import { sgvFavourites, svgDislikes, svgLikes } from "../../../../assets/svgs";
import Button from "../../../UI/Button/Button";

const pages = [
  {
    svg: svgLikes,
    path: LINK.pageLikes,
  },
  {
    svg: sgvFavourites,
    path: LINK.pageFavourites,
  },
  {
    svg: svgDislikes,
    path: LINK.pageDislikes,
  },
];

function Nav() {
  const linkId = useId();
  const { isDesktop } = useMatchMedia();

  return (
    <section className="page_nav">
      {isDesktop ? null : <Menu />}
      <Search />
      {pages.map((el) => (
        <NavLink key={linkId + el.path} to={el.path}>
          <Button svg={el.svg} type="middle_btn" />
        </NavLink>
      ))}
    </section>
  );
}

export default Nav;
