import React, {useEffect, useState} from 'react'

import './CoursesPanel.css'

export default function CoursesPanel() {
  const [courses, setCourses] = useState([])
  const [showCourseState, setShowCourseState] = useState('all')
  const [shownCourses, setShownCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
        setShownCourses(data)
      })
  }, [])

  const filterCourses = (state) => {
    switch (state) {
      case 'all': {
        setShownCourses(courses)
        break
      }
      case 'free': {
        const filteredCourses = courses.filter(
          (course) => course.course.price === 0
        )
        setShownCourses(filteredCourses)
        break
      }
      case 'money': {
        const filteredCourses = courses.filter(
          (course) => course.course.price !== 0
        )
        setShownCourses(filteredCourses)
        break
      }
      default: {
        setShownCourses(courses)
      }
    }
  }

  return (
    <div className="col-9">
      <div className="courses">
        <div className="courses-header__panel">
          <span className="courses-header__title">Registered Courses</span>
          <ul className="courses-header__list">
            <li
              className="courses-header__item"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState('all')
                filterCourses('all')
              }}>
              <a
                className={`courses-header__link__panel ${
                  showCourseState === 'all'
                    ? 'courses-header__link-active'
                    : null
                }`}
                href="#">
                All Courses
              </a>
            </li>
            <li
              className="courses-header__item"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState('free')
                filterCourses('free')
              }}>
              <a
                className={`courses-header__link__panel ${
                  showCourseState === 'free'
                    ? 'courses-header__link-active'
                    : null
                }`}
                href="#">
                Free Courses
              </a>
            </li>
            <li
              className="courses-header__item"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState('money')
                filterCourses('money')
              }}>
              <a
                className={`courses-header__link__panel ${
                  showCourseState === 'money'
                    ? 'courses-header__link-active'
                    : null
                }`}
                href="#">
                Paid Courses
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="row">
            <div className="col-12">
              {shownCourses.length !== 0 ? (
                <>
                  {shownCourses.map((course) => (
                    <div className="main__box">
                      <div className="main__box-right">
                        <a
                          className="main__box-img-link"
                          href="#">
                          <img
                            className="main__box-img img-fluid"
                            src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                            alt="Image"
                          />
                        </a>
                      </div>
                      <div className="main__box-left">
                        <a
                          href="#"
                          className="main__box-title">
                          {course.course.name}
                        </a>
                        <div className="main__box-bottom">
                          <div className="main__box-all">
                            <span className="main__box-all-text">وضعیت:</span>
                            <span className="main__box-all-value">
                              {course.course.isComplete === 1
                                ? 'Completed'
                                : 'On Performing'}
                            </span>
                          </div>
                          <div className="main__box-completed">
                            <span className="main__box-completed-text">
                              مبلغ:
                            </span>
                            <span className="main__box-completed-value">
                              {course.course.price === 0
                                ? 'Free'
                                : course.course.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="alert alert-danger">
                  There is no display period for this filter
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
