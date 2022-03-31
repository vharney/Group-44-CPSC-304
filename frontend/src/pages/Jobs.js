import React from 'react';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, Button, CardHeader, CardContent } from '@mui/material';
import axios from 'axios';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// function AvailableJobs() {
//     const { username } = useParams();
//     const [availableJobs, setAvailableJobs] = useState([]);
//     // Component did mount
//     useEffect(() => {
//         axios.post("http://localhost:9000/api/jobs/getYourJobs.php", JSON.stringify({
//             username: {username}.username
//         }))
//         .then((response) => {
//             if (response.data.message === "error") {
//                 // Go back to login page if there is any error
//                 console.log(response);
//             }
//             else {
//                 // Else display home page accordingly
//                 setAvailableJobs(response.data.message);
//             }
//         }, (error) => {
//             console.log(error);
//         })
//     }, []) 

//     const handleJoinGroup = (event) => {
//         axios.post("http://localhost:9000/api/jobs/joinGroup.php", JSON.stringify({
//             username: {username}.username,
//             groupID: event.target.id
//         }))
//         .then((response) => {
//             if (response.data.message === "error") {
//                 // Go back to login page if there is any error
//                 console.log(response);
//             }
//             else {
//                 // Else display home page accordingly
//                 window.location.reload(false);
//             }
//         }, (error) => {
//             console.log(error);
//         })
//     }

//     return (
//         <div>
//             <h1 style={{textAlign: "center"}}>
//                 Current Job Postings
//             </h1>
//             {availableJobs.length > 0 ? 
//             <div style={{marginBottom: "40px"}}>
//                 {availableJobs.map((availableJob) => {
//                 // Iterate pages to create pages tabs in AppBar
//                 return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
//                     <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
//                         <CardHeader
//                             title={availableJob[0].title}
//                         />
//                         <CardContent>
//                         <Typography variant="body2">
//                                 Company: {availableJob[0].username}
//                             </Typography>
//                             <Typography variant="body2">
//                                 location: {availableJob[0].location}
//                             </Typography>
//                             <Typography variant="body2">
//                                 salary($): {availableJob[0].salary}
//                             </Typography>
//                         </CardContent>
//                         <Button style={{position: "absolute", right: 10, bottom: 10}} onClick={handleJoinGroup} id={availableJob[0].title} >
//                             <MeetingRoomIcon />
//                             Join Group
//                         </Button>
//                     </Card>
//                 </Box>
//                 })}
//             </div>
//             :
//             <div style={{textAlign: "center", marginBottom: "40px" }}> There are currently no avaiable jobs.  Please wait until more are posted. </div>
//             }
//         </div>
//     );
// }

function YourJobs() {
    const { username } = useParams();
    const [yourJobs, setYourJobs] = useState([]);

    const handleJoinJob = (event) => {
        console.log(event.target.username);
        // console.log("testtttttttt");
        axios.post("http://localhost:9000/api/apply.php", JSON.stringify({
            // username: {username}.username,
            // groupID: event.target.id,
            // username_comp: event.target.id.username,
            username_emp: {username}.username,
            title: event.target.id
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
    
    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/jobs/getYourJobs.php", JSON.stringify({
            username: {username}.username
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setYourJobs(response.data.message);
                // console.log(response);
            }
        }, (error) => {
            console.log(error);
        })
    }, []) 

    return(
       <Box sx={{mt: 10}}>
           <Typography variant="h3" style={{textAlign: "center"}}>
                Job Board
           </Typography>
           {yourJobs.length > 0 ? yourJobs.map((yourJob) => {
                // Iterate pages to create pages tabs in AppBar
                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
                        <CardHeader
                            title={yourJob[0].title}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                Company: {yourJob[0].username}
                            </Typography>
                            <Typography variant="body2">
                                location: {yourJob[0].location}
                            </Typography>
                            <Typography variant="body2">
                                salary($): {yourJob[0].salary}
                            </Typography>
                        </CardContent>
                        <Button style={{position: "absolute", right: 10, bottom: 10}} onClick={handleJoinJob} id={yourJob[0].title + "*" + yourJob[0].username}>
                            <MeetingRoomIcon />
                            Apply
                        </Button>
                    </Card>
                </Box>
            }) : <div style={{textAlign: "center" }}> Looking for a job? Check out the job listings below! </div>}
       </Box>
    );
}

function Jobs() {
    return(
        <div>
            <NavBar />
            <YourJobs />
            {/* <AvailableJobs /> */}
        </div>
    );
}

export default Jobs;