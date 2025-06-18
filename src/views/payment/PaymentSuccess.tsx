// src/views/payment/PaymentSuccess.tsx
import type { FC } from "react"
import { useNavigate } from "react-router-dom"

export const PaymentSuccess: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="payment-feedback success">
      <svg className="icon success-icon" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5" stroke="green" strokeWidth="2" fill="none" />
      </svg>
      <h2>Payment Successful</h2>
      <p>Your payment was successful. Thank you!</p>
      <button onClick={() => navigate("/onboarding/acceptance-status")}>Proceed</button>
    </div>
  )
}
