import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-gray-200 to-white">
      <h1 className="text-7xl sm:text-9xl font-extrabold text-rose-600">404</h1>

      <p className="text-xl mt-4 mb-6 text-gray-700">
        Oops! The page you are looking for does not exist.
      </p>

      <div className="flex gap-3 justify-center">
        <Button onClick={() => navigate("/")}>Go Home</Button>

        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>

      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="Not Found Illustration"
        className="mt-10 max-w-md w-4/5 rounded-xl shadow-md"
      />
    </div>
  );
};

export default NotFound;
