import { useContext } from "react";
import MailContext from "../contexts/mail/mailContext";

const useMail = () => useContext(MailContext);

export default useMail;
