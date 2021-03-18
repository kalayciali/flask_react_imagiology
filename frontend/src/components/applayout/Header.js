import React from 'react';
import { 
    useSelector, 
    useDispatch,
} from 'react-redux';
import cx from 'classnames';
import {
    NavLink,
} from 'react-router-dom'

import { getAuthInfo } from '../../store/reducers/auth.js';
import {loginActions} from '../../store/actions/login';
import s from './Header.module.scss';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'

export const Header = (props) => {

    const auth = useSelector(state => getAuthInfo(state))
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(loginActions.logout())
    }


    const avatar = (
        <img src="https://via.placeholder.com/150"
            alt="avatar"
            className={cx('rounded-circle mr-sm', s.avatar)}
        />
    )


    const authField = auth.isAuthenticated ?
        (<NavDropdown id="dropdown"
            title={avatar}
            alignRight={true}
            className={cx("text-center", s.collapseItem)}
        >
            <NavDropdown.Item>
                <NavLink to="/main"
                    exact
                    activeClassName={s.linkActive}
                >
                    Main
                </NavLink>
            </NavDropdown.Item>

            <Dropdown.Divider></Dropdown.Divider>

            <NavDropdown.Item onClick={onLogout}
            >
                Sign out
            </NavDropdown.Item>
        </NavDropdown> ) :
                <Nav.Link href="/login">Sign in</Nav.Link>


    return (
        <Navbar
            className={s.root}
            expand="lg"
        >
            <Container>
                <Navbar.Toggle aria-controls="navbar-nav"
                    className="border-0" />
                <Navbar.Collapse id="navbar-nav"
                    className="justify-content-end"
                >
                    {authField}
                    {auth.isAuthenticated ? null :
                            (<Button variant="primary"
                            href="/signup">
                            Sign Up
                        </Button>)
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


