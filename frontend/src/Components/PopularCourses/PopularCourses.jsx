import React, {useEffect, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import SectionHeader from '../SectionHeader/SectionHeader'
import './PopularCourses.css'
import CourseBox from '../CourseBox/CourseBox'

export default function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/popular`)
      .then((response) => response.json())
      .then((allPopularCourses) => {
        console.log(allPopularCourses)
        setPopularCourses(allPopularCourses)
      })
  }, [])

  return (
    <>
      <div className="popular">
        <div className="container">
          <SectionHeader
            title={'The most popular courses'}
            btnTitle={''}
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  className="mySwiper">
                  {popularCourses.map((course) => (
                    <SwiperSlide key={course._id}>
                      <CourseBox
                        {...course}
                        isSlider={true}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
