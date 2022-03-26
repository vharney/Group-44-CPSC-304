import { TextField, Card, Grid, Button, FormLabel, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material'; 
import { useState } from "react";
import React from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    // const [city, setCity] = useState("");
    const [acode, setAcode] = useState("");
    const [userType, setUserType] = useState("companies");
    const [employeeNum, setEmployeeNum] = useState(0);
    const [age, setAge] = useState(0);
    const [profession, setProfession] = useState("");
    const [position, setPosition] = useState("");

    // Username input handler
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    // Password input handler
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    // Full Name input handler
    const handleFullName = (event) => {
        setFullName(event.target.value);
    };

    // Phone input handler
    const handlePhone = (event) => {
        setPhone(event.target.value);
    };

    // Area code input handler
    const handleAcode = (event) => {
        setAcode(event.target.value);
    };

    const handleUserType = (event) => {
        setUserType(event.target.value);
    }

    const handleEmployeeNum = (event) => {
        setEmployeeNum(event.target.value);
    }

    const handleAge = (event) => {
        setAge(event.target.value);
    }

    const handleProfession = (event) => {
        setProfession(event.target.value);
    }

    const handlePosition = (event) => {
        setPosition(event.target.value);
    }

    // Area code input handler
    const handleSubmit = (event) => {
        axios.post("http://localhost:9000/api/register.php", JSON.stringify({
            username: username,
            password: password,
            fullName: fullName,
            phone: phone,
            acode: acode,
            userType: userType,
            employeeNum: employeeNum,
            age: age,
            profession: profession,
            position: position
        }))
        .then((response) => {
            if (response.data.message == "register success") {
                window.location = "/registerSuccess";
            }
            else {
                window.location = "/registerFailed";
            }
        }, (error) => {
            window.location = "/registerFailed";
        });
    };

    return (
        <div className="App">
            <h1> Register </h1>
            <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            >
                <Card variant="outlined" sx={{padding: 2, width: "50%"}} style={{position: "relative"}}>
                    <div>
                        <TextField id="outlined-basic" label="Username" variant="outlined" style={{width: "90%"}} sx={{ mt: 2 }} onChange={handleUsername}/>
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Password" variant="outlined" style={{width: "90%"}} sx={{ mt: 2 }} onChange={handlePassword} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Full Name" variant="outlined"style={{width: "90%"}} sx={{ mt: 2 }} onChange={handleFullName} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Phone" variant="outlined" style={{width: "90%"}} sx={{ mt: 2 }} onChange={handlePhone} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Area Code" variant="outlined" style={{width: "90%"}} sx={{ mt: 2 }} onChange={handleAcode} />
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <FormControl >
                            <FormLabel>Who is this account for?</FormLabel>
                            <RadioGroup row defaultValue="companies" onChange={handleUserType} >
                                <FormControlLabel value="companies" control={<Radio />} label="Companies" />
                                <FormControlLabel value="employees" control={<Radio />} label="Employees" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {userType === "companies" ?
                    <div>
                        <TextField id="outlined-basic" label="Employee Number" variant="outlined" style={{width: "90%"}} sx={{ mt: 2 }} onChange={handleEmployeeNum} />
                    </div> 
                    :
                    <div>
                        <TextField id="outlined-basic" label="Age" variant="outlined" style={{width: "90%"}} sx={{ mt: 2 }} onChange={handleAge} />
                        <TextField id="outlined-basic" label="Profession" variant="outlined" style={{width: "90%"}} sx={{ mt: 2 }} onChange={handleProfession} />
                        <TextField id="outlined-basic" label="Position" variant="outlined" style={{width: "90%"}} sx={{ mt: 2 }} onChange={handlePosition} />
                    </div> 
                    }
                    <Button  variant="contained" disableElevation sx={{ mt: 2, mr: 2 }} color="error" onClick={() => {window.location = "/"}}>Cancel</Button> 
                    <Button  variant="contained" disableElevation sx={{ mt: 2 }} onClick={handleSubmit}>Submit</Button>
                </Card>
            </Grid>
        </div>
    );
}

export default Register;