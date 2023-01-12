import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";

function Page() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default Page;
