import React from 'react'
import {Router, Route} from "react-router-dom"
// react-boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab"
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
// redux
import { connect } from 'react-redux'
// components
import History from "./History"
//import SignInHome from "./UserVerification/SignInHome"
import SignUp from "./UserVerification/SignUp"
import SignIn from "./UserVerification/SignIn"
import Dashboard from "./Dashboard"
import scratch from "./scratch"


const App = () => {
  return (
      <Router history={History}>
        <div>
          <Route path="/" exact component={SignIn}/>
          <Route path="/signup" exact component ={SignUp}/>
          <Route path="/signin" exact component ={SignIn}/>
          <Route path="/scratch" exact component ={scratch}/>
          <Route path="/dashboard" exact component ={Dashboard}/>
        </div>
      </Router>
  )
}

export default App;