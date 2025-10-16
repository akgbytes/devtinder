import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router";

const AuthRoutes = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoutes;
