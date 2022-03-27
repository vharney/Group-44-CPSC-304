import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Paper, IconButton, Select, MenuItem, Modal, Divider, Chip, Card, CardContent, CardHeader, CardMedia, InputLabel, Checkbox, FormGroup, FormControlLabel, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import placeholder from "../assets/img_placeholder.jpg";
import NavBar from './components/NavBar';

// function NavBar({fullName}) {
//     const { username } = useParams();
//     const [anchorElUser, setAnchorElUser] = useState(null);
//     const url = "/" + {username}.username + "/home"
//     const avatar = require("../assets/" + {username}.username + ".jpg");
    
//     // AppBar Component
//     const pages = ["Connections", "Groups", "Jobs"]; 
    
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };
    
//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     const [tabValue, setValue] = useState();

//     const handleTabChange = (event, newValue) => {
//         console.log(event.target.innerText);
//         if (event.target.innerText === "CONNECTIONS") {
//             window.location = "/" + {username}.username + "/connections";
//         }
//         else if (event.target.innerText === "GROUPS") {
//             window.location = "/" + {username}.username + "/groups";
//         }
//         else if (event.target.innerText === "JOBS") {
//             window.location = "/" + {username}.username + "/jobs";
//         }
//         setValue(newValue);
//     }

//     return(
//         // Now implement logged in username and its content
//         // 2 ways: 1. get from URL address bar (shortcut but unrealistic) 2. Use session but harder to implement
//         <AppBar position='fixed' style={{ background: '#2E3B55'}}>
//             <Toolbar sx={{justifyContent: "space-between"}}>
//                 <a href={url}> <img style={{height: "60px"}} src={Logo} alt="Logo" /> </a>
//                 <Tabs value={tabValue} onChange={handleTabChange}>
//                     {pages.map((page) => (
//                         // Iterate pages to create pages tabs in AppBar
//                         <Tab key={page} label={page} style={{color: "white"}} />
//                     ))}
//                 </Tabs>
                

//                 <Box position="relative" sx={{ flexGrow: 0 }}>
//                     <Tooltip title="Open settings">
//                         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                             <Avatar position="absolute" sx={{end: 0}} alt={fullName} src={avatar} />
//                             <ArrowDropDownIcon style={{color: "white"}}/>
//                         </IconButton>
//                     </Tooltip>
//                     <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
//                         anchorOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         transformOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                           }}
//                         keepMounted open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
//                     >
//                         <MenuItem> <AccountCircleIcon  fontSize="35px"/> &nbsp; Profile </MenuItem>
//                         <MenuItem onClick={() => {window.location = "/" + {username}.username + "/settings"}}> <ManageAccountsIcon fontSize="35px"/> &nbsp;  Account Settings </MenuItem>
//                         <Divider />
//                         <MenuItem> <ListItemIcon> <LogoutIcon fontSize="small" /> </ListItemIcon> Logout </MenuItem>
//                     </Menu>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }

// Component to create post
function CreatePost({fullName}) {
    const { username } = useParams();
    let avatar = "";
    try {avatar = require("../assets/" + {username}.username + ".jpg")} catch {avatar = "not found"};

    const [newPost, openNewPost] = useState(false);

    const handleOpen = () => {
        openNewPost(true);
    }

    const handleClose = () => {
        openNewPost(false);
    }

    const [textContent, setTextContent] = useState("Input Text Content Here");

    const handleTextChange = (event) => {
        setTextContent(event.target.value);
    }

    const [title, setTitle] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const [postType, setPostType] = useState("");

    const handleTypeChange = (event) => {
        setPostType(event.target.value);
    }

    const handleCreatePost = () => {
        axios.post("http://localhost:9000/api/posts/createPost.php", JSON.stringify({
            username: {username}.username,
            title: title,
            textContent: textContent,
            postType: postType,
        }))
        .then((response) => {
            window.location.reload(false);
          }, (error) => {
            console.log(error);
          });
    }

    const [openViewPost, setViewPost] = useState(false);
    const [yourPosts, setYourPosts] = useState([]);

    const handleOpenViewPost = () => {
        setViewPost(true);
        axios.post("http://localhost:9000/api/posts/getYourPosts.php", JSON.stringify({
            username: {username}.username
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                setYourPosts(response.data.message);
            }
        }, (error) => {
            console.log(error);
        });
        // Logic to load post and allow deletion here
    }

    const handleCloseViewPost = () => {
        setViewPost(false);
    }

    const handleDeletePost = (event) => {
        console.log(event.target.id);
        axios.post("http://localhost:9000/api/posts/deletePost.php", JSON.stringify({
            postID: event.target.id
        }))
        .then((response) => {
            if (response.data.message === "delete success") {
                // If delete is successful, reload to home page
                window.location.reload(false);
            }
            else {
                // Else log error in console
                console.log(response.data.message);

            }
        }, (error) => {
            console.log(error);
        });
        
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 10, width: 500, height: 170}}} >
            <Paper variant="outlined" elevation={0} style={{position: "relative", borderRadius: "20px"}}>
                <h2 style={{marginLeft: "20px"}} > Hi, {fullName} </h2>
                <Avatar style={{position: "absolute", height: "80px", width: "80px"}} sx={{m: 2, mt: 0}} alt={fullName} src={avatar} />
                <Button color="secondary" sx={{ml: 14, mt: 0}} style={{position: "absolute"}} onClick={handleOpenViewPost}> <AccessTimeIcon /> &nbsp; View or Delete Your Previous Posts</Button>
                <Modal open={openViewPost} onClose={handleCloseViewPost}>
                    <Box style = {{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700,  backgroundColor: 'white', boxShadow: 24, padding: 12, borderRadius: "5px"}}>
                        <Typography  variant="h5" component="h2">
                            Your Posts
                        </Typography>
                        <Box style={{overflow: "scroll", maxHeight: 600}} sx={{mt: 2}}>
                            {yourPosts.length > 0 ? yourPosts.map((post) => {
                                // Iterate pages to create pages tabs in AppBar
                                let post_avatar = "";
                                try {post_avatar = require("../assets/" + post[0].username + ".jpg")} catch {post_avatar = "not found"};
                                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
                                        <CardHeader
                                            avatar={<Avatar alt={post[0].fullname}  src={post_avatar} />}
                                            title={post[0].fullname}
                                            subheader={post[0].title}
                                        />
                                        <Button style={{position: "absolute", right: 10, top: 12}} color="error" onClick={handleDeletePost} id={post[0].postID} > <DeleteIcon id={post[0].postID}style={{fontSize: 30}} />  Delete Post </Button>
                                        <CardMedia
                                            component="img"
                                            height="350"
                                            image={placeholder}
                                            alt="Post Media"
                                        />
                                        <CardContent>
                                            <Typography variant="body2">
                                                {post[0].text_content}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            }) : <div> You have never posted </div>}
                        </Box>
                    </Box>
                </Modal>
                
                <Button style={{position: "absolute", borderRadius: "20px", width: "360px"}} sx={{ml: 14, mt: 6}} onClick={handleOpen} variant="outlined" >    
                    <AddIcon />
                    &nbsp; share a new post
                </Button>
                <Dialog open={newPost} onClose={handleClose}>
                    <DialogTitle>Create a New Post</DialogTitle>
                    <DialogContent>
                        <DialogContentText> Share your thoughts in the text field below, dont forget to choose the type of your posts and title your post </DialogContentText>
                        <TextField id="outlined-basic" fullWidth label="Title" variant="outlined" onChange={handleTitleChange} sx={{mt: 2, mb: 2}} />
                        <TextField fullWidth label="Text Content" multiline rows={7} onChange={handleTextChange} variant="filled" />
                    </DialogContent>
                    <InputLabel sx={{ml: 10, mr: 10}} id="demo-simple-select-label">Post Type</InputLabel>
                    <Select value={postType} sx={{ml: 10, mr: 10, mb: 5}} label="Type" onChange={handleTypeChange} >
                        <MenuItem value={"announcement"}>Announcement</MenuItem>
                        <MenuItem value={"article"}>Article</MenuItem>
                        <MenuItem value={"hiring"}>Hiring</MenuItem>
                        <MenuItem value={"news"}>News</MenuItem>
                        <MenuItem value={"post"}>Post</MenuItem>
                    </Select>
                    <DialogActions>
                        <Button color="error" onClick={handleClose}>Cancel</Button>
                        <Button color="success" onClick={handleCreatePost}>Submit</Button>
                    </DialogActions>    
                </Dialog>
            </Paper>
        </Box>
    );
}

function Posts() {
    const [posts, setPosts] = useState([]);

    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/posts/posts.php", JSON.stringify({
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
                <FormControlLabel style={{display: "inline-block"}} control={<Checkbox defaultChecked />} label="Hiring Type" />
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
            {posts.map((post) => {
                // Iterate pages to create pages tabs in AppBar
                let post_avatar = "";
                try {post_avatar = require("../assets/" + post[0].username + ".jpg")} catch {post_avatar = "not found"};
                return <Box key={post[0].postID} sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px"}}>
                        <CardHeader
                            avatar={<Avatar alt={post[0].fullname}  src={post_avatar} />}
                            title={post[0].fullname}
                            subheader={post[0].title}
                        />
                        <CardMedia
                            component="img"
                            height="350"
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
            })}
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