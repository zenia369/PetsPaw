import { lazy, Suspense } from "react";

import { RouteObject } from "react-router-dom";

import { LINK } from "./links";
import PageLoader from "../components/UI/PageLoader/PageLoader";

const Breeds = lazy(() => import("../pages/breeds/Breeds"));
const BreedInfo = lazy(() => import("../pages/breedInfo/BreedInfo"));

const route: RouteObject = {
  path: LINK.breeds,
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<PageLoader />}>
          <Breeds />
        </Suspense>
      ),
    },
    {
      path: ":id",
      element: (
        <Suspense fallback={<PageLoader />}>
          <BreedInfo />
        </Suspense>
      ),
    },
  ],
};

export default route;
