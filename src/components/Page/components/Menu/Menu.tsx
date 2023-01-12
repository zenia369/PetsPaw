import { useId } from "react";
import "./Menu.scss";

import { useNavigate } from "react-router-dom";

import {
  HEADER_NAV_LIST_DATA,
  HeaderNavListItem,
} from "../../../Header/Header";
import Button from "../../../UI/Button/Button";
import Modal, { useModal } from "../../../UI/Modal/Modal";
import { svgMenu } from "../../../../assets/svgs";

function Menu() {
  const modalItemId = useId();
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
          <div className="menu__modal__list">
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
        </Modal>
      ) : null}
    </div>
  );
}

export default Menu;
