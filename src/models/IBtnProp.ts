export default interface IBtnProp {
  svg: JSX.Element;
  click: () => void;
  type?: "big_btn" | "middle_btn" | "small_btn";
}
