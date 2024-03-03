import React, {useEffect, useState} from 'react'
import TopBar from '../../Components/TopBar/TopBar'
import Navbar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import CourseDetailBox from '../../Components/CourseDetailBox/CourseDetailBox'
import CommentsTextArea from '../../Components/CommentsTextArea/CommentsTextArea'
import Accordion from 'react-bootstrap/Accordion'
import {Link, useParams} from 'react-router-dom'
import swal from 'sweetalert'

import './CourseInfo.css'

export default function CourseInfo() {
  const [comments, setComments] = useState([])
  const [sessions, setSessions] = useState([])
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [courseDetails, setCourseDetails] = useState({})
  const [courseTeacher, setCourseTeacher] = useState({})
  const [courseCategory, setCourseCategory] = useState({})
  const [relatedCourses, setRelatedCourses] = useState([])

  const {courseName} = useParams()

  useEffect(() => {
    getCourseDetails()

    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then((res) => res.json())
      .then((allData) => {
        console.log(allData)
        setRelatedCourses(allData)
      })
  }, [courseName])

  function getCourseDetails() {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          localStorageData === null ? null : localStorageData.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        setComments(courseInfo.comments)
        setSessions(courseInfo.sessions)
        setCourseDetails(courseInfo)
        setCreatedAt(courseInfo.createdAt)
        setUpdatedAt(courseInfo.updatedAt)
        setCourseTeacher(courseInfo.creator)
        setCourseCategory(courseInfo.categoryID)
      })
  }

  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: 'The desired comment was registered successfully',
          icon: 'success',
          buttons: 'Okay',
        })
      })
  }

  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: 'Are you sure you want to register for the course?',
        icon: 'warning',
        buttons: ['No', 'Yes'],
      }).then((result) => {
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              price: course.price,
            }),
          }).then((res) => {
            console.log(res)
            if (res.ok) {
              swal({
                title: 'Registration successful',
                icon: 'success',
                buttons: 'Okay',
              }).then(() => {
                getCourseDetails()
              })
            }
          })
        }
      })
    } else {
      swal({
        title: 'Are you sure you want to register for the course?',
        icon: 'warning',
        buttons: ['No', 'Yes'],
      }).then((result) => {
        if (result) {
          swal({
            title: 'Enter discount code if you have one:',
            content: 'input',
            buttons: ['Register without discount code', 'Apply discount code'],
          }).then((code) => {
            if (code === null) {
              fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                  }`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  price: course.price,
                }),
              }).then((res) => {
                console.log(res)
                if (res.ok) {
                  swal({
                    title: 'Registration successful',
                    icon: 'success',
                    buttons: 'Okay',
                  }).then(() => {
                    getCourseDetails()
                  })
                }
              })
            } else {
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                  }`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  course: course._id,
                }),
              })
                .then((res) => {
                  console.log(res)

                  if (res.status == 404) {
                    swal({
                      title: 'Invalid discount code',
                      icon: 'error',
                      buttons: 'Oh, no!',
                    })
                  } else if (res.status == 409) {
                    swal({
                      title: 'Discount code already used :/',
                      icon: 'error',
                      buttons: 'Oh, no!',
                    })
                  } else {
                    return res.json()
                  }
                })
                .then((code) => {
                  fetch(
                    `http://localhost:4000/v1/courses/${course._id}/register`,
                    {
                      method: 'POST',
                      headers: {
                        Authorization: `Bearer ${
                          JSON.parse(localStorage.getItem('user')).token
                        }`,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        price:
                          course.price - (course.price * code.percent) / 100,
                      }),
                    }
                  ).then((res) => {
                    console.log(res)
                    if (res.ok) {
                      swal({
                        title: 'Registration successful',
                        icon: 'success',
                        buttons: 'Okay',
                      }).then(() => {
                        getCourseDetails()
                      })
                    }
                  })
                })
            }
          })
        }
      })
    }
  }

  return (
    <>
      <TopBar />
      <Navbar />

      <Breadcrumb
        links={[
          {id: 1, title: 'Home', to: ''},
          {
            id: 2,
            title: 'Frontend programming training',
            to: 'category-info/frontend',
          },
          {
            id: 3,
            title: 'JavaScript expert course',
            to: 'course-info/js-expert',
          },
        ]}
      />

      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a
                href="#"
                className="course-info__link">
                {courseCategory.title}
              </a>
              <h1 className="course-info__title">{courseDetails.name}</h1>
              <p className="course-info__text">{courseDetails.description}</p>
              <div className="course-info__social-media">
                <a
                  href="#"
                  className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a
                  href="#"
                  className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a
                  href="#"
                  className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-6">
              <video
                src=""
                poster="/images/courses/js_project.png"
                className="course-info__video"
                controls></video>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course">
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailBox
                      icon="graduation-cap"
                      title="Course status :"
                      text={
                        courseDetails.isComplete === 1
                          ? 'Finished'
                          : 'In progress'
                      }
                    />
                    <CourseDetailBox
                      icon="clock"
                      title="holding time :"
                      text={createdAt.slice(0, 10)}
                    />
                    <CourseDetailBox
                      icon="calendar-alt"
                      title="Last update :"
                      text={updatedAt.slice(0, 10)}
                    />
                  </div>
                </div>
                {/* Start Course Progress */}
                <div className="course-progress">
                  <div className="course-progress__header">
                    <i className="fas fa-chart-line course-progress__icon"></i>
                    <span className="course-progress__title">
                      Course progress percentage: 75%
                    </span>
                  </div>
                  <div className="progress course-progress__bar">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{width: '75%'}}></div>
                  </div>
                </div>
                {/* Finish Course Progress */}

                {/* Start Introduction */}

                <div className="introduction">
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      Training of 20 JavaScript libraries for the job market
                    </span>
                    <img
                      src="/images/info/1.gif"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      There are many libraries for the JavaScript language, and
                      several new libraries are added to this list every year,
                      which are heavily used in the job market, and if you enter
                      the job market without knowing these libraries, you will
                      be very annoyed. And you may even be disappointed!
                    </p>
                    <p className="introduction__text">
                      In this course, you will be taught how to work with 20 of
                      the most used JavaScript libraries in a project-oriented
                      manner so that you will not have any problems entering the
                      job market.
                    </p>
                  </div>
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      What is the purpose of this course?
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      When I first entered one of the programming companies,
                      libraries called Lodash and Formik were used, while I had
                      heard the name Formik for the first time and had not used
                      these libraries until then.
                    </p>
                    <p className="introduction__text">
                      It was here that I realized that JavaScript libraries are
                      one of the most important topics that every web programmer
                      should have worked with in order to enter the job market
                      and earn better, more easily, and more{' '}
                    </p>
                    <p className="introduction__text">
                      As it is clear from the name of this course, the purpose
                      of this course is to teach 20 of the most practical and
                      widely used JavaScript libraries so that you can continue
                      the path of web programming with more strength and
                      preparation after this course. Learn React or Node or…
                      more easily and finally enter the job market and earn
                      money.
                    </p>
                    <p className="introduction__text">
                      As a web developer, at least if you haven't worked with a
                      particular library, you should know how to learn a new
                      library. Suppose a new library is created. Do you have to
                      wait for the training course?! Definitely not.
                    </p>
                    <p className="introduction__text">
                      In this course, in addition to the direct training of each
                      library, we also tried to teach you how to learn a new
                      library, so that after completing the course, you are no
                      longer dependent on any particular course or person, and
                      if a new library is added to the JavaScript and web world.
                      You can easily learn it.
                    </p>
                  </div>
                  <div className="introduction__btns">
                    <a
                      href="#"
                      className="introduction__btns-item">
                      Download all videos
                    </a>
                    <a
                      href="#"
                      className="introduction__btns-item">
                      Download all attachments
                    </a>
                  </div>

                  <div className="introduction__topic">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item
                        eventKey="0"
                        className="accordion">
                        <Accordion.Header>Course meetings</Accordion.Header>
                        {sessions.map((session, index) => (
                          <Accordion.Body
                            key={session._id}
                            className="introduction__accordion-body">
                            {session.free === 1 ||
                            courseDetails.isUserRegisteredToThisCourse ? (
                              <>
                                <div className="introduction__accordion-right">
                                  <span className="introduction__accordion-count">
                                    {index + 1}
                                  </span>
                                  <i className="fab fa-youtube introduction__accordion-icon"></i>
                                  <Link
                                    to={`/${courseName}/${session._id}`}
                                    className="introduction__accordion-link">
                                    {session.title}
                                  </Link>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time">
                                    {session.time}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="introduction__accordion-right">
                                  <span className="introduction__accordion-count">
                                    {index + 1}
                                  </span>
                                  <i className="fab fa-youtube introduction__accordion-icon"></i>
                                  <span className="introduction__accordion-link">
                                    {session.title}
                                  </span>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time">
                                    {session.time}
                                  </span>
                                  <i className="fa fa-lock"></i>
                                </div>
                              </>
                            )}
                          </Accordion.Body>
                        ))}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                {/* Finish Introduction */}

                {/* Start Teacher Details */}

                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <img
                        src="/images/info/teacher.jfif"
                        alt="Teacher Profile"
                        className="techer-details__header-img"
                      />
                      <div className="techer-details__header-titles">
                        <a
                          href="#"
                          className="techer-details__header-link">
                          {courseTeacher.name}
                        </a>
                        <span className="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span className="techer-details__header-name">
                        Teacher
                      </span>
                    </div>
                  </div>

                  <p className="techer-details__footer">
                    First of all, I started Android programming and worked with
                    Android Java for almost 2 years. Then I decided to work in
                    the web field. And...
                  </p>
                </div>

                {/* Finish Teacher Details */}

                <CommentsTextArea
                  comments={comments}
                  submitComment={submitComment}
                />
              </div>
            </div>

            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    {courseDetails.isUserRegisteredToThisCourse === true ? (
                      <span className="course-info__register-title">
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>
                        You are a course student
                      </span>
                    ) : (
                      <span
                        className="course-info__register-title"
                        onClick={() => registerInCourse(courseDetails)}>
                        Register for the course
                      </span>
                    )}
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span className="course-info__total-sale-text">
                          Number of students:
                        </span>
                        <span className="course-info__total-sale-number">
                          {courseDetails.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          67 opinions
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          14,234 views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">
                      Short link
                    </span>
                  </div>
                  <span className="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">
                    Course headings
                  </span>
                  <span className="course-info__topic-text">
                    To view or download the course on word
                    <a
                      href="#"
                      style={{color: 'blue', fontWeight: 'bold'}}>
                      link
                    </a>
                    click
                  </span>
                </div>
                {relatedCourses.length !== 0 && (
                  <div className="course-info">
                    <span className="course-info__courses-title">
                      Related courses
                    </span>
                    <ul className="course-info__courses-list">
                      {relatedCourses.map((course) => (
                        <li className="course-info__courses-list-item">
                          <Link
                            to={`/course-info/${course.shortName}`}
                            className="course-info__courses-link">
                            <img
                              src={`http://localhost:4000/courses/covers/${course.cover}`}
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              {course.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
