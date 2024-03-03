import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import Input from '../../../Components/Form/Input/Input'
import {UseForm} from '../../../Hooks/UseForm'
import {minLengthValidator} from '../../../Validators/Rules'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [courseCategory, setCourseCategory] = useState('-1')
  const [categories, setCategories] = useState([])
  const [courseStatus, setCourseStatus] = useState('start')
  const [courseCover, setCourseCover] = useState({})

  const [formState, onInputHandler] = UseForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      shortName: {
        value: '',
        isValid: false,
      },
      price: {
        value: '',
        isValid: false,
      },
      support: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllCourses()

    fetch(`${API_BASE_URL}/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories)
      })
  }, [])

  function getAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`${API_BASE_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses)
        setCourses(allCourses)
      })
  }

  const removeCourse = (courseID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'Are you sure to delete the course?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/courses/${courseID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'The desired course has been successfully deleted',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllCourses()
            })
          } else {
            swal({
              title: 'There was a problem deleting the course',
              icon: 'error',
              buttons: 'Okay',
            })
          }
        })
      }
    })
  }

  const selectCategory = (event) => {
    setCourseCategory(event.target.value)
  }

  const addNewCourse = (event) => {
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('name', formState.inputs.name.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('categoryID', courseCategory)
    formData.append('price', formState.inputs.price.value)
    formData.append('support', formState.inputs.support.value)
    formData.append('status', courseStatus)
    formData.append('cover', courseCover)

    if (courseCategory === '-1') {
      swal({
        title: 'Please select a course category',
        icon: 'error',
      })
    } else {
      fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        console.log(res)
        if (res.ok) {
          swal({
            title: 'New course added successfully',
            icon: 'success',
            buttons: 'Okay',
          }).then(() => {
            getAllCourses()
          })
        }
      })
    }
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="home-title">
          <span>Add new Course</span>
        </div>
        <form className="form">
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">Course Name</label>
              <Input
                id="name"
                element="input"
                onInputHandler={onInputHandler}
                validations={[minLengthValidator(5)]}
                type="text"
                placeholder="Please enter the Course Name..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="price input">
              <label className="input-title">Course Description</label>
              <Input
                id="description"
                element="input"
                onInputHandler={onInputHandler}
                validations={[minLengthValidator(5)]}
                type="text"
                placeholder="Please enter the course description..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="number input">
              <label className="input-title">Course Url</label>
              <Input
                id="shortName"
                element="input"
                onInputHandler={onInputHandler}
                validations={[minLengthValidator(5)]}
                type="text"
                isValid="false"
                placeholder="Please enter the URL of the course..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="price input">
              <label className="input-title">Course Price</label>
              <Input
                id="price"
                element="input"
                onInputHandler={onInputHandler}
                validations={[minLengthValidator(5)]}
                type="text"
                isValid="false"
                placeholder="Please enter the price of the Course..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="price input">
              <label className="input-title">How to Support the Course</label>
              <Input
                id="support"
                element="input"
                onInputHandler={onInputHandler}
                validations={[minLengthValidator(5)]}
                type="text"
                isValid="false"
                placeholder="Please enter how to support the course..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="number input">
              <label className="input-title">Course Category</label>
              <select onChange={selectCategory}>
                <option value="-1">Please Select a Category</option>
                {categories.map((category) => (
                  <option value={category._id}>{category.title}</option>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="file input">
              <label className="input-title">Course Photo</label>
              <input
                type="file"
                id="file"
                onChange={(event) => {
                  setCourseCover(event.target.files[0])
                }}
              />
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="condition input">
              <label className="input-title">Course Status</label>
              <div className="radios">
                <div className="available">
                  <label>
                    <span>On Performing</span>
                    <input
                      type="radio"
                      value="start"
                      name="condition"
                      checked
                      onInput={(event) => setCourseStatus(event.target.value)}
                    />
                  </label>
                </div>

                <div className="unavailable">
                  <label>
                    <span>PreSell</span>
                    <input
                      type="radio"
                      value="presell"
                      name="condition"
                      onInput={(event) => setCourseStatus(event.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="Add"
                  onClick={addNewCourse}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="Courses">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>State</th>
              <th>ShortName</th>
              <th>Teacher</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  {course.price === 0 ? 'Free' : course.price.toLocaleString()}
                </td>
                <td>
                  {course.isComplete === 0 ? 'On Performing' : 'Completed'}
                </td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID}</td>
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
                    onClick={() => removeCourse(course._id)}>
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
