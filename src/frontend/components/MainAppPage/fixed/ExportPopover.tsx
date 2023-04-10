import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import toast from "react-hot-toast";

import ScolioVisDocument from "../ScolioVisDocument";

//#region Animations
import { motion } from "framer-motion";
import {
  exportItemTextVariants,
  exportItemVariants,
} from "@/animations/exportAnimationVariants";
//#endregion

//#region Icons
import { TiExport as ExportIcon } from "react-icons/ti";
import {
  BsFileEarmarkImage as ImageIcon,
  BsFileEarmarkPdfFill as PDFIcon,
} from "react-icons/bs";
import { AiOutlineFileJpg as JPGIcon } from "react-icons/ai";
import { MdPrint as PrintIcon } from "react-icons/md";
import { Document, Page, usePDF } from "@react-pdf/renderer";
import useForceUpdate from "@/hooks/useForceUpdate";
import { useStore } from "store";
import { debounce } from "lodash";
//#endregion

//#region Types
type ExportTag = "PDF" | "JPG" | "PNG" | "Print";
type ExportItem = {
  exportTag: ExportTag;
  onClick?: () => void;
};
const EXPORT_ICONS: { [Property in ExportTag]: JSX.Element } = {
  JPG: <JPGIcon size="1.2rem" />,
  PDF: <PDFIcon size="1.2rem" />,
  PNG: <ImageIcon size="1.2rem" />,
  Print: <PrintIcon size="1.2rem" />,
};
interface IExportPopoverProps {
  // exportItems?: ExportItem[];
}
//#endregion Types

const ExportPopover: React.FC<IExportPopoverProps> = ({}) => {
  const [toastId, setToastId] = useState<string>("");
  const PDF_TOASTID = "PDF_TOAST";

  const [pdfDownloadIsAvailable, setPDFDownloadIsAvailable] =
    useState<boolean>(false);
  // setCanvasURL can be used to regenerate the PDF.
  const [canvasURL, setCanvasURL] = useState<string>(
    "http://localhost:3000/example_images/1.jpg"
  );
  const scolioVisAPIResponse = useStore((state) => state.scoliovisAPIResponse);
  const drawSettings = useStore((state) => state.drawSettings);
  const [instance, update] = usePDF({
    document: (
      <ScolioVisDocument
        imageSrc={canvasURL}
        scolioVisAPIResponse={scolioVisAPIResponse}
      />
    ),
  });

  useEffect(() => {
    refetchCanvasURL();
  }, []);

  useEffect(() => {
    if (scolioVisAPIResponse) update();
  }, [canvasURL]);

  useEffect(() => {
    if (instance.loading === false && scolioVisAPIResponse) {
      toast.success("Generated PDF Successfully!", {
        id: PDF_TOASTID,
      });
      setPDFDownloadIsAvailable(true);
    }
  }, [instance.loading]);

  useEffect(() => {
    if (pdfDownloadIsAvailable && instance.url) downloadPDF(instance.url);
  }, [pdfDownloadIsAvailable]);

  // Everytime draw settings changes, prevent PDF Download (Opt for regenerate)
  useEffect(() => {
    if (pdfDownloadIsAvailable) {
      setPDFDownloadIsAvailable(false);
    }
  }, [drawSettings]);

  //#region Helpers
  async function downloadingPromise(ms?: number) {
    await new Promise((resolve) => setTimeout(resolve, ms || 600));
  }

  function refetchCanvasURL() {
    const canvas: HTMLCanvasElement = document.getElementById(
      "image-canvas"
    ) as HTMLCanvasElement;
    setCanvasURL(canvas.toDataURL(`image/png`, 1));
  }

  function handleDownloadImage(imageType: "png" | "jpeg") {
    // Return a function so you don't need to () => {handleDownloadImage(imageType) for onClick}
    return () => {
      // 1. Generate Date
      const date = new Date(Date.now());
      const monthDay = date
        .toLocaleString("en-us", {
          month: "long",
          day: "numeric",
        })
        .replaceAll(" ", "");
      const time = date
        .toLocaleTimeString("en-us", {
          hour12: false,
          hour: "numeric",
          minute: "numeric",
        })
        .replaceAll(":", "");

      // 2. Generate Link Element and Get Canvas Element
      const imageLink = document.createElement("a");
      const canvas: HTMLCanvasElement = document.getElementById(
        "image-canvas"
      ) as HTMLCanvasElement;
      toast.promise(downloadingPromise(), {
        success: (
          <span>
            Exported <b>.{imageType}</b>
          </span>
        ),
        loading: "Exporting...",
        error: "Failed to download",
      });

      // 3. Make Link Element Downloadable and Click
      imageLink.download = `ScolioVisResult_${monthDay}_${time}.${imageType}`;
      imageLink.href = canvas.toDataURL(`image/${imageType}`, 1);
      imageLink.click();
    };
  }

  function downloadPDF(blobURL: string) {
    const pdfLink = document.createElement("a");
    pdfLink.setAttribute("target", "_blank");
    pdfLink.href = blobURL;
    pdfLink.click();
  }

  //#endregion

  const exportItems: ExportItem[] = [
    // { exportTag: "PDF", onClick: handlePDF },
    { exportTag: "JPG", onClick: handleDownloadImage("jpeg") },
    { exportTag: "PNG", onClick: handleDownloadImage("png") },
    // { exportTag: "Print", onClick: handlePrint },
  ];

  return (
    <>
      <Tippy
        appendTo={document.body}
        interactive={true}
        theme="transparent"
        trigger="click"
        animation="shift-away-subtle"
        placement="left"
        duration={100}
        popperOptions={{
          modifiers: [
            {
              name: "flip",
              options: {
                fallbackPlacements: ["left", "right", "bottom"],
              },
            },
          ],
        }}
        offset={[0, 20]}
        content={
          <div className="relative z-20 shadow rounded-full bg-white text-primary h-12 flex items-center gap-x-5 px-5 border">
            <ExportItemButton
              exportTag="PDF"
              onClick={() => {
                if (pdfDownloadIsAvailable) {
                  toast.success("Downloading PDF", { id: PDF_TOASTID });
                  if (instance.url) downloadPDF(instance.url);
                  return;
                }
                if (!pdfDownloadIsAvailable) {
                  refetchCanvasURL();
                  toast.loading("Generating PDF", { id: PDF_TOASTID });
                }
              }}
            />
            {exportItems &&
              exportItems.map((eI, i) => (
                <ExportItemButton
                  key={i}
                  exportTag={eI.exportTag}
                  onClick={eI.onClick}
                />
              ))}
          </div>
        }
      >
        {/* Export Button */}
        <button className="rounded-lg bg-primary text-white px-5 h-12 flex items-center gap-x-3 text-sm font-semibold">
          <ExportIcon size="1.2rem" />
          <span>Export</span>
        </button>
      </Tippy>
    </>
  );
};

export default ExportPopover;

// Components

interface IExportItemButtonProps {
  exportTag: ExportTag;
  onClick?: () => any;
  disabled?: boolean;
}
export const ExportItemButton: React.FC<IExportItemButtonProps> = ({
  exportTag,
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <Tippy
      theme="transparent"
      placement="top"
      animation="shift-away-subtle"
      content={<span className="text-xs">as {exportTag}</span>}
    >
      <motion.button
        initial="rest"
        whileHover="hover"
        className="hover:bg-blue-100 rounded-full h-9 w-9 grid place-items-center group disabled:opacity-50"
        onClick={onClick}
        disabled={disabled}
      >
        <motion.span variants={exportItemVariants}>
          {EXPORT_ICONS[exportTag]}
        </motion.span>
      </motion.button>
    </Tippy>
  );
};
