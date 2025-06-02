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

export const Invoice: FC = () => {
  return (
    <section className="invoice">
      <h1 className="section_heading">Invoice</h1>
      <div className="grid-section product-section">
        {/* item 1 */}
        <article className="product-item">
          <span className="product-image-wrapper">
            <img src="" width="3rem" height="auto" alt="" className="product-image" />
          </span>
          <span className="product-details">
            <h2 className="product-name">Career Tapestry Snap shot</h2>
            <p className="product-about">
              This will contain details about the product This will contain details about the product This will contain
              details about the product
            </p>
          </span>
          <span className="product-cost">
            <p className="product-price">$100.00</p>
            <span className="product-qty">
              <button className="quantity-button minus-button"> - </button>
              <p className="qty quantity-input">1</p>
              <button className="quantity-button plus-button"> + </button>
            </span>
          </span>
        </article>
        {/* item 2 */}
        <article className="product-item">
          <span className="product-image-wrapper">
            <img src="" width="3rem" height="auto" alt="" className="product-image" />
          </span>
          <span className="product-details">
            <h2 className="product-name">Career Tapestry Snap shot</h2>
            <p className="product-about">
              This will contain details about the product This will contain details about the product This will contain
              details about the product
            </p>
          </span>
          <span className="product-cost">
            <p className="product-price">$100.00</p>
            <span className="product-qty">
              <button className="quantity-button minus-button"> - </button>
              <p className="qty quantity-input">1</p>
              <button className="quantity-button plus-button"> + </button>
            </span>
          </span>
        </article>
        {/* item 3 */}
        <article className="product-item">
          <span className="product-image-wrapper">
            <img src="" width="3rem" height="auto" alt="" className="product-image" />
          </span>
          <span className="product-details">
            <h2 className="product-name">Career Tapestry Snap shot</h2>
            <p className="product-about">
              This will contain details about the product This will contain details about the product This will contain
              details about the product
            </p>
          </span>
          <span className="product-cost">
            <p className="product-price">$100.00</p>
            <span className="product-qty">
              <button className="quantity-button minus-button"> - </button>
              <p className="qty quantity-input">1</p>
              <button className="quantity-button plus-button"> + </button>
            </span>
          </span>
        </article>

        <div className="promo-section">
          {/* <p>Have a promo code?</p> */}
          <form action="" className="promo-input">
            <FormInput {..._promo} containerClassName="enter-promo" />
            <input type="button" value="Apply Code" className="form_input submit_button" />
          </form>
        </div>

        <div className="order-summary-section">
          <h2>Order summary</h2>
          <div className="summary-list">
            <p className="summary-list-item">1 item(s)</p>
            <p className="summary-list-item">$100.00</p>
          </div>
          <div className="summary-list">
            <p className="summary-list-item">Discount</p>
            <p className="summary-list-item">$10.00</p>
          </div>
        </div>
        <div className="summary-list total-section">
          <strong className="summary-list-item">Total</strong>
          <p className="summary-list-item">$90.00</p>
        </div>
        <input type="button" value="Confirm & Checkout" className="form_input submit_button" />
      </div>
    </section>
  )
}
