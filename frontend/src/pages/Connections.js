import React from 'react';
import NavBar from './components/NavBar';
import { useState } from 'react';
import { Box, Modal, Button, Paper, Chip, InputBase, BottomNavigation, BottomNavigationAction, IconButton, Divider, Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useParams } from 'react-router-dom';

function SearchConnections() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleSearch = () => {
        axios.post("http://localhost:9000/api/connections/searchConnections.php", JSON.stringify({
            fnameuname: searchQuery
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Else log error in console
                console.log(response.data.message);
            }
            else {
                // If delete is successful, reload to home page
                // console.log(response);
                setSearchResults(response.data.message);

            }
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <Box sx={{mt: 12}}>
            <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }} style={{margin: "0 auto"}}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search other employees by their username or fullname"
                    onChange={handleSearchQuery}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton onClick={handleSearch} sx={{ p: '10px' }} >
                    <SearchIcon />
                </IconButton>
            </Paper>
            {searchResults.length > 0 ? 
                <div style={{marginBottom: "120px"}}> 
                <Divider sx={{m: 2}}>
                    <Chip label="Search Results" />
                </Divider>
                {searchResults.map((searchResult) => {
                    let post_avatar = "";
                    try {post_avatar = require("../assets/" + searchResult[0].username + ".jpg")} catch {post_avatar = "not found"};
                    return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                        <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px"}}>
                            <CardHeader
                                avatar={<Avatar alt={searchResult[0].fullname}  src={post_avatar} />}
                                title={searchResult[0].fullname}
                                subheader={searchResult[0].username}
                            />
                            <Box sx={{ml: 2, mb: 2}}>
                                <Typography variant="body2">
                                    Profession: {searchResult[0].profession}  ({searchResult[0].position})
                                </Typography>
                                <Typography variant="body2">
                                    Age: {searchResult[0].age}
                                </Typography>
                                <Typography variant="body2">
                                    Phone: {searchResult[0].phone}
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                })}
                </div>
                : 
                <div></div>
            }
        </Box>
    );
}

function Connections() {
    const { username } = useParams();
    const [botNav, setBotNav] = useState();

    const [myConnections, setMyConnections] = useState([]);
    const [openMyConnection, setOpenMyConnection] = useState(false);

    const handleCloseMyConnection = () => {
        setOpenMyConnection(false)
    }

    const handleMyConnection = () => {
        setOpenMyConnection(true);
        axios.post("http://localhost:9000/api/connections/myConnections.php", JSON.stringify({
            username: {username}.username
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setMyConnections(response.data.message);
            }
        }, (error) => {
            console.log(error);
        });
    }

    const [waitingApprovals, setWaitingApproval] = useState([]);
    const [openWaitingApproval, setOpenWaitingApproval] = useState(false);

    const handleCloseWaitingApproval = () => {
        setOpenWaitingApproval(false);
    }

    const handleWaitingApproval = () => {
        setOpenWaitingApproval(true);
        axios.post("http://localhost:9000/api/connections/waitingApproval.php", JSON.stringify({
            username: {username}.username
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setWaitingApproval(response.data.message);
            }
        }, (error) => {
            console.log(error);
        });
    }

    const [approveNewConnections, setapproveNewConnections] = useState([]);
    const [openApproveNewConnections, setopenApproveNewConnections] = useState(false);

    const handleCloseApproveNewConnections = () => {
        setopenApproveNewConnections(false);
    }

    const handleApproveNewConnections = () => {
        setopenApproveNewConnections(true);
        axios.post("http://localhost:9000/api/connections/approveConnections.php", JSON.stringify({
            username: {username}.username
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setapproveNewConnections(response.data.message);
            }
        }, (error) => {
            console.log(error);
        });
    }




    return (
        <div>
            <NavBar />
            <SearchConnections />
            <Paper sx={{ position: 'fixed', bottom: 40, left: 0, right: 0 }} elevation={0}>
                <BottomNavigation
                    showLabels
                    value={botNav}
                    onChange={(event, newValue) => {
                        setBotNav(newValue);
                    }}
                    >
                    <BottomNavigationAction onClick={handleMyConnection} sx={{mr: 6}} style={{backgroundColor: "lightblue", color: "white", borderRadius: "100px", height: "70px", width: "70px"}} label="My Connections" icon={<GroupsIcon />} />
                    <BottomNavigationAction onClick={handleWaitingApproval} sx={{mr: 6}} style={{backgroundColor: "lightblue", color: "white", borderRadius: "100px", height: "70px", width: "70px"}} label="Waiting Approval" icon={<AccessTimeIcon />} />
                    <BottomNavigationAction onClick={handleApproveNewConnections} style={{backgroundColor: "lightblue", color: "white", borderRadius: "100px", height: "70px", width: "70px"}} label="Approve New Conection" icon={<PendingActionsIcon />} />
                </BottomNavigation>
            </Paper>

            <Modal open={openMyConnection} onClose={handleCloseMyConnection}>
                <Box style = {{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700,  backgroundColor: 'white', boxShadow: 24, padding: 12, borderRadius: "5px"}}>
                    <Typography  variant="h5" component="h2">
                        My Connections
                    </Typography>
                    <Box style={{overflow: "scroll", maxHeight: 600}} sx={{mt: 2}}>
                    {myConnections.length > 0 ? 
                            myConnections.map((myConnection) => {
                                let post_avatar = "";
                                try {post_avatar = require("../assets/" + myConnection[0].username + ".jpg")} catch {post_avatar = "not found"};
                                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px"}}>
                                        <CardHeader
                                            avatar={<Avatar alt={myConnection[0].fullname}  src={post_avatar} />}
                                            title={myConnection[0].fullname}
                                            subheader={myConnection[0].username}
                                        />
                                        <Box sx={{ml: 2, mb: 2}}>
                                            <Typography variant="body2">
                                                Profession: {myConnection[0].profession}  ({myConnection[0].position})
                                            </Typography>
                                            <Typography variant="body2">
                                                Age: {myConnection[0].age}
                                            </Typography>
                                            <Typography variant="body2">
                                                Phone: {myConnection[0].phone}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Box>
                            })
                            : 
                            <div>You don't have any connections yet, find someone to connect to using their username or fullname </div>
                        }
                    </Box>
                </Box>
            </Modal>

            <Modal open={openWaitingApproval} onClose={handleCloseWaitingApproval}>
                <Box style = {{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700,  backgroundColor: 'white', boxShadow: 24, padding: 12, borderRadius: "5px"}}>
                    <Typography  variant="h5" component="h2">
                        These employees still haven't accepted your request yet
                    </Typography>
                    <Box style={{overflow: "scroll", maxHeight: 600}} sx={{mt: 2}}>
                    {waitingApprovals.length > 0 ? 
                            waitingApprovals.map((waitingApproval) => {
                                let post_avatar = "";
                                try {post_avatar = require("../assets/" + waitingApproval[0].username + ".jpg")} catch {post_avatar = "not found"};
                                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position:"relative"}}>
                                        <CardHeader
                                            avatar={<Avatar alt={waitingApproval[0].fullname}  src={post_avatar} />}
                                            title={waitingApproval[0].fullname}
                                            subheader={waitingApproval[0].username}
                                        />
                                        <Box sx={{ml: 2, mb: 2}}>
                                            <Typography variant="body2">
                                                Profession: {waitingApproval[0].profession}  ({waitingApproval[0].position})
                                            </Typography>
                                            <Typography variant="body2">
                                                Age: {waitingApproval[0].age}
                                            </Typography>
                                            <Typography variant="body2">
                                                Phone: {waitingApproval[0].phone}
                                            </Typography>
                                        </Box>
                                        <div style={{position: "absolute", right: 20, bottom: 20}}> 
                                            <AccessTimeFilledIcon style={{fontSize: "90px"}} />
                                        </div>
                                    </Card>
                                </Box>
                            })
                            : 
                            <div> No connections pending to be approved by other employees </div>
                        }
                    </Box>
                </Box>
            </Modal>

            <Modal open={openApproveNewConnections} onClose={handleCloseApproveNewConnections}>
                <Box style = {{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700,  backgroundColor: 'white', boxShadow: 24, padding: 12, borderRadius: "5px"}}>
                    <Typography  variant="h5" component="h2">
                        Other Employees are Trying to Connect to You
                    </Typography>
                    <Box style={{overflow: "scroll", maxHeight: 600}} sx={{mt: 2}}>
                    {approveNewConnections.length > 0 ? 
                            approveNewConnections.map((approveNewConnection) => {
                                let post_avatar = "";
                                try {post_avatar = require("../assets/" + approveNewConnection[0].username + ".jpg")} catch {post_avatar = "not found"};
                                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position:"relative"}}>
                                        <CardHeader
                                            avatar={<Avatar alt={approveNewConnection[0].fullname}  src={post_avatar} />}
                                            title={approveNewConnection[0].fullname}
                                            subheader={approveNewConnection[0].username}
                                        />
                                        <Box sx={{ml: 2, mb: 2}}>
                                            <Typography variant="body2">
                                                Profession: {approveNewConnection[0].profession}  ({approveNewConnection[0].position})
                                            </Typography>
                                            <Typography variant="body2">
                                                Age: {approveNewConnection[0].age}
                                            </Typography>
                                            <Typography variant="body2">
                                                Phone: {approveNewConnection[0].phone}
                                            </Typography>
                                        </Box>
                                        <div style={{position: "absolute", right: 20, bottom: 20}}> 
                                            <Button style={{width: "100px"}} sx={{mb: 1}} elevation={0} variant="contained" color="success">Approve</Button>
                                            <br></br>
                                            <Button style={{width: "100px"}} elevation={0} variant="contained" color="error">Decline</Button>
                                        </div>
                                    </Card>
                                </Box>
                            })
                            : 
                            <div> No one has requested to connect with you at the moment ... </div>
                        }
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default Connections;