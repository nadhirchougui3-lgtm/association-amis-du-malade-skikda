
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import '../App.css'
import './AboutPage.css'

const translations = {
  en: {
    who: 'Who We Are',
    title1: 'Humanitarian Work',
    title2: 'Driven by Solidarity.',
    intro: 'Friends of the Patient Association in Skikda is a community dedicated to solidarity, bringing together initiatives, services and activities in organised areas to make information easier to access and the association’s work easier to discover.',
    contactAssociation: 'Contact the Association',
    values: [
      ['People First', 'Putting patients and their needs at the centre.'],
      ['Solidarity', 'Encouraging cooperation and humanitarian initiatives.'],
      ['Organised Action', 'Bringing activities and services together clearly.'],
    ],
    what: 'What We Do',
    areas: 'Our Main Areas',
    selectArea: 'Select an area to explore its services and activities.',
    mainAreas: 'Main Areas',
    sections: 'Main Sections',
    activities: 'Activities',
    toDefine: 'To Be Defined',
    area: 'AREA',
    close: 'Close area details',
    pending: 'These services will be defined in coordination with the association.',
    pendingArea: 'This area has not yet been defined. Its sections will be added after review with the association.',
    stay: 'Stay Connected',
    together1: 'Together, We Can',
    together2: 'Make a Difference.',
    contactNote: 'Official contact details will be added once they have been confirmed by the association.',
    contactUs: 'Contact Us',
    recreational: 'Recreational Activities',
    recreationalDesc: 'Social and recreational activities that bring members together.',
    recreationalItems: ['Trips', 'Leisure Activities', 'Camps', 'Celebrations', 'Competitions', 'Recognition Events', 'Community Gatherings and Weddings'],
    scientific: 'Training and Scientific Activities',
    scientificDesc: 'Opportunities for training, learning and sharing expertise.',
    scientificItems: ['Seminars', 'Lectures', 'Roundtable Discussions', 'Lessons', 'Conferences', 'Study and Training Days'],
    media: 'Media and Communications',
    mediaDesc: 'Communicating the association’s work and raising awareness.',
    mediaItems: ['Radio Programmes', 'Press Conferences', 'Interviews', 'Newspapers and Magazines', 'Public Statements', 'Exhibitions and Open Days', 'Social Media', 'Television Channels', 'Articles', 'Posters', 'Information Boards'],
    services: 'Patient and Community Services',
    servicesDesc: 'Organising medical, healthcare and social support services.',
    treatment: 'Treatment Services',
    medical: 'Medical Services',
    medicalItems: ['Medical Services', 'Medical Equipment', 'Prosthetic Devices', 'Pharmaceutical Services', 'Paramedical Services', 'Technical Support Services', 'Speech and Language Therapy', 'Eyewear Services', 'Therapeutic Massage', 'Medical Laboratory Tests', 'Medical Imaging', 'Surgical Procedures', 'Medical Nutrition', 'Cochlear Implants'],
    social: 'Social and Solidarity Services',
    socialItems: ['Food Supplies', 'School Supplies', 'Used Schoolbooks', 'Second-hand Clothing', 'Breast Prostheses', 'Tents and Shelter Support', 'Patient Care and Hygiene', 'Patient Visits', 'Transportation', 'Incontinence Supplies', 'Circumcision Support', 'Burial and Funeral Assistance'],
    finance: 'Finance',
    financeDesc: 'Managing and monitoring the association’s income and expenses.',
    income: 'Income',
    incomeItems: ['Subscriptions', 'Membership Fees', 'Donations', 'Sales', 'Contributions', 'Investments', 'Development Projects'],
    expenses: 'Expenses',
    expensesItems: ['Rent', 'Gas, Water and Electricity Bills', 'Association Activities', 'Staff Salaries', 'Investments', 'Fuel and Vehicle Gas', 'Office and Media Equipment', 'Vehicle, Building and Equipment Maintenance'],
    administration: 'Administration and Organisation',
    administrationDesc: 'This area will be defined in coordination with the association.',
    maintenance: 'Maintenance and Repairs',
    maintenanceDesc: 'Maintaining the association’s property and equipment.',
    maintenanceItems: ['Maintenance of Medical Equipment', 'Maintenance of Association Vehicles', 'Maintenance and Repair of Association Premises', 'Available Maintenance Resources'],
  },
  fr: {
    who: 'Qui sommes-nous ?',
    title1: 'Un engagement humanitaire',
    title2: 'Guidé par la solidarité.',
    intro: 'L’Association des Amis du Malade de Skikda est une communauté engagée dans la solidarité. Elle rassemble des initiatives, des services et des activités organisés afin de faciliter l’accès à l’information et la découverte de ses actions.',
    contactAssociation: 'Contacter l’association',
    values: [
      ['Les personnes avant tout', 'Placer les patients et leurs besoins au centre.'],
      ['Solidarité', 'Encourager la coopération et les initiatives humanitaires.'],
      ['Action organisée', 'Rassembler clairement les activités et les services.'],
    ],
    what: 'Nos actions',
    areas: 'Nos principaux axes',
    selectArea: 'Sélectionnez un axe pour découvrir ses services et activités.',
    mainAreas: 'Axes principaux',
    sections: 'Sections principales',
    activities: 'Activités',
    toDefine: 'À définir',
    area: 'AXE',
    close: 'Fermer les détails de l’axe',
    pending: 'Ces services seront définis en coordination avec l’association.',
    pendingArea: 'Cet axe n’a pas encore été défini. Ses sections seront ajoutées après concertation avec l’association.',
    stay: 'Restons en contact',
    together1: 'Ensemble, nous pouvons',
    together2: 'faire la différence.',
    contactNote: 'Les coordonnées officielles seront ajoutées après confirmation par l’association.',
    contactUs: 'Nous contacter',
    recreational: 'Activités récréatives',
    recreationalDesc: 'Des activités sociales et récréatives qui rapprochent les membres.',
    recreationalItems: ['Excursions', 'Loisirs', 'Camps', 'Célébrations', 'Concours', 'Cérémonies de reconnaissance', 'Rencontres communautaires et mariages'],
    scientific: 'Formation et activités scientifiques',
    scientificDesc: 'Des occasions de se former, d’apprendre et de partager son expertise.',
    scientificItems: ['Séminaires', 'Conférences', 'Tables rondes', 'Cours', 'Conférences scientifiques', 'Journées d’étude et de formation'],
    media: 'Médias et communication',
    mediaDesc: 'Faire connaître les actions de l’association et sensibiliser le public.',
    mediaItems: ['Émissions de radio', 'Conférences de presse', 'Entretiens', 'Journaux et magazines', 'Communiqués publics', 'Expositions et journées portes ouvertes', 'Réseaux sociaux', 'Chaînes de télévision', 'Articles', 'Affiches', 'Panneaux d’information'],
    services: 'Services aux patients et à la communauté',
    servicesDesc: 'Organisation de services médicaux, de soins et de soutien social.',
    treatment: 'Services de traitement',
    medical: 'Services médicaux',
    medicalItems: ['Services médicaux', 'Équipements médicaux', 'Appareils prothétiques', 'Services pharmaceutiques', 'Services paramédicaux', 'Assistance technique', 'Orthophonie', 'Services optiques', 'Massage thérapeutique', 'Analyses médicales', 'Imagerie médicale', 'Interventions chirurgicales', 'Nutrition médicale', 'Implants cochléaires'],
    social: 'Services sociaux et solidaires',
    socialItems: ['Aide alimentaire', 'Fournitures scolaires', 'Manuels scolaires d’occasion', 'Vêtements de seconde main', 'Prothèses mammaires', 'Tentes et hébergement', 'Soins et hygiène des patients', 'Visites aux patients', 'Transport', 'Produits pour l’incontinence', 'Aide à la circoncision', 'Aide aux obsèques'],
    finance: 'Finances',
    financeDesc: 'Gestion et suivi des recettes et des dépenses de l’association.',
    income: 'Recettes',
    incomeItems: ['Abonnements', 'Cotisations des membres', 'Dons', 'Ventes', 'Contributions', 'Investissements', 'Projets de développement'],
    expenses: 'Dépenses',
    expensesItems: ['Loyer', 'Factures de gaz, d’eau et d’électricité', 'Activités de l’association', 'Salaires du personnel', 'Investissements', 'Carburant et frais des véhicules', 'Matériel de bureau et de communication', 'Entretien des véhicules, des locaux et des équipements'],
    administration: 'Administration et organisation',
    administrationDesc: 'Cet axe sera défini en coordination avec l’association.',
    maintenance: 'Maintenance et réparations',
    maintenanceDesc: 'Entretien des biens et des équipements de l’association.',
    maintenanceItems: ['Maintenance du matériel médical', 'Entretien des véhicules de l’association', 'Entretien et réparation des locaux', 'Ressources de maintenance disponibles'],
  },
  ar: {
    who: 'من نحن',
    title1: 'عمل إنساني',
    title2: 'تقوده روح التضامن.',
    intro: 'جمعية أصدقاء المريض سكيكدة هي جمعية مجتمعية تقوم على التضامن، وتجمع المبادرات والخدمات والنشاطات ضمن محاور منظمة لتسهيل الوصول إلى المعلومات والتعرّف على أعمال الجمعية.',
    contactAssociation: 'تواصل مع الجمعية',
    values: [
      ['المريض أولًا', 'وضع المرضى واحتياجاتهم في صميم الاهتمام.'],
      ['التضامن', 'تشجيع التعاون والمبادرات الإنسانية.'],
      ['العمل المنظم', 'تنظيم النشاطات والخدمات بطريقة واضحة.'],
    ],
    what: 'ماذا نقدم',
    areas: 'محاورنا الرئيسية',
    selectArea: 'اختر محورًا لاكتشاف خدماته ونشاطاته.',
    mainAreas: 'المحاور الرئيسية',
    sections: 'الأقسام الرئيسية',
    activities: 'نشاطات',
    toDefine: 'قيد التحديد',
    area: 'المحور',
    close: 'إغلاق تفاصيل المحور',
    pending: 'سيتم تحديد هذه الخدمات بالتنسيق مع الجمعية.',
    pendingArea: 'لم يتم تحديد هذا المحور بعد، وستضاف أقسامه بعد مراجعتها مع الجمعية.',
    stay: 'ابقَ على تواصل',
    together1: 'معًا نستطيع',
    together2: 'إحداث الفرق.',
    contactNote: 'ستتم إضافة معلومات الاتصال الرسمية بعد تأكيدها من طرف الجمعية.',
    contactUs: 'اتصل بنا',
    recreational: 'المحور الترفيهي',
    recreationalDesc: 'نشاطات اجتماعية وترفيهية تجمع الأعضاء.',
    recreationalItems: ['رحلات', 'استجمام وترفيه', 'مخيمات', 'حفلات', 'مسابقات', 'تكريمات', 'ولائم وأعراس'],
    scientific: 'المحور التكويني والعلمي',
    scientificDesc: 'فرص للتكوين والتعلم وتبادل الخبرات.',
    scientificItems: ['ندوات', 'محاضرات', 'موائد مستديرة', 'دروس', 'ملتقيات', 'أيام دراسية وتكوينية'],
    media: 'المحور الإعلامي',
    mediaDesc: 'التعريف بأعمال الجمعية ونشر الوعي.',
    mediaItems: ['حصص إذاعية', 'ندوات صحفية', 'مقابلات', 'جرائد ومجلات', 'بيانات عامة', 'معارض وأيام مفتوحة', 'وسائل التواصل الاجتماعي', 'قنوات تلفزيونية', 'مقالات', 'ملصقات', 'لوحات إعلانية'],
    services: 'المحور الخدماتي',
    servicesDesc: 'تنظيم الخدمات الطبية والصحية والاجتماعية.',
    treatment: 'خدمات العلاج',
    medical: 'الخدمات الطبية',
    medicalItems: ['خدمات طبية', 'معدات طبية', 'أجهزة تعويضية', 'خدمات صيدلانية', 'خدمات شبه طبية', 'خدمات دعم تقني', 'علاج النطق واللغة', 'خدمات النظارات', 'تدليك علاجي', 'تحاليل مخبرية', 'تصوير طبي', 'عمليات جراحية', 'تغذية طبية', 'زراعة القوقعة'],
    social: 'الخدمات الاجتماعية والتضامنية',
    socialItems: ['مواد غذائية', 'لوازم مدرسية', 'كتب مدرسية مستعملة', 'ملابس مستعملة', 'أطراف تعويضية للثدي', 'خيام ومساعدات الإيواء', 'رعاية المرضى ونظافتهم', 'زيارة المرضى', 'النقل', 'مستلزمات سلس البول', 'المساعدة في الختان', 'المساعدة في الدفن والجنازات'],
    finance: 'المحور المالي',
    financeDesc: 'تسيير ومتابعة مداخيل الجمعية ومصاريفها.',
    income: 'المداخيل',
    incomeItems: ['اشتراكات', 'حقوق الانخراط', 'تبرعات', 'مبيعات', 'مساهمات', 'استثمارات', 'مشاريع تنموية'],
    expenses: 'المصاريف',
    expensesItems: ['الإيجار', 'فواتير الغاز والماء والكهرباء', 'نشاطات الجمعية', 'أجور العمال', 'استثمارات', 'الوقود ومصاريف المركبات', 'معدات المكتب والإعلام', 'صيانة المركبات والمباني والمعدات'],
    administration: 'المحور الإداري والتنظيمي',
    administrationDesc: 'سيتم تحديد هذا المحور بالتنسيق مع الجمعية.',
    maintenance: 'محور الصيانة والإصلاح',
    maintenanceDesc: 'صيانة ممتلكات الجمعية ومعداتها.',
    maintenanceItems: ['صيانة المعدات الطبية', 'صيانة مركبات الجمعية', 'صيانة وإصلاح مقر الجمعية', 'موارد الصيانة المتاحة'],
  },
}

const axisDefinitions = [
  { id: 'recreational', number: '01', title: 'recreational', description: 'recreationalDesc', icon: '✳', items: 'recreationalItems' },
  { id: 'scientific', number: '02', title: 'scientific', description: 'scientificDesc', icon: '⌘', items: 'scientificItems' },
  { id: 'media', number: '03', title: 'media', description: 'mediaDesc', icon: '◉', items: 'mediaItems' },
  {
    id: 'services', number: '04', title: 'services', description: 'servicesDesc', icon: '♡',
    groups: [
      { title: 'treatment', items: [], pending: true },
      { title: 'medical', items: 'medicalItems' },
      { title: 'social', items: 'socialItems' },
    ],
  },
  {
    id: 'finance', number: '05', title: 'finance', description: 'financeDesc', icon: '◇',
    groups: [
      { title: 'income', items: 'incomeItems' },
      { title: 'expenses', items: 'expensesItems' },
    ],
  },
  { id: 'administration', number: '06', title: 'administration', description: 'administrationDesc', icon: '▤', items: [], pending: true },
  { id: 'maintenance', number: '07', title: 'maintenance', description: 'maintenanceDesc', icon: '⚙', items: 'maintenanceItems' },
]

export default function AboutPage() {
  const [selectedAxis, setSelectedAxis] = useState(null)
  const { language } = useLanguage()
  const text = translations[language] || translations.en

  const axes = axisDefinitions.map((axis) => ({
    ...axis,
    title: text[axis.title],
    description: text[axis.description],
    items: Array.isArray(axis.items)
      ? axis.items
      : text[axis.items],
    groups: axis.groups?.map((group) => ({
      ...group,
      title: text[group.title],
      items: Array.isArray(group.items)
        ? group.items
        : text[group.items] || [],
    })),
  }))

  const activeAxis = axes.find((axis) => axis.id === selectedAxis)

  function openAxis(id) {
    setSelectedAxis(id)

    window.setTimeout(() => {
      document
        .getElementById('axis-details')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="site-shell about-page" dir="ltr">
      <section className="about-section section-space" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="section-heading">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                {text.who}
              </span>

              <h1>
                {text.title1}
                <br />
                <span>{text.title2}</span>
              </h1>
            </div>

            <div className="about-copy">
              <p>{text.intro}</p>
              <Link className="inline-link" to="/contact">
                {text.contactAssociation} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="values-row">
            {text.values.map((value, index) => (
              <article className="value-item" key={index}>
                <span className="value-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{value[0]}</h3>
                  <p>{value[1]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="axes-section section-space" id="axes">
        <div className="container">
          <div className="axes-heading">
            <div className="section-heading">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                {text.what}
              </span>

              <h2>
                {text.areas}<span className="heading-period">.</span>
              </h2>

              <p className="section-description">{text.selectArea}</p>
            </div>

            <div className="axes-count">
              <strong>07</strong>
              <span>{text.mainAreas}</span>
            </div>
          </div>

          <div className="axes-grid">
            {axes.map((axis) => (
              <button
                className={`axis-card ${selectedAxis === axis.id ? 'is-selected' : ''}`}
                key={axis.id}
                type="button"
                onClick={() => openAxis(axis.id)}
                aria-pressed={selectedAxis === axis.id}
              >
                <div className="axis-card-top">
                  <span className="axis-number">{axis.number}</span>
                  <span className="axis-icon" aria-hidden="true">{axis.icon}</span>
                </div>

                <h3>{axis.title}</h3>
                <p>{axis.description}</p>

                <div className="axis-card-bottom">
                  <span>
                    {axis.groups
                      ? `${axis.groups.length} ${text.sections}`
                      : axis.pending && axis.items.length === 0
                        ? text.toDefine
                        : `${axis.items.length} ${text.activities}`}
                  </span>

                  <span className="axis-arrow" aria-hidden="true">→</span>
                </div>
              </button>
            ))}
          </div>

          {activeAxis && (
            <section className="axis-details" id="axis-details" aria-live="polite">
              <div className="details-heading">
                <div>
                  <span className="eyebrow">
                    {text.area} {activeAxis.number}
                  </span>
                  <h3>{activeAxis.title}</h3>
                  <p>{activeAxis.description}</p>
                </div>

                <button
                  className="details-close"
                  type="button"
                  onClick={() => setSelectedAxis(null)}
                  aria-label={text.close}
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
                        <p className="pending-message">{text.pending}</p>
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
                <p className="pending-message">{text.pendingArea}</p>
              )}
            </section>
          )}
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-inner">
          <div>
            <span className="eyebrow eyebrow-light">
              <span className="eyebrow-line" />
              {text.stay}
            </span>

            <h2>
              {text.together1}
              <br />
              {text.together2}
            </h2>

            <p>{text.contactNote}</p>
          </div>

          <Link className="button button-light" to="/contact">
            {text.contactUs} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
