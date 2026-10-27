import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Services, ServiceDetail } from './pages/Services'
import Static from './pages/Static'
import Contact from './pages/Contact'
import About from './pages/About'
import DigitalMarketing from './pages/Digitalmarketing'
import VCardsAlt from './pages/Vcardsalt'
const STATIC = ['portfolio', 'industries', 'blog', 'privacy-policy', 'terms']
export default function App() {
  return (<Routes><Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="service" element={<Services />} />
    <Route path="service/:slug" element={<ServiceDetail />} />
    <Route path="services" element={<Navigate to="/service" replace />} />
    <Route path="services/:slug" element={<ServiceDetail />} />
    <Route path="digital-marketing" element={<DigitalMarketing />} />
    <Route path="vcards" element={<VCardsAlt />} />
    <Route path="contact" element={<Contact />} />
    <Route path="about" element={<About />} />
    {STATIC.map(p => <Route key={p} path={p} element={<Static page={p} />} />)}
    <Route path="*" element={<Home />} />
  </Route></Routes>)
}