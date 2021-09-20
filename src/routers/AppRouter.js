import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import React, { Component } from 'react'
import Login from '../components/Login';
import Registro from '../components/Registro';
import Heroes from '../components/Heroes';
import '../styles/styles.css';


export default class AppRouter extends Component {


    render() {
        return (
           <Router>
               <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route exact path="/Registro" component={Registro}/>
                  <Route exact path="/Heroes" component={Heroes}/>
               </Switch>
               <Redirect to="/" />
           </Router>
        )
    }
}
