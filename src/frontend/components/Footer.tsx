import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaBone } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="fluid-container px-7 py-20 overflow-hidden">
      <div className="flex flex-col gap-8">
        {/* Footer Nav */}
        <div className="flex place-self-center gap-x-20">
          <Link href="/">
            <a className="text-gray-500 hover:text-primary transition underline">
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className="text-gray-500 hover:text-primary transition underline">
              About
            </a>
          </Link>
          <Link href="/paper">
            <a className="text-gray-500 hover:text-primary transition underline">
              Paper
            </a>
          </Link>
        </div>
        {/* Footer message */}
        <p className="text-gray-900 text-center px-10">
          This is part of an undergraduate research paper by Elizalde, Rubinos,
          and Taleon for West Visayas State University - College of Information
          and Communications Technology.
          <br />
          All Rights Reserved.
        </p>
        {/* Logos */}
        <div className="flex place-self-center gap-x-20">
          <Image
            width={112}
            height={112}
            alt="WVSU CICT Logo"
            src="https://raw.githubusercontent.com/wvsu-cict-code/cict-logo/0985c71c5d6e1c6caac1f04250c7a02f7efb395b/default.svg"
          />
          <Image
            width={112}
            height={112}
            alt="WVSU Logo"
            src="https://raw.githubusercontent.com/wvsu-cict-code/cict-logo/master/wvsu-big-logo.png"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
