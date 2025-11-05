import { useLoginMutation } from "@/services/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { handleApiError } from "@/utils/error";
import { tryCatch } from "@/utils/try-catch";
import { useSnackbar } from "notistack";
import type { User } from "@/types/user";

import { useState } from "react";
import { Link, useNavigate } from "react-router";

import VerifyEmailDialog from "@/components/VerifyEmailDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/validations";

import { IconEye, IconEyeClosed } from "@tabler/icons-react";

const Login = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const [login, { isLoading, data: userData }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: LoginFormValues) => {
    const { data, error } = await tryCatch(login(values).unwrap());
    console.log("data from login: ", data);

    if (error) {
      handleApiError(error);
      return;
    }

    if (data) {
      if (!data.data.isEmailVerified) {
        enqueueSnackbar(data.message, { variant: "info" });
        setOpenEmailDialog(true);
        return;
      }

      if (!data.data.onboardingCompleted) {
        enqueueSnackbar(data.message, { variant: "info" });
        navigate(`/onboarding?name=${data.data.name}&email=${data.data.email}`);
        return;
      }

      enqueueSnackbar(data.message, { variant: "success" });
      dispatch(setUser(data.data as User));
      navigate("/");
    }
  };

  return (
    <>
      <Card className="rounded-xl px-2 py-4 sm:px-6">
        <CardHeader className="text-center gap-0">
          <CardTitle>
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          </CardTitle>
          <CardDescription>
            <p className="text-muted-foreground text-sm pt-1">
              Sign in to connect with your fellow devs
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
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              className="pr-10"
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                            >
                              <TooltipProvider
                                delayDuration={100}
                                skipDelayDuration={0}
                              >
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    {showPassword ? (
                                      <IconEyeClosed className="size-5" />
                                    ) : (
                                      <IconEye className="size-5" />
                                    )}
                                  </TooltipTrigger>
                                  <TooltipContent className="text-xs px-2 py-1 rounded-md">
                                    <p>
                                      {showPassword
                                        ? "Hide password"
                                        : "Show password"}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  size="sm"
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              New to Devtinder?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <VerifyEmailDialog
        user={userData?.data}
        isOpen={openEmailDialog}
        onOpenChange={setOpenEmailDialog}
      />
    </>
  );
};

export default Login;
