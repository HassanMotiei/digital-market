import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Ticket from '../../../Components/UserPanel/Ticket/Ticket'

import './TicketsPanel.css'

export default function TicketsPanel() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/user`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets(data)
      })
  }, [])

  return (
    <div className="col-9">
      <div className="ticket">
        <div className="ticket-header">
          <span className="ticket-header__title">All tickets</span>
          <Link
            className="ticket-header__link"
            to="/my-account/send-ticket">
            Send a new ticket
          </Link>
        </div>
        <div className="ticket-boxes">
          <div className="ticket-boxes__item">
            <img
              alt="image"
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">باز</span>
            <span className="ticket-boxes__value">0</span>
          </div>
          <div className="ticket-boxes__item ticket-boxes__closed ticket-boxes__custom">
            <img
              alt="image"
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">Close</span>
            <span className="ticket-boxes__value ticket-boxes__value-closed">
              2
            </span>
          </div>
          <div className="ticket-boxes__item ticket-boxes__answered ticket-boxes__custom">
            <img
              alt="image"
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">has been answered</span>
            <span className="ticket-boxes__value ticket-boxes__value-answered">
              1
            </span>
          </div>
          <div className="ticket-boxes__item ticket-boxes__finished ticket-boxes__custom">
            <img
              alt="image"
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">Finished</span>
            <span className="ticket-boxes__value ticket-boxes__value-finished">
              1
            </span>
          </div>
          <div className="ticket-boxes__item">
            <img
              alt="image"
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">All</span>
            <span className="ticket-boxes__value">2</span>
          </div>
        </div>
        <div className="ticket-filter">
          <form
            action="#"
            className="ticket-filter__form">
            <select className="ticket-filter__select">
              <option
                className="ticket-filter__option"
                value="">
                All
              </option>
              <option
                className="ticket-filter__option"
                value="">
                Submitted by
              </option>
              <option
                className="ticket-filter__option"
                value="">
                Receipt
              </option>
            </select>
            <select className="ticket-filter__select">
              <option
                className="ticket-filter__option"
                value="">
                All
              </option>
              <option
                className="ticket-filter__option"
                value="">
                Open
              </option>
              <option
                className="ticket-filter__option"
                value="">
                Close
              </option>
              <option
                className="ticket-filter__option"
                value="">
                has been answered
              </option>
              <option
                className="ticket-filter__option"
                value="">
                Finished
              </option>
            </select>
            <select className="ticket-filter__select">
              <option
                className="ticket-filter__option"
                value="">
                Answer date
              </option>
              <option
                className="ticket-filter__option"
                value="">
                creation date
              </option>
            </select>
            <button
              className="ticket-filter__btn"
              type="submit">
              Actions
            </button>
          </form>
        </div>
        <div className="ticket-content">
          <span className="ticket-content__title">Show 1 Ticket</span>

          {tickets.map((ticket) => (
            <Ticket {...ticket} />
          ))}
        </div>
      </div>
    </div>
  )
}
