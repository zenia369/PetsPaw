import { useRouteError } from "react-router-dom";

function FullPageErrorFallback() {
  const error = useRouteError() as { message: string };

  return (
    <div role="alert" className="full-page-error">
      <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
      <pre>{error?.message}</pre>
    </div>
  );
}

export default FullPageErrorFallback;
