import { Outlet } from "react-router-dom";
import PageNav from "../PageNav/PageNav";

function Page() {
  return (
    <>
      <PageNav />
      <Outlet />
    </>
  );
}

export default Page;
