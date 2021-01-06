import React, { useState, useEffect } from "react"
//bootstrap
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
//other libs
import 'react-datasheet/lib/react-datasheet.css';
import { connect } from "react-redux"
import ReactDataSheet from 'react-datasheet';
// actionCreators

import savePlansToReduxStore from "../ActionCreators/savePlansToReduxStore"
//helper functions
import calculateTVD from "../HelperFunctions/Calculations/TVD"
import calculateNS from "../HelperFunctions/Calculations/NS"
import calculateEW from "../HelperFunctions/Calculations/EW"
import calculateSECT from "../HelperFunctions/Calculations/SECT"
import calculateDLS from "../HelperFunctions/Calculations/DLS"
import postPlansToJSONDb from "../ActionCreators/postPlansToJSONDb";
import saveSurveysToReduxStore from "../ActionCreators/saveSurveysToReduxStore"
import postSurveysToJSONDb from "../ActionCreators/postSurveysToJSONDb"

const Surveys = ({ postSurveysToJSONDb, activeWell, saveSurveysToReduxStore ,savePlansToReduxStore, saveWellInfoToReduxStoreReducer,savePlansToReduxStoreReducer, postPlansToJSONDb}) => {
  
  const [editGrid, setEditGrid] = useState(true)
  const [input, setInput] = useState(false)
  const [vsDirection, setVSDirection] = useState(0)
  
  const initialGrid = [
    [{value: '', readOnly: true, width: '7rem'}, {value:"Measured Depth", readOnly: true, width: '7rem'}, {value:"Inclination", readOnly: true, width: '7rem'}, {value:"Azimuth", readOnly: true, width: '7rem'}, {value:"TVD", readOnly: true, width: '7rem'}, {value:"Northing", readOnly: true, width: '7rem'}, {value:"Easting", readOnly: true, width: '7rem'}, {value:"VS", readOnly: true, width: '7rem'},{value:"DLS", readOnly: true, width: '7rem'}],
    
    [{value: 1, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}],
    
    // [{readOnly: true, value: 2}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
    // [{readOnly: true, value: 3}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
    // [{readOnly: true, value: 4}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
    // [{readOnly: true, value: 5}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
  ];

  const [grid, setGrid] = useState(initialGrid);

  useEffect(()=>{
    if (input) {
      performCalculations()
    }
  },[input])

  useEffect(()=> {
    handleAddRows(1)
  }, [])

  const performCalculations = () => {
    grid.map((row, index) => {
      if (index === 0 || index === 1) {
        // nothing because we don't want to run calcs on the header array
      } else {
        // for every array within grid array, want to iterate over and change the values of TVD, NS, EW, SECT, & DLS
        // note val after idx is column 
        // TVD order of args : (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedTVDPrior)
        // NS order of args: (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedNorthingPrior)

        const calculatedTVD = calculateTVD(grid[index][1].value, grid[index][2].value, grid[index][3].value, grid[index - 1][1].value, grid[index - 1][2].value, grid[index - 1][3].value, grid[index - 1][4].value)
        const calculatedNS = calculateNS(grid[index][1].value, grid[index][2].value, grid[index][3].value, grid[index - 1][1].value, grid[index - 1][2].value, grid[index - 1][3].value, grid[index - 1][5].value)
        const calculatedEW = calculateEW(grid[index][1].value, grid[index][2].value, grid[index][3].value, grid[index - 1][1].value, grid[index - 1][2].value, grid[index - 1][3].value, grid[index - 1][6].value)
        const calculatedSECT = calculateSECT(grid[index][1].value, grid[index][2].value, grid[index][3].value, grid[index - 1][1].value, grid[index - 1][2].value, grid[index - 1][3].value, grid[index - 1][5].value, grid[index - 1][6].value, index, vsDirection)
        const calculatedDLS = calculateDLS(grid[index][1].value, grid[index][2].value, grid[index][3].value, grid[index - 1][1].value, grid[index - 1][2].value, grid[index - 1][3].value)


        grid[index][4] = {...grid[index][4], readOnly: true, value: calculatedTVD}
        console.log(calculatedTVD)
        grid[index][5] = {...grid[index][5], readOnly: true, value: calculatedNS}
        grid[index][6] = {...grid[index][6], readOnly: true, value: calculatedEW}
        grid[index][7] = {...grid[index][7], readOnly: true, value: calculatedSECT}
        grid[index][8] = {...grid[index][8], readOnly: true, value: calculatedDLS}

        setGrid(grid)
        setInput(false)

      }
    })
  }

  const onCellsChanged = changes => {
    // iterate through existing grid to get a copy and not mutate current as we iterate over
    const gridNew = grid.map(row => [...row]);
    // iterate through the changes.  Each change is a cell, each cell is an object
    // with cell (previousVal), row, col, currentVal
    // add the value of the newGrid[row#][col#] to the new value 
    changes.forEach(({ cell, row, col, value }) => {
      gridNew[row][col] = {...grid[row][col], value };
    });
    setGrid(gridNew)
    setInput(true)
  };

  const handleVSDirection = (val) => {
    setVSDirection(val)
    setInput(true)
  }

  const handleSubmit = () => {
    const { well, operator, rig, county, uSstate, northing, easting } = activeWell.response
    const wellInfo = {operator, well, rig, county, uSstate, northing, easting, grid}
    saveSurveysToReduxStore(grid)
    postSurveysToJSONDb(wellInfo)

  }

  const handleRemoveRow = () => {
    const newGrid = [...grid];
    newGrid.pop();
    setGrid(newGrid);
  };

  const createRows = (numberOfRowsToAdd) => {
    let createdRows = []
    for (let i = 0; i < numberOfRowsToAdd; i++) {
      createdRows.push(
        [{readOnly: true, value: grid.length + i}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}]
      )
    }
    return createdRows
  };

  const handleAddRows = (rows) => {
    const newGrid = [...grid, ...createRows(rows)]
    setGrid(newGrid)
  }

  const renderSetRowsButtons = () => {
    return (
      <Row>
        <Col xs={10} className="d-flex justify-content-start mt-4">
          <Button variant="success" value={25} onClick={(event)=> handleAddRows(event.target.value)}>
            Add 25 rows
          </Button>
          <Button variant="success" className="ml-4" value={10} onClick={(event) => handleAddRows(event.target.value)}>
            Add 10 rows
          </Button>
          <Button variant="success" className="ml-4" value={5} onClick={(event) => handleAddRows(event.target.value)}>
            Add 5 rows
          </Button>
          <Button variant="success" className="ml-4" value={1} onClick={(event) => handleAddRows(event.target.value)}>
            Add a row
          </Button>
          <Button variant="danger" className="ml-4" onClick={handleRemoveRow}>
            Remove a row
          </Button>
        </Col>
        <Col xs={2}>
          
        </Col>
      </Row>
    )
  }

  const renderSubmitButton = () => {
    return (
      <Row>
        <Col xs={10} className="my-4">
          <Button variant="info" onClick={()=>handleSubmit()}>
            Submit Data
          </Button>
        </Col>
        <Col xs={2}>

        </Col>
      </Row>
    )
  }

  const renderWellData = () => {
    if (saveWellInfoToReduxStoreReducer.status === "received") {
      const { well, rig, operator} = saveWellInfoToReduxStoreReducer.response
      return <h3 className="hy-4"> {operator} - {rig} - {well}</h3>
    } else {
      return "No well data"
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={10}>
          {renderWellData()}
          <ReactDataSheet data={grid} valueRenderer={(cell)=> cell.value} onCellsChanged={onCellsChanged}/>
        </Col>
        <Col xs={2}>
          <Form className="mt-7">
            <Form.Group controlId="formBasicEmail">
              <Form.Control className="mt-3" type="float" placeholder="Enter VS Here" onChange={event => handleVSDirection(event.target.value)}/>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {renderSetRowsButtons()}
      {renderSubmitButton()}
      <Row>
        <Col xs={10}>
          {/* {renderAlert()} */}
        </Col>
        <Col xs={2}>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = ({activeWell, saveWellInfoToReduxStoreReducer}) => {
  return {
    saveWellInfoToReduxStoreReducer,
    activeWell
  }
}

export default connect(mapStateToProps, { postSurveysToJSONDb, saveSurveysToReduxStore, savePlansToReduxStore, postPlansToJSONDb})(Surveys)


