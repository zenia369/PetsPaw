import { useCallback, useLayoutEffect, useState } from "react";

import {
  IReaction,
  EnamReactionAction,
  EnamReactionType,
} from "../models/IReaction";

import { currentTime } from "../helpers/getDate";
import { getItemLS, setItemLS } from "../helpers/localStorage";

export const LOGS_KEY = "PETS_PAW_USER_REACTION_LOGS";

const getLogsFromLS = () => {
  try {
    return getItemLS<IReaction[]>(LOGS_KEY);
  } catch (error) {
    return [];
  }
};

export default () => {
  const [logs, setLogs] = useState<IReaction[]>(getLogsFromLS);

  const addLog = (
    type: EnamReactionType,
    action: EnamReactionAction,
    id: string
  ) => {
    const itemReaction: IReaction = {
      type,
      date: currentTime(),
      action,
      id,
    };

    if (!logs.length) {
      setLogs([itemReaction]);
    } else {
      setLogs((prev) => [itemReaction, ...prev]);
    }
  };

  const removeLog = useCallback((id: string) => {
    setLogs((prev) => prev.filter((r) => r.id !== id));
  }, []);

  useLayoutEffect(() => {
    setItemLS(LOGS_KEY, logs);
  }, [logs]);

  return {
    logs,
    addLog,
    removeLog,
  };
};
