import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css'
import ReactDataSheet from "react-datasheet"
import ExistingLeaseLines from "./ExistingLeaseLines"
import ExistingHardLines from "./ExistingHardLines"
import LeaseLines from "./LeaseLines"
import HardLines from "./HardLines"


const ExistingPolyLines = ({getLeaseLinesFromDynamoDbReducer, getHardLinesFromDynamoDbReducer, activeWell}) => {
  const renderWellData = () => {
    if (saveWellInfoToReduxStoreReducer.status === "received") {
      const { well, rig, operator} = saveWellInfoToReduxStoreReducer.response
      return <h3 className="hy-4"> {operator} - {rig} - {well}</h3>
    }
    else if (activeWell.status === "received") {
      const { Well_Name, Rig, Operator} = activeWell.response
      return <h3 className="hy-4"> {Operator.S} - {Rig.S} - {Well_Name.S}</h3>
    } else {
      return "No well data"
    }
  }
  if (getLeaseLinesFromDynamoDbReducer.status === "received" && getHardLinesFromDynamoDbReducer.status === "received") {
    return (
      <Container>
        {renderWellData()}
        <Row className="mt-4">
          <Col>
            <h4>Lease Lines</h4>
            <ExistingLeaseLines/>
          </Col>
          <Col>
          <h4>Hard Lines</h4>
            <ExistingHardLines/>
          </Col>
        </Row>
      </Container>
    )
  } else if (getLeaseLinesFromDynamoDbReducer.status === "received") {
    return (
      <Container>
        {renderWellData()}
        <Row className="mt-4">
          <Col>
            <h4>Lease Lines</h4>
            <ExistingLeaseLines/>
          </Col>
          <Col>
          <h4>Hard Lines</h4>
            <HardLines/>
          </Col>
        </Row>
      </Container>
    )
  } else if (getHardLinesFromDynamoDbReducer.status === "received") {
    <Container>
      {renderWellData()}
      <Row className="mt-4">
        <Col>
          <h4>Lease Lines</h4>
          <LeaseLines/>
        </Col>
        <Col>
          <h4>Hard Lines</h4>
          <ExistingHardLines/>
        </Col>
      </Row>
  </Container>
  } else {
    return (
      <Container>
        {renderWellData()}
        <Row className="mt-4">
          <Col>
            <h4>Lease Lines</h4>
            <LeaseLines/>
          </Col>
          <Col>
          <h4>Hard Lines</h4>
            <HardLines/>
          </Col>
        </Row>
      </Container>
    )
  }


}

const mapStateToProps = ({activeWell, getLeaseLinesFromDynamoDbReducer}) => {
 return {
  activeWell, 
  getLeaseLinesFromDynamoDbReducer
 }
}

export default connect(mapStateToProps)(ExistingPolyLines)