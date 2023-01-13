import { useId } from "react";
import "./Menu.scss";

import { useNavigate } from "react-router-dom";

import useMatchMedia from "../../../../hooks/useMatchMedia";

import {
  HEADER_NAV_LIST_DATA,
  HeaderNavListItem,
} from "../../../Header/Header";
import Button from "../../../UI/Button/Button";
import Modal, { useModal } from "../../../UI/Modal/Modal";
import { svgMenu } from "../../../../assets/svgs";

function MenuModal({ handleClick }: { handleClick: (arg: string) => void }) {
  const modalItemId = useId();
  const { isMobile } = useMatchMedia();

  return (
    <div
      className={`menu__modal__list ${
        isMobile ? "header__nav__list-mobile" : ""
      }`}
    >
      {HEADER_NAV_LIST_DATA.map((item) => (
        <button
          key={modalItemId + item.name}
          type="button"
          className="header__nav__list__item"
          onClick={() => handleClick(item.link)}
        >
          <HeaderNavListItem img={item.img} name={item.name} />
        </button>
      ))}
    </div>
  );
}

function Menu() {
  const [open, setOpen] = useModal();
  const navigate = useNavigate();

  const handleClick = (to: string) => {
    setOpen();
    navigate(`/${to}`);
  };

  return (
    <div className="menu">
      <Button type="middle_btn" svg={svgMenu} click={setOpen} />
      {open ? (
        <Modal closeHandler={setOpen}>
          <MenuModal handleClick={handleClick} />
        </Modal>
      ) : null}
    </div>
  );
}

export default Menu;
