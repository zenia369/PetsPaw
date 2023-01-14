import Reaction from "../Reaction";

import { LINK } from "../../../../routes/links";
import { EnamReactionType } from "../../../../models/IReaction";

export default function Dislike() {
  return (
    <Reaction pageType={LINK.dislikes} filterBy={EnamReactionType.dislike} />
  );
}
