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
import LeaseLines from "./LeaseLines"
import ExistingLeaseLines from "./ExistingLeaseLines"
import savePlansToReduxStore from '../ActionCreators/savePlansToReduxStore'
import PVA from "../Components/PVA"
import ExistingPVA from "../Components/ExistingPVA"

const App = ({activeWell, saveWellInfoToReduxStoreReducer, getWellPlansFromJSONDbReducer, getLeaseLinesFromJSONDbReducer, savePlansToReduxStoreReducer, saveLeaseLinesToReduxStoreReducer}) => {
  




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
        <Tab eventKey="Lease Lines" title="Lease Lines" disabled={getLeaseLinesFromJSONDbReducer.status === "received" || saveWellInfoToReduxStoreReducer.status === "received" ? false : true}>
          <Container>
            {getLeaseLinesFromJSONDbReducer.status === "received" && getLeaseLinesFromJSONDbReducer.response ? <ExistingLeaseLines/> : <LeaseLines/> }
          </Container>
        </Tab>
        <Tab eventKey="PVA" title="PVA" disabled={(saveWellInfoToReduxStoreReducer.status === "received" && savePlansToReduxStoreReducer.status === "received" && saveLeaseLinesToReduxStoreReducer.status === "received") /*|| activeWell.status === "received" */? false : true}>
          <Container>
            {saveWellInfoToReduxStoreReducer.status === "received" && savePlansToReduxStoreReducer.response && saveLeaseLinesToReduxStoreReducer.status === "received"  && saveLeaseLinesToReduxStoreReducer.response ? <PVA/> : "TBD" }
          </Container>
        </Tab>
        <Tab eventKey="ExistingPVA" title="ExistingPVA" disabled={false}>
          <Container>
             {/* {activeWell.status === "received" ? <ExistingPVA/>: "Keep Trying" } */}
          </Container>
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}

const mapStateToProps = ({ saveWellInfoToReduxStoreReducer, getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer, savePlansToReduxStoreReducer, saveLeaseLinesToReduxStoreReducer}) => {
  return {
    saveWellInfoToReduxStoreReducer, 
    getWellPlansFromJSONDbReducer,
    activeWell,
    getLeaseLinesFromJSONDbReducer,
    savePlansToReduxStoreReducer,
    saveLeaseLinesToReduxStoreReducer
  }
}

export default connect(mapStateToProps, { })(App);

