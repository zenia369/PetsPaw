import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

import breedsRoute from "./breeds.route";
import userRoute from "./user.route";

import { LINK } from "./links";
import PageLoader from "../components/UI/PageLoader/PageLoader";
import Page from "../components/Layouts/Page/Page";
import Header from "../components/Header/Header";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import FullPageErrorFallback from "../components/UI/Errors/FullPageErrorFallback";

const Voting = lazy(() => import("../pages/voting/Voting"));
const Gallery = lazy(() => import("../pages/gallery/Gallery"));

const router: RouteObject[] = [
  {
    path: "/",
    errorElement: <FullPageErrorFallback />,
    children: [
      { element: <Header />, index: true },
      {
        path: "*",
        element: (
          <ScrollToTop>
            <Page />
          </ScrollToTop>
        ),
        children: [
          breedsRoute,
          userRoute,
          {
            path: LINK.voting,
            element: (
              <Suspense fallback={<PageLoader />}>
                <Voting />
              </Suspense>
            ),
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
];

export default router;
