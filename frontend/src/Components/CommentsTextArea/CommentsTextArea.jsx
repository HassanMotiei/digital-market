import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'

import './CommentsTextArea.css'

export default function CommentsTextArea({comments, submitComment}) {
  const [newCommentBody, setNewCommentBody] = useState('')
  const [commentScore, setCommentScore] = useState('-1')
  const authContext = useContext(AuthContext)

  const onChangeHandler = (event) => {
    setNewCommentBody(event.target.value)
  }

  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <i className="comments__header-icon far fa-comment"></i>
        </div>
        <span className="comments__header-title">Comments</span>
      </div>
      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            No comments have been submitted for this course yet.
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <div
                className="comments__item"
                key={comment._id}>
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        {comment.creator.name}
                      </span>
                      <span className="comments__question-status comment-status">
                        {comment.creator.role === 'ADMIN' ? 'Admin' : 'User'}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#">
                        Reply
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                  {comment.answerContent && (
                    <div className="comments__item">
                      <div className="comments__question">
                        <div className="comments__question-header">
                          <div className="comments__question-header-right">
                            <span className="comments__question-name comment-name">
                              {comment.answerContent.creator.name}
                            </span>
                            <span className="comments__question-status comment-status">
                              {comment.answerContent.creator.role === 'ADMIN'
                                ? 'Admin'
                                : 'User'}
                            </span>
                            <span className="comments__question-date comment-date">
                              {comment.answerContent.createdAt.slice(0, 10)}
                            </span>
                          </div>
                          <div className="comments__question-header-left">
                            <a
                              className="comments__question-header-link comment-link"
                              href="#">
                              Reply
                            </a>
                          </div>
                        </div>
                        <div className="comments__question-text">
                          <p className="comments__question-paragraph comment-paragraph">
                            {comment.answerContent.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="comments__pagination">
              <ul className="comments__pagination-list">
                <li className="comments__pagination-item">
                  <a
                    href="#"
                    className="comments__pagination-link comments__pagination-link--active">
                    1
                  </a>
                </li>
                <li className="comments__pagination-item">
                  <a
                    href="#"
                    className="comments__pagination-link">
                    2
                  </a>
                </li>
                <li className="comments__pagination-item">
                  <a
                    href="#"
                    className="comments__pagination-link">
                    3
                  </a>
                </li>
                <li className="comments__pagination-item">
                  <a
                    href="#"
                    className="comments__pagination-link">
                    <i className="fas fa-long-arrow-alt-right comments__pagination-icon"></i>
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {authContext.isLoggedIn === true ? (
        <>
          <div className="comments__rules">
            <span className="comments__rules-title">Commenting Rules</span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              If you need course support, use the question section in the online
              display, and questions related to problem-solving will not be
              approved.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              Irrelevant comments to the course will not be approved.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              Questions related to problem-solving in this section will not be
              approved.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              Avoid posting duplicate comments.
            </span>
          </div>
          <div className="comments__respond">
            <div className="comments__score">
              <span className="comments__score-title">* Your Score</span>
              <div className="col-12">
                <select
                  className="form-select form-control fs-5 mt-3 font-bold"
                  onChange={(event) => setCommentScore(event.target.value)}>
                  <option
                    value="-1"
                    className="form-control fs-5">
                    Select your score
                  </option>
                  <option value="5">Excellent</option>
                  <option value="4">Very Good</option>
                  <option value="3">Good</option>
                  <option value="2">Weak</option>
                  <option value="1">Bad</option>
                </select>
              </div>
            </div>
            <div className="comments__respond-content">
              <div className="comments__respond-title">* Your Comment</div>
              <textarea
                className="comments__score-input-respond"
                onChange={onChangeHandler}>
                {newCommentBody}
              </textarea>
            </div>
            <button
              type="submit"
              className="comments__respond-btn"
              onClick={() => submitComment(newCommentBody, commentScore)}>
              Submit
            </button>
          </div>
        </>
      ) : (
        <div className="alert alert-warning">
          To comment, you must
          <Link to="/login">log in</Link>.
        </div>
      )}
    </div>
  )
}
