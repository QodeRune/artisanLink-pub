// src/views/payment/ProductDetails.tsx
import type { FC } from "react"
import { useProductHook } from "@/store"

export interface IProductDetailsProps {
  productPrice?: string
  productName?: string
  productDescription?: string
  currency?: string
}

export const ProductDetails: FC<IProductDetailsProps> = ({
  productPrice,
  productDescription,
  productName,
  currency,
}) => {
  const { productData } = useProductHook()

  const price = parseFloat(productPrice || productData?.price || "0")
  const _currency = (currency || productData?.currency || "USD").toUpperCase()

  const name = productName || productData?.product_name
  const description = productDescription || productData?.product_description

  return (
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
          <h2 className="product-name">{name}</h2>
          <p className="product-about">{description}</p>
        </span>
        <span className="product-cost">
          <p className="product-price">
            <strong>
              {`${_currency}${price}`}
              {price}
            </strong>
          </p>
          <span className="product-qty">
            <button
              className="quantity-button minus-button"
              aria-label="Decrease quantity of Career Tapestry Snap shot"
            >
              {" "}
              -{" "}
            </button>
            <input
              onChange={() => console.log("Payment to be done")}
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
}
