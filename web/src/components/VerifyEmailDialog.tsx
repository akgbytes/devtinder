import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from "@/services/authApi";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { Spinner } from "./ui/spinner";
import type { TemporaryUserResponse } from "@/types/api";

interface VerifyEmailDialogProps {
  user: TemporaryUserResponse | undefined;
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
}

const VerifyEmailDialog = ({
  user,
  isOpen,
  onOpenChange,
}: VerifyEmailDialogProps) => {
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendOtp] = useResendOtpMutation();

  const startCountdown = (seconds: number) => {
    setTimer(seconds);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isOpen) startCountdown(60);
    else setTimer(0);
  }, [isOpen]);

  if (!user) {
    return null;
  }

  const handleResend = async () => {
    const { data, error } = await tryCatch(
      resendOtp({ email: user.email }).unwrap()
    );

    if (error) {
      handleApiError(error);
    }

    if (data) {
      console.log("Response from resend otp \n", data);
      enqueueSnackbar({ variant: "success", message: data.message });
      startCountdown(60);
    }
  };

  const handleVerify = async () => {
    const { data, error } = await tryCatch(
      verifyEmail({ email: user.email, otp }).unwrap()
    );

    if (error) {
      handleApiError(error);
    }

    if (data) {
      console.log("Response from email verify \n", data);
      enqueueSnackbar(data.message, { variant: "success" });
      onOpenChange(false);
      navigate(`/onboarding?name=${user.name}&email=${user.email}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Verify Your Email</DialogTitle>
          <DialogDescription className="text-center">
            Please enter the OTP sent to{" "}
            <span className="font-medium text-foreground/80">{user.email}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            inputMode="numeric"
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex justify-center items-center mb-2 text-sm text-muted-foreground">
          <p className="mr-1">Didn&apos;t receive the OTP?</p>

          {timer > 0 ? (
            <div className="text-foreground">
              Resend in <span className="font-medium">{timer}s</span>
            </div>
          ) : (
            <button
              onClick={handleResend}
              className="text-primary font-medium hover:underline focus:outline-none cursor-pointer"
            >
              Resend OTP
            </button>
          )}
        </div>

        <DialogFooter>
          <Button
            className="w-full cursor-pointer flex items-center justify-center gap-2"
            disabled={isLoading || otp.length !== 6}
            onClick={handleVerify}
          >
            {isLoading ? (
              <>
                <Spinner />
                <span>Please wait...</span>
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailDialog;
