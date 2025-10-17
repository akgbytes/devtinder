import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router";
import UserButton from "./UserButton";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <header className="container mx-auto px-8 md:px-18 lg:px-24">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => navigate("/")}>
          <img src="/logo.svg" alt="logo" className="size-5" />
          <h1 className="text-xl font-bold">devtinder</h1>
        </div>

        <div className="flex gap-3">
          {isAuthenticated && <UserButton />}

          {!isAuthenticated && (
            <>
              <Button variant="ghost">Sign in</Button>
              <Button>Get Started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
