import { useContext } from "react";
import CompanyContext from "../contexts/company/companyContext";

const useCompany = () => useContext(CompanyContext);

export default useCompany;
