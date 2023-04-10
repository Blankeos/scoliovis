import { MetaHeadEmbed } from "@phntms/react-share";
import React from "react";
import NextHead from "next/head";

interface HeadProps {
  pageTitle?: string;
  siteTitle?: string;
  description?: string;
  pagePath?: string;
  imageUrl?: string;
  imageAlt?: string;
  keywords?: string[];
  overrideTitle?: string;
}
const Head: React.FC<HeadProps> = ({
  overrideTitle = undefined,
  pageTitle = "Home",
  siteTitle = "ScolioVis",
  pagePath = "",
  description = "ScolioVis is a tool for automatically measuring the Cobb Angle—the standard measurement to assess Scoliosis.",
  imageUrl = "assets/image-meta.png",
  imageAlt = "image meta",
  keywords = ["scoliosis", "cobb angle", "computer vision", "segmentation"],
}) => {
  return (
    <MetaHeadEmbed
      render={(meta: React.ReactNode) => <NextHead>{meta}</NextHead>}
      siteTitle={siteTitle}
      pageTitle={pageTitle}
      titleTemplate={overrideTitle || "[pageTitle] | [siteTitle]"}
      description={description}
      baseSiteUrl=""
      pagePath={pagePath}
      keywords={keywords}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      twitter={{
        cardSize: "large",
        siteUsername: "@carlo_taleon",
        creatorUsername: "@carlo_taleon",
      }}
    />
  );
};

export default Head;
