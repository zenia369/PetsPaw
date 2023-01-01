import { createBrowserRouter } from "react-router-dom";

import breedsRoute from "./breeds.route";
import userRoute from "./user.route";

import { LINK } from "./links";
import Greeting from "../components/Greeting/Greeting";
import Page from "../components/Page/Page";
import Home from "../pages/home/Home";
import Voting from "../pages/voting/Voting";
import Gallery from "../pages/gallery/Gallery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Greeting />,
      },
      {
        path: "/*",
        element: <Page />,
        children: [
          breedsRoute,
          userRoute,
          {
            path: LINK.voting,
            element: <Voting />,
          },
          {
            path: LINK.gallery,
            element: <Gallery />,
          },
        ],
      },
    ],
  },
]);

export default router;
