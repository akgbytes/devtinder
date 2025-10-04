import { useState } from "react";
import { Form, Input, Button, Card, CardHeader, CardBody } from "@heroui/react";
import { useLoginMutation } from "@/services/authApi";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";
import { useNavigate } from "react-router";
import { customToast } from "@/utils/customToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await tryCatch(login({ email, password }).unwrap());

    if (error) {
      handleApiError(error);
      return;
    }

    if (data) {
      customToast(data.message, "success");

      navigate("/");
      console.log("success :", data);
    }
  };

  return (
    <Card className="bg-transparent p-6">
      <CardHeader className="flex justify-center text-2xl font-bold">
        Log in to your account
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
    </Card>
  );
}
