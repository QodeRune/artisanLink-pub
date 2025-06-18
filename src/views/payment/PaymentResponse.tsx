// src/views/payment/PaymentResponse.tsx
import { type FC } from "react"
import { ErrorIcon, SuccessIcon } from "@/components"
import { ProductDetails } from "./ProductDetails"

type PaymentResponseProps = {
  status: "success" | "error"
  onProceed: () => void
}

export const PaymentResponse: FC<PaymentResponseProps> = ({ status, onProceed }) => (
  <div className="payment-response">
    <ProductDetails />
    {status === "success" ? <SuccessIcon /> : <ErrorIcon />}
    <button type="button" className="form_input submit_button" onClick={onProceed}>
      {status === "success" ? "Proceed" : "Go To Invoice"}
    </button>
  </div>
)
