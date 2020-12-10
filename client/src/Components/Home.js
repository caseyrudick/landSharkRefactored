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
// import getWellPlansFromDynamoDb from 'ActionCreators/getWellPlansFromDynamoDb';
import postWellInfoToJSONDb from "../ActionCreators/postWellInfoToJSONDb"
import getWellsFromJSONDb from "../ActionCreators/getWellsFromJSONDb"
import {saveSelectedAsActiveWell} from "../ActionCreators/saveActiveWellToReduxStore"

// check
const Home = ({ saveSelectedAsActiveWell, postWellInfoToJSONDb, saveWellInfoToReduxStore, saveWellInfoToReduxStoreReducer, getWellsFromJSONDb, getWellsFromJSONDbReducer}) => {
  const [activeWell, setActiveWell] = useState('None');
  const [operator, setOperator] = useState('');
  const [rig, setRig] = useState('');
  const [well, setWell] = useState('');
  const [county, setCounty] = useState('');
  const [uSstate, setUSstate] = useState('');
  const [northing, setNorthing] = useState('');
  const [easting, setEasting] = useState('');

  // check
  useEffect(() => {
    
    setTimeout(getWellsFromJSONDb, 1000);
  }, []);

  const renderWellNames = () => {
    let renderedWells;
    if (getWellsFromJSONDbReducer.status === "received") {
      let wells = getWellsFromJSONDbReducer.response
      return (
        <Dropdown.Menu>
          {wells.map(well => {
            return (
              <Dropdown.Item href="" onClick={()=> setActiveWell(`${well.operator} - ${well.rig} - ${well.well}`)}>
                {well.operator} - {well.rig} - {well.well}
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
    // let renderedWells;
    // if (getWellsFromJSONDbReducer.status === "received") {
    //   renderedWells = Object.values(getWellsFromJSONDbReducer.response)[0].map((well) => {
    //     let wellFormat = `${well.operator} - ${well.rig} - ${well.well}`
    //     return (
    //       <Dropdown.Item
    //         href=""
    //         key={`${well.rig} + ${well.well}`}
    //         onClick={()=> {
    //           saveSelectedAsActiveWell(well)
    //           setActiveWell(wellFormat)
    //         }}
    //         > {wellFormat}
    //       </Dropdown.Item>
    //     )
    //   })
    // }
    // return (
    //   <Dropdown.Menu>
    //     {/* {renderedWells} */}
    //   </Dropdown.Menu>
    // )
  // }

  

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
        <Button className="mt-4" variant="info" disabled={ operator === "" || rig === "" || well === "" || county === "" || uSstate === "" ? true : false } onClick={handleNewWellSubmit}>Submit and begin adding well data</Button>
      </Col>
    )
  }

  // tbd
  const handleNewWellSubmit = () => {
    const wellInfo = {
      operator,
      rig,
      well,
      // plans: [],
      county,
      uSstate,
      northing,
      easting
    }
    postWellInfoToJSONDb(wellInfo)
    saveWellInfoToReduxStore(wellInfo)
    getWellsFromJSONDb()
  }

  const handleFetchData = () => {


    // setTimeout(getWellPlansFromDynamoDb(selectedWell), 500);
    // setTimeout(getWellHardLinesFromDynamoDb(selectedWell), 1000);
    // setTimeout(getWellLeaseLinesFromDynamoDb(selectedWell), 1500);
    // setTimeout(getWellSurveysFromDynamoDb(selectedWell), 2000);
    // setTimeout(getOffsets(selectedWell), 2500);
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
      <Button className="mt-4" variant="success" disabled={ activeWell === "None" ? true : false } onClick={handleFetchData()}>Fetch well data</Button>
      </Col>
    )
  }



  const renderSelectWell = () => {
    return (
      <Col>
        <h3 className="my-4">Select existing well</h3>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Selected Well: <strong>{activeWell}</strong>
          </Dropdown.Toggle>
          {/* // {renderWellNames()} */}
        </Dropdown>
        
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
//  }
}

const mapStateToProps = ({ saveActiveWellToReduxStoreReducer ,saveWellInfoToReduxStoreReducer, postWellInfoToJSONDbReducer, getWellsFromJSONDbReducer }) => {
  return {
    saveWellInfoToReduxStoreReducer,
    postWellInfoToJSONDbReducer,
    getWellsFromJSONDbReducer,
  };
};

export default connect(mapStateToProps, { saveSelectedAsActiveWell, saveWellInfoToReduxStore, postWellInfoToJSONDb, getWellsFromJSONDb })(Home);
