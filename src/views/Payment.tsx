// src/views/Payment.tsx
import type { FC } from "react"

export const Payment: FC = () => {
  return (
    <section className="payment">
      <h1 className="section_heading">Payment</h1>
      <div className="grid-section product-section">
        <span className="product-item">
          <img src="" alt="" className="product-image" />
          <span className="product-details">
            <h2 className="product-name">Career Tapestry Snap shot</h2>
            <p className="product-about">
              This will contain details about the product This will contain details about the product This will contain
              details about the product
            </p>
          </span>
          <span className="product-cost">
            <p className="product-price">$ 100</p>
            <span className="product-qty">
              <button className="btn-small"> - </button>
              <p className="qty">1</p>
              <button className="btn-small"> - </button>
            </span>
          </span>
        </span>
        <span className="prom-section">
          <p>Have a promo code?</p>
          <span className="promo-input">
            <p>Promo code</p>
            <p>Apply code</p>
          </span>
        </span>

        <span className="order-summary-section">
          <h2>Order summary</h2>
        </span>
      </div>
    </section>
  )
}
