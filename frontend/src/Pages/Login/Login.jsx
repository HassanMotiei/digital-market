import React, {useContext, useState} from 'react'
import './Login.css'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../Components/Form/Input/Input'
import Button from '../../Components/Form/Button/Button'
import {UseForm} from '../../Hooks/UseForm'
import AuthContext from '../../Context/AuthContext'

import HCaptcha from '@hcaptcha/react-hcaptcha'

import Swal from 'sweetalert'

import {
  maxLengthValidator,
  minLengthValidator,
  requiredValidator,
} from '../../Validators/Rules'

export default function Login() {
  const navigate = useNavigate()

  const authContext = useContext(AuthContext)

  const [isHCaptchaVerify, setIsHCaptchaVerify] = useState(false)

  const [formState, onInputHandler] = UseForm(
    {
      username: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  let loginNewUser = (event) => {
    event.preventDefault()
    // window.location.href = "/";

    const userData = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    }

    fetch(`http://localhost:4000/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text)
          })
        } else {
          return res.json()
        }
      })
      .then((result) => {
        Swal({
          icon: 'success',
          title: 'Good!',
          text: 'Login was done successfully!',
          buttons: 'Login to the panel',
        }).then(() => {
          navigate('/')
        })

        authContext.login({}, result.accessToken)
      })
      .catch(() => {
        Swal({
          icon: 'error',
          title: 'Oops...',
          text: 'There is no such user!',
          buttons: 'Try again',
        })
      })
  }

  const onChangeHandler = () => {
    console.log('hCaptcha')
    setIsHCaptchaVerify(true)
  }

  return (
    <>
      <TopBar />
      <NavBar />

      <section className="login-register">
        <div className="login">
          <span className="login__title">Login to account</span>
          <span className="login__subtitle">Login to account</span>
          <div className="login__new-member">
            <span className="login__new-member-text">Are you a new user ?</span>
            <Link
              className="login__new-member-link"
              to="/register">
              Register
            </Link>
          </div>
          <form
            action="#"
            className="login-form">
            <div className="login-form__username">
              <Input
                id="username"
                className="login-form__username-input"
                element="input"
                type="text"
                placeholder="Username or email address"
                validations={[
                  // emailValidator(),
                  requiredValidator(),
                  minLengthValidator(8),
                  maxLengthValidator(30),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                id="password"
                className="login-form__password-input"
                element="input"
                type="text"
                placeholder="Password"
                validations={[
                  requiredValidator(),
                  minLengthValidator(8),
                  maxLengthValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>

            <div className="login-form__password">
              <HCaptcha
                sitekey="10000000-ffff-ffff-ffff-000000000001"
                onVerify={onChangeHandler}
              />
            </div>

            <Button
              className={`login-form__btn 
                            ${
                              formState.isFormValid && isHCaptchaVerify
                                ? 'login-form__btn-success'
                                : 'login-form__btn-error'
                            }`}
              type="submit"
              onClick={loginNewUser}
              disabled={!formState.isFormValid || !isHCaptchaVerify}>
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">Login</span>
            </Button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input
                  className="login-form__password-checkbox"
                  type="checkbox"
                />
                <span className="login-form__password-text">remember me</span>
              </label>
              <label className="login-form__password-forget">
                <a
                  className="login-form__password-forget-link"
                  href="#">
                  Forgot your password ?
                </a>
              </label>
            </div>
          </form>
          <div className="login__des">
            <span className="login__des-title">Hello dear user :</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                Please use safe and updated browsers such as Google Chrome and
                Firefox.
              </li>
              <li className="login__des-item">
                We do not store any personal information in our database.
              </li>
              <li className="login__des-item">
                Please change your password in a short time.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
