import { useState, useId, useRef, memo } from "react";
import "./DropDownList.scss";

import { svgArrowDown } from "../../../assets/svgs";
import IDropDownList from "../../../models/IDropDownList";

function DropDownList({
  listItmes,
  click,
  dropName = "",
  dropWidthClass,
  dropWidthStyles,
  label,
}: IDropDownList) {
  const listItemId = useId();
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  const activeCategory = listItmes.find((el) => el.active) as {
    active: boolean;
    name: string;
  };

  return (
    <div
      ref={wrapperRef}
      className={`drop__down__item ${dropWidthClass || "large"}`}
    >
      {label && <p className="drop__down__item_label">{label}</p>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="drop__down__item_btn"
        style={dropWidthStyles}
      >
        <span>{`${dropName} ${activeCategory.name}`}</span>
        {svgArrowDown}
      </button>
      <ul className={`drop__down__item__list ${open && "active"}`}>
        {listItmes.map((el) => (
          <li
            key={`${listItemId}dropDown${el.name}`}
            className={`drop__down__item__list_item ${el.active && "active"}`}
          >
            <button type="button" onClick={() => click(el.name)}>
              {el.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(DropDownList);
