import ReactPDF, { usePDF as usePDFOriginal } from "@react-pdf/renderer";
import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type usePDFReturnType = [
  ReactPDF.UsePDFInstance | undefined,
  () => void,
  JSX.Element
];

export default function usePDF(
  document: ReactElement<
    ReactPDF.DocumentProps,
    string | JSXElementConstructor<any>
  >
): usePDFReturnType {
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const [instance, setInstance] = useState<ReactPDF.UsePDFInstance>();

  function updateInstance() {
    setIsTriggered(!isTriggered);
  }

  const PDFStateHolderComponent = isTriggered ? (
    <PDFStateHolder document={document} setInstance={setInstance} />
  ) : (
    <PDFStateHolder document={document} setInstance={setInstance} />
  );

  return [instance, updateInstance, PDFStateHolderComponent];
}

interface IPDFStateHolderProps {
  document: ReactElement<
    ReactPDF.DocumentProps,
    string | JSXElementConstructor<any>
  >;
  setInstance: Dispatch<SetStateAction<ReactPDF.UsePDFInstance | undefined>>;
}
const PDFStateHolder: React.FC<IPDFStateHolderProps> = ({
  document,
  setInstance,
}) => {
  const [instance, updateInstance] = usePDFOriginal({ document });

  setInstance(instance);
  return <></>;
};
