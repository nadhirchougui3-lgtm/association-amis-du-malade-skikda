
import { useState } from 'react'
import '../App.css'

const axes = [
  {
    id: 'recreational',
    number: '01',
    title: 'Recreational Activities',
    description: 'Social and recreational activities that bring members together.',
    icon: '✳',
    items: [
      'Trips',
      'Leisure Activities',
      'Camps',
      'Celebrations',
      'Competitions',
      'Recognition Events',
      'Community Gatherings and Weddings',
    ],
  },
  {
    id: 'scientific',
    number: '02',
    title: 'Training and Scientific Activities',
    description: 'Opportunities for training, learning and sharing expertise.',
    icon: '⌘',
    items: [
      'Seminars',
      'Lectures',
      'Roundtable Discussions',
      'Lessons',
      'Conferences',
      'Study and Training Days',
    ],
  },
  {
    id: 'media',
    number: '03',
    title: 'Media and Communications',
    description: 'Communicating the association’s work and raising awareness.',
    icon: '◉',
    items: [
      'Radio Programmes',
      'Press Conferences',
      'Interviews',
      'Newspapers and Magazines',
      'Public Statements',
      'Exhibitions and Open Days',
      'Social Media',
      'Television Channels',
      'Articles',
      'Posters',
      'Information Boards',
    ],
  },
  {
    id: 'services',
    number: '04',
    title: 'Patient and Community Services',
    description: 'Organising medical, healthcare and social support services.',
    icon: '♡',
    groups: [
      {
        title: 'Treatment Services',
        items: [],
        pending: true,
      },
      {
        title: 'Medical Services',
        items: [
          'Medical Services',
          'Medical Equipment',
          'Prosthetic Devices',
          'Pharmaceutical Services',
          'Paramedical Services',
          'Technical Support Services',
          'Speech and Language Therapy',
          'Eyewear Services',
          'Therapeutic Massage',
          'Medical Laboratory Tests',
          'Medical Imaging',
          'Surgical Procedures',
          'Medical Nutrition',
          'Cochlear Implants',
        ],
      },
      {
        title: 'Social and Solidarity Services',
        items: [
          'Food Supplies',
          'School Supplies',
          'Used Schoolbooks',
          'Second-hand Clothing',
          'Breast Prostheses',
          'Tents and Shelter Support',
          'Patient Care and Hygiene',
          'Patient Visits',
          'Transportation',
          'Incontinence Supplies',
          'Circumcision Support',
          'Burial and Funeral Assistance',
        ],
      },
    ],
  },
  {
    id: 'finance',
    number: '05',
    title: 'Finance',
    description: 'Managing and monitoring the association’s income and expenses.',
    icon: '◇',
    groups: [
      {
        title: 'Income',
        items: [
          'Subscriptions',
          'Membership Fees',
          'Donations',
          'Sales',
          'Contributions',
          'Investments',
          'Development Projects',
        ],
      },
      {
        title: 'Expenses',
        items: [
          'Rent',
          'Gas, Water and Electricity Bills',
          'Association Activities',
          'Staff Salaries',
          'Investments',
          'Fuel and Vehicle Gas',
          'Office and Media Equipment',
          'Vehicle, Building and Equipment Maintenance',
        ],
      },
    ],
  },
  {
    id: 'administration',
    number: '06',
    title: 'Administration and Organisation',
    description: 'This area will be defined in coordination with the association.',
    icon: '▤',
    items: [],
    pending: true,
  },
  {
    id: 'maintenance',
    number: '07',
    title: 'Maintenance and Repairs',
    description: 'Maintaining the association’s property and equipment.',
    icon: '⚙',
    items: [
      'Maintenance of Medical Equipment',
      'Maintenance of Association Vehicles',
      'Maintenance and Repair of Association Premises',
      'Available Maintenance Resources',
    ],
  },
]

function HomePage() {
  const [selectedAxis, setSelectedAxis] = useState(null)

  const activeAxis = axes.find((axis) => axis.id === selectedAxis)

  function openAxis(id) {
    setSelectedAxis(id)

    window.setTimeout(() => {
      document.getElementById('axis-details')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 50)
  }

  return (
    <div className="site-shell" dir="ltr">
      <main>
        <section className="hero-section" id="home">
          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />

          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                Humanitarian Association · Skikda
              </span>

              <h1>
                Every Patient
                <br />
                Deserves <span>Care and Dignity.</span>
              </h1>

              <p className="hero-description">
                A community that brings together humanitarian, social and
                scientific initiatives to support patients and those who need
                care, compassion and solidarity.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#axes">
                  Explore Our Activities <span aria-hidden="true">→</span>
                </a>

                <a className="text-link" href="#about">
                  About the Association <span aria-hidden="true">↙</span>
                </a>
              </div>

              <div className="hero-note">
                <span className="hero-note-symbol">♡</span>
                <span>Solidarity is a responsibility. Care is a right.</span>
              </div>
            </div>

            <div
              className="hero-art"
              role="img"
              aria-label="Symbol representing care and solidarity"
            >
              <div className="art-orbit orbit-outer" />
              <div className="art-orbit orbit-inner" />

              <div className="art-center">
                <span className="art-cross">+</span>
                <span className="art-heart">♡</span>
              </div>

              <div className="art-label art-label-top">
                <span className="art-label-dot" />
                Care
              </div>

              <div className="art-label art-label-bottom">
                <span className="art-label-dot" />
                Solidarity
              </div>

              <span className="art-star art-star-one">✳</span>
              <span className="art-star art-star-two">✦</span>
            </div>
          </div>

          <div className="container hero-bottom">
            <span>Friends of the Patient Association · Skikda</span>
            <a href="#about">
              Discover Our Mission <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="about-section section-space" id="about">
          <div className="container about-grid">
            <div className="section-heading">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                Who We Are
              </span>

              <h2>
                Humanitarian Work
                <br />
                <span>Driven by Solidarity.</span>
              </h2>
            </div>

            <div className="about-copy">
              <p>
                Friends of the Patient Association in Skikda is a community
                dedicated to solidarity, bringing together initiatives,
                services and activities in organised areas to make information
                easier to access and the association’s work easier to discover.
              </p>

              <a className="inline-link" href="#axes">
                Explore Our Main Areas <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="container values-row">
            <article className="value-item">
              <span className="value-number">01</span>
              <div>
                <h3>People First</h3>
                <p>Putting patients and their needs at the centre.</p>
              </div>
            </article>

            <article className="value-item">
              <span className="value-number">02</span>
              <div>
                <h3>Solidarity</h3>
                <p>Encouraging cooperation and humanitarian initiatives.</p>
              </div>
            </article>

            <article className="value-item">
              <span className="value-number">03</span>
              <div>
                <h3>Organised Action</h3>
                <p>Bringing activities and services together clearly.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="axes-section section-space" id="axes">
          <div className="container">
            <div className="axes-heading">
              <div className="section-heading">
                <span className="eyebrow">
                  <span className="eyebrow-line" />
                  What We Do
                </span>

                <h2>
                  Our Main Areas
                  <span className="heading-period">.</span>
                </h2>

                <p className="section-description">
                  Select an area to explore its services and activities.
                </p>
              </div>

              <div className="axes-count">
                <strong>07</strong>
                <span>Main Areas</span>
              </div>
            </div>

            <div className="axes-grid">
              {axes.map((axis) => (
                <button
                  className={`axis-card ${
                    selectedAxis === axis.id ? 'is-selected' : ''
                  }`}
                  key={axis.id}
                  type="button"
                  onClick={() => openAxis(axis.id)}
                  aria-pressed={selectedAxis === axis.id}
                >
                  <div className="axis-card-top">
                    <span className="axis-number">{axis.number}</span>

                    <span className="axis-icon" aria-hidden="true">
                      {axis.icon}
                    </span>
                  </div>

                  <h3>{axis.title}</h3>
                  <p>{axis.description}</p>

                  <div className="axis-card-bottom">
                    <span>
                      {axis.groups
                        ? `${axis.groups.length} Main Sections`
                        : axis.pending && axis.items.length === 0
                          ? 'To Be Defined'
                          : `${axis.items.length} Activities`}
                    </span>

                    <span className="axis-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {activeAxis && (
              <section
                className="axis-details"
                id="axis-details"
                aria-live="polite"
              >
                <div className="details-heading">
                  <div>
                    <span className="eyebrow">
                      AREA {activeAxis.number}
                    </span>

                    <h3>{activeAxis.title}</h3>
                    <p>{activeAxis.description}</p>
                  </div>

                  <button
                    className="details-close"
                    type="button"
                    onClick={() => setSelectedAxis(null)}
                    aria-label="Close area details"
                  >
                    ×
                  </button>
                </div>

                {activeAxis.groups ? (
                  <div className="details-groups">
                    {activeAxis.groups.map((group, index) => (
                      <article className="details-group" key={group.title}>
                        <div className="details-group-heading">
                          <span className="group-number">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <h4>{group.title}</h4>
                        </div>

                        {group.pending ? (
                          <p className="pending-message">
                            These services will be defined in coordination
                            with the association.
                          </p>
                        ) : (
                          <ul className="details-list">
                            {group.items.map((item) => (
                              <li key={item}>
                                <span className="list-marker" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                ) : activeAxis.items.length > 0 ? (
                  <ul className="details-list simple-details-list">
                    {activeAxis.items.map((item) => (
                      <li key={item}>
                        <span className="list-marker" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="pending-message">
                    This area has not yet been defined. Its sections will be
                    added after review with the association.
                  </p>
                )}
              </section>
            )}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-inner">
            <div>
              <span className="eyebrow eyebrow-light">
                <span className="eyebrow-line" />
                Stay Connected
              </span>

              <h2>
                Together, We Can
                <br />
                Make a Difference.
              </h2>

              <p>
                Official contact details will be added once they have been
                confirmed by the association.
              </p>
            </div>

            <a className="button button-light" href="#home">
              Back to Top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark" aria-hidden="true">
              <span>+</span>
            </span>

            <span className="brand-copy">
              <strong>Friends of the Patient</strong>
              <small>SKIKDA · ALGERIA</small>
            </span>
          </a>

          <p>Friends of the Patient Association · Skikda</p>

          <a className="back-top" href="#home">
            Back to Top ↑
          </a>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
