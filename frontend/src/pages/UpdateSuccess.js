import React from 'react';

function UpdateSuccess() {
    // Set timer to show fail status for 2 seconds
    setTimeout( function() {
        window.location.href = "/";
    }, 3000)

    return(
        <div style={{margin: 30}}>
            <h2>Update successful</h2>
            <div>
            Your record has been successfully updated
            </div>
            Redirecting back to login page ...
        </div>
    );
}

export default UpdateSuccess;