import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css'
import ReactDataSheet from "react-datasheet"
import { get } from "lodash"

const ExistingLeaseLines = ({getLeaseLinesFromDynamoDbReducer, activeWell}) => {
  const [leaseLines, setLeaseLines] = useState([])
  const [grid, setGrid] = useState([])

  useEffect(()=>{
    if (getLeaseLinesFromDynamoDbReducer.status === "received") {
      createCopy()
    }
  },[getLeaseLinesFromDynamoDbReducer.response.Items])

  useEffect(() => {
    createReactDataSheetGridFromLeaseLines()
  }, [leaseLines])

  const createCopy = () => {
    let leaseLinesFromReducerCopy = [...getLeaseLinesFromDynamoDbReducer.response.Items]
    setLeaseLines(leaseLinesFromReducerCopy)
  }

  const createReactDataSheetGridFromLeaseLines = () => {
    let dataSheetHeader = [[{value: '', readOnly: true, width: '3rem'},  {value: 'Northing', readOnly: true, width: '7rem'}, {value: 'Easting', readOnly: true, width: '7rem'}]]
    let leaseLinesCopy = [...leaseLines];
    leaseLinesCopy.forEach((leaseLineItem, idx) => {
      let newRow = [];
      newRow[0] = {value: idx + 1, width: "4rem", readOnly: true}
      newRow[1] = {value: parseInt(leaseLineItem.Northing), width: "7rem"}
      newRow[2] = {value: parseInt(leaseLineItem.Easting), width: "7rem"}
      dataSheetHeader.push(newRow)
    })
    setGrid(dataSheetHeader)
  }

  const renderMain = () => {
    if (getLeaseLinesFromDynamoDbReducer.status === "received") {
      const {operator, rig, well } = activeWell.response
      return (
        <React.Fragment>
          {/* <h3 className="my-4">{operator} - {rig} - {well}</h3> */}
          <ReactDataSheet data = {grid} valueRenderer = {cell => cell.value} width></ReactDataSheet>
        </React.Fragment>
      )
    }
  }

  if (getLeaseLinesFromDynamoDbReducer.status === "received") {
    return (
      <Container>
        {renderMain()}
      </Container>
    )
  } else {
        return "error"
    }
}

const mapStateToProps = ({activeWell, getLeaseLinesFromDynamoDbReducer}) => {
 return {
  activeWell, 
  getLeaseLinesFromDynamoDbReducer
 }
}

export default connect(mapStateToProps)(ExistingLeaseLines)