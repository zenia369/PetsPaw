/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useState, useLayoutEffect } from "react";
import "./Modal.scss";

import stopPropagation from "../../../helpers/stopPropagation";
import { svgCross } from "../../../assets/svgs";
import Button from "../Button/Button";
import useMatchMedia from "../../../hooks/useMatchMedia";

interface IModal {
  // eslint-disable-next-line react/require-default-props
  children?: JSX.Element;
  closeHandler: () => void;
}

export const useModal = (): [boolean, () => void] => {
  const [state, setState] = useState(false);

  const close = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, close];
};

function Modal({ children, closeHandler }: IModal) {
  const { isMobile, isTablet } = useMatchMedia();

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <div
      className={`modal ${isMobile || isTablet ? "modal-adaptive" : ""}`}
      onClick={closeHandler}
    >
      <div
        className={`modal__content ${
          isMobile || isTablet ? "modal__content-adaptive" : ""
        }`}
        onClick={stopPropagation}
      >
        <Button svg={svgCross} click={closeHandler} type="small_btn" />
        {children}
      </div>
    </div>
  );
}

export default Modal;
