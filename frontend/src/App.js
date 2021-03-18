import React, {Component} from 'react';
import { 
    Route, 
    Switch,
} from 'react-router-dom';

import AppLayout from './components/applayout/AppLayout.js'
import Home from './components/Home.js'
import LoginContainer from './components/auth/LoginContainer'
import SignupContainer from './components/auth/SignupContainer'
import MainLayout from './components/main/MainLayout'

import axios from 'axios';
axios.defaults.baseURL = "http://127.0.0.1:5000";


class App extends Component {
    render() {
        return (
            <AppLayout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={LoginContainer} />
                    <Route path='/signup' component={SignupContainer} />
                    <Route path='/main' component={MainLayout} />
                    <Route path="*">Ups</Route>
                </Switch>
            </AppLayout>
        )
    }
}

export default App;
