/* eslint-disable react/require-default-props */
import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface IBtnProp
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  svg: JSX.Element;
  click?: () => void;
  type?: "big_btn" | "middle_btn" | "small_btn";
  styles?: object;
}

function Button({ svg, click, type, styles, ...props }: IBtnProp) {
  return (
    <button
      style={styles}
      type="button"
      className={type}
      onClick={click}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {svg}
    </button>
  );
}

export default Button;
