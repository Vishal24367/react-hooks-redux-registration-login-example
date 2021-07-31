import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    otpVerification,
    requestEmailVerification,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(phoneNumber) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
    };
    console.log("hello");
    return fetch(`http://localhost:3000/users/phone`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('phoneNumber', phoneNumber);
            console.log("this is my user", localStorage.getItem('user'));
            return user;
        });
}

function otpVerification(otp) {
    let user = JSON.parse(localStorage.getItem('user'));
    let phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));
    let data = {
        "verificationCode": otp,
        "phoneNumber": phoneNumber,
        "token": user.token
    }
    console.log(JSON.stringify({ data }));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
    };
    console.log("hello");
    return fetch(`http://localhost:3000/users/phone/verify`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('isSuccessfulSignIn', user.isSuccessfulSignIn);
            console.log(localStorage.getItem('isSuccessfulSignIn'));
            return user;
        });
}

function requestEmailVerification(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
    };
    console.log("email verfi ", data);
    return fetch(`http://localhost:3000/users/email`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user);
            return user;
        });
}



function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:3000/users`, requestOptions).then(handleResponse).then(data => {
        localStorage.setItem('email', user.email);
    });
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.errors) || response.statusText;
            return Promise.reject(error);
        }
        console.log("This is the response ", data);
        return data;
    });
}