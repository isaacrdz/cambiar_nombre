import { useContext } from 'react';
import StatusContext from '../contexts/status/statusContext';

const useStatus = () => useContext(StatusContext);

export default useStatus;
