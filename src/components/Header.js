import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import '../style/Header.scss';
import * as userActions from '../store/user';

const Header = ({ user, UserActions, ...props }) => {
    console.log(user);
    console.log('user');

    const handleClick = () => {
        console.log('click!');

        axios
            .get('https://gentle-island-44458.herokuapp.com/auth/logout')
            .then(() => {
                UserActions.logout();
                props.history.push('/login');
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <header>
            <Link to='/'><img src='../../public/images/ball.png' /></Link>
            <div className='header-user'>
                <span>{user.user.nick}</span> 님
                <a onClick={handleClick}>로그아웃</a>
            </div>
        </header>
    );
}

export default connect(
    state => ({
        user: state.user
    }), 
    dispatch => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Header);