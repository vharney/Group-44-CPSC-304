import { TextField, Card, Grid, Button } from '@mui/material'; 
import { useState } from "react";
import axios from 'axios';

import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';

import Register from './pages/Register';
import Login from './pages/Login';
import LoginFailed from './pages/LoginFailed';
import Home from './pages/Home'

function App() {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/> 
                <Route path="/loginFailed" component={LoginFailed} />
                <Route path="/register" component={Register} />
                <Route path="/:username/home" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
