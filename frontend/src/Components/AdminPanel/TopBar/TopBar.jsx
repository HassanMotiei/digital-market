import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

export default function TopBar() {
  const [adminInfo, setAdminInfo] = useState({})
  const [adminNotifications, setAdminNotifications] = useState([])
  const [isShowNotificationsBox, setIsShowNotificationsBox] = useState(false)

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminInfo(data)
        setAdminNotifications(data.notifications)
      })
  }, [seeNotification])

  function seeNotification(notificationID) {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${
            isShowNotificationsBox && 'active-modal-notification'
          }`}>
          <div className="home-right">
            <div className="home-searchbar">
              <input
                type="text"
                className="search-bar"
                placeholder="Search ..."
              />
            </div>
            <div className="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationsBox(true)}>
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationsBox(true)}
              onMouseLeave={() => setIsShowNotificationsBox(false)}>
              <ul className="home-notification-modal-list">
                {adminNotifications.length === 0 ? (
                  <li className="home-notification-modal-item-empty">
                    There are no notifications to show
                  </li>
                ) : (
                  <>
                    {adminNotifications.map((notification) => (
                      <li className="home-notification-modal-item">
                        <span className="home-notification-modal-text">
                          {notification.msg}
                        </span>
                        <label className="switch">
                          <Link
                            to="javascript:void(0)"
                            onClick={() => seeNotification(notification._id)}>
                            I saw
                          </Link>
                        </label>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img
                    src={adminInfo.profile}
                    alt=""
                  />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
