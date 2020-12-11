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



const LeaseLines = ({activeWell, saveLeaseLinesToReduxStore}) => {

  // set up initial grid
  // create local state to setGrid
  // renderWellHeader {if (either activeWell or saveWellInfoToRedux)} then destructure out the rig, wellname, operator
  // render out ReactData sheet data = {grid} valueRenderer={cell=> cell.value} onCellsChanged={onCellsChanged}
  // render submit button return row col xs={10} className = "my-4" button variant="info' onClick = handleSubmit
  // handlesubmit = postLeaseLinesToJSONDb saveHardLinesToRedux
  // addRows: newGrid =  [...grid, addedRow] setGrid(newGrid)

  const initialGrid = [
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
  const [grid, setGrid] = useState(initialGrid)

  const renderWellHeader = () => {
    if (activeWell.status === "received") {
      const {operator, rig, well} = activeWell.response
      return <h3 className="my-4">{operator} - {rig} - {well}</h3>
    } else {
      return "No Well Data"
    }
  }

  const handleSubmit = () => {
    saveLeaseLinesToReduxStore(grid)
  }

  const renderSubmitButton = () => {
    return (
      <Row>
        <Col xs={10} className="my-4">
          <Button variant="success" className="my-4" onClick={handleSubmit()}> 
          Submit
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <Container>
      <Row>
        <Col xs={10}>
          {renderWellHeader()}
          <ReactDataSheet data={grid} valueRenderer={cell=> cell.value}/>
          {renderSubmitButton()}
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = ({activeWell}) => {
  return {activeWell}
}

export default connect(mapStateToProps, {saveLeaseLinesToReduxStore})(LeaseLines)