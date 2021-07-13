import { useContext } from "react";
import ListContext from "../contexts/list/listContext";

const useList = () => useContext(ListContext);

export default useList;
