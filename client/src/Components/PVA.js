import React from "react"
import Container from "react-bootstrap/Container"
import Plot from 'react-plotly.js';
import { connect } from "react-redux"
import _ from "lodash"
import savePlansToReduxStore from "../ActionCreators/savePlansToReduxStore"
import saveLeaseLinesToReduxStore from "../ActionCreators/saveLeaseLinesToReduxStore"
import saveWellInfoToReduxStore from "../ActionCreators/saveWellInfoToReduxStore"


const PVA = ({
  saveSurveysToReduxStoreReducer, 
  saveHardLinesToReduxStoreReducer, 
  savePlansToReduxStoreReducer, 
  saveLeaseLinesToReduxStoreReducer, 
  getWellPlansFromDynamoDbReducer, 
  getLeaseLinesFromDynamoDbReducer,
  getHardLinesFromDynamoDbReducer,
  getSurveysFromDynamoDbReducer,
  activeWell
}) => {
  const createEastingCoordinates = (data, polyLine = false) => {
    if (polyLine) {
      // if (Object.keys(data).length === 0) {
      //   console.log("nada")
      //   return []
      // } else {
      //   let result = data.map((row, index) => data[index][2].value).slice(1)
      //   // console.log("easting" + result)
      //   return result
      return data.map((row, index) => data[index][2].value).slice(1) || []
      // }
    } else {
      // if (Object.keys(data).length === 0) {
      //   console.log("nada")
      //   return []
      // } else {
      //   let result = data.map((row, index) => data[index][6].value).slice(1)
      //   // console.log("easting" + result)
      //   return result
      return data.map((row, index) => data[index][6].value).slice(1) || []
      }
    }

  
  const createNorthingCoordinates = (data, polyLine = false) => {
    if (polyLine) {
      // if (Object.keys(data).length === 0) {
      //   return []
      // } else {
      //   let result = data.map((row, index) => data[index][1].value).slice(1)
      //   // console.log("northing:" + result)
      //   return result
      return data.map((row, index) => data[index][1].value).slice(1) || []
      // }
    } else {
      // if (Object.keys(data).length === 0) {
      //   console.log("nada")
      //   return []
      // } else {
        // let result = data.map((row, index) => data[index][5].value).slice(1)
        // console.log("northing" + result)
        // return result
      // }
      return data.map((row, index) => data[index][5].value).slice(1) || []
    }
  }

  const createTVDCoordinates = (data) => {
    console.log(data)
    if (data.length === 0) {
      return []
    } else {
      return data.map((row, index) => data[index][4].value * -1 ).slice(1)
    }
  } 

  const createSectCoordinates = (data) => {

    if (data.length === 0) {
      return []
    } else {
      return data.map((row, index) => data[index][7].value).slice(1)
    }
  }
  

  

  const renderSectionView = () => {
    return (
      <Plot
      data={[
        {
          x: createTVDCoordinates(savePlansToReduxStoreReducer.response),
          y: createSectCoordinates(savePlansToReduxStoreReducer.response),
          type: "scatter",
          mode: "lines+markers",
          marker: {color: "blue"},
          name: "Plan"
        },
        {
          x: createTVDCoordinates(saveSurveysToReduxStoreReducer.response),
          y: createSectCoordinates(saveSurveysToReduxStoreReducer.response),
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
    // if (
    //   Object.keys(savePlansToReduxStoreReducer.response).length === 0 && Object.keys(save)
    // )
    return (
      <Plot
        data={[
          {
            x: createEastingCoordinates(savePlansToReduxStoreReducer.response),
            y: createNorthingCoordinates(savePlansToReduxStoreReducer.response),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "blue"},
            name: "Plan"
          },
          {
            x: createEastingCoordinates(saveSurveysToReduxStoreReducer.response),
            y: createNorthingCoordinates(saveSurveysToReduxStoreReducer.response),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "red"},
            name: "Surveys"
          },
          {
            x: createEastingCoordinates(saveLeaseLinesToReduxStoreReducer.response.grid, true),
            y: createNorthingCoordinates(saveLeaseLinesToReduxStoreReducer.response.grid, true),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "black"},
            name: "Lease Lines"
          },
          {
            x: createEastingCoordinates(saveHardLinesToReduxStoreReducer.response.grid, true),
            y: createNorthingCoordinates(saveHardLinesToReduxStoreReducer.response.grid, true),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "red"},
            name: "Lease Lines"
          },
        ]}
        layout = { {width: 1000, height: 800, title: 'Plan View'} }
        />
    )
  }

  return (
    <Container>
      {renderSectionView()}
      {renderPlanView()}
    </Container>
  )

}

const mapStateToProps = ({
  saveHardLinesToReduxStoreReducer, 
  saveSurveysToReduxStoreReducer, 
  savePlansToReduxStoreReducer, 
  saveLeaseLinesToReduxStoreReducer,
  getWellPlansFromDynamoDbReducer, 
  getLeaseLinesFromDynamoDbReducer,
  getHardLinesFromDynamoDbReducer,
  getSurveysFromDynamoDbReducer, 
  activeWell
}) => {
  return {
    savePlansToReduxStoreReducer, 
    saveLeaseLinesToReduxStoreReducer, 
    activeWell,
    saveHardLinesToReduxStoreReducer,
    saveSurveysToReduxStoreReducer,
    getWellPlansFromDynamoDbReducer, 
    getLeaseLinesFromDynamoDbReducer,
    getHardLinesFromDynamoDbReducer,
    getSurveysFromDynamoDbReducer, 
  }
}

export default connect(mapStateToProps, { savePlansToReduxStore, saveLeaseLinesToReduxStore, saveWellInfoToReduxStore })(PVA)