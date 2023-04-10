import { MutableRefObject, useRef } from "react";
import { useInView } from "framer-motion";

export default function useRefInView(): [MutableRefObject<null>, boolean] {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });
  return [ref, isInView];
}
