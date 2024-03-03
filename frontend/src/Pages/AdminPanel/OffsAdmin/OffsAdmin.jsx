import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import Input from '../../../Components/Form/Input/Input'
import {UseForm} from '../../../Hooks/UseForm'
import {minLengthValidator, requiredValidator} from '../../../Validators/Rules'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Offs() {
  const [courses, setCourses] = useState([])
  const [offs, setOffs] = useState([])
  const [offCourse, setOffCourse] = useState('-1')
  const [formState, onInputHandler] = UseForm(
    {
      code: {
        value: '',
        isValid: false,
      },
      percent: {
        value: '',
        isValid: false,
      },
      max: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllOffs()

    fetch(`${API_BASE_URL}/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses))
  }, [])

  function getAllOffs() {
    fetch(`${API_BASE_URL}/offs`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allOffs) => {
        setOffs(allOffs)
      })
  }

  const createOff = (event) => {
    event.preventDefault()

    const newOffInfos = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      course: offCourse,
      max: formState.inputs.max.value,
    }

    fetch(`${API_BASE_URL}/offs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      body: JSON.stringify(newOffInfos),
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        swal({
          title: 'The discount code has been created successfully',
          icon: 'success',
          buttons: 'Okay',
        }).then(() => {
          getAllOffs()
        })
      }
    })
  }

  const removeOff = (offID) => {
    swal({
      title: 'Are you sure to remove the discount code?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/offs/${offID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'The desired discount code has been successfully deleted',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllOffs()
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
          <span>Add a new Discount</span>
        </div>
        <form className="form">
          <div className="col-6 item-form">
            <div className="price input">
              <label className="input-title">Discount Code</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="code"
                validations={[minLengthValidator(5)]}
                placeholder="Please enter the Discount Code"
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="price input">
              <label className="input-title">Discount Percent</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="percent"
                validations={[requiredValidator()]}
                placeholder="Please enter the Discount Percentage"
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">Maximum Use</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="max"
                validations={[requiredValidator()]}
                placeholder="Maximum use of the discount code"
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6 item-form">
            <div className="price input">
              <label
                className="input-title"
                style={{display: 'block'}}>
                Courses
              </label>
              <select
                className="select"
                onChange={(event) => setOffCourse(event.target.value)}>
                <option value="-1">Select the desired course</option>
                {courses.map((course) => (
                  <option
                    key={course._id}
                    value={course._id}>
                    {course.name}
                  </option>
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
                  onClick={createOff}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="Discount Codes">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Percent</th>
              <th>Maximum Use</th>
              <th>Frequency of Use</th>
              <th>Manufacturer</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.max}</td>
                <td>{off.uses}</td>
                <td>{off.creator}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeOff(off._id)}>
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
