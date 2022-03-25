import React from 'react';
import { useParams } from 'react-router-dom';

function UpdateFailed() {
    const {username} = useParams();
    // Set timer to show fail status for 2 seconds
    setTimeout( function() {
        window.location.href = "/" + {username}.username + "/settings";
    }, 3000)

    return(
        <div style={{margin: 30}}>
            <h2>Update Failed</h2>
            <div>
            Update Failed, either username already exist or there are rule violations
            </div>
            Redirecting back ...
        </div>
    );
}

export default UpdateFailed;