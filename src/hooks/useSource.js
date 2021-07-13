import { useContext } from "react";
import SourceContext from "../contexts/source/sourceContext";

const useSource = () => useContext(SourceContext);

export default useSource;
