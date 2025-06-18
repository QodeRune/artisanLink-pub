// src/views/payment/PaymentError.tsx
import type { FC } from "react"
import { useNavigate } from "react-router-dom"

export const PaymentError: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="payment-feedback error">
      <svg className="icon error-icon" viewBox="0 0 24 24">
        <path d="M6 6L18 18M6 18L18 6" stroke="red" strokeWidth="2" fill="none" />
      </svg>
      <h2>Payment Failed</h2>
      <p>Something went wrong. Please try again.</p>
      <button onClick={() => navigate("/onboarding/payment")}>Try Again</button>
    </div>
  )
}
