import React from 'react'
import FooterItem from '../FooterItem/FooterItem'
import {Link} from 'react-router-dom'
import Input from '../Form/Input/Input'
import {emailValidator} from '../../Validators/Rules'
import {UseForm} from '../../Hooks/UseForm'
import swal from 'sweetalert'

import './Footer.css'

export default function Footer() {
  const [formState, onInputHandler] = UseForm(
    {
      email: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const addNewEmail = (event) => {
    event.preventDefault()
    const newEmail = {
      email: formState.inputs.email.value,
    }

    fetch('http://localhost:4000/v1/newsletters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmail),
    }).then((res) => {
      if (res.ok) {
        swal({
          title:
            'Your email has been successfully registered in the newsletter',
          icon: 'success',
          buttons: 'Very great',
        })
      }
    })
  }

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-widgets">
            <div className="row">
              <FooterItem title={'About us'}>
                <p className="footer-widgets__text">
                  When I first started learning programming. One of the problems
                  in the learning process I had, the lack of good training with
                  acceptable support was what made the decision at that time If
                  one day I have acceptable financial and technical ability, I
                  will get a website to solve this problem Launch. And today
                  Sabzlern programming training academy operates as a private
                  academy, and this means that every school is not allowed to
                  teach in it and must pass the special filters of Sabzlern
                  academy! This means that the expression technique and
                  interaction between the teacher and the student are very
                  important to us! We at Sabzleren Academy guarantee good
                  support, and We give you quality. Because the instructors of
                  the Sabzlern website even support the courses They are free,
                  they charge a fee, and they are committed to having the
                  atmosphere of dear users Be!
                </p>
              </FooterItem>

              <FooterItem title={'The latest content'}>
                <div className="footer-widgets__links">
                  <a
                    href="#"
                    className="footer-widgets__link">
                    How to install the library in Python, Python library
                    installation tutorial
                  </a>
                  <a
                    href="#"
                    className="footer-widgets__link">
                    How to update Python? | Tutorial on updating Python from
                    zero to one hundred
                  </a>
                  <a
                    href="#"
                    className="footer-widgets__link">
                    How to install Python on Mac, Windows and Linux Step by step
                    and video
                  </a>
                  <a
                    href="#"
                    className="footer-widgets__link">
                    The best front-end frameworks 16 Front-end frameworks review
                    the pros and cons{' '}
                  </a>
                  <a
                    href="#"
                    className="footer-widgets__link">
                    Introducing the best JavaScript training site [experience
                    oriented] + free training{' '}
                  </a>
                </div>
              </FooterItem>

              <FooterItem title={'Quick access'}>
                <div className="row">
                  <div className="col-6">
                    <a
                      href="#"
                      className="footer-widgets__link">
                      HTML tutorial
                    </a>
                  </div>

                  <div className="col-6">
                    <a
                      href="#"
                      className="footer-widgets__link">
                      CSS tutorial
                    </a>
                  </div>

                  <div className="col-6">
                    <a
                      href="#"
                      className="footer-widgets__link">
                      JavaScript tutorial
                    </a>
                  </div>

                  <div className="col-6">
                    <a
                      href="#"
                      className="footer-widgets__link">
                      React tutorial
                    </a>
                  </div>

                  <div className="col-6">
                    <a
                      href="#"
                      className="footer-widgets__link">
                      Angular tutorial
                    </a>
                  </div>

                  <div className="col-6">
                    <a
                      href="#"
                      className="footer-widgets__link">
                      Vue tutorial
                    </a>
                  </div>

                  <div className="col-6">
                    <Link
                      to="/contact"
                      className="footer-widgets__link">
                      Contact us
                    </Link>
                  </div>

                  <div className="col-12">
                    <span className="footer-widgets__title">
                      Subscribe to the newsletter
                    </span>
                    <span className="footer-widgets__text d-block text-center">
                      Subscribe to get the latest news and site discounts!
                    </span>
                    <form
                      action="#"
                      className="footer-widgets__form">
                      <Input
                        element="input"
                        id="email"
                        type="text"
                        className="footer-widgets__input"
                        placeholder="Enter your email"
                        onInputHandler={onInputHandler}
                        validations={[emailValidator()]}
                      />

                      <button
                        type="submit"
                        className="footer-widgets__btn"
                        onClick={addNewEmail}>
                        Membership
                      </button>
                    </form>
                  </div>
                </div>
              </FooterItem>
            </div>
          </div>
        </div>
        <div className="footer__copyright">
          <span className="footer__copyright-text">
            All rights are reserved for <a href="#">Green Learning Academy</a>
          </span>
        </div>
      </footer>
    </>
  )
}
