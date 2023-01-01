import { RouteObject } from "react-router-dom";

import { LINK } from "./links";

import { Dislike, Favourite, Likes } from "../pages/user/reaction";
import Search from "../pages/user/search/Search";

const route: RouteObject = {
  path: LINK.user,
  children: [
    {
      path: LINK.likes,
      element: <Likes />,
    },
    {
      path: LINK.favourites,
      element: <Favourite />,
    },
    {
      path: LINK.dislikes,
      element: <Dislike />,
    },
    {
      path: LINK.search,
      element: <Search />,
    },
  ],
};

export default route;
