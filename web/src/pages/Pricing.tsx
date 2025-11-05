import { Button } from "@/components/ui/button";
import { useCreateOrderMutation } from "@/services/paymentsApi";
import { CheckIcon } from "lucide-react";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";
import { useSnackbar } from "notistack";
import { RAZORPAY_KEY_ID } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLazyGetUserProfileQuery } from "@/services/usersApi";
import { setUser } from "@/store/slices/authSlice";

const INCLUDED_FEATURES = [
  "Verified blue tick badge",
  "Chat with your connections",
  "Unlimited connection requests per day",
  "Priority profile visibility",
];

const Pricing = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [fetchUser, {}] = useLazyGetUserProfileQuery();
  const navigate = useNavigate();

  const onClick = async () => {
    if (!user) {
      return navigate("/login");
    }

    if (!window.Razorpay) {
      enqueueSnackbar({
        variant: "error",
        message: "Razorpay script is missing",
      });
      return;
    }

    const { data, error } = await tryCatch(createOrder().unwrap());

    if (error) {
      handleApiError(error);
    }

    if (data) {
      enqueueSnackbar({ variant: "success", message: data.message });
      const order = data.data;
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "DevTinder",
        description: "Connect with fellow developers",
        order_id: order.orderId,
        // image: "https://example.com/logo",
        // callback_url: "http://localhost:1769/verify",
        // theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay({
        ...options,
        handler: async (response) => {
          const { data, error } = await tryCatch(fetchUser().unwrap());

          if (error) {
            handleApiError(error);
          }

          if (data) {
            dispatch(setUser(data.data));
            localStorage.setItem("justUpgraded", "true");
          }
        },
      });
      paymentObject.open();
    }
  };

  useEffect(() => {
    if (user?.isPremium && localStorage.getItem("justUpgraded") === "true") {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      enqueueSnackbar({
        variant: "success",
        message: "Welcome to DevTinder Premium 🎉",
      });
      localStorage.removeItem("justUpgraded");
    }
  }, [user]);

  if (user?.isPremium) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center text-white">
        <h2 className="text-4xl font-semibold mb-4">
          🎉 You're already{" "}
          <span className="text-rose-500">a Premium member!</span>
        </h2>
        <p className="text-zinc-400 max-w-md">
          Thanks for supporting DevTinder! You've unlocked all premium features
          like verified badge, unlimited connections, and more.
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
        >
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className=" text-zinc-100">
      <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-zinc-900 ring-1 ring-zinc-800 shadow-2xl sm:mt-20 lg:mx-0 lg:flex lg:max-w-none overflow-hidden">
        <div className="p-8 sm:p-10 lg:flex-auto">
          <h3 className="text-3xl font-heading font-semibold tracking-tight text-white flex items-center gap-2">
            Devtinder <span className="text-rose-500">Premium</span>
          </h3>

          <p className="mt-6 text-base/7 text-zinc-400">
            Unlock the ultimate developer dating experience — verified,
            limitless, and powered by smart matching. One payment, lifetime
            access.
          </p>

          <div className="mt-10 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-rose-400">
              What's included
            </h4>
            <div className="h-px flex-auto bg-zinc-700" />
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-zinc-300 sm:grid-cols-2 sm:gap-6">
            {INCLUDED_FEATURES.map((feature) => (
              <li key={feature} className="flex gap-3 items-start">
                <CheckIcon className="h-5 w-5 flex-none text-rose-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-zinc-800/60 backdrop-blur py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16 ">
            <div className="mx-auto max-w-xs py-8">
              <p className="text-base font-semibold text-zinc-300">
                Pay once. Unlock forever.
              </p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-white">
                  $5
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-zinc-400">
                  USD
                </span>
              </p>

              <Button
                onClick={onClick}
                disabled={isLoading}
                className="mt-6 px-20 bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-[0_0_12px_rgba(236,72,153,0.4)]"
              >
                Get Devtinder Premium
              </Button>

              <p className="mt-6 text-xs leading-5 text-zinc-500">
                Secure one-time payment. Lifetime access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
