import React from "react"
import Container from "react-bootstrap/Container"
import Plot from 'react-plotly.js';
import { connect } from "react-redux"
import _ from "lodash"
import savePlansToReduxStore from "../ActionCreators/savePlansToReduxStore"
import saveLeaseLinesToReduxStore from "../ActionCreators/saveLeaseLinesToReduxStore"
import saveWellInfoToReduxStore from "../ActionCreators/saveWellInfoToReduxStore"

const PVA = ({savePlansToReduxStoreReducer, saveLeaseLinesToReduxStoreReducer, activeWell}) => {
  // const createEastingCoordinates = (data, polyLine = false) => {
  //   if (polyLine) {
  //     if (Object.keys(data).length === 0) {
  //       return []
  //     } else {
  //       const eastingCoordinates = []
  //       data.map((row, index) => {
  //         if (index === 0 || index === 1) {

  //         } else {
  //           const x = data[index][2].value
  //           eastingCoordinates.push(x)
  //         }
  //       })
  //       return eastingCoordinates
  //     }
  //   } else {
  //     if (Object.keys(data).length === 0) {
  //       return []
  //     } else {
  //       const eastingCoordinates = []
  //       data.map((row, index) => {
  //         if (index === 0) {

  //         } else {
  //           const x = data[index][6].value
  //           eastingCoordinates.push(x)
  //         }
  //       })
  //       return eastingCoordinates
  //     }
  //   }
  // }  
  
  // const createNorthingCoordinates = (data, polyLine = false) => {
  //   if (polyLine) {
  //     if (Object.keys(data).length === 0) {
  //       return []
  //     } else {
  //       const northingCoordinates = []
  //       northingCoordinates = data.map((row, index) => {
  //         if (index === 0 || index === 1) {

  //         } else {
  //           return data[index][5]
            
  //         }
  //       })
  //       return northingCoordinates
  //     }
  //   }
  // }

  const createEastingCoordinates = (polyLine = false, data) => {
    if (polyLine) {
      if (data.length === 0) {
        return []
      } else {
        return data.slice(1).filter((row, index) => index !== 0)
          .map((row, index) => data[index][2])
      }
    } else {
        if (data.length === 0) {
          return []
        } else {
          return data.slice(1).filter((row, index) => index !== 0)
            .map((row, index) => data[index][6])
        }
      }
    } 

    const createNorthingCoordinates = (polyLine = false, data) => {
      if (polyLine) {
        if (data.length === 0) {
          return []
        } else {
          return data.slice(1).filter((row, index) => index !== 0)
            .map((row, index) => data[index][1])
        }
      } else {
          if (data.length === 0) {
            return []
          } else {
            return data.slice(1).filter((row, index) => index !== 0)
              .map((row, index) => data[index][5])
          }
        }
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
            x: createEastingCoordinates(true, saveLeaseLinesToReduxStoreReducer.response),
            y: createNorthingCoordinates(true, saveLeaseLinesToReduxStoreReducer.response),
            type: "scatter",
            mode: "lines+markers",
            marker: {color: "blue"},
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