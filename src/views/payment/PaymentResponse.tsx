// src/views/payment/PaymentResponse.tsx
import { type FC } from "react"
import { ErrorIcon, SuccessIcon } from "@/components"
import { OrderSummary } from "@/views/payment/OrderSummary"
import { KPaymentStatus, type TPaymentStatus } from "@/types"

type PaymentResponseProps = {
  status: TPaymentStatus
  onProceed: () => void
}

export const PaymentResponse: FC<PaymentResponseProps> = ({ status, onProceed }) => (
  <div className="payment-response">
    <OrderSummary />
    {status === KPaymentStatus.success ? <SuccessIcon /> : <ErrorIcon />}
    <button type="button" className="form_input submit_button" onClick={onProceed}>
      {status}
    </button>
  </div>
)
