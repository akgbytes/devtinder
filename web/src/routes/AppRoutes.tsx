import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import CompleteProfile from "@/pages/CompleteProfile/index";
import Register from "@/pages/Register";
import { useLazyGetUserProfileQuery } from "@/services/userApi";
import { useAppDispatch } from "@/store/hooks";
import { clearUser, setUser } from "@/store/slices/authSlice";
import { tryCatch } from "@/utils/try-catch";
import { useEffect } from "react";
import { Routes, Route } from "react-router";

const AppRoutes = () => {
  // const [getUser, { isLoading }] = useLazyGetUserProfileQuery();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const { data, error } = await tryCatch(getUser().unwrap());
  //     if (error) {
  //       dispatch(clearUser());
  //     }
  //     if (data) {
  //       console.log("data got: ", data);
  //       dispatch(setUser(data.data));
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading application...</div>;
  // }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/app/onboarding" element={<CompleteProfile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
