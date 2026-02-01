import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// const ProtectedRoute = () => {
//   const { user } = useSelector((store) => store.auth);

//   // if user exists, allow access, else redirect to login
//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

const ProtectedRoute = () => {
  const { user, loading } = useSelector((store) => store.auth);

  if (loading) return null; // or spinner

  return user ? <Outlet /> : <Navigate to="/login" />;
};


export default ProtectedRoute;
