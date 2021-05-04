import { useContext } from "react";
import AuthContext from "../contexts/auth/authContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
