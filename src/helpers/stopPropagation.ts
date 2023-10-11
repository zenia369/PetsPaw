import { MouseEvent } from "react";

export default (
  event?:
    | Event
    | MouseEvent
    | {
        stopPropagation: () => void;
      }
) => {
  event?.stopPropagation();
};
