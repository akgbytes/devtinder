import { useRegisterMutation } from "@/services/authApi";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";
import { Link } from "react-router";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema, type RegisterFormValues } from "@/validations";
import { useState } from "react";
import VerifyEmailDialog from "@/components/VerifyEmailDialog";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

const Register = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [register, { isLoading, data: tempUser }] = useRegisterMutation();

  const onSubmit = async (values: RegisterFormValues) => {
    const { data, error } = await tryCatch(register(values).unwrap());
    if (error) {
      handleApiError(error);
    }
    if (data) {
      enqueueSnackbar(data.message, { variant: "success" });
      setOpenEmailDialog(true);
    }
  };

  return (
    <>
      <Card className="rounded-xl px-2 py-4sm:px-6 sm:py-8">
        <CardHeader className="text-center gap-0">
          <CardTitle>
            <h2 className="text-2xl font-bold text-foreground">
              Create your account
            </h2>
          </CardTitle>
          <CardDescription>
            <p className="text-muted-foreground text-sm pt-1">
              Fill in your details to join the dev community
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
                      <span>Creating your account...</span>
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
              Already part of Devtinder?{" "}
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
        user={tempUser?.data}
        isOpen={openEmailDialog}
        onOpenChange={setOpenEmailDialog}
      />
    </>
  );
};

export default Register;
