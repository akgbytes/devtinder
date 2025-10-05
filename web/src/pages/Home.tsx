import { Link } from "react-router";

const Home = () => {
  return (
    <div className="">
      <h1>Home</h1>
      <Link className="text-primary" to={"/login"}>
        Login
      </Link>
    </div>
  );
};

export default Home;
