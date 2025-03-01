import React, { useState, useEffect } from "react"
//bootstrap
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css';
import { connect } from "react-redux"
import ReactDataSheet from 'react-datasheet';

// actionCreators
import saveHardLinesToReduxStore from "../ActionCreators/saveHardLinesToReduxStore"
import postHardLinesToDynamoDb from "../ActionCreators/postHardLinesToDynamoDb"


const HardLines = ({saveWellInfoToReduxStoreReducer, activeWell, saveHardLinesToReduxStore, postHardLinesToDynamoDb}) => {
  const {operator, rig, well, county, usState, northing, easting} = activeWell.response
  // set up initial hardLineRecords
  // create local state to setHardLineRecords
  // renderWellHeader {if (either activeWell or saveWellInfoToRedux)} then destructure out the rig, wellname, operator
  // render out ReactData sheet data = {hardLineRecords} valueRenderer={cell=> cell.value} onCellsChanged={onCellsChanged}
  // render submit button return row col xs={10} className = "my-4" button variant="info' onClick = handleSubmit
  // handlesubmit = postHardLinesToDynamoDb saveHardLinesToRedux
  // addRows: newhardLineRecords =  [...hardLineRecords, addedRow] setHardLineRecords(newhardLineRecords)

  const initialHardLineRecords = [
    [{value: "", readOnly: true, width: "7rem"}, {value: "Northing", readOnly: true, width: "7rem"}, {value:"Easting", readOnly: true, width: "7rem"}],
    [{value: 1, readOnly: true}, {value: 0}, {value: 0}],
    [{value: 2, readOnly: true}, {value: 0}, {value: 0}],
    [{value: 3, readOnly: true}, {value: 0}, {value: 0}],
    [{value: 4, readOnly: true}, {value: 0}, {value: 0}],
    [{value: 5, readOnly: true}, {value: 0}, {value: 0}],
    [{value: 6, readOnly: true}, {value: 0}, {value: 0}],
    [{value: 7, readOnly: true}, {value: 0}, {value: 0}],
    [{value: 8, readOnly: true}, {value: 0}, {value: 0}],
    [{value: 9, readOnly: true}, {value: 0}, {value: 0}],
  ]
  const [hardLineRecords, setHardLineRecords] = useState(initialHardLineRecords)


  const onCellsChanged = changes => {
    const hardLineRecordsNew = hardLineRecords.map(row => [...row])
    changes.forEach(({cell, row, col, value}) => {
      hardLineRecordsNew[row][col] = {...hardLineRecords[row][col], value}
    });
    setHardLineRecords(hardLineRecordsNew);
    
  }

  const handleSubmit = () => {
    const wellInfoAndLeaseLines = {
      operator,
      rig, 
      well, 
      county,
      usState, 
      northing,
      easting,
      hardLineRecords
    }
    // const activeWell
    // saveLeaseLinesToJSON 
    postHardLinesToDynamoDb(wellInfoAndLeaseLines)
    saveHardLinesToReduxStore(wellInfoAndLeaseLines)
  }

  const checkTest = () => {
    console.log("whyyy")
  }

  const renderRowsButtons = () => {
    return (
      <Row>
        <Col xs={10} className="my-4">
          <Button variant="success" className="my-4" onClick={handleSubmit}> 
            Submit
          </Button>
          <Button variant="primary" className="ml-4" onClick={addRow}>
            Add a Row
          </Button>
          <Button variant="primary" className="ml-4" onClick={removeRow}>
            Remove a Row
          </Button>

        </Col>
      </Row>
    )
  }

  const addRow = () => {
    const hardLineRecordsLength = hardLineRecords.length
    const newRow = [{value: hardLineRecordsLength, readOnly: true}, {value: 0}, {value: 0}]
    const newhardLineRecords = [...hardLineRecords, newRow]
    setHardLineRecords(newhardLineRecords)
  }

  const removeRow = () => {
    const newhardLineRecords = [...hardLineRecords]
    newhardLineRecords.pop()
    setHardLineRecords(newhardLineRecords)
  }
  

  return (
    <Container>
      <Row>
        <Col xs={10}>
          {/* {renderWellHeader()} */}
          <ReactDataSheet data={hardLineRecords} valueRenderer={(cell)=> cell.value} onCellsChanged={onCellsChanged}/>
          {renderRowsButtons()}
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = ({saveWellInfoToReduxStoreReducer, activeWell, postHardLinesToDynamoDbReducer}) => {
  return {
    saveWellInfoToReduxStoreReducer,
    activeWell,
    postHardLinesToDynamoDbReducer,
  }
}

export default connect(mapStateToProps, {saveHardLinesToReduxStore, postHardLinesToDynamoDb})(HardLines)