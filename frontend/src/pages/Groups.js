import React from 'react';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, Button, CardHeader, CardContent } from '@mui/material';
import axios from 'axios';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

function AvailableGroups() {
    const { username } = useParams();
    const [availableGroups, setAvailableGroups] = useState([]);
    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/groups/groups.php", JSON.stringify({
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

    const handleJoinGroup = (event) => {
        axios.post("http://localhost:9000/api/groups/joinGroup.php", JSON.stringify({
            username: {username}.username,
            groupID: event.target.id
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                window.location.reload(false);
            }
        }, (error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                Available Groups to Join
            </h1>
            {availableGroups.length > 0 ? 
            <div style={{marginBottom: "40px"}}>
                {availableGroups.map((availableGroup) => {
                // Iterate pages to create pages tabs in AppBar
                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
                        <CardHeader
                            title={availableGroup[0].groupName}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                Member Number: {availableGroup[0].memberNum}
                            </Typography>
                        </CardContent>
                        <Button style={{position: "absolute", right: 10, bottom: 10}} onClick={handleJoinGroup} id={availableGroup[0].groupID} >
                            <MeetingRoomIcon />
                            Join Group
                        </Button>
                    </Card>
                </Box>
                })}
            </div>
            :
            <div style={{textAlign: "center", marginBottom: "40px" }}> No more available groups for you to join! Contact admin to add more group </div>
            }
        </div>
    );
}

function YourGroups() {
    const { username } = useParams();
    const [yourGroups, setYourGroups] = useState([]);
    
    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/groups/getYourGroups.php", JSON.stringify({
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