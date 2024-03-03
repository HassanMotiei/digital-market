import React, {useEffect, useState} from 'react'
import ArticleBox from '../ArticleBox/ArticleBox'
import SectionHeader from '../SectionHeader/SectionHeader'

import './LastArticles.css'

export default function LastArticles() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        console.log(allArticles)
        setArticles(allArticles)
      })
  }, [])

  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="Latest Articles"
          desc="Forward to the promotion of knowledge"
          btnTitle="All Articles"
          btnHref="articles/1"
        />

        <div className="articles__content">
          <div className="row">
            {articles
              .filter((article) => article.publish === 1)
              .slice(0, 3)
              .map((article) => (
                <ArticleBox
                  {...article}
                  key={article._id}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
