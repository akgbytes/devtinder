import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { Routes, Route } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
