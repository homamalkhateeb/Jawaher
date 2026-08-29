import { Outlet } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

import './SiteLayout.css'

function SiteLayout() {
  return (
    <div className="site-layout">

      <Navbar />

      <main className="site-layout-content">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default SiteLayout
