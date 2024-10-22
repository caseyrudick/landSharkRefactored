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
import saveLeaseLinesToReduxStore from "../ActionCreators/saveLeaseLinesToReduxStore"
import postLeaseLinesToDynamoDb from "../ActionCreators/postLeaseLinesToDynamoDb"


const LeaseLines = ({postLeaseLinesToDynamoDb, activeWell, saveLeaseLinesToReduxStore, postLeaseLinesToJSONDb}) => {
  const {operator, rig, well, county, usState, northing, easting} = activeWell.response
  // set up initial grid
  // create local state to setGrid
  // renderWellHeader {if (either activeWell or saveWellInfoToRedux)} then destructure out the rig, wellname, operator
  // render out ReactData sheet data = {grid} valueRenderer={cell=> cell.value} onCellsChanged={onCellsChanged}
  // render submit button return row col xs={10} className = "my-4" button variant="info' onClick = handleSubmit
  // handlesubmit = postLeaseLinesToJSONDb saveHardLinesToRedux
  // addRows: newGrid =  [...grid, addedRow] setGrid(newGrid)

  const initialLeaseLines = [
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
  const [leaseLines, setLeaseLines] = useState(initialLeaseLines)

  // const renderWellHeader = () => {
  //   if (activeWell.status === "received") {
  //     // const {operator, rig, well} = activeWell.response
  //     return <h3 className="my-4">{operator} - {rig} - {well}</h3>
  //   } else {
  //     return "No Well Data"
  //   }
  // }

  const onCellsChanged = changes => {
    const gridNew = leaseLines.map(row => [...row])
    changes.forEach(({cell, row, col, value}) => {
      gridNew[row][col] = {...leaseLines[row][col], value}
    });
    setLeaseLines(gridNew);
    
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
      leaseLines
    }

    postLeaseLinesToDynamoDb(wellInfoAndLeaseLines)
    saveLeaseLinesToReduxStore(wellInfoAndLeaseLines)

    
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
    const gridLength = leaseLines.length
    const newRow = [{value: gridLength, readOnly: true}, {value: 0}, {value: 0}]
    const newGrid = [...leaseLines, newRow]
    setLeaseLines(newGrid)
  }

  const removeRow = () => {
    const newGrid = [...leaseLines]
    newGrid.pop()
    setLeaseLines(newGrid)
  }
  

  return (
    <Container>
      <Row>
        <Col xs={10}>
          {/* {renderWellHeader()} */}
          <ReactDataSheet data={leaseLines} valueRenderer={(cell)=> cell.value} onCellsChanged={onCellsChanged}/>
          {renderRowsButtons()}
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = ({activeWell, postLeaseLinesToJSONDbReducer}) => {
  return {
    activeWell,
    postLeaseLinesToJSONDbReducer,
  }
}

export default connect(mapStateToProps, {saveLeaseLinesToReduxStore, postLeaseLinesToDynamoDb})(LeaseLines)