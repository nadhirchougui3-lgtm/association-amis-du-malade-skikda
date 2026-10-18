import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ContactPage from './pages/ContactPage'
import AccountPage from './pages/AccountPage'

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/activities"
            element={<PlaceholderPage title="Our Activities" />}
          />

          <Route
            path="/news"
            element={<PlaceholderPage title="Latest News" />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />

          <Route
            path="/account"
            element={<AccountPage />}
          />

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
