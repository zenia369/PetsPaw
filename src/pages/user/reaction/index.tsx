import Reaction from "./Reaction";

import { LINK } from "../../../routes/links";
import { EnamReactionType } from "../../../models/IReaction";

export function Likes() {
  return <Reaction pageType={LINK.likes} filterBy={EnamReactionType.like} />;
}

export function Favourite() {
  return (
    <Reaction
      pageType={LINK.favourites}
      filterBy={EnamReactionType.favourite}
    />
  );
}
export function Dislike() {
  return (
    <Reaction pageType={LINK.dislikes} filterBy={EnamReactionType.dislike} />
  );
}

export default {};
