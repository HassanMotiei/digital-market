import React, {useEffect, useState} from 'react'
import './LatestCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseBox from '../CourseBox/CourseBox'

export default function LatestCourses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses))
  }, [])

  return (
    <div className="courses">
      <div className="container">
        <SectionHeader
          title={'The latest courses'}
          desc={'Your launch pad to success'}
          btnTitle={'All courses'}
          btnHref={'courses/1'}
        />

        <div className="courses-content">
          <div className="container">
            <div className="row">
              {courses.slice(0, 6).map((course) => (
                <CourseBox
                  key={course._id}
                  {...course}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
