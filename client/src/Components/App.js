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


const App = ({saveActiveWellToReduxStoreReducer, areThereExistingPlans, saveWellInfoToReduxStoreReducer, getWellPlansFromJSONdbReducer, postWellInfoToJSONDbReducer}) => {
  
const plansTabHandler = () => {
  if (saveWellInfoToReduxStoreReducer.status === "received" || 
  saveActiveWellToReduxStoreReducer.status === "received") {
    console.log(saveActiveWellToReduxStoreReducer.status === "received")
    return false
  }
  return true
}

const plansComponentHandler = () => {
  if (saveActiveWellToReduxStoreReducer.status === "received") {
    return <ExistingPlans/>
  } 
  return <Plans/>
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
        <Plans/>
          </Container>
        </Tab>

      </Tabs>
    </React.Fragment>
  );
}

const mapStateToProps = ({ saveActiveWellToReduxStoreReducer, saveWellInfoToReduxStoreReducer, getWellPlansFromJSONdbReducer, postWellInfoToJSONDbReducer}) => {
  const planned = () => {
    if (saveActiveWellToReduxStoreReducer.response !== "received") {
      return true
    } 
    return false
  }
  const plans = () => {
    if (saveActiveWellToReduxStoreReducer.response ==="received") {
      return saveActiveWellToReduxStoreReducer.response.selectedWell.plans
    }
    return null
  }
  return {
    saveWellInfoToReduxStoreReducer, 
    getWellPlansFromJSONdbReducer,
    postWellInfoToJSONDbReducer,
    areThereExistingPlans: planned(),
    existingWellPlans: plans(),
    saveActiveWellToReduxStoreReducer
  }
}

export default connect(mapStateToProps, { })(App);

