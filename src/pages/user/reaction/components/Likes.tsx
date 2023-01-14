import Reaction from "../Reaction";

import { LINK } from "../../../../routes/links";
import { EnamReactionType } from "../../../../models/IReaction";

export default function Likes() {
  return <Reaction pageType={LINK.likes} filterBy={EnamReactionType.like} />;
}
