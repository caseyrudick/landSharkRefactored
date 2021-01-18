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
      let leaseLinesFromReducerCopy = [...getLeaseLinesFromDynamoDbReducer.response]
      setLeaseLines(leaseLinesFromReducerCopy)
    }
  },[getLeaseLinesFromDynamoDbReducer.status])

  const renderMain = () => {
    if (getLeaseLinesFromDynamoDbReducer.status === "received") {
      const {operator, rig, well } = activeWell.response
      return (
        <React.Fragment>
          {/* <h3 className="my-4">{operator} - {rig} - {well}</h3> */}
          <ReactDataSheet data = {getLeaseLinesFromDynamoDbReducer.response} valueRenderer = {cell => cell.value} width></ReactDataSheet>
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