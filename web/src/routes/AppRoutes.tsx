import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import CompleteProfile from "@/pages/CompleteProfile/index";
import Register from "@/pages/Register";
import { useLazyGetUserProfileQuery } from "@/services/usersApi";
import { useAppDispatch } from "@/store/hooks";
import { clearUser, setUser } from "@/store/slices/authSlice";
import { tryCatch } from "@/utils/try-catch";
import { useEffect } from "react";
import { Routes, Route } from "react-router";
import Feed from "@/pages/Feed";
import ProtectedRoutes from "./ProtectedRoutes";
import Connections from "@/pages/Connections";
import Requests from "@/pages/Requests";
import AuthRoutes from "./AuthRoutes";
import Pricing from "@/pages/Pricing";

const AppRoutes = () => {
  const [getUser, { isLoading }] = useLazyGetUserProfileQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data, error } = await tryCatch(getUser().unwrap());
      if (error) {
        dispatch(clearUser());
      }
      if (data) {
        console.log("user profile: ", data);
        dispatch(setUser(data.data));
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <div>Loading application...</div>;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Feed />} />
          <Route path="/user/profile" element={<Feed />} />
          <Route path="/user/connections" element={<Connections />} />
          <Route path="/user/requests" element={<Requests />} />
        </Route>
        <Route path="/pricing" element={<Pricing />} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthRoutes />}>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/onboarding" element={<CompleteProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
