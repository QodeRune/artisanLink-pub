// src/core/feature/user/UserProfile.tsx
import type { FC } from "react"

export const UserProfile: FC = () => {
  const userDetails = (
    <header
      className="user-details u-profile-section u-padding-block-md u-padding-inline-md u-flex u-gap-md"
      data-dev-id="user-details"
      aria-label="User summary"
    >
      <span className="user-avatar large" aria-hidden="true">
        F
      </span>
      <div className="update-pw u-grid u-gap-sm">
        <div className="user-particulars">
          <h2 className="user-name">FirstName LastName</h2>
          <p className="user-email">email@email.com</p>
        </div>

        <button type="button" className="reset-password-btn u-edit-button">
          Reset password
        </button>
      </div>
    </header>
  )

  const profileDetails = (
    <section
      className="profile-details u-profile-section u-padding-block-md u-padding-inline-md"
      data-dev-id="profile-details"
      aria-labelledby="profile-details-heading"
    >
      <span className="section-head u-margin-block-end-md u-flex u-justify-between u-items-center">
        <h2 id="profile-details-heading" className="section-heading ">
          Profile Information
        </h2>
        <button className="edit u-edit-button">edit</button>
      </span>
      <div className="content">
        <div className="address article-meta-list">
          <div className="detailItem">
            <h3 className="u-bold-text">First Name</h3>
            <p>Jack</p>
          </div>
          <div className="detailItem">
            <h3 className="u-bold-text">Last Name</h3>
            <p>Adams</p>
          </div>
          <div className="detailItem">
            <h3 className="u-bold-text">Phone Number</h3>
            <p>000 000 - 0000</p>
          </div>
        </div>
        <div className="other-details">
          <div className="detailItem">
            <h3 className="u-bold-text">Location</h3>
            <p>United States of America</p>
          </div>
        </div>
      </div>
    </section>
  )

  const additionalDetails = (
    <section
      className="additional-details u-profile-section u-padding-block-md u-padding-inline-md"
      data-dev-id="additional-details"
      aria-labelledby="additional-details-heading"
    >
      <span className="section-head u-margin-block-end-md u-flex u-justify-between u-items-center">
        <h2 id="additional-details-heading" className="section-heading ">
          Additional Details
        </h2>
        <button className="edit u-edit-button">edit</button>
      </span>
      <div className="content u-gap-md u-grid">
        <div className="section-1 article-meta-list">
          <div className="detailItem">
            <h3 className="u-bold-text">Interests and Hobbies</h3>
            <p>Drawing, Singing, Dancing, etc</p>
          </div>
          <div className="detailItem">
            <h3 className="u-bold-text">Skills and Expertise</h3>
            <p>Drawing, Singing, Dancing, etc</p>
          </div>
          <div className="detailItem">
            <h3 className="u-bold-text">Social Connection</h3>
            <p>Facebook, LinkedIn, Twitter</p>
          </div>
        </div>
        <div className="section-2">
          <div className="detailItem">
            <h3 className="u-bold-text">Biographic Information</h3>
            <p>Something, something</p>
          </div>
        </div>
      </div>
    </section>
  )

  const preferenceSettings = (
    <section
      className="preference-settings u-profile-section u-padding-block-md u-padding-inline-md"
      data-dev-id="preference-settings"
      aria-labelledby="preference-settings-heading"
    >
      <span className="section-head u-margin-block-end-md u-flex u-justify-between u-items-center">
        <h2 id="preference-settings-heading" className="section-heading ">
          Preference Settings
        </h2>
        <button className="edit u-edit-button">edit</button>
      </span>
      <div className="content article-meta-list">
        <div className="detailItem">
          <h3 className="u-bold-text">Time Zone</h3>
          <p className="drop-down">GMT-1</p>
        </div>
        <div className="detailItem">
          <h3 className="u-bold-text">Theme</h3>
          <p className="drop-down">Light</p>
        </div>
        <div className="detailItem">
          <h3 className="u-bold-text">Privacy Settings</h3>
          <p className="drop-down">Drop Down</p>
        </div>
        <div className="detailItem">
          <h3 className="u-bold-text">Notification Preferences</h3>
          <p className="drop-down">Drop Down</p>
        </div>
      </div>
    </section>
  )

  return (
    <section
      className="user-profile u-grid u-gap-sm scroll-y u-padding-inline-sm "
      data-dev-id="user-profile"
      aria-label="User profile section"
    >
      <h1 className="profile-page u-margin-inline-md">Profile</h1>
      <div className="page-content u-gap-md u-grid scroll-y u-margin-block-end-md u-padding-inline-md">
        {userDetails}
        {profileDetails}
        {additionalDetails}
        {preferenceSettings}
      </div>
    </section>
  )
}
