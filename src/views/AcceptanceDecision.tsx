import { type FC } from "react"
// src/views/AcceptanceDecision.tsx

export const AcceptanceDecision: FC = () => {
  return (
    <section className="acceptance-decision">
      <h1 className="section_heading">Hello There...</h1>
      <p className="section_body_text">
        We're finishing up your process. we'll communicate your enrollment status via email once it's ready. Please
        monitor your provided email.
      </p>
      <strong className="greeting">Cheers from E.W.T</strong>
      {/* TODO:: will accept children - a button to go to enrolled user dashboard if user is accepted */}
    </section>
  )
}
