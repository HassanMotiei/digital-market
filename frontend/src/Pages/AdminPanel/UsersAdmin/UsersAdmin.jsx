import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import Input from '../../../Components/Form/Input/Input'
import {UseForm} from '../../../Hooks/UseForm'
import {
  emailValidator,
  maxLengthValidator,
  minLengthValidator,
  requiredValidator,
} from '../../../Validators/Rules'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Users() {
  const [users, setUsers] = useState([])
  const [formState, onInputHandler] = UseForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      username: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      phone: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllUsers()
  }, [])

  async function getAllUsers() {
    try {
      const localStorageData = JSON.parse(localStorage.getItem('user'))
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
      const allUsers = await response.json()
      setUsers(allUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const removeUser = async (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    try {
      const result = await swal({
        title: 'Are you sure to delete?',
        icon: 'warning',
        buttons: ['No', 'Yes'],
      })

      if (result) {
        const response = await fetch(`${API_BASE_URL}/users/${userID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })

        if (response.ok) {
          await swal({
            title: 'User deleted successfully',
            icon: 'success',
            buttons: 'Okay',
          })
          await getAllUsers()
        } else {
          console.error('Error deleting user. Server response:', response)
        }
      }
    } catch (error) {
      console.error('Error removing user:', error)
    }
  }

  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'Are you sure about the Ban?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/users/ban/${userID}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              swal({
                title: 'User has been successfully banned',
                icon: 'success',
                buttons: 'Okay',
              })
            } else {
              console.error('Error banning user. Server response:', res)
            }
          })
          .catch((error) => {
            console.error('Error banning user:', error)
          })
      }
    })
  }

  const registerNewUser = (event) => {
    event.preventDefault()
    const newUserInfo = {
      name: `${formState.inputs.name.value}`,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    }

    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => {
        return res.json()
      })
      .then(() => {
        swal({
          title: 'The desired user has been successfully added',
          icon: 'success',
          buttons: 'Okay',
        })
        getAllUsers()
      })
  }

  const changeRole = (userID) => {
    swal({
      title: 'Please enter the new role :',
      content: 'input',
    }).then((value) => {
      if (value.length) {
        const reqBodyInfos = {
          role: value,
          id: userID,
        }

        fetch(`${API_BASE_URL}/users/role`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqBodyInfos),
        }).then((res) => {
          if (res.ok) {
            swal({
              title:
                'The role of the desired user has been successfully changed',
              icon: 'success',
              buttons: 'Very Great',
            })
          }
        })
      }
    })
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="home-title">
          <span>Add new User</span>
        </div>
        <form className="form">
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">FirstName and LastName</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minLengthValidator(8),
                  maxLengthValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="Please enter the user's first and last name..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="family input">
              <label className="input-title">UserName</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minLengthValidator(8),
                  maxLengthValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="Please enter a UserName..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="email input">
              <label className="input-title">Email</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minLengthValidator(8),
                  maxLengthValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="Please enter the User's Email..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="password input">
              <label className="input-title">Password</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minLengthValidator(8),
                  maxLengthValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="Please enter the user password..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="phone input">
              <label className="input-title">PhoneNumber</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minLengthValidator(8),
                  maxLengthValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="Please enter the user's phone number..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="Add"
                  onClick={registerNewUser}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="Users">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FirstName and LastName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Level Change</th>
              <th>Delete</th>
              <th>Ban</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                {/* <td>09123443243</td> */}
                <td>{user.email}</td>
                <td>{user.role === 'ADMIN' ? 'Admin' : 'Normal User'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => changeRole(user._id)}>
                    Change Role
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeUser(user._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => banUser(user._id)}>
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
