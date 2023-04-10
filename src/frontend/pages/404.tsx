import Footer from "components/Footer";
import Nav from "components/Nav";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow grid place-items-center">
        <div className="max-w-md w-full mx-auto px-9">
          <div className="relative flex flex-col items-center">
            <div className="relative left-10">
              <Image
                alt="apex crying"
                src="/assets/apexcrying.png"
                width={250}
                height={250}
                objectFit="contain"
              />
            </div>
            <h1 className="font-black text-8xl text-transparent absolute -bottom-10 drop-shadow-lg bg-gradient-to-br bg-clip-text from-blue-400 to-primary">
              404
            </h1>
          </div>
          <div className="relative flex flex-col items-center gap-y-5">
            <h2 className="mt-16 text-center font-bold text-gray-800 text-3xl">
              Whoops! Are you lost?
            </h2>
            <p className="text-center text-gray-500">
              Either this page doesn&apos;t exist or an error ocurred.
              <br />
              Wrong link perhaps?
            </p>
            <Link href="/">
              <a className="py-5 px-5 bg-primary w-full text-center rounded-2xl text-white hover:shadow-lg">
                Take me back home
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
