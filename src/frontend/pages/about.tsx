import Footer from "components/Footer";
import Nav from "components/Nav";
import React from "react";
import { motion } from "framer-motion";

import enterAnim from "@/utils/enterAnim";

import Image from "next/image";
import Head from "components/Head";
import useRefInView from "@/hooks/useRefInView";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

const AboutPage = () => {
  const [ref1, inView1] = useRefInView();
  const [ref2, inView2] = useRefInView();

  return (
    <div className="flex flex-col min-h-screen">
      <Head pageTitle="About" pagePath="about" />
      <Nav />
      <main className="flex-grow">
        <div className="w-full max-w-xl mx-auto px-9">
          <motion.div
            {...enterAnim()}
            className="relative bg-gradient-to-br from-purple-500 to-primary w-full h-64 rounded-2xl mb-20 overflow-hidden"
          >
            <div
              className="absolute inset-0 grayscale opacity-40"
              style={{
                backgroundImage: `url('/assets/authors.webp')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </motion.div>
          <motion.h1
            {...enterAnim(0.1)}
            className="text-6xl font-extrabold mb-6"
          >
            About
          </motion.h1>
          <motion.p {...enterAnim(0.2)}>
            <b>ScolioVis</b> is an automatic cobb angle measurement tool
            developed by B.S. in Computer Science students at West Visayas State
            University for their Undergraduate Thesis.
          </motion.p>
          <motion.p {...enterAnim(0.3)} className="mt-1.5">
            The finished product is this web application implementing a Keypoint
            RCNN model that performs multi-instance vertebra keypoint detection
            on spine images in order to extract the Cobb Angles automatically.
            The research is set to be published in early 2023.
          </motion.p>

          <motion.h2
            ref={ref1}
            {...enterAnim(0.3, inView1)}
            className="mt-16 mb-6 text-2xl text-center text-gray-700 font-semibold"
          >
            Authors of ScolioVis
          </motion.h2>
          <div ref={ref2} className="grid grid-cols-2 md:grid-cols-3 gap-x-10">
            <motion.div
              {...enterAnim(0.4, inView2)}
              className="grid grid-rows-2 justify-items-center gap-y-3 col-span-2 md:col-span-1"
            >
              <div className="relative w-[100px] h-[100px] grid place-items-center">
                <div className="absolute w-[80px] h-[80px]  rounded-full bg-gradient-to-br from-purple-400 to-primary shadow-md shadow-blue-400" />
                <Image
                  alt="carlo as apex"
                  src="/assets/apexcarlo.png"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              </div>
              <h3 className="text-gray-700 text-center max-w-[120px]">
                Carlo Antonio T. Taleon
              </h3>
            </motion.div>
            <motion.div
              {...enterAnim(0.6, inView2)}
              className="grid grid-rows-2 justify-items-center gap-y-3"
            >
              <div className="relative w-[100px] h-[100px] grid place-items-center">
                <div className="absolute w-[80px] h-[80px]  rounded-full bg-gradient-to-br from-purple-400 to-primary shadow-md shadow-blue-400" />
                <Image
                  alt="glecy as apex"
                  src="/assets/apexglecy.png"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              </div>
              <h3 className="text-gray-700 text-center max-w-[120px]">
                Glecy S. Elizalde
              </h3>
            </motion.div>
            <motion.div
              {...enterAnim(0.8, inView2)}
              className="grid grid-rows-2 justify-items-center gap-y-3"
            >
              <div className="relative w-[100px] h-[100px] grid place-items-center">
                <div className="absolute w-[80px] h-[80px]  rounded-full bg-gradient-to-br from-purple-400 to-primary shadow-md shadow-blue-400" />
                <Image
                  alt="cj as apex"
                  src="/assets/apexcj.png"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              </div>
              <h3 className="text-gray-700 text-center max-w-[120px]">
                Christopher Joseph T. Rubinos
              </h3>
            </motion.div>
          </div>

          <h2 className="mt-16 mb-6 text-2xl text-center text-gray-700 font-semibold">
            Special Thanks to
          </h2>
          <div className="flex flex-col gap-y-3">
            <p className="text-gray-700 hanging-text">
              <Link href="https://scholar.google.com.ph/citations?user=MbegV1wAAAAJ&hl=en">
                <a
                  target="_blank"
                  className="hover:text-primary cursor-pointer font-semibold"
                >
                  👨‍🏫 Dr. Frank I. Elijorde
                </a>
              </Link>{" "}
              - Our ever-supportive Thesis Adviser.
            </p>
            <p className="text-gray-700 hanging-text">
              <Link href="https://scholar.google.com.ph/citations?user=JNlh9WMAAAAJ&hl=en">
                <a
                  target="_blank"
                  className="hover:text-primary cursor-pointer font-semibold"
                >
                  🤵 Dr. Bobby D. Gerardo
                </a>
              </Link>{" "}
              - Our ever-supportive Thesis Co-Adviser.
            </p>
            <p className="text-gray-700 hanging-text">
              <ScrollLink
                to="shuo-li-ref"
                spy={true}
                smooth={true}
                duration={500}
                className="hover:text-primary cursor-pointer font-semibold"
              >
                👨‍🔬 Dr. Shuo Li
              </ScrollLink>{" "}
              - for giving us access to the{" "}
              <Link href="http://spineweb.digitalimaginggroup.ca/Index.php?n=Main.Datasets#Dataset_16.3A_609_spinal_anterior-posterior_x-ray_images">
                <a className="hover:text-primary cursor-pointer underline">
                  SpineWeb Dataset 16
                </a>
              </Link>
            </p>
            <p className="text-gray-700 hanging-text">
              <Link href="https://scholar.google.com/citations?user=xeoUxA0AAAAJ&hl=en">
                <a
                  target="_blank"
                  className="hover:text-primary cursor-pointer font-semibold"
                >
                  👩‍💼 Dr. Julie Ann Salido
                </a>
              </Link>{" "}
              - for her expertise in computer vision research.
            </p>
            <p className="text-gray-700 hanging-text">
              <Link href="https://www.researchgate.net/profile/Paolo-Hilado-2">
                <a
                  target="_blank"
                  className="hover:text-primary cursor-pointer font-semibold"
                >
                  👨‍💼 Mr. Paolo Hilado
                </a>
              </Link>{" "}
              - for his expertise in data science research.
            </p>
            <p className="text-gray-700 hanging-text">
              <span className="font-semibold">
                👩‍⚕️ Dra. Jocelyn F. Villanueva
              </span>{" "}
              - for her expertise in radiology.
            </p>
            <p className="text-gray-700 hanging-text">
              <span className="font-semibold">👨‍⚕️ Dr. Christopher Barrera</span>{" "}
              - for his expertise in radiology.
            </p>
          </div>

          <h2 className="mt-16 mb-6 text-2xl text-center text-gray-700 font-semibold">
            Important References
          </h2>
          <Link href="http://www.digitalimaginggroup.ca/members/Shuo/MICCAIAutomatic.pdf">
            <a id="shuo-li-ref" target="_blank">
              <blockquote className="hover:shadow-md transition text-gray-700 text-sm bg-gray-100 rounded-xl px-5 py-3">
                Wu, H., Bailey, Chris., Rasoulinejad, Parham., and Li, S., 2017.
                Automatic landmark estimation for adolescent idiopathic
                scoliosis assessment using boostnet. Medical Image Computing and
                Computer Assisted Intervention:127-135.
              </blockquote>
            </a>
          </Link>

          <h2 className="mt-16 mb-6 text-2xl text-center text-gray-700 font-semibold">
            Interested in Collaborating?
          </h2>
          <div className="flex flex-col items-center gap-y-1">
            <div className="max-w-sm text-center">
              <p className="text-gray-700 mb-3">
                Want to help us improve ScolioVis and make this a<br />
                medical-grade app? Contact us at:
              </p>
            </div>
            <a
              href="mailto:carloantonio.taleon@wvsu.edu.ph"
              className="text-center text-white bg-primary rounded-md self-center px-4 py-2.5"
            >
              carloantonio.taleon@wvsu.edu.ph
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
