import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="">
      <h1>Landing Page</h1>
      <Link className="text-primary" to={"/login"}>
        Login
      </Link>
    </div>
  );
};

export default Landing;
