import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Residential from './pages/Residential'
import Commercial from './pages/Commercial'
import Construction from './pages/Construction'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import Process from './pages/Process'
import About from './pages/About'
import Contact from './pages/Contact'
import Insights from './pages/Insights'
import InsightPost from './pages/InsightPost'
import { PrivacyPolicy, Terms } from './pages/Legal'
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

const Admin = lazy(() => import('./pages/Admin'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/residential-interiors" element={<Residential />} />
        <Route path="/commercial-interiors" element={<Commercial />} />
        <Route path="/construction" element={<Construction />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<ProjectDetail />} />
        <Route path="/process" element={<Process />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightPost />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
