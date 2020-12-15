import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css'
import ReactDataSheet from "react-datasheet"
import Plot from "plotly.js"

const ExistingPVA = ({getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer}) => {
  const createEastingCoordinates = (polyLine = false, data) => {
    console.log(data)
    if (polyLine) {
      if (Object.keys(data).length === 0 || !data) {
        return []
      } else {
        return data.slice(1).filter((row, index) => index !== 0)
          .map((row, index) => data[index][2])
      }
    } else {
        if (Object.keys(data).length === 0 || !data) {
          return []
        } else {
          return data.slice(1).filter((row, index) => index !== 0)
            .map((row, index) => data[index][6])
        }
      }
    } 
    const createNorthingCoordinates = (polyLine = false, data) => {
      if (polyLine) {
        if (Object.keys(data).length === 0 || !data) {
          return []
        } else {
          return data.slice(1).filter((row, index) => index !== 0)
            .map((row, index) => data[index][1])
        }
      } else {
          if (Object.keys(data).length === 0 || !data) {
            return []
          } else {
            return data.slice(1).filter((row, index) => index !== 0)           
              .map((row, index) => data[index][5])
          }
        }
      } 


  const renderPlanView = () => {
    <Plot
      data = {[
        {
          x: createEastingCoordinates(getWellPlansFromJSONDbReducer.response),
          y: createNorthingCoordinates(getWellPlansFromJSONDbReducer.response),
          type: "scatter",
          mode: "lines+markers",
          marker: {color: "blue"},
          name: "Plan"
        },
        {
          x: createEastingCoordinates(getLeaseLinesFromJSONDbReducer.response),
          y: createNorthingCoordinates(getLeaseLinesFromJSONDbReducer.response),
          type: "scatter",
          mode: "lines+markers",
          marker: {color: "black"},
          name: "Lease Lines"
        }
      ]}
      layout = { {width: 1000, height: 800, title: "Section View"} }
    />
  }



  return (
    <Container>
      {createEastingCoordinates()}
      "TBD"
      {/* {renderPlanView()} */}
    </Container>
  )
}

const mapStateToProps = ({getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer}) => {
  return {
    getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer
  }
}

export default connect(mapStateToProps, { })(ExistingPVA)