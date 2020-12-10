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

const ExistingWellPlans = ({getWellPlansFromJSONDbReducer}) => {
  const [plans, setPlans] = useState([])
  const [grid, setGrid] = useState([])

  // useEffect(()=> {
  //   if (getWellPlansFromDynamoDbReducer.status === "received") {
  //     convertSurveyNumberStringsToNumbers();
  //   }
    
  // },[getWellPlansFromDynamoDbReducer.status])

  // useEffect(()=> {
  //   createGridFromPlans();
  // },[plans])

  const convertSurveyNumberStringsToNumbers = () => {
    // let plansFromReducerCopy = [...getWellPlansFromJSONDbReducer.response]
    console.log(getWellPlansFromJSONDbReducer.response)
  }
  convertSurveyNumberStringsToNumbers()
  return (
    
    "existing plans"
  )
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

const mapStateToProps = ({getWellPlansFromJSONDbReducer, saveActiveWellToReduxStoreReducer, getWellsFromJSONDbReducer}) => {
  return {
    getWellPlansFromJSONDbReducer
  }
}

export default connect(mapStateToProps, {getWellPlansFromJSONDb})(ExistingWellPlans)