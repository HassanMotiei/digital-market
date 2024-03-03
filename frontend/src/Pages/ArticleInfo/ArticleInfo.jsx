import React, {useEffect, useState} from 'react'
import './ArticleInfo.css'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import {useParams} from 'react-router-dom'

export default function ArticleInfo() {
  const [articleDetails, setArticleDetails] = useState({})
  const [articleCategory, setArticleCategory] = useState({})
  const [articleCreator, setArticleCreator] = useState({})
  const [articleCreateDate, setArticleCreateDate] = useState('')

  const {articleName} = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then((res) => res.json())
      .then((articleInfo) => {
        console.log(articleInfo)
        setArticleDetails(articleInfo)
        setArticleCategory(articleInfo.categoryID)
        setArticleCreator(articleInfo.creator)
        setArticleCreateDate(articleInfo.createdAt)
      })
  }, [articleName])

  return (
    <>
      <TopBar />
      <NavBar />
      <Breadcrumb
        links={[
          {id: 1, title: 'Home', to: ''},
          {
            id: 2,
            title: 'Articles',
            to: 'category-info/frontend',
          },
          {id: 3, title: 'React Vs Vue', to: 'course-info/js-expert'},
        ]}
      />

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="article">
                <h1 className="article__title">{articleDetails.title}</h1>
                <div className="article__header">
                  <div className="article-header__category article-header__item">
                    <i className="far fa-folder article-header__icon"></i>
                    <a
                      href="#"
                      className="article-header__text">
                      {articleCategory.title}
                    </a>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-user article-header__icon"></i>
                    <span className="article-header__text">
                      Posted by :{'  '}
                      {articleCreator.name}
                    </span>
                  </div>
                  <div className="article-header__category article-header__item">
                    <i className="far fa-calendar article-header__icon"></i>
                    <span className="article-header__text">
                      Date of Release : {articleCreateDate.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <img
                  src="/images/blog/1.jpg"
                  alt="Article Cover"
                  className="article__banner"
                />

                <div className="article__score">
                  <div className="article__score-icons">
                    <img
                      src="/images/svgs/star_fill.svg"
                      className="article__score-icon"
                      alt={'article_image'}
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className="article__score-icon"
                      alt={'article_image'}
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className="article__score-icon"
                      alt={'article_image'}
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className="article__score-icon"
                      alt={'article_image'}
                    />
                    <img
                      src="/images/svgs/star.svg"
                      className="article__score-icon"
                      alt={'article_image'}
                    />
                  </div>
                  <span className="article__score-text">
                    4.2/5 – (5 points)
                  </span>
                </div>

                <p className="article__paragraph paragraph">
                  JavaScript is one of the main programming languages in the
                  field of front-end, through its frameworks, you can design all
                  kinds of websites, applications and web applications. In
                  general, after learning html and css, you should also learn
                  javascript. Because this language complements html and css,
                  and in such a situation, you will have more job opportunities
                  and you can also do more extensive projects. Currently, with
                  free resources available on the web, you can easily learn
                  JavaScript language professionally. Therefore, in the
                  following article, we are going to introduce you to the
                  leading sites for teaching this programming language in the
                  world, and at the end, we will tell you which is the best site
                  for teaching JavaScript.
                </p>

                <div className="article-read">
                  <span className="article-read__title">
                    What you will read in this article
                  </span>
                  <ul className="article-read__list">
                    <li className="article-read__item">
                      <a
                        href="#"
                        className="article-read__link">
                        Introducing the best JavaScript training sites:
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a
                        href="#"
                        className="article-read__link">
                        An easier way, Sabzlern Academy's JavaScript courses!
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a
                        href="#"
                        className="article-read__link">
                        Registering in Sabzlern JavaScript courses:
                      </a>
                    </li>
                  </ul>
                </div>

                <img
                  src="/images/blog/2.jpg"
                  alt="Article Image"
                  className="article__seconadary-banner"
                />
                <div className="article-section">
                  <h2 className="article-section__title">
                    Introducing the best JavaScript training sites:
                  </h2>
                  <p className="paragraph article-section__text">
                    Note that all the websites that we introduce below as the
                    best JavaScript training sites are international and the
                    resources in them are in English. As a result, you must
                    either have an average or minimal command of English or use
                    Google Translate to translate the available resources and
                    use them. For this reason, at the end of the content, we
                    will tell you that there is another easy way to learn the
                    JavaScript language through which you can learn this
                    language for free and in Persian.
                  </p>
                  <img
                    src="/images/blog/4.png"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>
                <div className="article-section">
                  <h2 className="article-section__title">
                    Introducing the best JavaScript training sites:
                  </h2>
                  <p className="paragraph article-section__text">
                    Note that all the websites that we introduce below as the
                    best JavaScript training sites are international and the
                    resources in them are in English. As a result, you must
                    either have an average or minimal command of English or use
                    Google Translate to translate the available resources and
                    use them. For this reason, at the end of the content, we
                    will tell you that there is another easy way to learn the
                    JavaScript language through which you can learn this
                    language for free and in Persian.
                  </p>
                </div>
                <div className="article-section">
                  <h2 className="article-section__title">
                    Introducing the best JavaScript training sites:
                  </h2>
                  <p className="paragraph article-section__text">
                    Note that all the websites that we introduce below as the
                    best JavaScript training sites are international and the
                    resources in them are in English. As a result, you must
                    either have an average or minimal command of English or use
                    Google Translate to translate the available resources and
                    use them. For this reason, at the end of the content, we
                    will tell you that there is another easy way to learn the
                    JavaScript language through which you can learn this
                    language for free and in Persian.
                  </p>
                  <img
                    src="/images/blog/3.jpg"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>

                <div className="article-social-media">
                  <span className="article-social-media__text">
                    Share this article:
                  </span>
                  <a
                    href="#"
                    className="article-social-media__link">
                    <i className="fab fa-telegram-plane article-social-media__icon"></i>
                  </a>
                  <a
                    href="#"
                    className="article-social-media__link">
                    <i className="fab fa-twitter article-social-media__icon"></i>
                  </a>
                  <a
                    href="#"
                    className="article-social-media__link">
                    <i className="fab fa-facebook-f article-social-media__icon"></i>
                  </a>
                </div>
              </div>

              <div className="suggestion-articles">
                <div className="row">
                  <div className="col-6">
                    <div className="suggestion-articles__right suggestion-articles__content">
                      <a
                        href="#"
                        className="suggestion-articles__icon-link">
                        <i className="fas fa-arrow-left suggestion-articles__icon"></i>
                      </a>
                      <a
                        href="#"
                        className="suggestion-articles__link">
                        What is the fastest and best way to learn JavaScript? |
                        Experienced programmes
                      </a>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="suggestion-articles__left suggestion-articles__content">
                      <a
                        href="#"
                        className="suggestion-articles__icon-link">
                        <i className="fas fa-arrow-right suggestion-articles__icon"></i>
                      </a>
                      <a
                        href="#"
                        className="suggestion-articles__link">
                        What is the fastest and best way to learn JavaScript? |
                        Experienced programmers
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/*<CommentsTextArea/>*/}
            </div>

            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <span className="course-info__courses-title">
                    The highest rated courses
                  </span>
                  <ul className="course-info__courses-list">
                    <li className="course-info__courses-list-item">
                      <a
                        href="#"
                        className="course-info__courses-link">
                        <img
                          src="/images/courses/js_project.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          Specialized projects with JavaScript
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a
                        href="#"
                        className="course-info__courses-link">
                        <img
                          src="/images/courses/fareelancer.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          Determining the price of freelance projects
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a
                        href="#"
                        className="course-info__courses-link">
                        <img
                          src="/images/courses/nodejs.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          Api writing course
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a
                        href="#"
                        className="course-info__courses-link">
                        <img
                          src="/images/courses/jango.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          Django expert
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">
                    quick access
                  </span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Main Page
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        front end
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        security
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Python
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Soft skills
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">
                    New articles
                  </span>
                  <ul className="last-articles__list">
                    <li className="last-articles__item">
                      <a
                        href="#"
                        className="last-articles__link">
                        How to install the library in Python | Python library
                        installation tutorial
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a
                        href="#"
                        className="last-articles__link">
                        How to install the library in Python | Python library
                        installation tutorial
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a
                        href="#"
                        className="last-articles__link">
                        How to install the library in Python | Python library
                        installation tutorial
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a
                        href="#"
                        className="last-articles__link">
                        How to install the library in Python | Python library
                        installation tutorial
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a
                        href="#"
                        className="last-articles__link">
                        How to install the library in Python | Python library
                        installation tutorial
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a
                        href="#"
                        className="last-articles__link">
                        How to install the library in Python | Python library
                        installation tutorial
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">
                    Categories of articles
                  </span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Main Page
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        front end
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        security
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Python
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Soft skills
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">
                    New courses
                  </span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Main Page
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        front end
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        security
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Python
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                    <li className="sidebar-articles__item">
                      <a
                        href="#"
                        className="sidebar-articles__link">
                        Soft skills
                      </a>
                      <i className="fas fa-angle-right sidebar-articles__icon"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
