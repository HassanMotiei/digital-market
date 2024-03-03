import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import Input from '../../../Components/Form/Input/Input'
import {UseForm} from '../../../Hooks/UseForm'
import {maxLengthValidator, minLengthValidator} from '../../../Validators/Rules'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Category() {
  const [formState, onInputHandler] = UseForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      shortname: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllCategories()
  }, [])

  function getAllCategories() {
    fetch(`${API_BASE_URL}/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        console.log(allCategories)
        setCategories(allCategories)
      })
  }

  const createNewCategory = (event) => {
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    }

    fetch(`${API_BASE_URL}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        swal({
          title: 'The desired category has been successfully added',
          icon: 'success',
          buttons: 'Okay',
        }).then(() => {
          getAllCategories()
        })
      })
  }

  const removeCategory = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'Are you sure to delete the category?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/category/${categoryID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })
          .then((res) => res.json())
          .then(() => {
            swal({
              title: 'The desired category has been successfully deleted',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllCategories()
            })
          })
      }
    })
  }

  const updateCategory = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'Enter the new title of the category',
      content: 'input',
      buttons: 'Register a new title',
    }).then((result) => {
      if (result.trim().length) {
        fetch(`${API_BASE_URL}/category/${categoryID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorageData.token}`,
          },
          body: JSON.stringify({
            title: result,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result)
            swal({
              title: 'The desired category has been edited successfully',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllCategories()
            })
          })
      }
    })
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="home-title">
          <span>Add new Category</span>
        </div>
        <form className="form">
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">Title</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="title"
                placeholder="Please enter Title..."
                validations={[minLengthValidator(5), maxLengthValidator(20)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">FirstName</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="shortname"
                placeholder="Please enter a short name..."
                validations={[minLengthValidator(5), maxLengthValidator(20)]}
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
                  onClick={createNewCategory}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="Categories">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => updateCategory(category._id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeCategory(category._id)}>
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
