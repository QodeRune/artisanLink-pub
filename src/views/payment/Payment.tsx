// src/views/Payment.tsx
import type { FC } from "react"
import { FormInput } from "@/components"
// import { PaymentResponse } from "./PaymentResponse"
// import { Outlet } from "react-router-dom"

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

export const ProductPayment: FC = () => {
  const _productSection = (
    <div className="grid-section product-section">
      {/* item 1 */}
      <article className="product-item">
        <span className="product-image-wrapper">
          {/* Added descriptive alt text */}
          <img
            src="/path/to/career-tapestry-snapshot.jpg"
            width="3rem"
            height="auto"
            alt="Image of Career Tapestry Snap Shot product"
            className="product-image"
          />
        </span>
        <span className="product-details">
          <h2 className="product-name">Career Tapestry Snap shot</h2>
          <p className="product-about">
            This will contain details about the product This will contain details about the product This will contain
            details about the product
          </p>
        </span>
        <span className="product-cost">
          <p className="product-price">
            <strong>$100.00</strong>
          </p>
          <span className="product-qty">
            {/* Added aria-label for buttons, changed p to input type="number" */}
            <button
              className="quantity-button minus-button"
              aria-label="Decrease quantity of Career Tapestry Snap shot"
            >
              {" "}
              -{" "}
            </button>
            <input
              type="number"
              className="qty quantity-input"
              value="1" // This should ideally be controlled by state
              aria-label="Quantity of Career Tapestry Snap shot"
              min="1" // Assuming minimum quantity is 1
            />
            <button className="quantity-button plus-button" aria-label="Increase quantity of Career Tapestry Snap shot">
              {" "}
              +{" "}
            </button>
          </span>
        </span>
      </article>
    </div>
  )

  const _paymentDetails = (
    <div className="payment-details">
      <div className="promo-section">
        <form action="" className="promo-input">
          {/* FormInput component needs to correctly render label and input with for/id */}
          <FormInput {..._promo} containerClassName="enter-promo" />
          {/* Changed type to "submit" for better form semantics */}
          <button type="submit" className="form_input submit_button">
            Apply Code
          </button>
        </form>
      </div>

      <div className="order-summary-section">
        <h2>Order summary</h2>
        {/* Changed to ul/li for semantic list structure */}
        <ul className="summary-list">
          <li className="summary-list-item">1 item(s)</li>
          <li className="summary-list-item">$100.00</li>
        </ul>
        <ul className="summary-list">
          <li className="summary-list-item">
            <strong>Discount</strong>
          </li>
          <li className="summary-list-item">
            <strong>$10.00</strong>
          </li>
        </ul>
      </div>
      {/* Changed to ul/li for semantic list structure */}
      <ul className="summary-list total-section">
        <li className="summary-list-item">
          <strong>Total</strong>
        </li>
        <li className="summary-list-item">
          <strong>$90.00</strong>
        </li>
      </ul>
      {/* Changed to button for better semantic meaning, especially if not directly submitting a form */}
      <button type="button" className="form_input submit_button">
        Confirm & Checkout
      </button>
    </div>
  )

  return (
    <section className="invoice">
      <h1 className="section_heading">Invoice</h1>
      {_productSection}
      {/* TODO:: success or failed responses will replace the _paymentDetails */}
      {_paymentDetails}
      {/* <PaymentResponse
        status="success"
        onProceed={() => {
          console.log("proceed to next route")
          // navigate("/somewhere") or trigger Zustand action
        }}
      /> */}
    </section>
  )
}
