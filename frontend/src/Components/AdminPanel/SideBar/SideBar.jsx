import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';
import swal from 'sweetalert';

export default function SideBar() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutAdmin = (event) => {
        event.preventDefault();
        swal({
            title: 'You have successfully logged out',
            icon: 'success',
            buttons: 'Okay',
        }).then(() => {
            authContext.logout();
            navigate('/');
        });
    };

    return (
        <>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Link to="/">
                        <img
                            src="/images/logo/Logo.png"
                            alt="Logo"
                        />
                    </Link>
                </div>

                <div className="sidebar-menu-btn">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
            <div className="sidebar-menu">
                <ul>
                    <li className="active-menu">
                        <Link to="/p-admin">
                            <span>Main Page</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="courses">
                            <span>Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="sessions">
                            <span>Sessions</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="menus">
                            <span>Menus</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="articles">
                            <span>Articles</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="users">
                            <span>Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="comments">
                            <span>Comments</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="tickets">
                            <span>Tickets</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="offs">
                            <span>Discount Codes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="discounts">
                            <span>General Discount</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="category">
                            <span>Categories</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="contacts">
                            <span>Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            onClick={logoutAdmin}>
                            <span>Exit</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
