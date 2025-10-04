import Navbar from "@/components/Navbar";
import { Button } from "@heroui/react";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <h1>Home</h1>
      <Button variant="solid" color="danger">
        Danger
      </Button>
    </div>
  );
};

export default Home;
