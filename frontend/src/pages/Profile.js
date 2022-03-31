import React from 'react';
import NavBar from './components/NavBar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Box, Avatar, Button, Typography, ListItem, List, ListItemAvatar, Divider, ListItemText } from '@mui/material';

function InfoReviewRecommendations() {
    const { username } = useParams();
    let avatar = "";
    try {avatar = require("../assets/" + {username}.username + ".jpg")} catch {avatar = "not found"};

    const [employeeInfo, setEmployeeInfo] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [companyInfo, setCompanyInfo] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [userType, setUserType] = useState("");
    useEffect(() => {
        let type = "";
        axios.post("http://localhost:9000/api/userType.php", JSON.stringify({
            username: {username}.username,
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                type = response.data.message;
                setUserType(response.data.message);
            }
        }, (error) => {
            console.log(error);
        }).then(() => {
            if (type=="COMPANIES") {
                axios.post("http://localhost:9000/api/accounts/getCompanyInfo.php", JSON.stringify({
                    username: {username}.username,
                }))
                .then((response) => {
                    if (response.data.message === "error") {
                        // Go back to login page if there is any error
                        console.log(response);
                    }
                    else {
                        setCompanyInfo(response.data.message[0][0]);
                    }
                }, (error) => {
                    console.log(error);
                }).then(()=>{
                    axios.post("http://localhost:9000/api/profiles/getReviews.php", JSON.stringify({
                        username: {username}.username,
                    }))
                    .then((response) => {
                        if (response.data.message === "error") {
                            // Go back to login page if there is any error
                            console.log(response);
                        }
                        else {
                            setReviews(response.data.message);
                        }
                    }, (error) => {
                        console.log(error);
                    })
                });
            }
            else if (type=="EMPLOYEES") {
                axios.post("http://localhost:9000/api/accounts/getEmployeeInfo.php", JSON.stringify({
                    username: {username}.username,
                }))
                .then((response) => {
                    if (response.data.message === "error") {
                        // Go back to login page if there is any error
                        console.log(response);
                    }
                    else {
                        setEmployeeInfo(response.data.message[0][0]);
                    }
                }, (error) => {
                    console.log(error);
                }).then(()=>{
                    axios.post("http://localhost:9000/api/profiles/getRecommendations.php", JSON.stringify({
                        username: {username}.username,
                    }))
                    .then((response) => {
                        if (response.data.message === "error") {
                            // Go back to login page if there is any error
                            console.log(response);
                        }
                        else {
                            setRecommendations(response.data.message);
                        }
                    }, (error) => {
                        console.log(error);
                    })
                });
            }
        });
    }, []) 

    return (
        <div>
            {userType == "COMPANIES" ? 
            <div>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 10, width: 700, height:310}}} >
                    <Paper variant="outlined" elevation={0} style={{position: "relative", borderRadius: "20px"}}>
                        <Avatar style={{position: "absolute", height: "260px", width: "260px"}} sx={{m: 2, mt: 3}} alt={()=>{}} src={avatar} component={Paper} elevation={2} />
                        <div style={{marginLeft: "300px", position: "absolute", marginTop: "30px"}} >
                            <h1> Company's Info</h1>
                            <h2> {companyInfo.fullname} </h2>
                            <Typography> Employee Number: <strong> {companyInfo.employeeNum}</strong></Typography>
                            <Typography> Phone: <strong> {companyInfo.phone}</strong></Typography>
                        </div>
                    </Paper>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 4, width: 900, height: 410}}} >
                    <Paper variant="outlined" elevation={0} style={{position: "relative", borderRadius: "20px"}}>
                        <Typography variant="h5" sx={{p: 3}} style={{color: "white", backgroundColor: '#2E3B55', borderRadius: "20px 20px 0 0"}}>
                            Reviews Received     
                        </Typography>
                        <Box style={{height: "320px", overflow: "scroll"}}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper'}} >
                                {reviews.map((review)=>{
                                    let avatar = "";
                                    try {avatar = require("../assets/" + review[0].fullname + ".jpg")} catch {avatar = "not found"};
                                    return <div>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                            <Avatar alt={review[0].username} src={avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={review[0].username}
                                                secondary={review[0].content}
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                </div>
                                })
                                }
                            </List>
                        </Box>        
                    </Paper>
                </Box>
            </div>
            :
            <div>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 10, width: 700, height:310}}} >
                    <Paper variant="outlined" elevation={0} style={{position: "relative", borderRadius: "20px"}}>
                        <Avatar style={{position: "absolute", height: "260px", width: "260px"}} sx={{m: 2, mt: 3}} alt={()=>{}} src={avatar} component={Paper} elevation={2} />
                        <div style={{marginLeft: "300px", position: "absolute", marginTop: "30px"}} >
                            <h1> Employee's Info</h1>
                            <h2> {employeeInfo.fullname} </h2>
                            <Typography> Age: <strong>{employeeInfo.age}</strong> </Typography>
                            <Typography> Profession: <strong>{employeeInfo.profession} ({employeeInfo.position})</strong> </Typography>
                            <Typography> Works at: <strong> {employeeInfo.username_comp}</strong></Typography>
                            <Typography> Phone: <strong> {employeeInfo.phone}</strong></Typography>
                        </div>
                    </Paper>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 4, width: 900, height: 410}}} >
                    <Paper variant="outlined" elevation={0} style={{position: "relative", borderRadius: "20px"}}>
                        <Typography variant="h5" sx={{p: 3}} style={{color: "white", backgroundColor: '#2E3B55', borderRadius: "20px 20px 0 0"}}>
                            Recommendations Received     
                        </Typography>
                        <Box style={{height: "320px", overflow: "scroll"}}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper'}} >
                                {recommendations.map((recommendation)=>{
                                    let avatar = "";
                                    try {avatar = require("../assets/" + recommendation[0].username + ".jpg")} catch {avatar = "not found"};
                                    return <div>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                            <Avatar alt={recommendation[0].username} src={avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={recommendation[0].fullname}
                                                secondary={recommendation[0].content}
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                </div>
                                })
                                }
                            </List>
                        </Box>        
                    </Paper>
                </Box>
            </div>
            }
        </div>
    );
}

function Profile() {
    return (
        <div>
            <NavBar />
            <InfoReviewRecommendations /> 
        </div>
    );
}

export default Profile;