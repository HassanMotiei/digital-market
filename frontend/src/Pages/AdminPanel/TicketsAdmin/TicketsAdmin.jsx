import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Tickets() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTickets(data)
      })
  }, [])

  const showTicketBody = (body) => {
    swal({
      title: body,
      buttons: 'Okay',
    })
  }

  const setAnswerToTicket = (ticketID) => {
    swal({
      title: 'Please enter the desired answer :',
      content: 'input',
      buttons: 'Record the answer',
    }).then((value) => {
      if (value) {
        const ticketAnswerInfos = {
          ticketID,
          body: value,
        }

        fetch(`${API_BASE_URL}/tickets/answer`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketAnswerInfos),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'The desired answer was successfully registered',
              icon: 'success',
              buttons: 'Very Great',
            })
          }
        })
      }
    })
  }

  return (
    <>
      <DataTable title="tickets">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Title</th>
              <th>Ticket Type</th>
              <th>Course</th>
              <th>Priority</th>
              <th>View</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user}</td>
                <td>{ticket.title}</td>
                <td>{ticket.departmentSubID}</td>
                <td>{ticket.course ? ticket.course : '---'}</td>
                <td>
                  {ticket.priority === 1 && 'Top'}
                  {ticket.priority === 2 && 'Medium'}
                  {ticket.priority === 3 && 'Low'}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showTicketBody(ticket.body)}>
                    View
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => setAnswerToTicket(ticket._id)}>
                    Response
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
