import {  Navigate } from "react-router-dom";
import useFirebaseAuth from "../hook/useFirebaseAuth";
import Layout from "../components/views/Layout";

const PrivateRoute = () => {
  const { user, loading } = useFirebaseAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? <>
    <Layout/>
  </>
    : <Navigate to='/signIn' />
};
export default PrivateRoute;