import React from 'react'
// react-boostrap
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab"
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
// redux
import { connect } from 'react-redux'
// styling 
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'custom.scss'
// components
import Home from "./Home"
import Plans from "./Plans"
import ExistingPlans from './ExistingPlans'
import postWellInfoToJSONDb from '../ActionCreators/postWellInfoToJSONDb'


const App = ({saveWellInfoToReduxStoreReducer, getWellPlansFromJSONdbReducer, postWellInfoToJSONDbReducer}) => {
  
const plansTabHandler = () => {
  if (postWellInfoToJSONDbReducer.status === "received") {
    return false
  }
  return true
}

  return (
    <React.Fragment>
      <Jumbotron fluid className="bg-dark text-white">
        <Container>
          <h1>LandShark App (Employee Portal)</h1>
        </Container>
      </Jumbotron>
      <Tabs>
        <Tab eventKey="Home" title="Home">
          <Container>
            <Home/>
          </Container>
        </Tab>
        <Tab eventKey="Plans" title="Plans" disabled={plansTabHandler()}>
          <Container>
        {postWellInfoToJSONDbReducer.status === "received"? <Plans/> : "TBD"}
          </Container>
        </Tab>

      </Tabs>
    </React.Fragment>
  );
}

const mapStateToProps = ({ saveWellInfoToReduxStoreReducer, getWellPlansFromJSONdbReducer, postWellInfoToJSONDbReducer}) => {
  return {
    saveWellInfoToReduxStoreReducer, 
    getWellPlansFromJSONdbReducer,
    postWellInfoToJSONDbReducer
  }
}

export default connect(mapStateToProps, { })(App);

