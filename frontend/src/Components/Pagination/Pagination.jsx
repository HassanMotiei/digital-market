import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'

import './Pagination.css'

export default function Pagination({
  items,
  itemsCount,
  pathname,
  setShownCourses,
}) {
  const [pagesCount, setPagesCount] = useState(null) // 3
  const {page} = useParams()

  useEffect(() => {
    let endIndex = itemsCount * page
    let startIndex = endIndex - itemsCount
    let paginatedItems = items.slice(startIndex, endIndex)
    setShownCourses(paginatedItems)

    let pagesNumber = Math.ceil(items.length / itemsCount)
    setPagesCount(pagesNumber)
  }, [page, items])

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        <li className="courses__pagination-item">
          <Link
            to={`${pathname}/${
              Number(page) - 1 < 1 ? pagesCount : Number(page) - 1
            }`}
            className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </Link>
        </li>

        {Array(pagesCount)
          .fill(0)
          .map((item, index) => (
            <li
              className="courses__pagination-item"
              key={item._id}>
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link courses__pagination-link--active">
                  {index + 1}
                </Link>
              ) : (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link">
                  {index + 1}
                </Link>
              )}
            </li>
          ))}

        <li className="courses__pagination-item">
          <Link
            to={`${pathname}/${
              Number(page) + 1 > pagesCount ? 1 : Number(page) + 1
            }`}
            className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </Link>
        </li>
      </ul>
    </div>
  )
}
