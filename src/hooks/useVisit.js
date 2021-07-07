import { useContext } from 'react';
import VisitContext from '../contexts/visit/visitContext';

const useVisit = () => useContext(VisitContext);

export default useVisit;
