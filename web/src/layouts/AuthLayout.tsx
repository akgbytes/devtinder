import AppLogo from "@/components/AppLogo";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col gap-4 w-full max-w-[380px] sm:max-w-[425px]">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <AppLogo />
          <span className="text-2xl">devtinder</span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
