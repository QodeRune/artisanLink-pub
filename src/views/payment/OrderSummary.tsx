// src/views/payment/OrderSummary.tsx
import type { FC } from "react"

export const OrderSummary: FC<{
  currency?: string
  totalCost?: string | number
  price?: string | number
  discount?: string | number
  quantity: string | number
}> = ({ currency = "usd", totalCost = 90, price = 100, discount = 10, quantity = 1 }) => {
  return (
    <>
      <div className="order-summary-section">
        <h2>Order summary</h2>
        <ul className="summary-list">
          <li className="summary-list-item">{quantity} item(s)</li>
          <li className="summary-list-item">${price}</li>
        </ul>
        <ul className="summary-list">
          <li className="summary-list-item">
            <strong>Discount</strong>
          </li>
          <li className="summary-list-item">
            <strong>${discount}</strong>
          </li>
        </ul>
      </div>{" "}
      <ul className="summary-list total-section">
        <li className="summary-list-item">
          <strong>Total</strong>
        </li>
        <li className="summary-list-item">
          <strong>{`${currency.toUpperCase()} ${totalCost}`}</strong>
        </li>
      </ul>
    </>
  )
}
