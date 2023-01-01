import { Outlet } from "react-router-dom";
import "./Home.scss";

import Header from "../../components/Header/Header";

function Home() {
  return (
    <div className="home">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Home;
