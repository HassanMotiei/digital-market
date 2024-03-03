import React from 'react'
import Editor from '../../../Components/Form/Editor'

export default function Draft() {
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
              <input type="text" />
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
              <input type="text" />
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

              <input
                type="text"
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
                value=""
                setValue={() => {}}
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
              <input type="file" />
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
              <select>
                <option value="-1">Select the category of the article</option>
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="Release"
                  className="m-1"
                />
                <input
                  type="submit"
                  value="Draft"
                  className="m-1"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
