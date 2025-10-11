import { useLoginMutation } from "@/services/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { handleApiError } from "@/utils/error";
import { tryCatch } from "@/utils/try-catch";
import { useSnackbar } from "notistack";

import { Link, useNavigate } from "react-router";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginSchema, type LoginFormValues } from "@/validations";

const Login = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: LoginFormValues) => {
    const { data, error } = await tryCatch(login(values).unwrap());

    if (error) {
      handleApiError(error);
      return;
    }

    if (data) {
      enqueueSnackbar(data.message, { variant: "success" });
      dispatch(setUser(data.data));
      navigate("/");
    }
  };

  return (
    <Card className="rounded-xl px-2 py-4sm:px-6 sm:py-8">
      <CardHeader className="text-center gap-0">
        <CardTitle>
          <h2 className="text-lg font-bold text-foreground">Welcome back</h2>
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
                        <Input
                          type="password"
                          placeholder="Enter your password"
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
  );
};

export default Login;
