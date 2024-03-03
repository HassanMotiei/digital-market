import React, {useContext} from 'react'
import AuthContext from '../../../Context/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import swal from 'sweetalert'

export default function Sidebar() {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const logoutUser = (event) => {
    event.preventDefault()

    swal({
      title: 'Are you sure about the exit?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      console.log(result)
      if (result) {
        swal({
          title: 'You have exited successfully',
          icon: 'success',
          buttons: 'Okay',
        }).then(() => {
          authContext.logout()
          navigate('/')
        })
      }
    })
  }

  return (
    <div className="col-3">
      <div className="sidebar">
        <span className="sidebar__name">Mohammad Amin Saeedi Rad</span>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link
              className="sidebar__link"
              to="/my-account">
              Counter
            </Link>
          </li>
          <li className="sidebar__item">
            <Link
              className="sidebar__link"
              to="orders">
              Orders
            </Link>
          </li>
          <li className="sidebar__item">
            <a
              className="sidebar__link"
              href="#">
              my Wallet
            </a>
          </li>
          <li className="sidebar__item">
            <Link
              className="sidebar__link"
              to="edit-account">
              Account details
            </Link>
          </li>
          <li className="sidebar__item">
            <Link
              className="sidebar__link"
              to="buyed">
              Purchased Courses
            </Link>
          </li>
          <li className="sidebar__item">
            <Link
              className="sidebar__link"
              to="tickets">
              Support Tickets
            </Link>
          </li>
          <li
            className="sidebar__item"
            onClick={logoutUser}>
            <a
              className="sidebar__link"
              href="#">
              Log-out
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
