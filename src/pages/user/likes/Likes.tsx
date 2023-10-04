import { EnamReactionType } from "../../../models/IReaction";
import { LINK } from "../../../routes/links";
import Reaction from "../components/Reaction";

export default function Likes() {
  return <Reaction pageType={LINK.likes} filterBy={EnamReactionType.like} />;
}
