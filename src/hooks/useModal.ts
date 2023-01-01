import { useCallback, useState } from "react";

export default () => {
  const [state, setState] = useState(false);

  const close = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, close];
};
