import { useContext } from "react";
import StoreContext from "../contexts/store/storeContext";

const useStore = () => useContext(StoreContext);

export default useStore;
