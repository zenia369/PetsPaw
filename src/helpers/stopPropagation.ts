import { MouseEvent } from "react";

export default (
  event?:
    | Event
    | MouseEvent
    | {
        stopPropagation: () => void;
      }
) => {
  if (typeof event?.stopPropagation !== "function") {
    throw new Error("event.stopPropagation is not a function");
  }

  event.stopPropagation();
};
