import { useCallback, useEffect, useReducer } from "react";

const useForceUpdate = (callback: () => any) => {
  const [state, updater] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    callback && callback();
  }, [state]);

  return useCallback(() => {
    updater();
  }, []);
};

export default useForceUpdate;
