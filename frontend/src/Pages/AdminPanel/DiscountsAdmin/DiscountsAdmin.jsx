import React, {useState} from 'react'
import swal from 'sweetalert'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Discounts() {
  const [discount, setDiscount] = useState('')

  const setDiscounts = (event) => {
    event.preventDefault()
    const reqBody = {
      discount,
    }

    fetch(`${API_BASE_URL}/offs/all`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'Campaign created successfully',
          icon: 'success',
          buttons: 'very great',
        })
      }
    })
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="home-title">
          <span>Holding a new campaign</span>
        </div>
        <form className="form">
          <div className="col-6 item-form">
            <div className="name input">
              <label className="input-title">discount percent</label>
              <input
                type="text"
                value={discount}
                placeholder="Please enter the general discount percentage..."
                onChange={(event) => setDiscount(event.target.value)}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="Create a Campaign"
                  onClick={setDiscounts}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
