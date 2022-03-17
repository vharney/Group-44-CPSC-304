import { TextField, Card, Grid, Button } from '@mui/material'; 
import { useState } from "react";
import React from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [acode, setAcode] = useState("");

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

    // City input handler
    const handleCity = (event) => {
        setCity(event.target.value);
    };

    // Area code input handler
    const handleAcode = (event) => {
        setAcode(event.target.value);
    };

    // Area code input handler
    const handleSubmit = (event) => {
        axios.post("http://localhost:9000/index.php", JSON.stringify({
            username: username,
            password: password,
            fullName: fullName,
            phone: phone,
            city: city,
            acode: acode
        }))
        .then((response) => {
            console.log(response.data);
          }, (error) => {
            console.log(error);
          });
        console.log(username);
        console.log(password);
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
            <Card variant="outlined" sx={{padding: 2, width: "fit-content"}}>
                    <div>
                        <TextField id="outlined-basic" label="Username" variant="outlined" onChange={handleUsername}/>
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ mt: 2 }} onChange={handlePassword} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" sx={{ mt: 2 }} onChange={handleFullName} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Phone" variant="outlined" sx={{ mt: 2 }} onChange={handlePhone} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="City" variant="outlined" sx={{ mt: 2 }} onChange={handleCity} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Area Code" variant="outlined" sx={{ mt: 2 }} onChange={handleAcode} />
                    </div>
                    <Button variant="contained" disableElevation sx={{ mt: 2 }} onClick={handleSubmit}>Submit</Button>
            </Card>
            </Grid>
        </div>
    );
}

export default Register;