import { useContext } from 'react';
import ActivityContext from  "../contexts/activity/activityContext";

const useActivity = () => useContext(ActivityContext);

export default useActivity;
