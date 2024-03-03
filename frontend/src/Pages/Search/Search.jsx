import React, {useEffect, useState} from 'react'
import TopBar from '../../Components/TopBar/TopBar'
import Navbar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import {useParams} from 'react-router-dom'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import ArticleBox from '../../Components/ArticleBox/ArticleBox'
import CourseBox from '../../Components/CourseBox/CourseBox'

export default function Search() {
  const [courses, setCourses] = useState([])
  const [articles, setArticles] = useState([])
  const {value} = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((allData) => {
        console.log(allData)
        setArticles(allData.allResultArticles)
        setCourses(allData.allResultCourses)
      })
  }, [value])

  return (
    <>
      <TopBar />
      <Navbar />

      <div className="courses">
        <div className="container">
          <SectionHeader
            title="Results of courses for your search"
            desc="Your launching pad to success"
            btnHref={''}
            btnTitle={''}
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length === 0 ? (
                  <div className="alert alert-warning">
                    There are no Courses for your search
                  </div>
                ) : (
                  <>
                    {courses.map((course) => (
                      <CourseBox
                        key={course._id}
                        {...course}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="courses">
        <div className="container">
          <SectionHeader
            title="Results of articles for your search"
            desc="Towards the advancement of knowledge"
            btnHref={''}
            btnTitle={''}
          />

          <div className="articles__content">
            <div className="container">
              <div className="row">
                {articles.length === 0 ? (
                  <div className="alert alert-warning">
                    There are no Articles for your search
                  </div>
                ) : (
                  <>
                    {articles.map((article) => (
                      <ArticleBox
                        {...article}
                        key={article._id}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
