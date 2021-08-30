import { useContext } from 'react';
import NotificationContext from  "../contexts/notification/notificationContext";

const useNotication = () => useContext(NotificationContext);

export default useNotication;
