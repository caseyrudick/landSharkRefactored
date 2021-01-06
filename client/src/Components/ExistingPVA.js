import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css'
import ReactDataSheet from "react-datasheet"
import Plot from "react-plotly.js"
import { isNumber } from "lodash"
import saveSurveysToReduxStore from "../ActionCreators/saveSurveysToReduxStore"

const ExistingPVA = ({savePlansToReduxStoreReducer, getHardLinesFromJSONDbReducer, saveSurveysToReduxStoreReducer, getSurveysFromJSONDbReducer, getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer}) => {

  const createEastingCoordinates = (data, polyLine = false) => {
    if (polyLine) {
      if (Object.keys(data).length === 0) {
        console.log("nada")
        return []
      } else {
        let result = data.map((row, index) => data[index][2].value).slice(1)
        return result
      }
    } else {
      if (Object.keys(data).length === 0) {
        console.log("nada")
        return []
      } else {
        let result = data.map((row, index) => data[index][6].value).slice(1)
        return result
      }
    }
  }  
  
  const createNorthingCoordinates = (data, polyLine = false) => {
    if (polyLine) {
      if (Object.keys(data).length === 0) {
        return []
      } else {
          return data.map((row, index) => data[index][1].value).slice(1)
      }
    } else {
      if (Object.keys(data).length === 0) {
        console.log("nada")
        return []
      } else {
          return data.map((row, index) => data[index][5].value).slice(1)
      }
    }
  }

  const createTVDCoordinates = (data) => {
    if (data.length === 0) {
      return []
    } else {
        return data.map((row, index) => {
          return parseInt(data[index][4].value) * -1
            }).slice(1)
    }
  } 

  const createSectCoordinates = (data) => {
    if (data.length === 0) {
      return []
    } else {
      return data.map((row, index) => {
        return parseInt(data[index][7].value)
          }).slice(1)
    }
  }

  const renderSectionView = () => {
    return (
      <Plot
      data={[
        {
          x: createSectCoordinates(getWellPlansFromJSONDbReducer.response),
          y: createTVDCoordinates(getWellPlansFromJSONDbReducer.response),
          type: "scatter",
          mode: "lines+markers",
          marker: {color: "blue"},
          name: "Plan"
        },
        {
          x: createSectCoordinates(getSurveysFromJSONDbReducer.response),
          y: createTVDCoordinates(getSurveysFromJSONDbReducer.response),
          type: "scatter",
          mode: "lines+markers",
          marker: {color: "Red"},
          name: "Surveys"
        },
      ]}
      layout = { {width: 1000, height: 800, title: 'Section View'} }
      />
    )
  }

  const renderPlanView = () => {
    return (
      // <Container>
      //   <Col xs={2}>
      //     <Form className="mt-7">
      //       <Form.Group controlId="formBasicEmail">
      //         <Form.Control className="mt-3" type="float" disabled placeholder="Enter VS Here" onChange={event => event.target.value}/>
      //       </Form.Group>
      //     </Form>
      //   </Col>

      <Plot
        data={[
          {
            x: createEastingCoordinates(getWellPlansFromJSONDbReducer.response),
            y: createNorthingCoordinates(getWellPlansFromJSONDbReducer.response),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "blue"},
            name: "Plan"
          },
          {
            x: createEastingCoordinates(getSurveysFromJSONDbReducer.response),
            y: createNorthingCoordinates(getSurveysFromJSONDbReducer.response),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "red"},
            name: "Surveys"
          },
          {
            x: createEastingCoordinates(getLeaseLinesFromJSONDbReducer.response, true),
            y: createNorthingCoordinates(getLeaseLinesFromJSONDbReducer.response, true),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "black"},
            name: "Lease Lines"
          },
          {
            x: createEastingCoordinates(getHardLinesFromJSONDbReducer.response, true),
            y: createNorthingCoordinates(getHardLinesFromJSONDbReducer.response, true),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "red"},
            name: "Hard Lines"
          },
        ]}
        layout = { {width: 1000, height: 800, title: 'Plan View'} }
        />
      // </Container>
    )
  }

  


  if (getLeaseLinesFromJSONDbReducer.status === "received" && getWellPlansFromJSONDbReducer.status === "received") {
    return (
      <Container>
        <h3>{activeWell.operator} - {activeWell.rig} - {activeWell.well}</h3>
        {renderSectionView()}
        {renderPlanView()} 
      </Container>
    )
      
      // <Container>
      //   {renderPlanView()} 
      // </Container>
    
  } else {
    return (
      "Data Loading"
    )
  }


}

const mapStateToProps = ({savePlansToReduxStoreReducer, getHardLinesFromJSONDbReducer, saveSurveysToReduxStoreReducer,getSurveysFromJSONDbReducer, getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer}) => {
  return {
    getWellPlansFromJSONDbReducer, 
    activeWell: activeWell.response, 
    getLeaseLinesFromJSONDbReducer,
    getSurveysFromJSONDbReducer,
    saveSurveysToReduxStoreReducer,
    getHardLinesFromJSONDbReducer,
    savePlansToReduxStoreReducer
  }
}

export default connect(mapStateToProps, { })(ExistingPVA)