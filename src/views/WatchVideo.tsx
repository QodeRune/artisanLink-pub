// src/views/watch_video.tsx
import { FormInput } from "@/components"
import type { FC } from "react"

export const WatchVideo: FC = () => {
  return (
    <section className="watch_video">
      <span className="intro_info">
        <h1 className="u-text-heading-lg u-sentence-case">your tech journey starts here</h1>
        <p className="u-text-body-lg">
          Create your account to access industry ready courses, live sessions and hands-on projects
        </p>
      </span>
      <div>
        <figure>
          <video controls width="" aria-label="Introduction to our platform">
            <source src="intro.mp4" type="video/mp4" />
            <track kind="captions" src="intro-captions.vtt" srcLang="en" label="English" />
            Your browser does not support the video tag.
          </video>
          <figcaption className="screen-reader-only">Introduction video explaining how platform works</figcaption>
        </figure>
        <span className="flex_wrapper flex_row checkbox_consent ">
          <FormInput
            id={"watch_video_confirmation"}
            name={"watch_video_confirmation"}
            labelText={"Yes I have completed and understood the video content"}
            type={"checkbox"}
            readOnly={false}
            required={true}
            // helperText="Please check the box if you want to proceed"
          />
          <a className="consent_text">Proceed</a>
        </span>
      </div>
    </section>
  )
}
