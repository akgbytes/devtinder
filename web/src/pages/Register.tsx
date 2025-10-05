import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";
import { useRegisterMutation } from "@/services/authApi";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";
import { Link, useNavigate } from "react-router";
import { toast } from "@/utils/toast";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("aman@gmail.com");
  const [password, setPassword] = useState("123456");

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await tryCatch(
      register({ firstname, lastname, email, password }).unwrap()
    );

    if (error) {
      handleApiError(error);
      return;
    }

    if (data) {
      toast(data.message, "success");
      dispatch(setUser(data.data));
      navigate("/");
      console.log("success :", data);
    }
  };

  return (
    <Card className="bg-transparent p-6">
      <CardHeader className="flex flex-col justify-center">
        <h2 className="text-xl font-bold">Create Account</h2>
        <p className="text-sm">Please fill in the details to get started</p>
      </CardHeader>
      <CardBody>
        <Form
          className="w-full justify-center items-center space-y-4"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-4 w-full">
            <Input
              variant="bordered"
              isRequired
              errorMessage="Please enter your first name"
              label="First Name"
              labelPlacement="outside"
              name="firstName"
              placeholder="Enter your first name"
              type="text"
              value={firstname}
              onValueChange={setFirstname}
            />

            <Input
              variant="bordered"
              isRequired
              errorMessage="Please enter your last name"
              label="Last Name"
              labelPlacement="outside"
              name="lastName"
              placeholder="Enter your last name"
              type="text"
              value={lastname}
              onValueChange={setLastname}
            />

            <Input
              variant="bordered"
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your email";
                }
                if (validationDetails.typeMismatch) {
                  return "Please enter a valid email address";
                }
              }}
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onValueChange={setEmail}
            />

            <Input
              variant="bordered"
              isRequired
              errorMessage="Please enter your password"
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onValueChange={setPassword}
            />

            <Button
              className="w-full"
              color="primary"
              type="submit"
              isLoading={isLoading}
            >
              Log in
            </Button>
          </div>
        </Form>
      </CardBody>
      <CardFooter className="flex justify-center">
        <div className="text-center text-sm">
          <span className="text-zinc-400">Already have an account? </span>
          <Link
            to="/login"
            className="hover:underline hover:text-primary transition-colors duration-200 text-zinc-200 font-medium"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Register;
