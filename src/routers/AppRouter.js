import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React, { Component } from 'react'
import Usuarios from '../components/Usuarios';
import '../styles/styles.css';


export default class AppRouter extends Component {


    render() {
        return (
           <Router>
               <Switch>
                  <Route exact path="/consumir-usuarios" component={Usuarios}/>
               </Switch> 
           </Router>
        )
    }
}
