import React from 'react'
import './IndexInfo.css'
import Header from '../../Components/Header/Header'
import LatestCourses from '../../Components/LatestCourses/LatestCourses'
import AboutUs from '../../Components/AboutUs/AboutUs'
import PopularCourses from '../../Components/PopularCourses/PopularCourses'
import PreSellCourses from '../../Components/PreSellCourses/PreSellCourses'
import LastArticles from '../../Components/LastArticles/LastArticles'
import Footer from '../../Components/Footer/Footer'

export default function IndexInfo() {
  return (
    <>
      <Header />
      <LatestCourses />
      <AboutUs />
      <PopularCourses />
      <PreSellCourses />
      <LastArticles />
      <Footer />
    </>
  )
}
