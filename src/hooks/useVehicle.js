import { useContext } from "react";
import VehicleContext from "../contexts/vehicle/vehicleContext";

const useVehicle = () => useContext(VehicleContext);

export default useVehicle;
