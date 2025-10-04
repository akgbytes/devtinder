import { useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Card>
      <CardHeader className="">Log in to your account</CardHeader>
      <CardBody>
        <Form
          className="w-full justify-center items-center space-y-4"
          validationErrors={errors}
          onReset={() => setSubmitted(null)}
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-4 max-w-md">
            <Input
              isRequired
              errorMessage="Please enter your first name"
              label="First name"
              labelPlacement="outside"
              name="firstname"
              placeholder="Enter your first name"
              type="text"
              value={firstname}
              onValueChange={setFirstname}
            />

            <Input
              isRequired
              errorMessage="Please enter your last name"
              label="Last name"
              labelPlacement="outside"
              name="lastname"
              placeholder="Enter your last name"
              type="text"
              value={lastname}
              onValueChange={setLastname}
            />

            <Input
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
            <div className="flex">
              <Checkbox
                isRequired
                classNames={{
                  label: "text-small",
                }}
                name="terms"
                validationBehavior="aria"
                value="true"
                onValueChange={() =>
                  setErrors((prev) => ({ ...prev, terms: undefined }))
                }
              />

              <div className="text-balance text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <span className="hover:text-primary hover:underline">
                  Terms of service
                </span>{" "}
                and{" "}
                <span className="hover:text-primary hover:underline">
                  Privacy Policy
                </span>
                .
              </div>
            </div>

            <Button className="w-full" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
