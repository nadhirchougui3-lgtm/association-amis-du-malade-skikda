
import { useState } from 'react'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaPaperPlane,
  FaHeart,
  FaHandHoldingHeart,
} from 'react-icons/fa'
import './ContactPage.css'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [notice, setNotice] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (notice) setNotice('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setNotice(
      'Your message has not been sent yet. The contact form needs to be connected to the association server.'
    )
  }

  return (
    <main className="association-contact-page">
      <section className="association-contact-hero">
        <div className="association-contact-hero-icon">
          <FaHandHoldingHeart aria-hidden="true" />
        </div>

        <span className="association-contact-eyebrow">
          FRIENDS OF THE PATIENT ASSOCIATION
        </span>

        <h1>
          We are here <span>for you.</span>
        </h1>

        <p>
          Have a question, need information, or want to support our
          mission? We would be glad to hear from you.
        </p>

        <div className="association-contact-hero-note">
          <FaHeart aria-hidden="true" />
          <span>Care, solidarity and support for everyone.</span>
        </div>
      </section>

      <section className="association-contact-layout">
        <aside className="association-contact-sidebar">
          <div className="association-contact-sidebar-content">
            <span className="association-contact-kicker">
              GET IN TOUCH
            </span>

            <h2>
              Let&apos;s make a <span>difference.</span>
            </h2>

            <p className="association-contact-sidebar-description">
              Whether you are a patient, a family member, a volunteer
              or a partner, your message matters to us.
            </p>

            <div className="association-contact-methods">
              <div className="association-contact-method">
                <div className="association-contact-method-icon">
                  <FaPhoneAlt aria-hidden="true" />
                </div>

                <div>
                  <strong>Phone</strong>
                  <span>Contact details coming soon</span>
                </div>
              </div>

              <div className="association-contact-method">
                <div className="association-contact-method-icon">
                  <FaEnvelope aria-hidden="true" />
                </div>

                <div>
                  <strong>Email</strong>
                  <span>Email address coming soon</span>
                </div>
              </div>

              <div className="association-contact-method">
                <div className="association-contact-method-icon">
                  <FaMapMarkerAlt aria-hidden="true" />
                </div>

                <div>
                  <strong>Location</strong>
                  <span>Skikda, Algeria</span>
                </div>
              </div>
            </div>

            <div className="association-contact-social-section">
              <h3>Stay connected</h3>
              <p>
                Our official social media links will be added here.
              </p>

              <div className="association-contact-socials">
                <span
                  className="association-contact-social"
                  aria-label="WhatsApp link coming soon"
                  title="WhatsApp link coming soon"
                >
                  <FaWhatsapp aria-hidden="true" />
                </span>

                <span
                  className="association-contact-social"
                  aria-label="Facebook link coming soon"
                  title="Facebook link coming soon"
                >
                  <FaFacebookF aria-hidden="true" />
                </span>

                <span
                  className="association-contact-social"
                  aria-label="Instagram link coming soon"
                  title="Instagram link coming soon"
                >
                  <FaInstagram aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </aside>

        <section className="association-contact-form-panel">
          <div className="association-contact-form-header">
            <span className="association-contact-kicker">
              SEND A MESSAGE
            </span>

            <h2>How can we help?</h2>

            <p>
              Fill in the details below. We will connect this form
              to the association&apos;s messaging system in a later step.
            </p>
          </div>

          <form
            className="association-contact-form"
            onSubmit={handleSubmit}
          >
            <div className="association-contact-form-row">
              <div className="association-contact-field">
                <label htmlFor="association-contact-name">
                  Full name
                </label>

                <input
                  id="association-contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="association-contact-field">
                <label htmlFor="association-contact-email">
                  Email address
                </label>

                <input
                  id="association-contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="association-contact-field">
              <label htmlFor="association-contact-subject">
                Subject
              </label>

              <select
                id="association-contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose a subject
                </option>
                <option value="General inquiry">
                  General inquiry
                </option>
                <option value="Patient support">
                  Patient support
                </option>
                <option value="Volunteering">
                  Volunteering
                </option>
                <option value="Activities and training">
                  Activities and training
                </option>
                <option value="Partnership">
                  Partnership
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="association-contact-field">
              <label htmlFor="association-contact-message">
                Your message
              </label>

              <textarea
                id="association-contact-message"
                name="message"
                rows={6}
                placeholder="How can the association help you?"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {notice && (
              <p
                className="association-contact-notice"
                role="status"
              >
                {notice}
              </p>
            )}

            <button
              className="association-contact-submit"
              type="submit"
            >
              <span>Send message</span>
              <FaPaperPlane aria-hidden="true" />
            </button>

            <p className="association-contact-privacy">
              Please avoid including sensitive medical information
              in this form.
            </p>
          </form>
        </section>
      </section>

      <section className="association-contact-bottom-note">
        <FaHeart aria-hidden="true" />
        <p>
          Together, we can bring more care, hope and solidarity to
          patients and their families.
        </p>
      </section>
    </main>
  )
}
