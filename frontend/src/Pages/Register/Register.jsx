import React, {useContext} from 'react';
import TopBar from '../../Components/TopBar/TopBar';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import {Link} from 'react-router-dom';
import Input from '../../Components/Form/Input/Input';
import Button from '../../Components/Form/Button/Button';
import {UseForm} from '../../Hooks/UseForm';
import swal from 'sweetalert';

import {
    emailValidator,
    maxLengthValidator,
    minLengthValidator,
    requiredValidator,
} from '../../Validators/Rules';
import AuthContext from '../../Context/AuthContext';

export default function Register() {
    const authContext = useContext(AuthContext);

    const [formState, onInputHandler] = UseForm(
        {
            name: {
                value: '',
                isValid: false,
            },
            username: {
                value: '',
                isValid: false,
            },
            phone: {
                value: '',
                isValid: false,
            },
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
            confirmPassword: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    let RegisterNewUser = (event) => {
        event.preventDefault();
        // window.location.href = "/";

        const newUserInfo = {
            name: formState.inputs.name.value,
            username: formState.inputs.username.value,
            phone: formState.inputs.phone.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.confirmPassword.value,
        };

        fetch(`http://localhost:4000/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserInfo),
        })
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status === 403) {
                        swal({
                            title: 'This call number is blocked',
                            icon: 'error',
                            buttons: 'Too bad',
                        });
                    }
                }
            })
            .then((result) => {
                authContext.login(result.user, result.accessToken);
            });
    };

    return (
        <>
            <TopBar />
            <NavBar />

            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">Create a user account</span>
                    <span className="login__subtitle">
                        We are happy that you are going to join us
                    </span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">
                            Already registered ?
                        </span>
                        <Link
                            className="login__new-member-link"
                            to="/login">
                            Login
                        </Link>
                    </div>
                    <form
                        action="#"
                        className="login-form">
                        <div className="login-form__username">
                            <Input
                                id="name"
                                className="login-form__username-input"
                                element="input"
                                type="text"
                                placeholder="FirstName and LastName"
                                validations={[
                                    requiredValidator(),
                                    minLengthValidator(8),
                                    maxLengthValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>

                        <div className="login-form__username">
                            <Input
                                id="username"
                                className="login-form__username-input"
                                element="input"
                                type="text"
                                placeholder="UserName"
                                validations={[
                                    requiredValidator(),
                                    minLengthValidator(8),
                                    maxLengthValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>

                        <div className="login-form__username">
                            <Input
                                id="phone"
                                className="login-form__username-input"
                                element="input"
                                type="text"
                                placeholder="PhoneNumber"
                                validations={[
                                    minLengthValidator(10),
                                    maxLengthValidator(12),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__username-icon fa fa-phone"></i>
                        </div>

                        <div className="login-form__username">
                            <Input
                                id="email"
                                className="login-form__username-input"
                                element="input"
                                type="text"
                                placeholder="Email Address"
                                validations={[
                                    emailValidator(),
                                    requiredValidator(),
                                    minLengthValidator(8),
                                    maxLengthValidator(30),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__password-icon fa fa-envelope"></i>
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
                            <Input
                                id="confirmPassword"
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

                        <Button
                            className={`login-form__btn ${
                                formState.isFormValid
                                    ? 'login-form__btn-success'
                                    : 'login-form__btn-error'
                            }`}
                            type="submit"
                            onClick={RegisterNewUser}
                            disabled={!formState.isFormValid}>
                            <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
                            <span className="login-form__btn-text">
                                Register
                            </span>
                        </Button>
                    </form>
                    <div className="login__des">
                        <span className="login__des-title">
                            Hello dear user :
                        </span>
                        <ul className="login__des-list">
                            <li className="login__des-item">
                                Please use safe and updated browsers such as
                                Google Chrome and Firefox.
                            </li>
                            <li className="login__des-item">
                                We do not store any personal information in our
                                database.
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
    );
}
