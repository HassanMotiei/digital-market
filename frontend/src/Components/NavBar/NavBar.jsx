import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../Context/AuthContext'
import {Link} from 'react-router-dom'

import './NavBar.css'

export default function NavBar() {
  const authContext = useContext(AuthContext)

  const [allMenus, setAllMenus] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus`)
      .then((res) => res.json())
      .then((menus) => {
        setAllMenus(menus)
      })
  }, [])

  return (
    <>
      <div className="main-header">
        <div className="container-fluid">
          <div className="main-header__content">
            <div className="main-header__right">
              <img
                src="/images/logo/Logo.png"
                className="main-header__logo"
                alt="SabzLearn Logo"
              />

              <ul className="main-header__menu">
                <li className="main-header__item">
                  <Link
                    to="/"
                    className="main-header__link">
                    Main Page
                  </Link>
                </li>

                {allMenus.map((menu) => (
                  <li
                    className="main-header__item"
                    key={menu._id}>
                    <Link
                      to={`${menu.href}/1`}
                      className="main-header__link">
                      {menu.title}
                      {menu.submenus.length !== 0 && (
                        <>
                          <i className="fas fa-angle-down main-header__link-icon"></i>
                          <ul className="main-header__dropdown">
                            {menu.submenus.map((submenu) => (
                              <li
                                className="main-header__dropdown-item"
                                key={submenu._id}>
                                <Link
                                  to={submenu.href}
                                  className="main-header__dropdown-link">
                                  {submenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="main-header__left">
              <Link
                to="#"
                className="main-header__search-btn">
                <i className="fas fa-search main-header__search-icon"></i>
              </Link>
              <Link
                to="#"
                className="main-header__cart-btn">
                <i className="fas fa-shopping-cart main-header__cart-icon"></i>
              </Link>

              {authContext.isLoggedIn ? (
                <Link
                  to="/my-account"
                  className="main-header__profile">
                  <span className="main-header__profile-text">
                    {authContext.userInfos.name}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="main-header__profile">
                  <span className="main-header__profile-text">
                    LogIn / SignUp
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
