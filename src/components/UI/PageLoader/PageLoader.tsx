import "./PageLoader.scss";

import ContentLoader from "react-content-loader";

function PageLoader() {
  return (
    <div className="page-loader">
      <ContentLoader
        speed={2}
        width={640}
        height={400}
        viewBox="0 0 640 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="40" height="40" />
        <rect x="50" y="0" rx="10" ry="10" width="100" height="40" />
        <rect x="0" y="60" rx="20" ry="20" width="640" height="340" />
      </ContentLoader>
    </div>
  );
}

export default PageLoader;
