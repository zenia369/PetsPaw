import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";

import breedsRoute from "./breeds.route";
import userRoute from "./user.route";

import { LINK } from "./links";
import PageLoader from "../components/UI/PageLoader/PageLoader";
import Greeting from "../components/Greeting/Greeting";
import Page from "../components/Page/Page";
import Home from "../pages/home/Home";

const Voting = lazy(() => import("../pages/voting/Voting"));
const Gallery = lazy(() => import("../pages/gallery/Gallery"));

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
          // {
          //   path: LINK.voting,
          //   element: (
          //     <Suspense fallback={<PageLoader />}>
          //       <Voting />
          //     </Suspense>
          //   ),
          // },
          {
            path: LINK.voting,
            element: <PageLoader />,
          },
          {
            path: LINK.gallery,
            element: (
              <Suspense fallback={<PageLoader />}>
                <Gallery />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
