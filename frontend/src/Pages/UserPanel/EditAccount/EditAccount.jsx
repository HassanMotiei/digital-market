import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../../Context/AuthContext'
import swal from 'sweetalert'

import './EditAccount.css'

export default function EditAccount() {
  const authContext = useContext(AuthContext)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setName(authContext.userInfos.name)
    setPhone(authContext.userInfos.phone)
    setUsername(authContext.userInfos.username)
    setUsername(authContext.userInfos.username)
    setEmail(authContext.userInfos.email)
  }, [])

  const editAccount = (event) => {
    event.preventDefault()

    const userNewInfos = {
      name,
      username,
      email,
      password,
      phone,
    }

    fetch(`http://localhost:4000/v1/users/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      body: JSON.stringify(userNewInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'Your account information has been successfully Edited',
          icon: 'success',
          buttons: 'Very Great',
        })
      }
    })
  }

  return (
    <div className="col-9">
      <div className="edit">
        <form
          className="edit__form"
          action="#">
          <div className="edit__personal">
            <div className="row">
              <div className="col-12">
                <label className="edit__label">* phone number</label>
                <input
                  className="edit__input"
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Please enter your Mobile Number"
                />
              </div>

              <div className="col-12">
                <label className="edit__label">FirstName and LastName</label>
                <input
                  className="edit__input"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Please enter your Screen Name"
                />
              </div>

              <div className="col-12">
                <label className="edit__label">* Username (display)</label>
                <input
                  className="edit__input"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Please enter your Screen Name"
                />
                <span className="edit__help">
                  Your name will be seen in this way in the user account and
                  comments.
                </span>
              </div>

              <div className="col-12">
                <label className="edit__label">* E-mail</label>
                <input
                  className="edit__input"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Please enter your Screen Name"
                />
              </div>
            </div>
          </div>
          <div className="edit__password">
            <span className="edit__password-title">Change Password</span>
            <div className="row">
              <div className="col-12">
                <label className="edit__label">Repeat the New Password</label>
                <input
                  className="edit__input"
                  type="text"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Repeat the New Password"
                />
              </div>
            </div>
          </div>
          <button
            className="edit__btn"
            type="submit"
            onClick={editAccount}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
