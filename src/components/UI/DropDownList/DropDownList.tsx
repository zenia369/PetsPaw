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
  ariaLabel = "dropdown", // eslint-disable-next-line react/require-default-props
}: IDropDownList & { ariaLabel?: string }) {
  const listItemId = useId();
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  const activeCategory = listItmes.find((el) => el.active) as {
    active: boolean;
    name: string;
  };

  const handleSelectItem = (name: string | number) => {
    click(name);
    setOpen(!open);
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
        className="drop__down__item__btn"
        style={dropWidthStyles}
        aria-label={ariaLabel}
      >
        <span>{`${dropName} ${activeCategory.name}`}</span>
        {svgArrowDown}
      </button>
      <ul
        className={`drop__down__item__list ${open && "active"}`}
        aria-label={`${ariaLabel} list`}
      >
        {listItmes.map((el, idx) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={`${listItemId}-dropDown-${idx}`}
            className={`drop__down__item__list_item ${el.active && "active"}`}
          >
            <button type="button" onClick={() => handleSelectItem(el.name)}>
              {el.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(DropDownList);
