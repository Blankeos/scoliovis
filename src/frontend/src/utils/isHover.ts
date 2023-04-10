const isHover = (e: HTMLElement) => {
  if (!e) return false;
  if (!e.parentElement) return false;

  return e.parentElement.querySelector(":hover") === e;
};

export default isHover;

// https://stackoverflow.com/questions/14795099/pure-javascript-to-check-if-something-has-hover-without-setting-on-mouseover-ou
