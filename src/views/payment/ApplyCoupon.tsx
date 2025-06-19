// src/views/payment/ApplyCoupon.tsx
import { FormInput } from "@/components"
import { applyCoupon } from "@/services"
import type { IFormErrors, IFormState, ICouponData, IApplyCoupon } from "@/types"
import { useCallback, useState, type ChangeEvent, type FC, type FormEvent } from "react"

const _promo = {
  id: "promo_code",
  name: "promo_code",
  labelText: "Have a promo code?",
  type: "text",
  readOnly: false,
  placeholder: "Referrer's code",
  required: true,
  minLength: 3,
  helperText: "Please enter your Promo Code",
}

export const ApplyCoupon: FC<IApplyCoupon> = ({ onSubmit, productId }) => {
  const [formData, setFormData] = useState<IFormState>({})
  const [formErrors, setFormErrors] = useState<IFormErrors>({})

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      if (formErrors[name]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [formErrors],
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!productId) {
      throw new Error("missing product details")
    }

    let response

    const couponData: ICouponData = {
      productId: productId,
      couponCode: formData.couponCode as string,
    }

    // if (onSubmit) {
    //   response = onsubmit({ couponData })
    // }

    response = await applyCoupon(couponData)
    // TODO:: will add toast
    return response
  }

  return (
    <div className="promo-section">
      <form action="" onSubmit={handleSubmit} className="promo-input">
        <FormInput {..._promo} onChange={handleInputChange} containerClassName="enter-promo" />
        <button type="submit" className="form_input submit_button">
          Apply Code
        </button>
      </form>
    </div>
  )
}
