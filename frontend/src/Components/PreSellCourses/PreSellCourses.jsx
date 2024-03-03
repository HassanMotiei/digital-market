import React, {useEffect, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import SectionHeader from '../SectionHeader/SectionHeader'
import './PreSellCourses.css'
import CourseBox from '../CourseBox/CourseBox'

export default function PreSellCourses() {
  const [preSellCourses, setPreSellCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/presell`)
      .then((response) => response.json())
      .then((allPreSellCourses) => {
        console.log(allPreSellCourses)
        setPreSellCourses(allPreSellCourses)
      })
  }, [])

  return (
    <>
      <div className="preSell">
        <div className="container">
          <SectionHeader
            title={'Pre-sale courses'}
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
                  {preSellCourses.map((course) => (
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
