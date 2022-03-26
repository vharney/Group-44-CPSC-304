import React from 'react';
import { useParams } from 'react-router-dom';

function RegisterFailed() {
    // Set timer to show fail status for 2 seconds
    setTimeout( function() {
        window.location.href = "/register";
    }, 3000)

    return(
        <div style={{margin: 30}}>
            <h2>Register Failed</h2>
            <div>
            Register Failed, either username already exist or there are rule violations. acode must be the first 3 digit of phone code and must exist in database. Please try registering again.
            </div>
            Redirecting back ...
        </div>
    );
}

export default RegisterFailed;