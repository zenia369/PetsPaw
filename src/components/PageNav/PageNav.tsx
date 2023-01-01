import { useId } from "react";
import "./PageNav.scss";

import { NavLink } from "react-router-dom";

import { sgvFavourites, svgDislikes, svgLikes } from "../../assets/svgs";
import { LINK } from "../../routes/links";
import Search from "../Search/Search";
import Button from "../UI/Button/Button";

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

function PageNav() {
  const linkId = useId();
  return (
    <section className="content_nav">
      <Search />
      {pages.map((el) => (
        <NavLink key={linkId + el.path} to={el.path}>
          <Button svg={el.svg} type="middle_btn" />
        </NavLink>
      ))}
    </section>
  );
}

export default PageNav;
