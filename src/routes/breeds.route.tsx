import { RouteObject } from "react-router-dom";

import { LINK } from "./links";
import BreedInfo from "../pages/breedInfo/BreedInfo";
import Breeds from "../pages/breeds/Breeds";

const route: RouteObject = {
  path: LINK.breeds,
  children: [
    {
      index: true,
      element: <Breeds />,
    },
    {
      path: ":id",
      element: <BreedInfo />,
    },
  ],
};

export default route;
