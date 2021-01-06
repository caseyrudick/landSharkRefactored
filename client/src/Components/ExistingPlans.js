import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css'
import ReactDataSheet from "react-datasheet"
import getWellPlansFromJSONDb from "../ActionCreators/getWellPlansFromJSONDb"

const ExistingPlans = ({getWellPlansFromJSONDbReducer, activeWell}) => {
  const [plans, setPlans] = useState([])
  const [grid, setGrid] = useState([])
  
  useEffect(()=> {
    if (getWellPlansFromJSONDbReducer.status === "received") {
      let planFromReducerCopy = [...getWellPlansFromJSONDbReducer.response]
      setPlans(planFromReducerCopy)
    }
  },[getWellPlansFromJSONDbReducer.status])
    
  

  // useEffect(()=> {
  //   createGridFromPlans();
  // },[plans])

  // const convertSurveyNumberStringsToNumbers = () => {
  //   let plansFromReducerCopy = [...getWellPlansFromJSONDbReducer.response]
  //   plansFromReducerCopy.map((survey, index) => {
  //     plansFromReducerCopy[index].
  //   })
  //   console.log(getWellPlansFromJSONDbReducer.response)
  // }
  // convertSurveyNumberStringsToNumbers()

  const plansCopy = [...plans]
  // console.log(plansCopy)
  let gridFromPlans = [[{value: '', readOnly: true, width: '3rem'}, {value: 'Measured Depth', readOnly: true, width: '10rem'}, {value: 'Inclination', readOnly: true, width: '7rem'}, {value: 'Azimuth', readOnly: true, width: '7rem'}, {value: 'TVD', readOnly: true, width: '7rem'}, {value: 'NS', readOnly: true, width: '7rem'}, {value: 'EW', readOnly: true, width: '7rem'}, {value: 'SECT', readOnly: true, width: '7rem'}, {value: 'DLS', readOnly: true, width: '7rem'}]]
  // plansFromGrid = plansCopy.map(row => {
  //   row.map(cell => {

  //   })
  // })

  //   plansCopy.forEach((row, index) => {
//     console.log(row)
//     // const convertedRow = [
//     //   {readOnly: true, value: row[0]}, 
//     //   {readOnly: true, value: row[1]},
//     //   {readOnly: true, value: row[2]},
//     //   {readOnly: true, value: row[3]},
//     //   {readOnly: true, value: row[4]},
//     //   {readOnly: true, value: row[5]},
//     //   {readOnly: true, value: row[6]},
//     //   {readOnly: true, value: row[7]},
//     //   {readOnly: true, value: row[8]},
//     // ]
//     // gridFromPlans.push(convertedRow)
//   })
// setGrid(gridFromPlans)

  // const createGridFromPlans = () => {
  //   let gridFromPlans = [[{value: '', readOnly: true, width: '3rem'}, {value: 'Measured Depth', readOnly: true, width: '10rem'}, {value: 'Inclination', readOnly: true, width: '7rem'}, {value: 'Azimuth', readOnly: true, width: '7rem'}, {value: 'TVD', readOnly: true, width: '7rem'}, {value: 'NS', readOnly: true, width: '7rem'}, {value: 'EW', readOnly: true, width: '7rem'}, {value: 'SECT', readOnly: true, width: '7rem'}, {value: 'DLS', readOnly: true, width: '7rem'}]]
  //   const plansCopy = [...plans]  
  //   // const plansCopy = [...plans]
  //   plansCopy.forEach((row, index) => { 
  //     const convertedRow = [
  //       {readOnly: true, value: row[0]}, 
  //       {readOnly: true, value: row[1]},
  //       {readOnly: true, value: row[2]},
  //       {readOnly: true, value: row[3]},
  //       {readOnly: true, value: row[4]},
  //       {readOnly: true, value: row[5]},
  //       {readOnly: true, value: row[6]},
  //       {readOnly: true, value: row[7]},
  //       {readOnly: true, value: row[8]},
  //     ]
  //     gridFromPlans.push(convertedRow)
  //   })
  //   console.log(gridFromPlans)
  //   setGrid(gridFromPlans)
  // }


  // createGridFromPlans()


  const renderMain = () => {
    if (getWellPlansFromJSONDbReducer.status === "received") {
      const { operator, rig, well } = activeWell.response
      return (
        <React.Fragment>
          <h3 className="my-4">{operator} - {rig} - {well}</h3>
          <ReactDataSheet data={activeWell.response.grid} valueRenderer={cell => cell.value} width/>
        </React.Fragment>
      )
    }
  }
  if (getWellPlansFromJSONDbReducer.status === "received") {

    return (
      <Container>
        {renderMain()}
      </Container>
    ) 
  } else {
    return "error"
  }
  



  // return (
  //   <Container>
  //     <Col>EXISTING PLANS</Col>

  //     <ReactDataSheet
  //       data={grid}             
  //       valueRenderer={(cell)=> cell.value}
  //       onCellsChanged={onCellsChanged}
  //     ></ReactDataSheet>
  //     <Col>
  //   <Button variant="primary" className="mt-4 mb-4" onClick={()=>addNewRow()}>Add a Row</Button>
  //   <Button variant="danger" className="my-4 ml-4" onClick={()=>removeRow()}>Remove a Row</Button>
  //   <Button variant="info" className="my-4 ml-4" onClick={()=>editPlans()}>Edit Plans</Button>
  //   <Button variant="info" className="my-4 ml-4" onClick={()=>createNewPlan()}>Create New Plan</Button>
    
  //     </Col>
  //   </Container>
  // )
}

const mapStateToProps = ({getWellPlansFromJSONDbReducer, activeWell, getWellsFromJSONDbReducer}) => {
  return {
    getWellPlansFromJSONDbReducer,
    activeWell
  }
}

export default connect(mapStateToProps, {getWellPlansFromJSONDb})(ExistingPlans)