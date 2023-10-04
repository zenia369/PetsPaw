import { useCallback, useEffect, useState } from "react";

import IReaction, { IReactionAction, IReactionType } from "../models/IReaction";

import { currentTime } from "../helpers/getDate";
import { getItemLS, setItemLS } from "../helpers/localStorage";

const LOGS_KEY = "logs";

export default () => {
  const [logs, setLogs] = useState<IReaction[]>(() => {
    try {
      return getItemLS(LOGS_KEY);
    } catch (error) {
      return [];
    }
  });

  const addLog = useCallback(
    (type: IReactionType, action: IReactionAction, id: string) => {
      const itemReaction: IReaction = {
        type,
        date: currentTime(),
        action,
        id,
      };
      if (!logs.length) {
        setLogs([itemReaction]);
      } else {
        setLogs([itemReaction, ...logs]);
      }
    },
    [logs, setLogs]
  );

  const removeLog = useCallback(
    (id: string) => {
      setLogs((prev) => prev.filter((r) => r.id !== id));
    },
    [setLogs]
  );

  useEffect(() => {
    setItemLS(LOGS_KEY, logs);
  }, [logs]);

  return {
    logs,
    addLog,
    removeLog,
  };
};
