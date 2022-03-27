import { TextField, Card, Grid, Button } from '@mui/material'; 
import { useState } from "react";
import axios from 'axios';

import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';

import Register from './pages/Register';
import Login from './pages/Login';
import LoginFailed from './pages/LoginFailed';
import Home from './pages/Home';
import Connections from './pages/Connections';
import Account from './pages/Account';
import UpdateSuccess from './pages/UpdateSuccess';
import UpdateFailed from './pages/UpdateFailed';
import RegisterSuccess from './pages/RegisterSuccess';
import RegisterFailed from './pages/RegisterFailed';
import Groups from './pages/Groups';

function App() {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/> 
                <Route path="/loginFailed" component={LoginFailed} />
                <Route path="/register" component={Register} />
                <Route path="/:username/home" component={Home} />
                <Route path="/:username/connections" component={Connections} />
                <Route path="/:username/settings" component={Account} />
                <Route path="/updateSuccess" component={UpdateSuccess} />
                <Route path="/:username/updateFailed" component={UpdateFailed} />
                <Route path="/registerSuccess" component={RegisterSuccess} />
                <Route path="/registerFailed" component={RegisterFailed} />
                <Route path="/:username/groups" component={Groups} />
            </Switch>
        </Router>
    );
}

export default App;
