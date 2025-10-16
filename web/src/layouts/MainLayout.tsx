import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-svh">
      <Navbar />
      <main className="flex-1 container mx-auto px-8 md:px-18 lg:px-24">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
