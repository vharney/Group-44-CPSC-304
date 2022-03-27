import React from 'react';
import NavBar from './components/NavBar';
import { useState } from 'react';
import { Box, Paper, Chip, InputBase, IconButton, Divider, Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

function SearchConnections() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleSearch = () => {
        axios.post("http://localhost:9000/api/searchConnections.php", JSON.stringify({
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
                <div> 
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
    return (
        <div>
            <NavBar />
            <SearchConnections />
        </div>
    );
}

export default Connections;