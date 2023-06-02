import { useContext } from "react";
import AppointmentContext from "../contexts/appointment/appointmentContext";

const useAppointment = () => useContext(AppointmentContext);

export default useAppointment;
