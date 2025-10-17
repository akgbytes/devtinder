import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const Pricing = () => {
  const INCLUDED_FEATURES = [
    "Verified blue tick badge",
    "Chat with your connections",
    "Unlimited connection requests per day",
    "Priority profile visibility",
  ];

  return (
    <div className=" text-zinc-100 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-4xl sm:text-5xl font-heading font-semibold tracking-tight text-white text-center">
          Level up your <span className="text-rose-500">Devtinder</span>{" "}
          experience
        </h2>
        <p className="mt-6 text-base/7 text-zinc-400 max-w-prose text-center">
          Get verified, chat freely, and connect without limits. Pay once and
          own it forever. No subscriptions. No nonsense.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-zinc-900 ring-1 ring-zinc-800 shadow-2xl sm:mt-20 lg:mx-0 lg:flex lg:max-w-none overflow-hidden">
        <div className="p-8 sm:p-10 lg:flex-auto">
          <h3 className="text-3xl font-heading font-semibold tracking-tight text-white flex items-center gap-2">
            Devtinder <span className="text-rose-500">Pro</span>
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
                  $49
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-zinc-400">
                  USD
                </span>
              </p>

              <Button
                onClick={() => {}}
                className="mt-6 px-20 bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-[0_0_12px_rgba(236,72,153,0.4)]"
              >
                Get Devtinder Pro
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
