import { useContext } from "react";
import ChartContext from "../contexts/charts/chartContext";

const useChart = () => useContext(ChartContext);

export default useChart;
