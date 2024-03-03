import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import Input from '../../../Components/Form/Input/Input'
import {UseForm} from '../../../Hooks/UseForm'
import {minLengthValidator} from '../../../Validators/Rules'
import Editor from '../../../Components/Form/Editor'
import {Link} from 'react-router-dom'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [articleCategory, setArticleCategory] = useState('-1')
  const [articleCover, setArticleCover] = useState({})
  const [articleBody, setArticleBody] = useState('')

  const [formState, onInputHandler] = UseForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      shortName: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllArticles()

    fetch(`${API_BASE_URL}/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories)
      })
  }, [])

  function getAllArticles() {
    fetch(`${API_BASE_URL}/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        console.log(allArticles)
        setArticles(allArticles)
      })
  }

  const removeArticle = (articleID) => {
    const localStorageDate = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'Are you sure to delete the Article?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/articles/${articleID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageDate.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'The desired article has been successfully deleted',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllArticles()
            })
          }
        })
      }
    })
  }

  const createArticle = (event) => {
    event.preventDefault()
    const localStorageDate = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('title', formState.inputs.title.value)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('categoryID', articleCategory)
    formData.append('cover', articleCover)
    formData.append('body', articleBody)

    fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'New Article successfully created',
          icon: 'success',
          buttons: 'Okay',
        }).then(() => {
          getAllArticles()
        })
      }
    })
  }
  const saveArticleAsDraft = (event) => {
    event.preventDefault()
    const localStorageDate = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('title', formState.inputs.title.value)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('categoryID', articleCategory)
    formData.append('cover', articleCover)
    formData.append('body', articleBody)

    fetch(`${API_BASE_URL}/articles/draft`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'New Article successfully drafted',
          icon: 'success',
          buttons: 'Okay',
        }).then(() => {
          getAllArticles()
        })
      }
    })
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="home-title">
          <span>Add new Article</span>
        </div>
        <form className="form">
          <div className="col-6 item-form">
            <div className="name input">
              <label
                className="input-title"
                style={{display: 'block'}}>
                Title
              </label>
              <Input
                element="input"
                type="text"
                id="title"
                onInputHandler={onInputHandler}
                validations={[minLengthValidator(8)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="name input">
              <label
                className="input-title"
                style={{display: 'block'}}>
                ShortName
              </label>
              <Input
                element="input"
                type="text"
                id="shortName"
                onInputHandler={onInputHandler}
                validations={[minLengthValidator(5)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="name input">
              <label
                className="input-title"
                style={{display: 'block'}}>
                Abstract
              </label>
              {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

              <Input
                element="textarea"
                type="text"
                id="description"
                onInputHandler={onInputHandler}
                validations={[minLengthValidator(5)]}
                className="article-textarea"
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="name input">
              <label
                className="input-title"
                style={{display: 'block'}}>
                Content
              </label>
              <Editor
                value={articleBody}
                setValue={setArticleBody}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="name input">
              <label
                className="input-title"
                style={{display: 'block'}}>
                Cover
              </label>
              <input
                type="file"
                onChange={(event) => {
                  setArticleCover(event.target.files[0])
                }}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6 item-form">
            <div className="name input">
              <label
                className="input-title"
                style={{display: 'block'}}>
                Grouping
              </label>
              <select
                onChange={(event) => setArticleCategory(event.target.value)}>
                <option value="-1">Select an article category</option>
                {categories.map((category) => (
                  <option value={category._id}>{category.title}</option>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="release"
                  className="m-1"
                  onClick={createArticle}
                />
                <input
                  type="submit"
                  value="draft"
                  className="m-1"
                  onClick={saveArticleAsDraft}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="Articles">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>ShortName</th>
              <th>Author</th>
              <th>Status</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>

                <td>{article.creator.name}</td>
                <td>{article.publish === 1 ? 'Published' : 'Draft'}</td>
                <td>
                  {article.publish === 1 ? (
                    <i className="fa fa-check"></i>
                  ) : (
                    <Link
                      to={`draft/${article.shortName}`}
                      className="btn btn-primary edit-btn">
                      Continue
                    </Link>
                  )}
                </td>
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
                    onClick={() => removeArticle(article._id)}>
                    Delete
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
