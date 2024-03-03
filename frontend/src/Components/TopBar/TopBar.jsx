import React, {memo, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import './TopBar.css'

export default memo(function TopBar() {
  const [allTopBarLinks, setAllTopBarLinks] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`)
      .then((res) => res.json())
      .then((data) => {
        setAllTopBarLinks(data)
      })
  }, [])

  const getRandomItemsFromArray = (array, randomCount) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, randomCount)
  }

  return (
    <>
      <div className="top-bar">
        <div className="container-fluid">
          <div className="top-bar__content">
            <div className="top-bar__right">
              <ul className="top-bar__menu">
                {getRandomItemsFromArray(allTopBarLinks, 5).map((item) => (
                  <li
                    className="top-bar__item"
                    key={item._id}>
                    <Link
                      to={item.href}
                      className="top-bar__link">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="top-bar__left">
              <div className="top-bar__email">
                <i className="fas fa-envelope top-bar__email-icon"></i>
                <Link
                  to="#"
                  className="top-bar__email-text top-bar__link">
                  sabzlearn@gmail.com
                </Link>
              </div>
              <div className="top-bar__phone">
                <i className="fas fa-phone top-bar__phone-icon"></i>
                <Link
                  to="#"
                  className="top-bar__phone-text top-bar__link">
                  09921558293
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})
