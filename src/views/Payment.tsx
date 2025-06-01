// src/views/Payment.tsx
import type { FC } from "react"
import { FormInput } from "@/components"

const _promo = {
  id: "prom_code",
  name: "prom_code",
  labelText: "Have a promo code?",
  type: "text",
  readOnly: false,
  placeholder: "Referrer's code",
  required: true,
  minLength: 3,
  helperText: "Please enter your Promo Code",
}

export const Payment: FC = () => {
  return (
    <section className="payment">
      <h1 className="section_heading">Payment</h1>
      <div className="grid-section product-section">
        <span className="product-item">
          <img src="" width="3rem" height="auto" alt="" className="product-image" />
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
        <span className="promo-section">
          {/* <p>Have a promo code?</p> */}
          <form action="" className="promo-input">
            <FormInput {..._promo} containerClassName="enter-promo" />
            <input type="button" value="submit" className="form_input submit_button" />
          </form>
        </span>

        <span className="order-summary-section">
          <h2>Order summary</h2>
          <span className="summary-list">
            <p className="summary-list-item">1 item(s)</p>
            <p className="summary-list-item">$100.00</p>
          </span>
          <span className="summary-list">
            <p className="summary-list-item">Discount</p>
            <p className="summary-list-item">$10.00</p>
          </span>
        </span>
        <span className="summary-list">
          <p className="summary-list-item">Total</p>
          <p className="summary-list-item">$90.00</p>
        </span>
        <input type="button" value="Confirm & Checkout" className="form_input submit_button" />
      </div>
    </section>
  )
}
