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

const ExistingPVA = ({ 
  savePlansToReduxStoreReducer, 
  getHardLinesFromDynamoDbReducer, 
  saveSurveysToReduxStoreReducer, 
  getSurveysFromDynamoDbReducer, 
  getWellPlansFromDynamoDbReducer, 
  activeWell, 
  getLeaseLinesFromDynamoDbReducer }) => {

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
    console.log(data)
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
          x: createSectCoordinates(getWellPlansFromDynamoDbReducer.response.Items),
          y: createTVDCoordinates(getWellPlansFromDynamoDbReducer.response.Items),
          type: "scatter",
          mode: "lines+markers",
          marker: {color: "blue"},
          name: "Plan"
        },
        {
          x: createSectCoordinates(getSurveysFromDynamoDbReducer.response.Items),
          y: createTVDCoordinates(getSurveysFromDynamoDbReducer.response.Items),
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
            x: createEastingCoordinates(getWellPlansFromDynamoDbReducer.response.data),
            y: createNorthingCoordinates(getWellPlansFromDynamoDbReducer.response.data),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "blue"},
            name: "Plan"
          },
          {
            x: createEastingCoordinates(getSurveysFromDynamoDbReducer.response.data),
            y: createNorthingCoordinates(getSurveysFromDynamoDbReducer.response.data),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "red"},
            name: "Surveys"
          },
          {
            x: createEastingCoordinates(getLeaseLinesFromDynamoDbReducer.response.data, true),
            y: createNorthingCoordinates(getLeaseLinesFromDynamoDbReducer.response.data, true),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "black"},
            name: "Lease Lines"
          },
          {
            x: createEastingCoordinates(getHardLinesFromDynamoDbReducer.response.data, true),
            y: createNorthingCoordinates(getHardLinesFromDynamoDbReducer.response.data, true),
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

  


  if (getLeaseLinesFromDynamoDbReducer.status === "received" && getWellPlansFromDynamoDbReducer.status === "received") {
    return (
      <Container>
        <h3>{activeWell.response.Operator.S} - {activeWell.response.Rig.S} - {activeWell.response.Well_Name.S}</h3>
        {renderSectionView()}
        {/* {renderPlanView()}  */}
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

const mapStateToProps = ({
  savePlansToReduxStoreReducer, 
  getHardLinesFromDynamoDbReducer, 
  saveSurveysToReduxStoreReducer,
  getSurveysFromDynamoDbReducer, 
  getWellPlansFromDynamoDbReducer, 
  activeWell, 
  getLeaseLinesFromDynamoDbReducer}) => {
  return {
    getWellPlansFromDynamoDbReducer, 
    activeWell,
    getLeaseLinesFromDynamoDbReducer,
    getSurveysFromDynamoDbReducer,
    saveSurveysToReduxStoreReducer,
    getHardLinesFromDynamoDbReducer,
    savePlansToReduxStoreReducer
  }
}

export default connect(mapStateToProps, { })(ExistingPVA)