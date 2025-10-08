import { useRegisterMutation } from "@/services/authApi";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema, type RegisterFormValues } from "@/utils/validations";
import { useState } from "react";
import VerifyEmailDialog from "@/components/VerifyEmailDialog";

const Register = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const [register, { isLoading }] = useRegisterMutation();

  const [openEmailDialog, setOpenEmailDialog] = useState(false);

  const onSubmit = async (values: RegisterFormValues) => {
    console.log("values: ", values);
    // const { data, error } = await tryCatch(register(values).unwrap());
    // if (error) {
    //   handleApiError(error);
    //   return;
    // }
    // if (data) {
    //   console.log("Response from register \n", data);
    //   enqueueSnackbar(data.message, { variant: "success" });
    //   setOpenEmailDialog(true);
    // }
  };

  return (
    <>
      <Card className="rounded-xl px-2 py-4sm:px-6 sm:py-8">
        <CardHeader className="text-center gap-0">
          <CardTitle>
            <h2 className="text-lg font-bold text-foreground">
              Create your account
            </h2>
          </CardTitle>
          <CardDescription>
            <p className="text-muted-foreground text-sm pt-1">
              Please fill in the details to get started
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter a strong password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  size="sm"
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      <span className="ml-2">Creating</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <VerifyEmailDialog
        email={form.getValues("email")}
        isOpen={openEmailDialog}
        onOpenChange={setOpenEmailDialog}
      />
    </>
  );
};

export default Register;
