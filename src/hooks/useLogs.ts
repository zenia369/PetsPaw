import { useCallback, useLayoutEffect, useState } from "react";

import IReaction, { IReactionAction, IReactionType } from "../models/IReaction";

import { currentTime } from "../helpers/getDate";
import { getItemLS, setItemLS } from "../helpers/localStorage";

const LOGS_KEY = "PETS_PAW_USER_REACTION_LOGS";

const getLogsFromLS = () => {
  try {
    return getItemLS<IReaction[]>(LOGS_KEY);
  } catch (error) {
    return [];
  }
};

export default () => {
  const [logs, setLogs] = useState<IReaction[]>(getLogsFromLS);

  const addLog = (type: IReactionType, action: IReactionAction, id: string) => {
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
