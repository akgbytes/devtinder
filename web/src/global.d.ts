interface RazorpayOptions {
  key: string;
  amount: string | number;
  currency: string;
  name?: string;
  description?: string;
  image?: string;
  order_id?: string;
  callback_url?: string;
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler?: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
  on(event: string, callback: (...args: any[]) => void): void;
  close(): void;
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
