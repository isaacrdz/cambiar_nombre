import { useContext } from 'react';
import SubstatusContext from '../contexts/substatus/substatusContext';

const useSubstatus = () => useContext(SubstatusContext);

export default useSubstatus;
