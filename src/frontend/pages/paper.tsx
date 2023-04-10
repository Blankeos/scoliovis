import enterAnim from "@/utils/enterAnim";
import Footer from "components/Footer";
import Head from "components/Head";
import Nav from "components/Nav";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { IoWarningOutline as WarningIcon } from "react-icons/io5";

const PaperPage: NextPage = () => {
  const [iframeClass, setIFrameClass] = useState<string>("");
  /** Blurred from document meaning, iframe is currently in focus */
  function handleBlur() {
    setIFrameClass("ring-2");
  }

  /** Focus to document meaning, iframe is currently is blurred */
  function handleFocus() {
    setIFrameClass("");
  }

  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Head pageTitle="Paper" pagePath="paper" />
      <Nav />
      <main className="flex-grow h-full">
        <div className="w-full max-w-xl mx-auto px-9">
          <motion.div
            {...enterAnim()}
            className="relative bg-gradient-to-br from-purple-500 to-primary w-full h-64 rounded-2xl mb-20 overflow-hidden"
          >
            <div
              className="absolute inset-0 grayscale opacity-40"
              style={{
                backgroundImage: `url('https://www.panaynews.net/wp-content/uploads/2018/11/Quezon-Hall-College-of-Arts-and-Sciences-West-Visayas-State-University-e1541958764604.jpg')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </motion.div>
          <motion.h1
            {...enterAnim(0.1)}
            className="text-6xl font-extrabold mb-5"
          >
            Paper
          </motion.h1>
          {/* <div className="flex gap-x-2 gap-y-2 mb-6 flex-wrap">
            <motion.p
              {...enterAnim(0.2)}
              className="items-center bg-green-400 justify-self-start text-gray-700 px-3 py-1 rounded-full text-xs truncate"
            >
              In Evaluation
            </motion.p>
            <motion.p
              {...enterAnim(0.3)}
              className="items-center bg-yellow-400 justify-self-start text-gray-700 px-3 py-1 rounded-full text-xs truncate"
            >
              Status (1/5): <b>Thesis Adviser</b>
            </motion.p>
          </div> */}
          <motion.p {...enterAnim(0.2)} className="text-gray-800">
            Read our complete manuscript for West Visayas State University -
            College of Information and Communications Technology.
          </motion.p>
          <iframe
            {...enterAnim(0.3)}
            className={`transition w-full h-[36rem] ring-primary mt-5 overflow-hidden rounded-xl border border-gray-600 ${iframeClass}`}
            src="/assets/ScolioVis_Manuscript_IN-EVALUATION.pdf"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaperPage;
