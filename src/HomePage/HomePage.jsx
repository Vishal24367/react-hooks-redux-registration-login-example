import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const responseData = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    let isSucessfullSign = JSON.parse(localStorage.getItem('isSuccessfulSignIn'));

    function handleSubmit(e) {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'));
        let phoneNumber = localStorage.getItem('phoneNumber');
        let email = localStorage.getItem('email');
        console.log(email);
        let data = {
            "token": user.token,
            "phoneNumber": phoneNumber,
            "email": email
        }
        // console.log("this is data email", data)
        dispatch(userActions.requestEmailVerification(data));
        console.log("Returned data", responseData);
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            {!isSucessfullSign && 
                <div>
                    <p>Please Complete you email verification. <Button variant="link" onClick={handleSubmit} >Click here</Button>to sent an confirmation mail to your mail id.</p>
                </div>
            }
            {/* <h1>Hi {user.firstName}!</h1> */}
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered users:</h3>
            {console.log(users)}
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };