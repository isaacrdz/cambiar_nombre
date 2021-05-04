import { useContext } from "react";
import LeadContext from "../contexts/lead/leadContext";

const useLead = () => useContext(LeadContext);

export default useLead;
