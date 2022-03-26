import React from 'react';
import { Avatar, Box, Container, Paper, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';

function Account() {
    const { username } = useParams();
    const avatar = require("../assets/" + {username}.username + ".jpg");
    const [userType, setUserType] = useState("");

    const [usernameDB, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [acode, setAcode] = useState("");
    // const [employeeNum, setEmployeeNum] = useState("");
    // const [age, setAge] = useState("");
    // const [profession, setProfession] = useState("");
    
    const [alert, setAlert] = useState(false);

    const handleClickOpen = () => {
        setAlert(true);
      };
    
    const handleClose = () => {
        setAlert(false);
    };

    const handleUpdate = (event) => {
        axios.post("http://localhost:9000/api/updateProfile.php", JSON.stringify({
            username: {username}.username,
            newUsername: usernameDB,
            password: password,
            fullname: fullName,
            phone: phone,
            acode: acode
        })).then((response) => {
            if (response.data.message === "record updated") {
                // If we get back fail message tell user
                window.location = "/updateSuccess"; 
            }
            else {
                window.location = "/" + {username}.username + "/updateFailed"; 
            }
        });
    }

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
            if (type === "COMPANIES") {
                axios.post("http://localhost:9000/api/getCompanyInfo.php", JSON.stringify({
                    username: {username}.username,
                }))
                .then((response) => {
                    if (response.data.message === "error") {
                        // Go back to login page if there is any error
                        console.log(response);
                    }
                    else {
                        setUsername(response.data.message[0][0].username);
                        setPassword(response.data.message[0][0].pw);
                        setFullName(response.data.message[0][0].fullname);
                        setPhone(response.data.message[0][0].phone);
                        setAcode(response.data.message[0][0].acode);
                        // setEmployeeNum(response.data.message[0][0].employeeNum);
                    }
                }, (error) => {
                    console.log(error);
                });
            }
            else {
                axios.post("http://localhost:9000/api/getEmployeeInfo.php", JSON.stringify({
                    username: {username}.username,
                }))
                .then((response) => {
                    if (response.data.message === "error") {
                        // Go back to login page if there is any error
                        console.log(response);
                    }
                    else {
                        setUsername(response.data.message[0][0].username);
                        setPassword(response.data.message[0][0].pw);
                        setFullName(response.data.message[0][0].fullname);
                        setPhone(response.data.message[0][0].phone);
                        setAcode(response.data.message[0][0].acode);
                        // setAge(response.data.message[0][0].age);
                        // setProfession(response.data.message[0][0].profession);
                    }
                }, (error) => {
                    console.log(error);
                });
            }
        });
    }, []) 

    
    
    const usernameChange = (event) => {
        setUsername(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const fullNameChange = (event) => {
        setFullName(event.target.value);
    }

    const phoneChange = (event) => {
        setPhone(event.target.value);
    }

    const acodeChange = (event) => {
        setAcode(event.target.value);
    }
    // let additionalFormCompanies = <TextField required id="employeeNum" name="employeeNum" label="Number of Employees" fullWidth  variant="standard" value={employeeNum} sx={{mt: 3}}/> 
    // let additionalFormEmployees = <div> <TextField required id="age" name="age" label="Age" fullWidth  variant="standard" value={age} sx={{mt: 3}}/> <TextField required id="profession" name="profession" label="Profession" fullWidth  variant="standard" value={profession} sx={{mt: 3}}/> </div>

    return(
        <div>
            <NavBar />
            <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 12}}>
                <Paper style={{position: "relative"}} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 13, md: 3 }}}>
                    <Avatar style={{height: "200px", width: "200px", margin: "0 auto"}} alt={username} src={avatar} />
                    <Typography component="h1" variant="h4" align="center" sx={{mt: 4}} >
                        Account Details
                    </Typography>

                    <TextField required id="username" name="username" label="Username" fullWidth  variant="standard" value={usernameDB} onChange={usernameChange} sx={{mt: 4}} />
                    <TextField required id="password" name="password" label="Password" fullWidth  variant="standard" value={password} onChange={passwordChange} sx={{mt: 3}} />
                    <TextField required id="fullname" name="fullname" label="Full Name" fullWidth  variant="standard" value={fullName} onChange={fullNameChange} sx={{mt: 3}} />
                    <TextField required id="phone" name="phone" label="Phone" fullWidth  variant="standard" value={phone} onChange={phoneChange} sx={{mt: 3}} />
                    <TextField required id="acode" name="acode" label="Acode" fullWidth  variant="standard" value={acode} onChange={acodeChange} sx={{mt: 3, mb:7}} />
                    {/* {userType == "COMPANIES" ? additionalFormCompanies : additionalFormEmployees} */}
                
                    <Button style={{position:"absolute", bottom: 20, right: 20}} variant="contained" sx={{mx: "auto", mt: 4}} onClick={handleClickOpen}> Save Changes </Button> 

                    <Dialog open={alert} onClose={handleClose} >
                        <DialogTitle> Are you sure you want to update your account? </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Information changed cannot be restored. If you have successfully updated your account you will be logged out. Please log in again with the new details. If update fails, you will be redirected back to this page
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="error">Cancel</Button>
                            <Button onClick={handleUpdate} color="success" autoFocus>Update Account</Button>
                        </DialogActions>
                    </Dialog>

                </Paper>
            </Container>
        </div>
    );
}

export default Account;