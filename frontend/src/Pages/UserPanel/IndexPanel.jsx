import React from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from '../../Components/NavBar/NavBar'
import TopBar from '../../Components/TopBar/TopBar'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/UserPanel/Sidebar/Sidebar'

import './IndexPanel.css'

export default function IndexPanel() {
  return (
    <>
      <TopBar />
      <NavBar />

      <section className="content">
        <div className="content-header">
          <div className="container">
            <span className="content-header__title">my User Account</span>
            <span className="content-header__subtitle">Counter</span>
          </div>
        </div>
        <div className="content-main">
          <div className="container">
            <div className="row">
              <Sidebar />

              <Outlet />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
