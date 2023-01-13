import { useId, useCallback } from "react";
import "./Voting.scss";

import { useQuery } from "react-query";

import {
  EnamReactionType,
  IReactionAction,
  IReactionType,
} from "../../models/IReaction";
import votingService from "../../services/voting.service";
import useLogs from "../../hooks/useLogs";

import { sgvFavourites, svgDislikes, svgLikes } from "../../assets/svgs";
import { LINK } from "../../routes/links";
import Loader from "../../components/UI/Loader/Loader";
import Button from "../../components/UI/Button/Button";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import VotingLogItem from "./components/VotingLogItem/VotingLogItem";
import useMatchMedia from "../../hooks/useMatchMedia";

function Voting() {
  const logItemId = useId();
  const { data, isFetching, refetch } = useQuery("voting", votingService);
  const { logs, addLog } = useLogs();
  const { isMobile } = useMatchMedia();

  const hendleReaction = useCallback(
    (type: IReactionType, action: IReactionAction) => {
      if (data) {
        addLog(type, action, data.id);
        refetch();
      }
    },
    [refetch, data, addLog]
  );

  return (
    <section className="pages voting">
      <Breadcrumbs pageName={LINK.voting} />
      <div
        className={`voting__content ${
          isMobile ? "voting__content-mobile" : ""
        }`}
      >
        <div className="voting__content__head">
          {isFetching ? (
            <Loader />
          ) : (
            <img
              width={640}
              height={360}
              src={data?.url}
              alt="Voting item cat"
            />
          )}
          <div className="voting__content__head__btns">
            <Button
              type="big_btn"
              click={() =>
                hendleReaction(EnamReactionType.like, "add to Likes")
              }
              svg={svgLikes}
            />
            <Button
              type="big_btn"
              click={() =>
                hendleReaction(EnamReactionType.favourite, "add to Favourites")
              }
              svg={sgvFavourites}
            />
            <Button
              type="big_btn"
              click={() =>
                hendleReaction(EnamReactionType.dislike, "add to Dislikes")
              }
              svg={svgDislikes}
            />
          </div>
        </div>
        <div className="voting__content__logs">
          {logs.length === 0 ? (
            <div className="voting__content__logs__empty">
              <p>No saved reaction</p>
            </div>
          ) : (
            logs.map((votingItem, i) => (
              <VotingLogItem
                key={`${logItemId + i}log`}
                action={votingItem.action}
                date={votingItem.date}
                id={votingItem.id}
                type={votingItem.type}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Voting;
