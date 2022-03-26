import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Avatar, Divider, Tabs, Tab, Box } from '@mui/material';
import Logo from '../../assets/hireme.png';
import axios from 'axios';

function NavBar({fullName}) {
    const { username } = useParams();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const url = "/" + {username}.username + "/home"
    const avatar = require("../../assets/" + {username}.username + ".jpg");
    // AppBar Component
    let pages = ["Connections", "Groups", "Jobs"]
    const [userType, setUserType] = useState("");

    useEffect(() => {
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
                setUserType(response.data.message);
            }
        }, (error) => {
            console.log(error);
        });
    }, []) 
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [tabValue, setValue] = useState();

    const handleTabChange = (event, newValue) => {
        console.log(event.target.innerText);
        if (event.target.innerText === "CONNECTIONS") {
            window.location = "/" + {username}.username + "/connections";
        }
        else if (event.target.innerText === "GROUPS") {
            window.location = "/" + {username}.username + "/groups";
        }
        else if (event.target.innerText === "JOBS") {
            window.location = "/" + {username}.username + "/jobs";
        }
        setValue(newValue);
    }

    userType === "COMPANIES" ? pages = ["Groups", "Jobs"] : pages = ["Connections", "Groups", "Jobs"];

    return(
        // Now implement logged in username and its content
        // 2 ways: 1. get from URL address bar (shortcut but unrealistic) 2. Use session but harder to implement
        <AppBar position='fixed' style={{ background: '#2E3B55'}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <a href={url}> <img style={{height: "60px"}} src={Logo} alt="Logo" /> </a>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    {pages.map((page) => (
                        // Iterate pages to create pages tabs in AppBar
                        <Tab key={page} label={page} style={{color: "white"}} />
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
                        <MenuItem onClick={() => {window.location = "/" + {username}.username + "/settings"}}> <ManageAccountsIcon fontSize="35px"/> &nbsp;  Account Settings </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {window.location = "/"}}> <ListItemIcon> <LogoutIcon fontSize="small" /> </ListItemIcon> Logout </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;