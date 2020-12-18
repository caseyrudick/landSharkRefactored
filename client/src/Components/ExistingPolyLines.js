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

const ExistingPolyLines = ({getLeaseLinesFromJSONDbReducer, activeWell}) => {
  const renderWellData = () => {
      const {operator, rig, well } = activeWell.response
      return (
          <h3 className="my-4">{operator} - {rig} - {well}</h3>
      )
    }
  

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
}

const mapStateToProps = ({activeWell, getLeaseLinesFromJSONDbReducer}) => {
 return {
  activeWell, 
  getLeaseLinesFromJSONDbReducer
 }
}

export default connect(mapStateToProps)(ExistingPolyLines)