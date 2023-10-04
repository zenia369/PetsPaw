import { lazy, Suspense } from "react";

import { RouteObject } from "react-router-dom";

import { LINK } from "./links";
import PageLoader from "../components/UI/PageLoader/PageLoader";

const Search = lazy(() => import("../pages/user/search/Search"));
const Dislike = lazy(() => import("../pages/user/dislike/Dislike"));
const Favourite = lazy(() => import("../pages/user/favourite/Favourite"));
const Likes = lazy(() => import("../pages/user/likes/Likes"));

const route: RouteObject = {
  path: LINK.user,
  children: [
    {
      path: LINK.likes,
      element: (
        <Suspense fallback={<PageLoader />}>
          <Likes />
        </Suspense>
      ),
    },
    {
      path: LINK.favourites,
      element: (
        <Suspense fallback={<PageLoader />}>
          <Favourite />
        </Suspense>
      ),
    },
    {
      path: LINK.dislikes,
      element: (
        <Suspense fallback={<PageLoader />}>
          <Dislike />
        </Suspense>
      ),
    },
    {
      path: LINK.search,
      element: (
        <Suspense fallback={<PageLoader />}>
          <Search />
        </Suspense>
      ),
    },
  ],
};

export default route;
