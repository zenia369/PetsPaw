/* eslint-disable react/require-default-props */
import "./Button.scss";

interface IBtnProp {
  svg: JSX.Element;
  click?: () => void;
  type?: "big_btn" | "middle_btn" | "small_btn";
  styles?: object;
}

function Button({ svg, click, type, styles }: IBtnProp) {
  return (
    <button style={styles} type="button" className={type} onClick={click}>
      {svg}
    </button>
  );
}

export default Button;
