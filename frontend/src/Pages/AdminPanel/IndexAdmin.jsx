import React from 'react'
import {Outlet} from 'react-router-dom'
import SideBar from '../../Components/AdminPanel/SideBar/SideBar'
import TopBar from '../../Components/AdminPanel/TopBar/TopBar'

import './IndexAdmin.css'

export default function index() {
  return (
    <>
      <div id="content">
        <div
          id="sidebar"
          className="col-2">
          <SideBar />
        </div>

        <div
          id="home"
          className="col-10">
          <TopBar />

          <div
            className="container-fluid"
            id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
