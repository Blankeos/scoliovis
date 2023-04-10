import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Link,
} from "@react-pdf/renderer";
import getMaxCobbAngle from "@/utils/cobbAngle/getMaxCobbAngle";

// Register font
Font.register({ family: "Manrope", src: "/fonts/Manrope-VariableFont.ttf" });

Font.register({
  family: "Manrope",
  fonts: [
    { src: "/fonts/Manrope-Light.ttf", fontWeight: 400 }, // font-style: normal, font-weight: normal
    { src: "/fonts/Manrope-Regular.ttf", fontWeight: 500 },
    { src: "/fonts/Manrope-Bold.ttf", fontWeight: 600 },
  ],
});

// Create styles
// Variables
const colors = {
  white: "#FFFFFF",
  primary: "#0073f5",
  lightGray: "#4b5563",
  darkGray: "#1f2937",
};
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily: "Manrope",
    fontWeight: 500,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    textAlign: "center",
  },
  paragraph: {
    color: colors.lightGray,
    fontSize: 14,
  },
  boldParagraph: {
    color: colors.darkGray,
    fontWeight: 600,
  },
  resultsSection: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    textAlign: "left",
  },
  imageContainer: {
    maxHeight: 450,
  },
  image: {
    objectFit: "contain",
  },
});

// Create Document Component
interface IScolioVisDocumentProps {
  scolioVisAPIResponse?: ScolioVisAPIResponseType;
  imageSrc: string;
}

const ScolioVisDocument: React.FC<IScolioVisDocumentProps> = ({
  scolioVisAPIResponse,
  imageSrc,
}) => {
  const date = new Date();
  // const max:
  // const { max, value } = getMaxCobbAngle(scolioVisAPIResponse.angles);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ color: colors.primary }}>
            <Text style={{ fontWeight: 600 }}>Scolio</Text>Vis
          </Text>
          <Text style={{ fontSize: 12, color: colors.lightGray }}>
            The Automatic Cobb Angle Measurement Tool powered by AI
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} src={imageSrc} />
        </View>
        {scolioVisAPIResponse ? (
          <>
            <View style={styles.resultsSection}>
              <Text
                style={{ fontWeight: 600, color: "#1f2937", marginBottom: 10 }}
              >
                Results
              </Text>
              <View style={styles.paragraph}>
                <Text>Curve Type: {scolioVisAPIResponse.curve_type}</Text>
                <Text>
                  Proximal Thoracic (PT):{" "}
                  {scolioVisAPIResponse.angles.pt.angle.toFixed(2)}°
                </Text>
                <Text>
                  Main Thoracic (MT):{" "}
                  {scolioVisAPIResponse.angles.mt.angle.toFixed(2)}°
                </Text>
                <Text>
                  Thoracolumbar/Lumbar (TL/L):{" "}
                  {scolioVisAPIResponse.angles.tl.angle.toFixed(2)}°
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.paragraph}>
                The greatest bend is found at{" "}
                {getMaxCobbAngle(scolioVisAPIResponse.angles).max}:{" "}
                {getMaxCobbAngle(scolioVisAPIResponse.angles).value.toFixed(2)}°
                taken from the superior endplate of (
                {scolioVisAPIResponse.angles[
                  getMaxCobbAngle(scolioVisAPIResponse.angles).max
                ].idxs[0] + 1}
                ) and inferior endplate of (
                {scolioVisAPIResponse.angles[
                  getMaxCobbAngle(scolioVisAPIResponse.angles).max
                ].idxs[1] + 1}
                ).
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.section}>
            <Text style={styles.paragraph}>No Results found</Text>
          </View>
        )}

        {/* Footer */}
        <Text
          style={{
            position: "absolute",
            fontSize: 10,
            bottom: 20,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey",
          }}
        >
          Results generated from{" "}
          <Link
            src="https://scoliovis.app/"
            style={{ color: colors.primary, textDecoration: "none" }}
          >
            scoliovis.app
          </Link>{" "}
          on {date.toDateString()}
        </Text>
      </Page>
    </Document>
  );
};

export default ScolioVisDocument;
