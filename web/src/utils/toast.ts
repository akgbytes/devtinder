import { addToast, type ToastProps } from "@heroui/react";

type ToastType = "success" | "error" | "info" | "default" | "warning";

type ToastOptions = {
  severity: ToastProps["severity"];
  color: ToastProps["color"];
  classNames: ToastProps["classNames"];
};

export const toast = (message: string, toastType: ToastType) => {
  let toastOptions: ToastOptions;

  switch (toastType) {
    case "default":
      {
        toastOptions = {
          severity: "default",
          color: "default",
          classNames: {
            base: "bg-default text-zinc-50",
            title: "text-zinc-50",
          },
        };
      }
      break;

    case "info":
      {
        toastOptions = {
          severity: "primary",
          color: "primary",
          classNames: {
            base: "bg-info text-zinc-50",
            title: "text-zinc-50",
          },
        };
      }
      break;

    case "success":
      {
        toastOptions = {
          severity: "success",
          color: "success",
          classNames: {
            base: "bg-success text-zinc-50",
            title: "text-zinc-50",
          },
        };
      }
      break;

    case "warning":
      {
        toastOptions = {
          severity: "warning",
          color: "warning",
          classNames: {
            base: "bg-warning text-zinc-50",
            title: "text-zinc-50",
          },
        };
      }
      break;

    case "error": {
      toastOptions = {
        severity: "danger",
        color: "danger",
        classNames: {
          base: "bg-danger text-zinc-50",
          title: "text-zinc-50",
        },
      };
    }
  }

  addToast({
    title: message,
    ...toastOptions,
    timeout: 2000,
    hideCloseButton: true,
  });
};
