import { ReactNode, memo } from "react";

import { sgvFavourites, svgDislikes, svgLikes } from "../../../../assets/svgs";
import "./VotingLogItem.scss";

import { IReaction, EnamReactionType } from "../../../../models/IReaction";

const typesItems: Record<
  keyof typeof EnamReactionType,
  { name: string; svg: ReactNode }
> = {
  like: {
    name: "Likes",
    svg: svgLikes,
  },
  dislike: {
    name: "Dislikes",
    svg: svgDislikes,
  },
  favourite: {
    name: "Favourites",
    svg: sgvFavourites,
  },
};

function VotingLogItem({ type, date, id, action }: IReaction) {
  return (
    <div className={`voting__content__logs__item ${type}`}>
      <p className="voting__content__logs__item-date">{date}</p>
      <p className="voting__content__logs__item-info">
        Image ID: <span>{id}</span> was {action}
      </p>
      {typesItems[type].svg}
    </div>
  );
}

export default memo(VotingLogItem);
