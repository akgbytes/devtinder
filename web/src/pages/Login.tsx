// import { Card } from "@/components/ui/card";
// import { useLoginMutation } from "@/services/authApi";
// import { useAppDispatch } from "@/store/hooks";
// import { setUser } from "@/store/slices/authSlice";
// import { handleApiError } from "@/utils/error";
// import { tryCatch } from "@/utils/try-catch";
// import { useSnackbar } from "notistack";
// import { useState } from "react";
// import { useNavigate } from "react-router";

// const Login = () => {
//   const [email, setEmail] = useState("aman@gmail.com");
//   const [password, setPassword] = useState("123456");

//   const { enqueueSnackbar } = useSnackbar();

//   const navigate = useNavigate();
//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useAppDispatch();

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const { data, error } = await tryCatch(login({ email, password }).unwrap());

//     if (error) {
//       handleApiError(error);
//       return;
//     }

//     if (data) {
//       enqueueSnackbar(data.message, { variant: "success" });
//       dispatch(setUser(data.data));
//       navigate("/");
//     }
//   };

//   return (
//     <Card className="bg-card p-5">
//       <CardHeader className="flex flex-col justify-center">
//         <h2 className="text-xl font-bold">Welcome Back</h2>
//         <p className="text-sm">Please sign in to continue</p>
//       </CardHeader>
//       <CardBody>
//         <Form
//           className="w-full justify-center items-center space-y-4"
//           onSubmit={onSubmit}
//         >
//           <div className="flex flex-col gap-4 w-full">
//             <Input
//               variant="bordered"
//               isRequired
//               errorMessage={({ validationDetails }) => {
//                 if (validationDetails.valueMissing) {
//                   return "Please enter your email";
//                 }
//                 if (validationDetails.typeMismatch) {
//                   return "Please enter a valid email address";
//                 }
//               }}
//               label="Email"
//               labelPlacement="outside"
//               name="email"
//               placeholder="Enter your email"
//               type="email"
//               value={email}
//               onValueChange={setEmail}
//             />

//             <Input
//               variant="bordered"
//               isRequired
//               errorMessage="Please enter your password"
//               label="Password"
//               labelPlacement="outside"
//               name="password"
//               placeholder="Enter your password"
//               type="password"
//               value={password}
//               onValueChange={setPassword}
//             />

//             <Button
//               className="w-full"
//               color="primary"
//               type="submit"
//               isLoading={isLoading}
//             >
//               Log in
//             </Button>
//           </div>
//         </Form>
//       </CardBody>
//       <CardFooter className="flex justify-center">
//         <div className="text-center text-sm">
//           <span className="text-zinc-400">Don't have an account? </span>
//           <Link
//             to="/register"
//             className="hover:underline hover:text-primary text-zinc-200 font-medium transition-colors duration-200"
//           >
//             Sign up
//           </Link>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Login;
