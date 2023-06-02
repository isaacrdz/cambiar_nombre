import { useContext } from "react";
import DocumentContext from "../contexts/document/documentContext";

const useDocument = () => useContext(DocumentContext);

export default useDocument;
