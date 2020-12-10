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



const App = ({saveWellInfoToReduxStoreReducer, getWellPlansFromJSONDbReducer}) => {
  




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
        <Plans/>
          </Container>
        </Tab>
        <Tab eventKey="ExistingPlans" title="ExistingPlans" >
          <Container>
        <ExistingPlans/>
          </Container>
        </Tab>

      </Tabs>
    </React.Fragment>
  );
}

const mapStateToProps = ({ saveWellInfoToReduxStoreReducer, getWellPlansFromJSONDbReducer}) => {
  return {
    saveWellInfoToReduxStoreReducer, 
    getWellPlansFromJSONDbReducer
  }
}

export default connect(mapStateToProps, { })(App);

