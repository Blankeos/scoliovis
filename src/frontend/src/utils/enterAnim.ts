export default function enterAnim(delay?: number, inView?: boolean) {
  delay = delay || 0;
  if (inView === undefined) inView = true;

  return {
    initial: { opacity: 0, y: 40 },
    animate: inView ? { y: 0, opacity: 1 } : undefined,
    transition: { type: "spring", delay: delay },
  };
}
