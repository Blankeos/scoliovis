import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { animateScroll as scroll } from "react-scroll";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="relative z-50">
      <div className="fluid-container py-7 px-9 w-full overflow-hidden">
        <div className="flex justify-between gap-x-8">
          {router.pathname === "/" ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                scroll.scrollToTop();
              }}
              className="text-2xl text-primary cursor-pointer"
            >
              <span className="font-black">Scolio</span>Vis
            </a>
          ) : (
            <Link href="/">
              <a className="cursor-pointer">
                <h1 className="text-2xl text-primary">
                  <span className="font-black">Scolio</span>Vis
                </h1>
              </a>
            </Link>
          )}
          <ul className="flex gap-x-8 overflow-hidden">
            <li>
              <NavLink name="About" href="/about" />
            </li>
            <li>
              <NavLink name="Paper" href="/paper" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

interface NavLink {
  name: string;
  href: string;
}

const NavLink: React.FC<NavLink> = ({ name, href }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`
      ${
        router.pathname === href ? "text-primary" : "text-gray-500"
      } text-sm transition hover:text-primary`}
      >
        {name}
      </a>
    </Link>
  );
};
export default Nav;
