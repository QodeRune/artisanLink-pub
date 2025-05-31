// src/views/TermsAndCondition.tsx
import { CheckBoxConsent } from "@/core/feature/consent"
import type { FC } from "react"
import TC from "./termsAndConditions.json"

export const TermsAndConditions: FC = () => {
  const sectionsToRender = Object.entries(TC).map(([sectionHeading, sectionContent]) => {
    return (
      <div key={sectionHeading} className="grid-section tc-section">
        {/* Use h2 for section headings, as h1 is already used for the page title */}
        <h2 className="tc-section-heading">{sectionHeading}</h2>
        <ol className="grid-section tc-section-list">
          {/* Iterate over the key-value pairs within each section's content */}
          {Object.entries(sectionContent).map(([itemNumber, itemText]) => (
            <li key={`${sectionHeading}-${itemNumber}`} className="tc-list-item">
              <strong>{itemNumber}.</strong> {itemText}
            </li>
          ))}
        </ol>
      </div>
    )
  })

  return (
    <section className="terms_and_conditions">
      <h1 className="section_heading">Terms and conditions</h1>

      {/* Render all the dynamically generated sections */}
      {sectionsToRender}

      <CheckBoxConsent />
    </section>
  )
}
