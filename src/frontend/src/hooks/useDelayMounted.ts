import React, { useEffect, useState } from "react";

const useDelayMounted = (mountAfter: number) => {
  const [canMount, setCanMount] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setCanMount(true);
    }, mountAfter);
  });
  return canMount;
};

export default useDelayMounted;
