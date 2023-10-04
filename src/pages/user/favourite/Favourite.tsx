import { EnamReactionType } from "../../../models/IReaction";
import { LINK } from "../../../routes/links";
import Reaction from "../components/Reaction";

export default function Favourite() {
  return (
    <Reaction
      pageType={LINK.favourites}
      filterBy={EnamReactionType.favourite}
    />
  );
}
