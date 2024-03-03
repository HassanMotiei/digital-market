import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import Input from '../../../Components/Form/Input/Input'
import {UseForm} from '../../../Hooks/UseForm'
import {minLengthValidator} from '../../../Validators/Rules'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Sessions() {
  const [courses, setCourses] = useState([])
  const [sessionCourse, setSessionCourse] = useState('-1')
  const [sessionVideo, setSessionVideo] = useState({})
  const [sessions, setSessions] = useState([])
  const [isSessionFree, setIsSessionFree] = useState(0)

  const [formState, onInputHandler] = UseForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      time: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllSessions()

    fetch(`${API_BASE_URL}/courses`)
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses)
        setCourses(allCourses)
      })
  }, [])

  function getAllSessions() {
    fetch(`${API_BASE_URL}/courses/sessions`)
      .then((res) => res.json())
      .then((allSessions) => setSessions(allSessions))
  }

  const createSession = (event) => {
    event.preventDefault()

    const localStorageData = JSON.parse(localStorage.getItem('user'))

    let formData = new FormData()
    formData.append('title', formState.inputs.title.value)
    formData.append('time', formState.inputs.time.value)
    formData.append('video', sessionVideo)
    formData.append('free', isSessionFree)

    fetch(`${API_BASE_URL}/courses/${sessionCourse}/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'The desired session has been successfully added',
          icon: 'success',
          buttons: 'Okay',
        }).then(() => {
          getAllSessions()
        })
      }
    })
  }

  const removeSession = (sessionID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title: 'Are you sure to delete the session?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/courses/sessions/${sessionID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'The desired session was successfully deleted',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllSessions()
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
          <span>Add a new Session</span>
        </div>
        <form className="form">
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">The title of the session</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="title"
                validations={[minLengthValidator(5)]}
                placeholder="Please enter the session name..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="price input">
              <label className="input-title">Session duration</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                type="text"
                id="time"
                validations={[minLengthValidator(5)]}
                placeholder="Please enter the duration of the meeting..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="price input">
              <label
                className="input-title"
                style={{display: 'block'}}>
                Course
              </label>
              <select
                className="select"
                onChange={(event) => setSessionCourse(event.target.value)}>
                <option value="-1">Select the desired course</option>
                {courses.map((course) => (
                  <option
                    value={course._id}
                    key={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">The title of the session</label>
              <input
                type="file"
                onChange={(event) => setSessionVideo(event.target.files[0])}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="condition input">
              <label className="input-title">Course status</label>
              <div className="radios">
                <div className="available">
                  <label>
                    <span>Non-free</span>
                    <input
                      type="radio"
                      value="0"
                      name="condition"
                      checked
                      onInput={(event) => setIsSessionFree(event.target.value)}
                    />
                  </label>
                </div>
                <div className="unavailable">
                  <label>
                    <span>Free</span>
                    <input
                      type="radio"
                      value="1"
                      name="condition"
                      onInput={(event) => setIsSessionFree(event.target.value)}
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
                  onClick={createSession}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="Sessions">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Time</th>
              <th>Course</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session._id}>
                <td>{index + 1}</td>
                <td>{session.title}</td>
                <td>{session.time}</td>
                <td>{session.course.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeSession(session._id)}>
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
