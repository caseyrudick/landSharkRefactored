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



const Home = ({ getWellNamesFromDynamoDb, saveWellInfoToReduxStore, getWellNamesFromDynamoDbReducer}) => {
  const [selectedWell, setSelectedWell] = useState('None');
  const [operator, setOperator] = useState('');
  const [rig, setRig] = useState('');
  const [well, setWell] = useState('');
  const [county, setCounty] = useState('');
  const [uSstate, setUSstate] = useState('');
  const [subjectEasting, setSubjectEasting] = useState('');
  const [subjectNorthing, setSubjectNorthing] = useState('');

  useEffect(() => {
    // getWellNamesFromDynamoDb();
    setTimeout(getWellNamesFromDynamoDb, 1000);
  }, []);

  const renderWellNames = () => {
    if (getWellNamesFromDynamoDbReducer.status === 'received' && getWellNamesFromDynamoDbReducer.response.data.Items) {
      const { Items: wells } = getWellNamesFromDynamoDbReducer.response.data

      const filteredWells = _.uniqBy(wells, 'Well.S')

      return (
        <Dropdown.Menu>
          {filteredWells.map(({ Operator, Rig, Well }, index) => {
            index++;
            return (
              <Dropdown.Item href="" onClick={() => setSelectedWell(Well.S)}>
                {Operator.S} - {Rig.S} - {Well.S}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      )
    } if (getWellNamesFromDynamoDbReducer.status === 'received' && getWellNamesFromDynamoDbReducer.response.data.errorType === 'TypeError') {
      return 'Data load error'
    } else {
      return 'Data loading';
    }
  };

  const handleNewWellSubmit = () => {
    const wellInfo = {
      operator,
      rig,
      well,
      county,
      uSstate,
      subjectEasting,
      subjectNorthing
    }

    saveWellInfoToReduxStore(wellInfo)
  }

  const handleFetchData = () => {
    setTimeout(getWellPlansFromDynamoDb(selectedWell), 500);
    // setTimeout(getWellHardLinesFromDynamoDb(selectedWell), 1000);
    // setTimeout(getWellLeaseLinesFromDynamoDb(selectedWell), 1500);
    // setTimeout(getWellSurveysFromDynamoDb(selectedWell), 2000);
    // setTimeout(getOffsets(selectedWell), 2500);
  }

  const renderSelectWell = () => {
    return (
      <Col>
        <h3 className="my-4">Select existing well</h3>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Selected Well: <strong>{selectedWell}</strong>
          </Dropdown.Toggle>
          {renderWellNames()}
        </Dropdown>
        <Button className="mt-4" variant="success" disabled={ selectedWell === "None" ? true : false } onClick={handleFetchData}>Fetch well data</Button>
      </Col>
    )
  }

  const renderNewWell = () => {
    return (
      <Col>
        <h3 className="my-4">Add new well data</h3>
        <Form.Control className="mt-3" placeholder="Operator" onChange={event => setOperator(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Rig" onChange={event => setRig(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Well" onChange={event => setWell(event.target.value)} />
        <Form.Control className="mt-3" placeholder="County" onChange={event => setCounty(event.target.value)} />
        <Form.Control className="mt-3" placeholder="State" onChange={event => setUSstate(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Subject northing" onChange={event => setSubjectNorthing(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Subject easting" onChange={event => setSubjectEasting(event.target.value)} />
        <Button className="mt-4" variant="info" disabled={ operator === "" || rig === "" || well === "" || county === "" || uSstate === "" ? true : false } onClick={handleNewWellSubmit}>Submit and begin adding well data</Button>
      </Col>
    )
  }

  if (getWellNamesFromDynamoDbReducer.status === "" || getWellNamesFromDynamoDbReducer.status === "waiting") {
    return 'Data loading'
  } else if (getWellNamesFromDynamoDbReducer.status === "received") {
    return (
      <Container>
        <Row>
          {renderSelectWell()}
          {renderNewWell()}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = ({ getWellNamesFromDynamoDbReducer }) => {
  return {
    getWellNamesFromDynamoDbReducer,
  };
};

export default connect(mapStateToProps, { getWellNamesFromDynamoDb, saveWellInfoToReduxStore, getWellHardLinesFromDynamoDb, getWellLeaseLinesFromDynamoDb, getWellPlansFromDynamoDb, getWellSurveysFromDynamoDb, getOffsets })(Home);
