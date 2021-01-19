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
import _ from 'lodash';
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
      // if (polyLine) {
      // //   if (data.length === 0) {
      // //     return []
      // //   }  else {
      //     return data.map((line, index) => line["Easting"])
      // //   }
      // } else {
      // //   if (data.length === 0) {
      // //     return []
      // //   } else {
          return data.map((lineItem, index) => {
            return parseInt(lineItem.Easting)
            })
      //   }
      // }
    }


  const createNorthingCoordinates = (data, polyLine = false) => {
    // if (polyLine) {
    //   // if (data.length === 0) {
    //   //   return []
    //   // }  else {
    //     console.log(data.response.Items)
    //     return data.map((line, index) => line.response.Items["Northing"])
    //   // }
    // } else {
      // if (data.length === 0) {
      //   return []
      // } else {

        return data.map((lineItem, index) => {
          return parseInt(lineItem["Northing"])
          })
      // }
    // }
  }

  const createTVDCoordinates = (data) => {
    if (data.length === 0) {
      return []
    } else {
        return data.map((lineItem, index) => {
          return parseInt(lineItem["TVD"]) *-1
            })
    }
  }

  const createSectCoordinates = (data) => {
    if (data.length === 0) {
      return []
    } else {
      const sectCoordinates = data.map((lineItem, index) => {
        return parseInt(lineItem.VS)
          })
      return sectCoordinates
    }
  }

  const convertNumberStringsToNumbersAndSort = (data, dataSource) => {
    let dataCopy = [...data]
    dataCopy.map((element, index) => {
      switch (dataSource) {
        case 'Plan':
          dataCopy[index].Plan_Number = parseInt(dataCopy[index].Plan_Line_Number)
          break;
        case 'Survey':
          dataCopy[index].SurveyNumber = parseInt(dataCopy[index].SurveyNumber)
          break;
        case 'HardLines':
          dataCopy[index].Hard_Line_Number = parseInt(dataCopy[index].Hard_Line_Number)
          break;
        case 'LeaseLine':
          dataCopy[index].Lease_Line_Number = parseInt(dataCopy[index].Lease_Line_Number)
          break;
        default:

      }
    })
    switch (dataSource) {
      case 'Plan':
        return _.orderBy(dataCopy, ['Plan_Line_Number'], ['asc'])
      case 'Survey':
        return _.orderBy(dataCopy, ['SurveyNumber'], ['asc'])
      case 'HardLines':
        return _.orderBy(dataCopy, ['Hard_Line_Number'], ['asc'])
      case 'LeaseLine':
        return _.orderBy(dataCopy, ['Lease_Line_Number'], ['asc'])
      default:

    }
  }

  const renderSectionView = () => {
    return (
      <Plot
      data={[
        {
          x: createSectCoordinates(convertNumberStringsToNumbersAndSort(getWellPlansFromDynamoDbReducer.response.Items, "Plan")),
          y: createTVDCoordinates(convertNumberStringsToNumbersAndSort(getWellPlansFromDynamoDbReducer.response.Items, "Plan")),
          type: "scatter",
          mode: "lines+markers",
          marker: {color: "blue"},
          name: "Plan"
        },
        {
          x: createSectCoordinates(convertNumberStringsToNumbersAndSort(getSurveysFromDynamoDbReducer.response.Items, "Survey")),
          y: createTVDCoordinates(convertNumberStringsToNumbersAndSort(getSurveysFromDynamoDbReducer.response.Items, "Survey")),
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
      <Container>
        <Col xs={2}>
          <Form className="mt-7">
            <Form.Group controlId="formBasicEmail">
              <Form.Control className="mt-3" type="float" disabled placeholder="Enter VS Here" onChange={event => event.target.value}/>
            </Form.Group>
          </Form>
        </Col>

      <Plot
        data={[
          {
            x: createEastingCoordinates(convertNumberStringsToNumbersAndSort(getWellPlansFromDynamoDbReducer.response.Items, "Plan")),
            y: createNorthingCoordinates(convertNumberStringsToNumbersAndSort(getWellPlansFromDynamoDbReducer.response.Items, "Plan")),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "blue"},
            name: "Plan"
          },
          {
            x: createEastingCoordinates(convertNumberStringsToNumbersAndSort(getSurveysFromDynamoDbReducer.response.Items, "Survey")),
            y: createNorthingCoordinates(convertNumberStringsToNumbersAndSort(getSurveysFromDynamoDbReducer.response.Items, "Survey")),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "red"},
            name: "Surveys"
          },
          {
            x: createEastingCoordinates(convertNumberStringsToNumbersAndSort(getLeaseLinesFromDynamoDbReducer.response.Items, "LeaseLine"), true),
            y: createNorthingCoordinates(convertNumberStringsToNumbersAndSort(getLeaseLinesFromDynamoDbReducer.response.Items, "LeaseLine"), true),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "black"},
            name: "Lease Lines"
          },
          {
            x: createEastingCoordinates(convertNumberStringsToNumbersAndSort(getHardLinesFromDynamoDbReducer.response.Items,"HardLines"), true),
            y: createNorthingCoordinates(convertNumberStringsToNumbersAndSort(getHardLinesFromDynamoDbReducer.response.Items, "HardLines"), true),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "red"},
            name: "Hard Lines"
          },
        ]}
        layout = { {width: 1000, height: 800, title: 'Plan View'} }
        />
      </Container>
    )
  }




  if (getLeaseLinesFromDynamoDbReducer.status === "received" && getWellPlansFromDynamoDbReducer.status === "received") {
    return (
      <Container>
        <h3>{activeWell.response.Operator.S} - {activeWell.response.Rig.S} - {activeWell.response.Well_Name.S}</h3>
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