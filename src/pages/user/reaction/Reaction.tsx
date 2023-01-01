/* eslint-disable no-nested-ternary */
import { useCallback, useMemo } from "react";
import "./Reaction.scss";

import { useQuery, useQueryClient } from "react-query";

import { getListImgById } from "../../../services/app.service";
import useLogs from "../../../hooks/useLogs";

import { EnamReactionType } from "../../../models/IReaction";
import IBreed from "../../../models/IBreed";
import Breadcrumbs from "../../../components/UI/Breadcrumbs/Breadcrumbs";
import Loader from "../../../components/UI/Loader/Loader";
import Gallery from "../../../components/Gallery/Gallery";

interface IReaction {
  pageType: string;
  filterBy: string;
}

function Reaction({ pageType, filterBy }: IReaction) {
  const queryClient = useQueryClient();
  const { logs, removeLog } = useLogs();
  const logsId = useMemo(
    () => logs.filter((l) => l.type === filterBy).map((l) => l.id),
    [logs, filterBy]
  );
  const { data, isLoading } = useQuery<IBreed[]>(
    [pageType, logsId.toString()],
    () => getListImgById(logsId)
  );

  const removeFavourite = useCallback(
    (id: string) => {
      if (data) {
        removeLog(id);
        queryClient.setQueryData(
          [pageType, logsId.toString()],
          data.filter((d) => d.id !== id)
        );
      }
    },
    [removeLog, data, pageType, logsId, queryClient]
  );

  return (
    <section className="pages reaction">
      <Breadcrumbs pageName={pageType} />
      {!isLoading && data ? (
        filterBy === EnamReactionType.favourite ? (
          <Gallery
            list={data}
            isFavorite
            isOpen={false}
            removeFavourite={removeFavourite}
          />
        ) : (
          <Gallery list={data} isFavorite={false} isOpen={false} />
        )
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Reaction;
