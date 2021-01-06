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

const ExistingLeaseLines = ({getLeaseLinesFromJSONDbReducer, activeWell}) => {
  const [leaseLines, setLeaseLines] = useState([])
  const [grid, setGrid] = useState([])

  useEffect(()=>{
    if (getLeaseLinesFromJSONDbReducer.status === "received") {
      let leaseLinesFromReducerCopy = [...getLeaseLinesFromJSONDbReducer.response]
      setLeaseLines(leaseLinesFromReducerCopy)
    }
  },[getLeaseLinesFromJSONDbReducer.status])

  const renderMain = () => {
    if (getLeaseLinesFromJSONDbReducer.status === "received") {
      const {operator, rig, well } = activeWell.response
      return (
        <React.Fragment>
          {/* <h3 className="my-4">{operator} - {rig} - {well}</h3> */}
          <ReactDataSheet data = {getLeaseLinesFromJSONDbReducer.response} valueRenderer = {cell => cell.value} width></ReactDataSheet>
        </React.Fragment>
      )
    }
  }

  if (getLeaseLinesFromJSONDbReducer.status === "received") {
    return (
      <Container>
        {renderMain()}
      </Container>
    )
  } else {
        return "error"
    }
}

const mapStateToProps = ({activeWell, getLeaseLinesFromJSONDbReducer}) => {
 return {
  activeWell, 
  getLeaseLinesFromJSONDbReducer
 }
}

export default connect(mapStateToProps)(ExistingLeaseLines)