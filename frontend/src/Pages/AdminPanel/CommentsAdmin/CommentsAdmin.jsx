import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Comments() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getAllComments()
  }, [])

  function getAllComments() {
    fetch(`${API_BASE_URL}/comments`)
      .then((res) => res.json())
      .then((allComments) => setComments(allComments))
  }

  const removeComment = (commentID) => {
    swal({
      title: 'Are you sure to delete the comment?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/comments/${commentID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'The desired comment has been successfully deleted',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => getAllComments())
          }
        })
      }
    })
  }

  const showCommentBody = (commentBody) => {
    swal({
      title: commentBody,
      buttons: 'Okay',
    })
  }

  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'Are you sure about the Ban?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/users/ban/${userID}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'User has been successfully banned',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => getAllComments())
          }
        })
      }
    })
  }

  const acceptComment = (commentID) => {
    swal({
      title: 'Are you sure to approve the comment?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/comments/accept/${commentID}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }).then((res) => {
          console.log(res)
          if (res.ok) {
            swal({
              title: 'The desired comment has been successfully approved',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllComments()
            })
          }
        })
      }
    })
  }

  const rejectComment = (commentID) => {
    swal({
      title: 'Are you sure about rejecting the comment?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/comments/reject/${commentID}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }).then((res) => {
          console.log(res)
          if (res.ok) {
            swal({
              title: 'The desired comment was successfully rejected',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllComments()
            })
          }
        })
      }
    })
  }

  const answerToComment = (commentID) => {
    swal({
      title: 'Enter the desired answer',
      content: 'input',
      buttons: 'Record the answer',
    }).then((answerText) => {
      if (answerText) {
        const commentAnswer = {
          body: answerText,
        }

        fetch(`${API_BASE_URL}/comments/answer/${commentID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
          body: JSON.stringify(commentAnswer),
        }).then((res) => {
          console.log(res)
          if (res.ok) {
            swal({
              title: 'The desired answer was successfully registered',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllComments()
            })
          }
        })
      }
    })
  }

  return (
    <>
      <DataTable title="Comments">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Course</th>
              <th>Score</th>
              <th>View</th>
              <th>Response</th>
              <th>Ok</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Ban</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr>
                <td
                  className={
                    comment.answer === 1
                      ? 'answer-comment'
                      : 'no-answer-comment'
                  }>
                  {index + 1}
                </td>
                <td>{comment.creator.name}</td>
                <td>{comment.course}</td>
                <td>
                  {Array(5 - comment.score)
                    .fill(0)
                    .map(() => (
                      <img
                        src="/images/svgs/star.svg"
                        alt="score"
                      />
                    ))}
                  {Array(comment.score)
                    .fill(0)
                    .map(() => (
                      <img
                        src="/images/svgs/star_fill.svg"
                        alt="score"
                      />
                    ))}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showCommentBody(comment.body)}>
                    View
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => answerToComment(comment._id)}>
                    Response
                  </button>
                </td>
                {comment.answer === 1 ? (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => rejectComment(comment._id)}>
                      Rejection
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => acceptComment(comment._id)}>
                      Ok
                    </button>
                  </td>
                )}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeComment(comment._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => banUser(comment.creator._id)}>
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
