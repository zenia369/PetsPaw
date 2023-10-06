import { IDropDownItem } from "../models/IDropDownList";
import { ALL_BREEDS } from "../services/breeds.service";

export default (breeds: IDropDownItem[] | undefined) => {
  if (breeds) {
    const activeB = breeds.find((b) => b.active) as IDropDownItem;

    return activeB.name === ALL_BREEDS
      ? breeds
          .filter((b) => b.name !== ALL_BREEDS)
          .map((b) => b.id)
          .join(",")
      : String(activeB.id);
  }
  return "";
};
