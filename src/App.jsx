import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PlaceholderPage from './pages/PlaceholderPage'
import ContactPage from './pages/ContactPage'
import AccountPage from './pages/AccountPage'
import MapPage from './pages/MapPage'

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route
            path="/activities"
            element={<PlaceholderPage title="Our Activities" />}
          />

          <Route
            path="/news"
            element={<PlaceholderPage title="Latest News" />}
          />

          <Route path="/map" element={<MapPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/account" element={<AccountPage />} />

          <Route
            path="/admin"
            element={<PlaceholderPage title="Admin Dashboard" />}
          />

          <Route
            path="*"
            element={<PlaceholderPage title="Page Not Found" />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
