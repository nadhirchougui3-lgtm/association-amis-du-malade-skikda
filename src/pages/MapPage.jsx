
import { Link } from 'react-router-dom'
import {
  FaMapMarkerAlt,
  FaDirections,
  FaEnvelope,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import './MapPage.css'

const GOOGLE_MAPS_URL =
  'https://maps.app.goo.gl/7QZ6v6i2vqHZc1EX7'

const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=RWXH%2B8R5%20Hamadi%20Krouma%2C%20Skikda%2C%20Algeria&output=embed'

export default function MapPage() {
  return (
    <main className="location-page">
      <div className="location-page__container">
        <header className="location-header">
          <div className="location-header__label">
            <span className="location-header__line" />
            FIND US
          </div>

          <div className="location-header__content">
            <div>
              <h1>Come visit us.</h1>
              <p>
                We welcome you to the Friends of the Patient
                Association in Hamadi Krouma, Skikda.
              </p>
            </div>

            <div className="location-header__city">
              <FaMapMarkerAlt aria-hidden="true" />
              <span>Skikda, Algeria</span>
            </div>
          </div>
        </header>

        <section
          className="location-content"
          aria-label="Association location"
        >
          <div className="location-map">
            <div className="location-map__topbar">
              <span className="location-map__status">
                <span />
                OUR LOCATION
              </span>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="location-map__external-link"
                aria-label="Open location in Google Maps"
              >
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </div>

            <div className="location-map__frame">
              <iframe
                title="Friends of the Patient Association on Google Maps"
                src={MAP_EMBED_URL}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              className="location-map__directions"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDirections aria-hidden="true" />
              <span>Open directions in Google Maps</span>
              <FaExternalLinkAlt
                className="location-map__directions-icon"
                aria-hidden="true"
              />
            </a>
          </div>

          <aside className="location-details">
            <div className="location-details__heading">
              <span className="location-details__eyebrow">
                ADDRESS & CONTACT
              </span>
              <h2>Friends of the Patient Association</h2>
              <p>
                Find our location and plan your visit.
              </p>
            </div>

            <div className="location-details__divider" />

            <div className="location-details__item">
              <span className="location-details__icon">
                <FaMapMarkerAlt aria-hidden="true" />
              </span>

              <div>
                <span className="location-details__label">
                  ADDRESS
                </span>
                <p>Hamadi Krouma, Skikda, Algeria</p>
              </div>
            </div>

            <div className="location-details__divider" />

            <div className="location-details__help">
              <h3>Need to get in touch?</h3>
              <p>
                Contact the association if you need further
                information before your visit.
              </p>

              <Link
                to="/contact"
                className="location-details__contact"
              >
                <FaEnvelope aria-hidden="true" />
                Contact us
              </Link>
            </div>

            <div className="location-details__footer">
              <span className="location-details__footer-mark" />
              <span>Friends of the Patient Association</span>
            </div>
          </aside>
        </section>

        <footer className="location-page__footer">
          <span>FRIENDS OF THE PATIENT ASSOCIATION</span>
          <span>SKIKDA · ALGERIA</span>
        </footer>
      </div>
    </main>
  )
}
