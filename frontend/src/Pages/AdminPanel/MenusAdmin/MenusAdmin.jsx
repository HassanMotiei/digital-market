import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import Input from '../../../Components/Form/Input/Input'
import {UseForm} from '../../../Hooks/UseForm'
import {minLengthValidator} from '../../../Validators/Rules'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Menus() {
  const [menus, setMenus] = useState([])
  const [menuParent, setMenuParent] = useState('-1')

  const [formState, onInputHandler] = UseForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      href: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllMenus()
  }, [])

  function getAllMenus() {
    fetch(`${API_BASE_URL}/menus/all`)
      .then((res) => res.json())
      .then((allMenus) => setMenus(allMenus))
  }

  const removeMenu = (menuID) => {
    swal({
      title: 'Are you sure you want to delete the Menu?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/menus/${menuID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'The desired menu was successfully deleted',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllMenus()
            })
          }
        })
      }
    })
  }

  const createMenu = (event) => {
    event.preventDefault()

    const newMenuInfo = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent === '-1' ? undefined : menuParent,
    }

    fetch(`${API_BASE_URL}/menus`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMenuInfo),
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        swal({
          title: 'A new Menu created successfully',
          icon: 'success',
          buttons: 'Okay',
        }).then(() => {
          getAllMenus()
        })
      }
    })
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="home-title">
          <span>Add new user</span>
        </div>
        <form className="form">
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">Title</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="Please enter Title..."
                validations={[minLengthValidator(5)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">Title</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minLengthValidator(5)]}
                placeholder="Please enter Title..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">Title</label>
              <select
                className="select"
                onChange={(event) => setMenuParent(event.target.value)}>
                <option value="-1">Select the main Menu</option>
                {menus.map((menu) => (
                  <>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="Add"
                  onClick={createMenu}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="Menus">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Destination</th>
              <th>Child...</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>
                  {menu.parent ? (
                    menu.parent.title
                  ) : (
                    <i className="fa fa-check"></i>
                  )}
                </td>
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
                    className="btn btn-danger delete-btn"
                    onClick={() => removeMenu(menu._id)}>
                    Delete
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
