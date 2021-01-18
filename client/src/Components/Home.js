// react
import React, { useState, useEffect } from 'react';
// react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
// other libs/imports
import { connect } from 'react-redux';
import _ from 'lodash'
// images
// components
// action creators
// import getWellNamesFromDynamoDb from 'ActionCreators/getWellNamesFromDynamoDb';
import saveWellInfoToReduxStore from "../ActionCreators/saveWellInfoToReduxStore"
import getWellPlansFromDynamoDb from '../ActionCreators/getWellPlansFromDynamoDb';
// import postWellInfoToJSONDb from "../ActionCreators/postWellInfoToJSONDb"
// import getWellPlansFromJSONDb from "../ActionCreators/getWellPlansFromJSONDb"
import saveActiveWellToReduxStore from "../ActionCreators/saveActiveWellToReduxStore"
// import getLeaseLinesFromJSONDb from "../ActionCreators/getLeaseLinesFromJSONDb"
// import getWellsWithLeaseLinesFromJSONDb from "../ActionCreators/getWellsWithLeaseLinesFromJSONDb"
// import getSurveysFromJSONDb from "../ActionCreators/getSurveysFromJSONDb"
//import getWellsWithSurveysFromJSONDb from "../ActionCreators/getWellsWithSurveysFromJSONDb"
//import getWellsWithHardLinesFromJSONDb from "../ActionCreators/getWellsWithHardLinesFromJSONDb"
import getHardLinesFromDynamoDb from "../ActionCreators/getHardLinesFromDynamoDb"
import postWellInfoToDynamoDb from "../ActionCreators/postWellInfoToDynamoDb"
import getWellsFromDynamoDb from "../ActionCreators/getWellsFromDynamoDb"
import getLeaseLinesFromDynamoDb from '../ActionCreators/getLeaseLinesFromDynamoDb';
import getSurveysFromDynamoDb from "../ActionCreators/getSurveysFromDynamoDb"

const Home = ({ 
  getHardLinesFromDynamoDb, 
  getSurveysFromDynamoDb,
  getWellPlansFromDynamoDb, 
  getWellsFromDynamoDbReducer, 
  getWellsFromDynamoDb, 
  postWellInfoToDynamoDb, 
  saveActiveWellToReduxStore, 
  saveWellInfoToReduxStore, 
  saveWellInfoToReduxStoreReducer, 
  getLeaseLinesFromDynamoDb}) => {

  const [activeWell, setActiveWell] = useState('None');
  const [operator, setOperator] = useState('');
  const [rig, setRig] = useState('');
  const [well, setWell] = useState('');
  const [county, setCounty] = useState('');
  const [usState, setUSstate] = useState('');
  const [northing, setNorthing] = useState('');
  const [easting, setEasting] = useState('');


  useEffect(() => {
    // getWellsWithLeaseLinesFromJSONDb()
    // getWellsWithSurveysFromJSONDb()
    // getWellsWithHardLinesFromJSONDb()
    getWellsFromDynamoDb()
  }, []);


  const renderWellNames = () => {
    if (getWellsFromDynamoDbReducer.status === "received") {
      let wells = getWellsFromDynamoDbReducer.response.Items
      return (
        <Dropdown.Menu>
          {wells.map(well => {
            return (
              <Dropdown.Item 
                href="" 
                key={`${well.Operator.S}${well.Well_Name.S}`} 
                onClick={()=> {
                  setActiveWell(`${well.Operator.S} - ${well.Rig.S} - ${well.Well_Name.S}`)
                  saveActiveWellToReduxStore(well)
                  console.log()
              } }>
                {well.Operator.S} - {well.Rig.S} - {well.Well_Name.S}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      )
    }
    else {
      return "Data loading"
    }
  }

  const createNewWell = () => {
    return (
      <Col>
        <h3 className="my-4">Add new well data</h3>
        <Form.Control className="mt-3" placeholder="Operator" onChange={event => setOperator(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Rig" onChange={event => setRig(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Well" onChange={event => setWell(event.target.value)} />
        <Form.Control className="mt-3" placeholder="County" onChange={event => setCounty(event.target.value)} />
        <Form.Control className="mt-3" placeholder="State" onChange={event => setUSstate(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Northing" onChange={event => setNorthing(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Easting" onChange={event => setEasting(event.target.value)} />
        <Button className="mt-4" variant="info" disabled={ operator === "" || rig === "" || well === "" || county === "" || usState === "" ? true : false } onClick={()=>handleNewWellSubmit()}>Submit and begin adding well data</Button>
      </Col>
    )
  }

  const handleNewWellSubmit = () => {
    const wellInfo = {
      operator,
      rig,
      well,
      county,
      usState,
      northing,
      easting
    }
    // postWellInfoToJSONDb(wellInfo)
    postWellInfoToDynamoDb(wellInfo)
    saveWellInfoToReduxStore(wellInfo)
    saveActiveWellToReduxStore(wellInfo)
  }

  const handleFetchData = () => {
    getWellPlansFromDynamoDb(activeWell)
    getLeaseLinesFromDynamoDb(activeWell)
    getHardLinesFromDynamoDb(activeWell)
    getSurveysFromDynamoDb(activeWell)
    // setTimeout(getWellPlansFromJSONDb, 500, activeWell);
    //setTimeout(getLeaseLinesFromJSONDb, 1000, activeWell);
    // setTimeout(getSurveysFromJSONDb, 1500, activeWell)
    //getHardLinesFromJSONDb(activeWell)
  //   // setTimeout(getWellHardLinesFromDynamoDb(selectedWell), 1000);
  //   // setTimeout(getWellSurveysFromDynamoDb(selectedWell), 2000);
  //   // setTimeout(getOffsets(selectedWell), 2500);
  }



  const selectExistingWell = () => {
    return (
      <Col>
        <h3 className="my-4">Select Existing Well</h3>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {activeWell ? activeWell : `Select Well:`}
          </Dropdown.Toggle>
          {renderWellNames()}
        </Dropdown>
        <Button className="mt-4" variant="success" disabled={ activeWell === "None" ? true : false } onClick={handleFetchData}>Fetch well data</Button>
      </Col>
    )
  }


  return (
      <Container>
        <Row>
          {createNewWell()}
          {selectExistingWell()}
        </Row>
      </Container>
    )

}

const mapStateToProps = ({
  getSurveysFromDynamoDb, 
  getWellsFromDynamoDbReducer, 
  postWellInfoToDynamoDbReducer, 
  saveActiveWellToReduxStoreReducer, 
  saveWellInfoToReduxStoreReducer }) => {
  
  return {
    saveWellInfoToReduxStoreReducer,
    postWellInfoToDynamoDbReducer,
    getWellsFromDynamoDbReducer
  }
}

export default connect(mapStateToProps, {getLeaseLinesFromDynamoDb, getWellPlansFromDynamoDb, getWellsFromDynamoDb, postWellInfoToDynamoDb, getHardLinesFromDynamoDb, saveActiveWellToReduxStore, saveWellInfoToReduxStore })(Home);
