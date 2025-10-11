import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

export const useRequiredUser = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    throw new Error("useRequiredUser must be used inside ProtectedRoutes");
  }

  return user;
};
