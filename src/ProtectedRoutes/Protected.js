import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sign_Up from "../components/LoginForm";
// const ProtectedRoute = ({ children }) => {
//   const { user } = useSelector((store) => store.user);
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

const ProtectedRoute = () => {
  const { user } = useSelector((store) => store.user);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
