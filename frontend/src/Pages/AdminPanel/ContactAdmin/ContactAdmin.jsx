import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Contact() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    getAllContacts()
  }, [])

  function getAllContacts() {
    fetch(`${API_BASE_URL}/contact`)
      .then((res) => res.json())
      .then((allContacts) => {
        console.log(allContacts)
        setContacts(allContacts)
      })
  }

  const showContactBody = (body) => {
    swal({
      title: body,
      buttons: 'Okay',
    })
  }

  const sendAnswerToUser = (contactEmail) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'Enter the response text',
      content: 'input',
      buttons: 'Send Mail',
    }).then((value) => {
      console.log(value)

      const answerInfo = {
        email: contactEmail,
        answer: value,
      }

      fetch(`${API_BASE_URL}/contact/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify(answerInfo),
      })
        .then((res) => {
          console.log(res)
          if (res.ok) {
            getAllContacts()
            return res.json()
          }
        })
        .then((result) => console.log(result))
    })
  }

  const removeContact = (contactID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: '',
      icon: 'warning',
      buttons: ['No', 'Yse'],
    }).then((result) => {
      if (result) {
        fetch(`${API_BASE_URL}/contact/${contactID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'The desired message was successfully deleted',
              icon: 'success',
              buttons: 'Okay',
            }).then(() => {
              getAllContacts()
            })
          }
        })
      }
    })
  }

  return (
    <>
      <DataTable title="Messages">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FirstName and LastName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>View</th>
              <th>Response</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr>
                <td
                  className={
                    contact.answer === 1
                      ? 'answer-contact'
                      : 'no-answer-contact'
                  }>
                  {index + 1}
                </td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showContactBody(contact.body)}>
                    View Message
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => sendAnswerToUser(contact.email)}>
                    Response
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeContact(contact._id)}>
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
