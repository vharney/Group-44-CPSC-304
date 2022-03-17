import React from 'react';

function LoginFailed() {
    // Set timer to show fail status for 2 seconds
    setTimeout( function() {
        window.location.href = "/";
    }, 3000)

    return(
        <div>
            <h2>Sign in failed</h2>
            <div>
            Username or Password doesn't exist in the database.
            </div>
            Redirecting back ...
        </div>
    );
}

export default LoginFailed;