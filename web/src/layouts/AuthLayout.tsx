import { AcmeLogo } from "@/components/Navbar";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <AcmeLogo />
          <span className="text-2xl">devtinder</span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
