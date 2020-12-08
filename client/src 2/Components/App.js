// react
import React from 'react';
// react-bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
// other libs/imports
import { connect } from 'react-redux';
// styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'custom.scss';
// components

import Home from "Components/Home";

// action creators

const App = ({ saveWellInfoToReduxStoreReducer}) => {
  return (
    <React.Fragment>
      <Jumbotron fluid className="bg-leam-blue text-leam-orange">
        <Container>
          <h1>LEAM Landshark App Prototype (Employee Portal)</h1>
        </Container>
      </Jumbotron>
      <Tabs>
        <Tab eventKey="Home" title="Home">
          <Container>
            <Home />
          </Container>
        </Tab>
      </Tabs>
    </React.Fragment>
  )
}

const mapStateToProps = ({ saveWellInfoToReduxStoreReducer}) => {
  return {
    saveWellInfoToReduxStoreReducer
  };
};

export default connect(mapStateToProps, {  })(App);
