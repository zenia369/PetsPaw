import { EnamReactionType } from "../../../models/IReaction";
import { LINK } from "../../../routes/links";
import Reaction from "../components/Reaction";

export default function Dislike() {
  return (
    <Reaction pageType={LINK.dislikes} filterBy={EnamReactionType.dislike} />
  );
}
