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
import PVA from "../Components/PVA"
import ExistingPVA from "../Components/ExistingPVA"
import Surveys from "../Components/Surveys"
import ExistingSurveys from "../Components/ExistingSurveys"
import ExistingPolyLines from './ExistingPolyLines'
import PolyLines from './PolyLines'
import getHardLinesFromJSONDb from '../ActionCreators/getHardLinesFromJSONDb'

const App = ({saveHardLinesToReduxStoreReducer, getHardLinesFromJSONDbReducer, getSurveysFromJSONDbReducer, saveSurveysToReduxStoreReducer, activeWell, saveWellInfoToReduxStoreReducer, getWellPlansFromJSONDbReducer, getLeaseLinesFromJSONDbReducer, savePlansToReduxStoreReducer, saveLeaseLinesToReduxStoreReducer}) => {
  
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
        <Tab eventKey="Plans" title="Plans" disabled={getWellPlansFromJSONDbReducer.status === "received" || saveWellInfoToReduxStoreReducer.status === "received" ? false : true}>
          <Container>
          {getWellPlansFromJSONDbReducer.status === "received" && getWellPlansFromJSONDbReducer.response ? <ExistingPlans/> : <Plans/>}
          </Container>
        </Tab>
        <Tab eventKey="PolyLines" title="PolyLines" disabled={getLeaseLinesFromJSONDbReducer.status === "received" || getHardLinesFromJSONDbReducer.status === "received"|| saveWellInfoToReduxStoreReducer.status === "received" ? false : true}>
          <Container>
            {getLeaseLinesFromJSONDbReducer.status === "received" && getHardLinesFromJSONDbReducer.status === "received" ? <ExistingPolyLines/> : <PolyLines/> }
          </Container>
        </Tab>
        <Tab eventKey="PVA" title="PVA" disabled={(saveWellInfoToReduxStoreReducer.status === "received" && savePlansToReduxStoreReducer.status === "received" && saveLeaseLinesToReduxStoreReducer.status === "received" && saveHardLinesToReduxStoreReducer.status === "received")|| activeWell.status === "received" ? false : true}>
          <Container>
            {saveSurveysToReduxStoreReducer.status === "received" && savePlansToReduxStoreReducer.response && saveLeaseLinesToReduxStoreReducer.status === "received"  && saveLeaseLinesToReduxStoreReducer.status === "received" && saveHardLinesToReduxStoreReducer.status === "received" ? <PVA/> : <ExistingPVA/> }
          </Container>
        </Tab>
        <Tab eventKey="Surveys" title="Surveys" disabled={(saveWellInfoToReduxStoreReducer.status === "received" && savePlansToReduxStoreReducer.status === "received" && saveLeaseLinesToReduxStoreReducer.status === "received") || activeWell.status === "received" ? false : true}>
          <Container>
            {getSurveysFromJSONDbReducer.status === "received" ? <ExistingSurveys/> : <Surveys/> }
          </Container>
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}

const mapStateToProps = ({ saveHardLinesToReduxStoreReducer,getHardLinesFromJSONDbReducer, getSurveysFromJSONDbReducer, saveSurveysToReduxStoreReducer ,saveWellInfoToReduxStoreReducer, getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer, savePlansToReduxStoreReducer, saveLeaseLinesToReduxStoreReducer}) => {
  return {
    saveWellInfoToReduxStoreReducer, 
    getWellPlansFromJSONDbReducer,
    getHardLinesFromJSONDbReducer,
    getSurveysFromJSONDbReducer,
    activeWell,
    getLeaseLinesFromJSONDbReducer,
    savePlansToReduxStoreReducer,
    saveLeaseLinesToReduxStoreReducer,
    saveSurveysToReduxStoreReducer,
    saveHardLinesToReduxStoreReducer,
  }
}

export default connect(mapStateToProps, { })(App);

