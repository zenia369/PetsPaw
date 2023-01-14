import Reaction from "../Reaction";

import { LINK } from "../../../../routes/links";
import { EnamReactionType } from "../../../../models/IReaction";

export default function Favourite() {
  return (
    <Reaction
      pageType={LINK.favourites}
      filterBy={EnamReactionType.favourite}
    />
  );
}
