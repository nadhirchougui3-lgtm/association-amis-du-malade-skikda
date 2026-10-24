import '../App.css'
import './HomePage.css'
import { useLanguage } from '../context/LanguageContext'

const translations = {
  en: {
    logoAlt: 'Friends of the Patient Association',
    location: 'SKIKDA, ALGERIA',
    eyebrow: 'FRIENDS OF THE PATIENT ASSOCIATION',
    headingFirst: 'A little care.',
    headingSecond: 'A lot of hope.',
    quoteFirst: 'Today, it is them.',
    quoteSecond: 'Tomorrow, it could be you or me.',
    description:
      'Standing beside patients with compassion, dignity and solidarity. Because no one should face illness alone.',
    discover: 'Discover our association',
    contact: 'Get in touch',
    care: 'Care with heart',
    hope: 'Hope through solidarity',
    compassion: 'COMPASSION',
    dignity: 'DIGNITY',
    solidarity: 'SOLIDARITY',
  },
  fr: {
    logoAlt: 'Association Amis du Malade',
    location: 'SKIKDA, ALGÉRIE',
    eyebrow: 'ASSOCIATION AMIS DU MALADE',
    headingFirst: 'Un peu de soin.',
    headingSecond: 'Beaucoup d’espoir.',
    quoteFirst: 'Aujourd’hui, c’est eux.',
    quoteSecond: 'Demain, ce pourrait être vous ou moi.',
    description:
      'Aux côtés des patients avec compassion, dignité et solidarité. Parce que personne ne devrait affronter la maladie seul.',
    discover: 'Découvrir notre association',
    contact: 'Nous contacter',
    care: 'La solidarité avec le cœur',
    hope: 'L’espoir par la solidarité',
    compassion: 'COMPASSION',
    dignity: 'DIGNITÉ',
    solidarity: 'SOLIDARITÉ',
  },
  ar: {
    logoAlt: 'جمعية أصدقاء المريض',
    location: 'سكيكدة، الجزائر',
    eyebrow: 'جمعية أصدقاء المريض',
    headingFirst: 'قليل من الرعاية.',
    headingSecond: 'كثير من الأمل.',
    quoteFirst: 'اليوم هو هم.',
    quoteSecond: 'وغدًا ربما أنا أو أنت.',
    description:
      'نقف إلى جانب المرضى بالرحمة والكرامة والتضامن، لأن لا أحد ينبغي أن يواجه المرض وحيدًا.',
    discover: 'اكتشف جمعيتنا',
    contact: 'تواصل معنا',
    care: 'رعاية من القلب',
    hope: 'الأمل من خلال التضامن',
    compassion: 'الرحمة',
    dignity: 'الكرامة',
    solidarity: 'التضامن',
  },
}

function HomePage() {
  const { language } = useLanguage()
  const text = translations[language] || translations.en

  return (
    <main className="association-home" dir="ltr">
      <header className="association-header">
        <a
          className="association-logo"
          href="/"
          aria-label={text.logoAlt}
        >
          <img
            src="/association-logo.png"
            alt={text.logoAlt}
          />
        </a>

        <span className="association-location">
          <span className="location-dot" />
          {text.location}
        </span>
      </header>

      <section className="association-hero">
        <div className="association-intro">
          <span className="association-eyebrow">
            {text.eyebrow}
          </span>

          <h1>
            {text.headingFirst}
            <br />
            <span>{text.headingSecond}</span>
          </h1>

          <div className="association-accent-line" />

          <p className="association-quote">
            {text.quoteFirst}
            <br />
            {text.quoteSecond}
          </p>

          <p className="association-description">
            {text.description}
          </p>

          <div className="association-actions">
            <a
              className="association-button association-button-primary"
              href="/about"
            >
              <span>{text.discover}</span>
              <span
                className="association-button-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            <a
              className="association-button association-button-secondary"
              href="/contact"
            >
              <span>{text.contact}</span>
              <span
                className="association-button-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </div>

        <div className="association-visual">
          <div className="association-photo-frame">
            <img
              src="/association-logo.png"
              alt=""
            />
          </div>

          <div
            className="association-photo-outline"
            aria-hidden="true"
          />

          <div className="association-photo-caption">
            <span
              className="association-caption-mark"
              aria-hidden="true"
            >
              ♥
            </span>

            <span>
              <strong>{text.care}</strong>
              <small>{text.hope}</small>
            </span>
          </div>
        </div>
      </section>

      <div className="association-bottom-line">
        <span>{text.compassion}</span>
        <span className="association-bottom-separator" />
        <span>{text.dignity}</span>
        <span className="association-bottom-separator" />
        <span>{text.solidarity}</span>
      </div>
    </main>
  )
}

export default HomePage
