import React from 'react';

function RegisterSuccess() {
    // Set timer to show fail status for 2 seconds
    setTimeout( function() {
        window.location.href = "/";
    }, 3000)

    return(
        <div style={{margin: 30}}>
            <h2>Register Account successful</h2>
            <div>
            Please login with the registered username and password that you just created
            </div>
            Redirecting back to login page ...
        </div>
    );
}

export default RegisterSuccess;