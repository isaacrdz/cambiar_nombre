import React from "react";
import useAuth from '../../hooks/useAuth';
import DashboardUser from '../../components/Dashboards/DashboardUser'
import DashboardAdmin from '../../components/Dashboards/DashboardAdmin'

const Home = ({navigation}) => {

const { user } = useAuth();
 
if(user && user.role === 'user'){
  return <DashboardUser/>
}else if(user && user.role === 'admin'){
  return <DashboardAdmin/>
}
}

export default Home;
