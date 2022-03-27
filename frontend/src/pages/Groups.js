import React from 'react';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardHeader, CardContent } from '@mui/material';
import axios from 'axios';

function AvailableGroups() {
    const { username } = useParams();
    const [availableGroups, setAvailableGroups] = useState([]);
    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/groups.php", JSON.stringify({
            username: {username}.username
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setAvailableGroups(response.data.message);
            }
        }, (error) => {
            console.log(error);
        })
    }, []) 

    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                Available Groups to Join
            </h1>
            {availableGroups.length > 0 ? availableGroups.map((yourGroup) => {
                // Iterate pages to create pages tabs in AppBar
                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
                        <CardHeader
                            title={yourGroup[0].groupName}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                Member Number: {yourGroup[0].memberNum}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            }) : <div style={{textAlign: "center" }}> No more available groups for you to join! Contact admin to add more group </div>}
        </div>
    );
}

function YourGroups() {
    const { username } = useParams();
    const [yourGroups, setYourGroups] = useState([]);
    
    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/getYourGroups.php", JSON.stringify({
            username: {username}.username
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setYourGroups(response.data.message);
                // console.log(response);
            }
        }, (error) => {
            console.log(error);
        })
    }, []) 

    return(
       <Box sx={{mt: 10}}>
           <Typography variant="h3" style={{textAlign: "center"}}>
                Your Groups
           </Typography>
           {yourGroups.length > 0 ? yourGroups.map((yourGroup) => {
                // Iterate pages to create pages tabs in AppBar
                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
                        <CardHeader
                            title={yourGroup[0].groupName}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                Member Number: {yourGroup[0].memberNum}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            }) : <div style={{textAlign: "center" }}> You dont have a group! Join one from the available groups below </div>}
       </Box>
    );
}

function Groups() {
    return(
        <div>
            <NavBar />
            <YourGroups />
            <AvailableGroups />
        </div>
    );
}

export default Groups;