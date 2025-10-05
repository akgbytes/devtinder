import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router";
import AppLogo from "./AppLogo";
import UserButton from "./UserButton";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <header className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => navigate("/")}>
          <AppLogo className="size-5" />
          <h1 className="text-xl font-bold">devtinder</h1>
        </div>

        <div className="flex gap-2">{isAuthenticated && <UserButton />}</div>
      </div>
    </header>
  );
};

export default Navbar;
