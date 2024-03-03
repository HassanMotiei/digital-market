import React from 'react'
import TopBar from '../../Components/TopBar/TopBar'
import Navbar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Input from '../../Components/Form/Input/Input'
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert'
import {
  emailValidator,
  maxLengthValidator,
  minLengthValidator,
  requiredValidator,
} from '../../Validators/Rules'

import './Contact.css'
import {UseForm} from '../../Hooks/UseForm'
import Button from '../../Components/Form/Button/Button'

export default function Contact() {
  const navigate = useNavigate()
  const [formState, onInputHandler] = UseForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      phone: {
        value: '',
        isValid: false,
      },
      body: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const addNewContact = (event) => {
    event.preventDefault()

    const newContactInfo = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      body: formState.inputs.body.value,
    }

    fetch(`http://localhost:4000/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContactInfo),
    }).then((res) => {
      if (res.ok) {
        swal({
          title:
            'Your message has been successfully send to site administrators',
          icon: 'success',
          buttons: 'Okay',
        }).then((value) => {
          navigate('/')
        })
      }
    })
  }

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">Contact us</span>
          <span className="login__subtitle">
            Write us your opinion, suggestion or criticism !!!
          </span>
          <form
            action="#"
            className="login-form">
            <div className="login-form__username login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="name"
                className="login-form__username-input"
                type="text"
                placeholder="FirstName and LastName"
                validations={[
                  requiredValidator(),
                  minLengthValidator(6),
                  maxLengthValidator(20),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="email"
                className="login-form__password-input"
                type="text"
                placeholder="Email address"
                validations={[
                  requiredValidator(),
                  minLengthValidator(8),
                  maxLengthValidator(40),
                  emailValidator(),
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__phone-number login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="phone"
                className="login-form__password-input"
                type="text"
                placeholder="Phone number"
                validations={[
                  requiredValidator(),
                  minLengthValidator(10),
                  maxLengthValidator(11),
                ]}
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="textarea"
                id="body"
                className="login-form__text-input"
                placeholder="Enter your text"
                validations={[requiredValidator(), minLengthValidator(10)]}
              />
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid === true
                  ? 'login-form__btn-success'
                  : 'login-form__btn-error'
              }`}
              type="submit"
              onClick={addNewContact}
              disabled={!formState.isFormValid}>
              <span className="login-form__btn-text">Send</span>
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}
