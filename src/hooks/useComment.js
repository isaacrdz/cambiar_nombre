import { useContext } from 'react';
import CommentContext from '../contexts/comment/commentContext';

const useComment = () => useContext(CommentContext);

export default useComment;
