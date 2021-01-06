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

const ExistingHardLines = ({getHardLinesFromJSONDbReducer, activeWell}) => {
  const [hardLines, setHardLines] = useState([])
  const [grid, setGrid] = useState([])

  useEffect(()=>{
    if (getHardLinesFromJSONDbReducer.status === "received") {
      let hardLinesFromReducerCopy = [...getHardLinesFromJSONDbReducer.response]
      setHardLines(hardLinesFromReducerCopy)
    }
  },[getHardLinesFromJSONDbReducer.status])

  const renderMain = () => {
    if (getHardLinesFromJSONDbReducer.status === "received") {
      const {operator, rig, well } = activeWell.response
      return (
        <React.Fragment>
          {/* <h3 className="my-4">{operator} - {rig} - {well}</h3> */}
          <ReactDataSheet data = {getHardLinesFromJSONDbReducer.response} valueRenderer = {cell => cell.value} width></ReactDataSheet>
        </React.Fragment>
      )
    }
  }

  if (getHardLinesFromJSONDbReducer.status === "received") {
    return (
      <Container>
        {renderMain()}
      </Container>
    )
  } else {
        return "error"
    }
}

const mapStateToProps = ({activeWell, getHardLinesFromJSONDbReducer}) => {
 return {
  activeWell, 
  getHardLinesFromJSONDbReducer
 }
}

export default connect(mapStateToProps)(ExistingHardLines)