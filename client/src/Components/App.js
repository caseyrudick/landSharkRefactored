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
import SignInHome from "./UserVerification/SignInHome"


const App = () => {
  return (

        <Router history={History}>
          <div>
            <Route path="/" exact component={SignInHome}/>
          </div>
        </Router>

  )
}

export default App;