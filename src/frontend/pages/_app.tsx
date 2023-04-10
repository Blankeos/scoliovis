import type { AppProps } from "next/app";
import NextHead from "next/head";
import Head from "components/Head";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// CSS
import "styles/nprogress.css";
import "styles/animated-bg-styles.css";
import "../styles/globals.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-toward-subtle.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/animations/scale-extreme.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <>
      <NextHead>
        <link
          rel="apple-touch-icon"
          // sizes="57x57"
          href="/apple-touch-icon.png"
        />
        {/* <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png" 
        /> */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        {/* <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        /> */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        {/* <meta name="msapplication-TileColor" content="#ffffff" /> */}
        {/* <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" /> */}
        <meta name="theme-color" content="#0073f5" />
      </NextHead>
      <Head />
      <Component {...pageProps} />
      <Toaster containerClassName="text-sm" />
    </>
  );
}

export default MyApp;
