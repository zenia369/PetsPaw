/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useState, useEffect } from "react";
import "./Modal.scss";

import stopPropagation from "../../../helpers/stopPropagation";
import { svgCross } from "../../../assets/svgs";
import Button from "../Button/Button";

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
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.marginRight = "18px";

    return () => {
      document.body.style.removeProperty("overflow-y");
      document.body.style.removeProperty("margin-right");
    };
  }, []);

  return (
    <div className="modal" onClick={closeHandler}>
      <div className="modal__content" onClick={stopPropagation}>
        <Button svg={svgCross} click={closeHandler} type="small_btn" />
        {children}
      </div>
    </div>
  );
}

export default Modal;
