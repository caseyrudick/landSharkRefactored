import React from "react"
import Container from "react-bootstrap/Container"
import Plot from 'react-plotly.js';
import { connect } from "react-redux"
import _ from "lodash"
import savePlansToReduxStore from "../ActionCreators/savePlansToReduxStore"
import saveLeaseLinesToReduxStore from "../ActionCreators/saveLeaseLinesToReduxStore"
import saveWellInfoToReduxStore from "../ActionCreators/saveWellInfoToReduxStore"

const PVA = ({savePlansToReduxStoreReducer, saveLeaseLinesToReduxStoreReducer, activeWell}) => {
  const createEastingCoordinates = (data, polyLine = false) => {
    if (polyLine) {
      if (Object.keys(data).length === 0) {
        console.log("nada")
        return []
      } else {
        let result = data.map((row, index) => data[index][2].value).slice(1)
        console.log("easting" + result)
        return result
      }
    } else {
      if (Object.keys(data).length === 0) {
        console.log("nada")
        return []
      } else {
        let result = data.map((row, index) => data[index][6].value).slice(1)
        console.log("easting" + result)
        return result
      }
    }
  }  
  
  const createNorthingCoordinates = (data, polyLine = false) => {
    if (polyLine) {
      if (Object.keys(data).length === 0) {
        return []
      } else {
        let result = data.map((row, index) => data[index][1].value).slice(1)
        console.log("northing:" + result)
        return result
      }
    } else {
      if (Object.keys(data).length === 0) {
        console.log("nada")
        return []
      } else {
        let result = data.map((row, index) => data[index][5].value).slice(1)
        console.log("northing" + result)
        return result
      }
    }
  }

  // const createEastingCoordinates = (polyLine = false, data) => {
  //   if (polyLine) {
  //     if (data.length === 0) {
  //       return []
  //     } else {
  //       return data.slice(1).filter((row, index) => index !== 0)
  //         .map((row, index) => data[index][2])
  //     }
  //   } else {
  //       if (data.length === 0) {
  //         return []
  //       } else {
  //         return data.slice(1).filter((row, index) => index !== 0)
  //           .map((row, index) => data[index][6])
  //       }
  //     }
  //   } 

  //   const createNorthingCoordinates = (polyLine = false, data) => {
  //     if (polyLine) {
  //       if (data.length === 0) {
  //         return []
  //       } else {
  //         return data.slice(1).filter((row, index) => index !== 0)
  //           .map((row, index) => data[index][1])
  //       }
  //     } else {
  //         if (data.length === 0) {
  //           return []
  //         } else {
  //           return data.slice(1).filter((row, index) => index !== 0)
  //             .map((row, index) => data[index][5])
  //         }
  //       }
  //     } 
console.log(saveLeaseLinesToReduxStoreReducer.response.grid)
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
            x: createEastingCoordinates(saveLeaseLinesToReduxStoreReducer.response.grid, true),
            y: createNorthingCoordinates(saveLeaseLinesToReduxStoreReducer.response.grid, true),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "red"},
            name: "Lease Lines"
          }
        ]}
        layout = { {width: 1000, height: 800, title: 'Section View'} }
        />
    )
  }

  return (
    <Container>
      {renderPlanView()}
    </Container>
  )

}

const mapStateToProps = ({savePlansToReduxStoreReducer, saveLeaseLinesToReduxStoreReducer, activeWell}) => {
  return {
    savePlansToReduxStoreReducer, 
    saveLeaseLinesToReduxStoreReducer, 
    activeWell
  }
}

export default connect(mapStateToProps, { savePlansToReduxStore, saveLeaseLinesToReduxStore, saveWellInfoToReduxStore })(PVA)