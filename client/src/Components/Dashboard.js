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
import LeaseLines from "./PolyLines"
import ExistingLeaseLines from "./ExistingPolyLines"
import savePlansToReduxStore from '../ActionCreators/savePlansToReduxStore'
import PVA from "./PVA"
import ExistingPVA from "./ExistingPVA"
import Surveys from "./Surveys"
import ExistingSurveys from "./ExistingSurveys"
import ExistingPolyLines from './ExistingPolyLines'
import PolyLines from './PolyLines'
import SignInHome from "./UserVerification/SignInHome"
import { Link } from "react-router-dom"
import getSurveysFromDynamoDb from '../ActionCreators/getSurveysFromDynamoDb'
import getLeaseLinesFromDynamoDb from '../ActionCreators/getLeaseLinesFromDynamoDb'

const Dashboard = ({
  getHardLinesFromDynamoDbReducer, 
  getLeaseLinesFromDynamoDbReducer, 
  getWellPlansFromDynamoDbReducer,
  getSurveysFromDynamoDbReducer, 
  saveHardLinesToReduxStoreReducer, 
  saveSurveysToReduxStoreReducer, 
  activeWell, 
  saveWellInfoToReduxStoreReducer, 
  savePlansToReduxStoreReducer, 
  saveLeaseLinesToReduxStoreReducer}) => {
  
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
        <Tab eventKey="Plans" title="Plans" disabled={getWellPlansFromDynamoDbReducer.status === "received" || saveWellInfoToReduxStoreReducer.status === "received" ? false : true}>
          <Container>
          {getWellPlansFromDynamoDbReducer.response.Count > 0 ? <ExistingPlans/> : <Plans/>}
          </Container>
        </Tab>
        <Tab eventKey="PolyLines" title="PolyLines" disabled={getLeaseLinesFromDynamoDbReducer.status === "received" || getHardLinesFromDynamoDbReducer.status === "received"|| saveWellInfoToReduxStoreReducer.status === "received" ? false : true} >
          <Container>
            <PolyLines/>
          </Container>
        </Tab>
        <Tab eventKey="Surveys" title="Surveys" disabled= { getSurveysFromDynamoDbReducer.status === "received" || saveWellInfoToReduxStoreReducer.status === "received"? false : true }>
          <Container>
            {getSurveysFromDynamoDbReducer.response.Count > 0 ? <ExistingSurveys/> : <Surveys/> }
          </Container>
        </Tab>
        <Tab eventKey="PVA" title="PVA" disabled={(getSurveysFromDynamoDbReducer.status === "received" && getWellPlansFromDynamoDbReducer.response && getLeaseLinesFromDynamoDbReducer.status === "received"  && getHardLinesFromDynamoDbReducer.status === "received")  ||  activeWell.status === "received" ? false : true}>
          <Container>
            {(getSurveysFromDynamoDbReducer.status === "received" && getWellPlansFromDynamoDbReducer.status === "received" && getLeaseLinesFromDynamoDbReducer.status === "received"  && getHardLinesFromDynamoDbReducer.status === "received" ) ? <ExistingPVA/> : /*<PVA/>*/ "TBD"}
          </Container>
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}

const mapStateToProps = ({ 
  getHardLinesFromDynamoDbReducer, 
  getSurveysFromDynamoDbReducer,
  getLeaseLinesFromDynamoDbReducer, 
  postHardLinesToDynamoDbReducer, 
  getWellPlansFromDynamoDbReducer, 
  saveHardLinesToReduxStoreReducer, 
  saveSurveysToReduxStoreReducer,
  saveWellInfoToReduxStoreReducer, 
  activeWell, 
  savePlansToReduxStoreReducer, 
  saveLeaseLinesToReduxStoreReducer}) => {
  return {
    saveWellInfoToReduxStoreReducer,
    getWellPlansFromDynamoDbReducer, 
    getLeaseLinesFromDynamoDbReducer,
    getSurveysFromDynamoDbReducer,
    activeWell,
    savePlansToReduxStoreReducer,
    saveLeaseLinesToReduxStoreReducer,
    saveSurveysToReduxStoreReducer,
    saveHardLinesToReduxStoreReducer,
    postHardLinesToDynamoDbReducer,
    getHardLinesFromDynamoDbReducer
  }
}

export default connect(mapStateToProps, { })(Dashboard);

