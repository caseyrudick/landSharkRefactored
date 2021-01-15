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

const ExistingPlans = ({getWellPlansFromDynamoDbReducer, activeWell}) => {
  let [plans, setPlans] = useState([]);
  let [grid, setGrid] = useState([]);
  
  useEffect(()=> {
    if (getWellPlansFromDynamoDbReducer.status === "received") {
      createCopies();
    }
  },[getWellPlansFromDynamoDbReducer.response.Items]);

  useEffect(() => {
    createReactDataSheetGridFromPlans();
  }, [plans])


  const createCopies = () => {
    setPlans([...getWellPlansFromDynamoDbReducer.response.Items])
    console.log(getWellPlansFromDynamoDbReducer.response.Items)
    console.log(plans)
    createReactDataSheetGridFromPlans();
  }
  
  const createReactDataSheetGridFromPlans = () => {
    // console.log("Creating grid")
    let dataSheetHeader = [[{value: '', readOnly: true, width: '3rem'}, {value: 'Measured Depth', readOnly: true, width: '10rem'}, {value: 'Inclination', readOnly: true, width: '7rem'}, {value: 'Azimuth', readOnly: true, width: '7rem'}, {value: 'TVD', readOnly: true, width: '7rem'}, {value: 'NS', readOnly: true, width: '7rem'}, {value: 'EW', readOnly: true, width: '7rem'}, {value: 'SECT', readOnly: true, width: '7rem'}, {value: 'DLS', readOnly: true, width: '7rem'}]]
    let plansCopy = [...plans];

    // console.log(`plansCopy: ${plansCopy}`);
    plansCopy.forEach((planLineItem, idx) => {
      console.log(planLineItem);
      let newRow = [];
      newRow[0] = {value: "", width: "3rem"}
      newRow[1] = {value: parseInt(planLineItem.MD), width: "10rem"}
      newRow[2] = {value: parseInt(planLineItem.INC), width: "7rem"}
      newRow[3] = {value: parseInt(planLineItem.AZM), width: "7rem"}
      newRow[4] = {value: parseInt(planLineItem.TVD), width: "7rem"}
      newRow[5] = {value: parseInt(planLineItem.Northing), width: "7rem"}
      newRow[6] = {value: parseInt(planLineItem.Easting), width: "7rem"}
      newRow[7] = {value: parseInt(planLineItem.VS), width: "7rem"}
      newRow[8] = {value: parseInt(planLineItem.DLS), width: "7rem"}
      console.log(newRow)
      dataSheetHeader.push(newRow)      
    })
    setGrid(dataSheetHeader);
    // console.log(grid);
    // setGrid(result)
  }

  

  const renderMain = () => {
    if (getWellPlansFromDynamoDbReducer.status === "received") {
      const { Operator, Rig, Well_Name} = activeWell.response
      return (
        <React.Fragment>
          <h3 className="my-4">{Operator.S} - {Rig.S} - {Well_Name.S}</h3>
          <ReactDataSheet data={grid} valueRenderer={cell => cell.value} width/>
        </React.Fragment>
      )
    }
  }

  if (getWellPlansFromDynamoDbReducer.status === "received") {
    return (
      <Container>
        {renderMain()}
      </Container>
    ) 
  } else {
    return "error"
  }

}





const mapStateToProps = ({getWellPlansFromDynamoDbReducer, activeWell}) => {
  return {
    getWellPlansFromDynamoDbReducer,
    activeWell
  }
}

export default connect(mapStateToProps, { })(ExistingPlans)