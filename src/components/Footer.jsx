
import './Footer.css'
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa'

const footerGroups = [
  {
    title: 'Association',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Our Activities', href: '/activities' },
      { label: 'Latest News', href: '/news' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Join the Association', href: '/signup' },
      { label: 'Member Account', href: '/account' },
      { label: 'Sign In', href: '/signin' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Our Mission', href: '/#about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1A2fqDXAMy/',
    Icon: FaFacebookF,
  },
  {
    name: 'Instagram',
    href: '',
    Icon: FaInstagram,
  },
  {
    name: 'TikTok',
    href: '',
    Icon: FaTiktok,
  },
]

const contactDetails = [
  {
    label: '0780 42 21 94',
    href: 'tel:0780422194',
    Icon: FaPhone,
  },
  {
    label: 'lam_skikda@yahoo.fr',
    href: 'mailto:lam_skikda@yahoo.fr',
    Icon: FaEnvelope,
  },
  {
    label: 'View on Google Maps',
    href: 'https://maps.app.goo.gl/7QZ6v6i2vqHZc1EX7',
    Icon: FaMapMarkerAlt,
    external: true,
  },
]

export default function Footer() {
  return (
    <footer className="association-footer">
      <div className="association-footer-main">
        <div className="association-footer-brand">
          <a
            className="association-footer-logo"
            href="/"
            aria-label="Friends of the Patient Association home"
          >
            <img
              src="/association-logo.png"
              alt="Friends of the Patient Association"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />

            <span className="association-footer-logo-text">
              <span className="association-footer-name">
                Friends of the <span>Patient</span>
              </span>

              <span className="association-footer-tagline">
                SKIKDA · ALGERIA
              </span>
            </span>
          </a>

          <p className="association-footer-description">
            Supporting patients and promoting solidarity through
            community activities, awareness, and humanitarian action.
          </p>

          <a
            className="association-footer-contact-link"
            href="/contact"
          >
            Contact the Association
            <span aria-hidden="true">↗</span>
          </a>

          <div
            className="association-footer-socials"
            aria-label="Social media"
          >
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                className="association-footer-social"
                href={href || undefined}
                aria-label={name}
                title={name}
                aria-disabled={!href}
                onClick={(event) => {
                  if (!href) event.preventDefault()
                }}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <nav
            className="association-footer-column"
            key={group.title}
            aria-label={group.title}
          >
            <h3>{group.title}</h3>

            {group.links.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
        ))}

        <div className="association-footer-location">
          <h3>Contact Information</h3>

          {contactDetails.map(
            ({ label, href, Icon, external = false }) => (
              <a
                key={label}
                className="association-footer-contact-item"
                href={href}
                {...(external
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {})}
              >
                <span className="association-footer-contact-icon">
                  <Icon aria-hidden="true" />
                </span>

                <span className="association-footer-contact-label">
                  {label}
                </span>
              </a>
            ),
          )}

          <p className="association-footer-address">
            Skikda, Algeria
          </p>

          <a
            className="association-footer-location-link"
            href="/contact"
          >
            Get in touch
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="association-footer-bottom">
        <p>
          © {new Date().getFullYear()} Friends of the Patient Association.
          All rights reserved.
        </p>

        <span className="association-footer-country">
          SKIKDA, ALGERIA
        </span>
      </div>
    </footer>
  )
}
