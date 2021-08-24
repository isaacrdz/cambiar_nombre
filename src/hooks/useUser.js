import { useContext } from "react";
import UserContext from "../contexts/user/userContext";

const useUser = () => useContext(UserContext);

export default useUser;
