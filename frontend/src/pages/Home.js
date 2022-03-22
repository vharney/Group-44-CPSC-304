import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Paper, Divider, Chip, Card, CardContent, CardHeader, CardMedia, Tabs, Tab, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ListItemIcon, PersonAdd } from '@mui/material';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import './Home.css';
import Logo from "../assets/hireme.png";
import avatar from "../assets/avatar.jpg";
import placeholder from "../assets/img_placeholder.jpg";

// AppBar Component
const pages = ["Connections", "Groups", "Jobs"]; 
const settings = ['Profile', 'Account Detail', 'Logout'];

function NavBar({fullName}) {
    const { username } = useParams();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const url = "/" + {username}.username + "/home"
    console.log(url)
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [tabValue, setValue] = useState();

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }

    return(
        // Now implement logged in username and its content
        // 2 ways: 1. get from URL address bar (shortcut but unrealistic) 2. Use session but harder to implement
        <AppBar position='fixed' style={{ background: '#2E3B55'}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <a href={url}> <img style={{height: "60px"}} src={Logo} alt="Logo" /> </a>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    {pages.map((page) => (
                        // Iterate pages to create pages tabs in AppBar
                        <Tab label={page} style={{color: "white"}} />
                    ))}
                </Tabs>
                

                <Box position="relative" sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar position="absolute" sx={{end: 0}} alt={fullName} src={avatar} />
                            <ArrowDropDownIcon style={{color: "white"}}/>
                        </IconButton>
                    </Tooltip>
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        keepMounted open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
                    >
                        <MenuItem> <AccountCircleIcon  fontSize="35px"/> &nbsp; Profile </MenuItem>
                        <MenuItem> <AccountCircleIcon fontSize="35px"/> &nbsp;  My account </MenuItem>
                        <Divider />
                        <MenuItem> <ListItemIcon> <LogoutIcon fontSize="small" /> </ListItemIcon> Logout </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

// Component to create post
function CreatePost({fullName}) {
    const { username } = useParams();

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 10, width: 500, height: 140}}} >
            <Paper variant="outlined" elevation={0} style={{position: "relative", borderRadius: "20px"}}>
                <h2 style={{marginLeft: "20px"}} > Hi, {fullName} </h2>
                <Avatar style={{position: "absolute", height: "60px", width: "60px"}} sx={{m: 2, mt: 0}} alt={fullName} src={avatar} />
                <Button style={{position: "absolute", borderRadius: "20px", width: "360px"}} sx={{ml: 13, mt: 2}} variant="outlined" >    
                    <AddIcon />
                    &nbsp; share a new post
                </Button>
            </Paper>
        </Box>
    );
}

function Posts() {
    const [posts, setPosts] = useState([]);

    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/posts.php", JSON.stringify({
            //NOTHING NOW CAN BE UPDATED TO FILTER 
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setPosts(response.data.message);
                console.log(response.data.message);

            }
        }, (error) => {
            console.log(error);
        });
    }, []) 

    const [anchorElFilter, setAnchorElFilter] = useState(null);
    const handleOpenFilterMenu = (event) => {
        setAnchorElFilter(event.currentTarget);
    };
    
    const handleCloseFilterMenu = () => {
        setAnchorElFilter(null);
    };

    const handleFilter = () => {
        console.log("FILTER") // TO BE IMPLEMENTED WHAT HAPPENS WHEN FILTER IS CLICKED< GO TO BACKEND AND UPDATE STATE
    }

    return(
        <div style={{position: "relative"}}>
            <Button variant="contained" disableElevation endIcon={<KeyboardArrowDownIcon />} onClick={handleOpenFilterMenu} style={{position: "absolute", top: "-15px",right: "30px"}}>
                FILTER POSTS BY
            </Button>
            <FormGroup style={{position: "absolute", top: "20px",right: "30px"}}>
                <FormControlLabel style={{display: "inline-block"}} control={<Checkbox defaultChecked />} label="Company" />
                <FormControlLabel style={{display: "inline-block"}} control={<Checkbox defaultChecked />} label="Employee" />
            </FormGroup>
            {/* <Checkbox defaultChecked label="Company"> TEst </Checkbox>
            <Button variant="contained" disableElevation endIcon={<KeyboardArrowDownIcon />} onClick={handleOpenFilterMenu} style={{position: "absolute", top: "-15px",right: "30px"}}>
                FILTER BY
            </Button>
            <Menu anchorEl={anchorElFilter} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}>
                <MenuItem onClick={handleFilter} disableRipple>
                    Company Only
                </MenuItem>
                <MenuItem onClick={handleFilter} disableRipple>
                    Employee Only
                </MenuItem>
            </Menu> */}
            {posts.map((post) => (
                // Iterate pages to create pages tabs in AppBar
                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px"}}>
                        <CardHeader
                            avatar={<Avatar alt={post[0].fullname}  src="ads" />}
                            title={post[0].fullname}
                            subheader={post[0].title}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={placeholder}
                            alt="Post Media"
                        />
                        <CardContent>
                            <Typography variant="body2">
                                {post[0].text_content}
                            </Typography>
                        </CardContent>
                    </Card>
                    {/* <Paper variant="outlined" elevation={0} style={{position: "relative", borderRadius: "20px"}}>
                        <Typography style={{position:"absolute"}} sx={{mt: 5, ml: 13}}> {post[0].fullname} </ Typography>
                        <Avatar alt={post[0].fullname} style={{position: "absolute", height: "60px", width: "60px"}} sx={{m: 2}} src="ads" />
                    </Paper> */}
                </Box>
            ))}
        </div>
    );
}

function Home() {
    const username = useParams();
    const [fullName, setFullname] = useState("");
    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/home.php", JSON.stringify({
            username: username["username"],
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                window.location = "/"; 
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setFullname(response.data.message);
                console.log(response);

            }
          }, (error) => {
            console.log(error);
          });
    }, []) 

    return (
        <div>
            <NavBar parentToChild={fullName} />
            <CreatePost fullName={fullName} />
            <Divider sx={{m: 2}}>
                <Chip label="Posts" />
            </Divider>
            <Posts />
        </div>
    );
}

export default Home;