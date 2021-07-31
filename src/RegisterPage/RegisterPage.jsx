import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        referredCodeKey: '',
        agreeToPrivacyPolicy: false
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleCheckChanged(e) {
        let checked = false;
        if(e.target.checked) checked = true;
        setUser(user => ({ ...user, agreeToPrivacyPolicy: checked }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.email && user.phoneNumber) {
            console.log(user);
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} className={'form-control' + (submitted && !user.phoneNumber ? ' is-invalid' : '')} />
                    {submitted && !user.phoneNumber &&
                        <div className="invalid-feedback">phoneNumber is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Referral Code</label>
                    <input type="referredCodeKey" name="referredCodeKey" value={user.referredCodeKey} onChange={handleChange} className={'form-control'} />
                </div>
                <div className="form-group">
                    <label>Agreement for Privacy Policy</label>
                    <input type="checkbox" name="agreeToPrivacyPolicy" value={user.agreeToPrivacyPolicy} onChange={handleCheckChanged} className={'form-control'} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };