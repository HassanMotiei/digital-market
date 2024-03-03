import React, {useEffect, useState} from 'react'
import TopBar from '../../Components/TopBar/TopBar'
import Navbar from '../../Components/NavBar/NavBar'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import Footer from '../../Components/Footer/Footer'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Pagination from '../../Components/Pagination/Pagination'

import './Courses.css'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [shownCourses, setShownCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses))
  }, [])

  return (
    <>
      <TopBar />
      <Navbar />

      <Breadcrumb
        links={[
          {id: 1, title: 'Home', to: ''},
          {
            id: 2,
            title: 'All Courses',
            to: 'courses/1',
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownCourses.map((course) => (
                  <CourseBox
                    {...course}
                    key={course._id}
                  />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={courses}
            itemsCount={3}
            pathname="/courses"
            setShownCourses={setShownCourses}
          />
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </>
  )
}
