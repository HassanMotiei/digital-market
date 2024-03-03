import React, {useEffect, useState} from 'react'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import Footer from '../../Components/Footer/Footer'
import ArticleBox from '../../Components/ArticleBox/ArticleBox'
import Pagination from '../../Components/Pagination/Pagination'
import './Articles.css'

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [shownArticles, setShownArticles] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        console.log(allArticles)
        setArticles(allArticles)
      })
  }, [])

  return (
    <>
      <TopBar />
      <NavBar />

      <Breadcrumb
        links={[
          {id: 1, title: 'Home', to: ''},
          {
            id: 2,
            title: 'All Articles',
            to: 'articles/1',
          },
        ]}
      />

      {/* <!--------------------------------  Articles-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownArticles.map((article) => (
                  <ArticleBox
                    {...article}
                    key={article._id}
                  />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={articles}
            itemsCount={3}
            pathname="/articles"
            setShownCourses={setShownArticles}
          />
        </div>
      </section>
      {/* <!--------------------------------  Articles-Section  --------------------------------> */}

      <Footer />
    </>
  )
}
