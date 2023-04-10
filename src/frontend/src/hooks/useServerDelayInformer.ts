import React, { useState } from "react";

const MS_WAIT_TIME_BEFORE_INFORMING = 5000;

type ServerDelayInformer = {
  delayInformerIsVisible: boolean;
  start: () => void;
  cancel: () => void;
};
type UseServerDelayInformer = () => ServerDelayInformer;

const useServerDelayInformer: UseServerDelayInformer = () => {
  const [timeoutID, setTimeoutID] = useState<number>();
  const [delayInformerIsVisible, setDelayInformerIsVisible] =
    useState<boolean>(false);

  function start() {
    clearTimeout(timeoutID);
    setDelayInformerIsVisible(false);
    const a = window.setTimeout(() => {
      setDelayInformerIsVisible(true);
    }, MS_WAIT_TIME_BEFORE_INFORMING);
    setTimeoutID(a);
  }

  function cancel() {
    window.clearTimeout(timeoutID);
    setDelayInformerIsVisible(false);
  }

  return { delayInformerIsVisible, start, cancel };
};

export default useServerDelayInformer;
