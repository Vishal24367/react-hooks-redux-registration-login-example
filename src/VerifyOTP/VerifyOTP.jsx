import OtpInput from 'react-otp-input';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function VerifyOTP() {
    const [inputs, setInputs] = useState({
        otp: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { otp } = inputs;
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    function handleChange(e) {
      setInputs(inputs => ({ ...inputs, otp: e }));
      console.log(otp);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (otp ) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.otpVerification(otp,from));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi !</h1>
            <p>A 4-digit OTP sent at your mobile no.!!</p>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>OTP Verification.</label>
                    <OtpInput
                      value={otp}
                      onChange={handleChange}
                      numInputs={4}
                      name="otp"
                      separator={<span>--</span>}
                    />
                    {submitted && !otp &&
                        <div className="invalid-feedback">otp is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Verify
                    </button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
    );
}

export { VerifyOTP };