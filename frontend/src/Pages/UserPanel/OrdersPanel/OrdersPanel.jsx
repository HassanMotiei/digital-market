import React, {useEffect, useState} from 'react'

import './OrdersPanel.css'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setOrders(data)
      })
  }, [])

  const showOrderDetails = (orderID) => {
    console.log(orderID)
  }

  return (
    <div className="col-9">
      <div className="order">
        <table className="order__table">
          <thead className="order__table-header">
            <tr className="order__table-header-list">
              <th className="order__table-header-item">ID</th>
              <th className="order__table-header-item">Date</th>
              <th className="order__table-header-item">State</th>
              <th className="order__table-header-item">Course</th>
              <th className="order__table-header-item">Price</th>
              <th className="order__table-header-item">Operations</th>
            </tr>
          </thead>
          <tbody className="order__table-body">
            {orders.map((order, index) => (
              <tr className="order__table-body-list">
                <td className="order__table-body-item">
                  <a
                    href="#"
                    className="order__table-body-link">
                    {index + 1}
                  </a>
                </td>
                <td className="order__table-body-item">
                  {order.createdAt.slice(0, 10)}
                </td>
                <td className="order__table-body-item">Complete</td>
                <td className="order__table-body-item">{order.course.name}</td>
                <td className="order__table-body-item">{order.price}</td>
                <td
                  className="order__table-body-item"
                  onClick={() => showOrderDetails(order._id)}>
                  <a
                    className="order__table-body-btn"
                    href="#">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
