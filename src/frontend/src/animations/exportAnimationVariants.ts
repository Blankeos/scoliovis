import { Variants } from "framer-motion";

export const exportItemVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    rotate: [0, 30, 0],
    scale: [1, 1.08, 1],
    transition: {
      duration: 0.5,
    },
  },
};

export const exportItemTextVariants: Variants = {
  rest: {
    y: -30,
    opacity: 0,
  },
  hover: {
    y: -40,
    opacity: 1,
  },
};
