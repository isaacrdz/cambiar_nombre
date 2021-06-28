import { useContext } from 'react';
import MakeContext from '../contexts/make/makeContext';

const useMake = () => useContext(MakeContext);

export default useMake;
