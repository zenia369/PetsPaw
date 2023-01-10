import "./Breadcrumbs.scss";

import { useNavigate } from "react-router-dom";

import { svgArrowToLeft } from "../../../assets/svgs";
import Button from "../Button/Button";

interface IBreadcrumbs {
  pageName: string;
  // eslint-disable-next-line react/require-default-props
  crumbs?: string[];
  // eslint-disable-next-line react/require-default-props
  children?: JSX.Element;
}

function Breadcrumbs({ children, pageName, crumbs }: IBreadcrumbs) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="breadcrumbs">
      <Button type="small_btn" click={goBack} svg={svgArrowToLeft} />
      <h3 className={`breadcrumbs__item ${crumbs?.length ? "active" : ""}`}>
        {pageName}
      </h3>
      {crumbs?.length
        ? crumbs.map((c) => (
            <h3 key={`breadcrumb-${c}`} className="breadcrumbs__item">
              {c}
            </h3>
          ))
        : null}
      {children}
    </div>
  );
}

export default Breadcrumbs;
