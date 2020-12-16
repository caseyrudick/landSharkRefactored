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
import { isNumber } from "lodash"

const ExistingPVA = ({getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer}) => {

    const createEastingCoordinates = (data) => {
    data = [...data]
    let dataLength = data.length
    console.log(dataLength)
    console.log(data)

      if (data.length === 0) {
        return []
      } else {
        console.log("getting there")
        return data.map((row, index) => data[index][2].value).slice(1)
      }
    } 
  // const createEastingCoordinates = (data, polyLine = false) => {
  //   data = [...data]
  //   let dataLength = data.length
  //   console.log(dataLength)
  //   console.log(data)
  //   if (polyLine) {
  //     if (data.length === 0) {
  //       return []
  //     } else {
  //       return data.map((row, index) => data[index][2].value).slice(1)
  //     }
  //   } else {
  //       if (data.length === 0) {
  //         return []
  //       } else {
  //         return data.map((row, index) => data[index][6].value).slice(1)
  //       }
  //     }
  //   } 

    // const createNorthingCoordinates = (polyLine = false, data) => {
    //   if (polyLine) {
  //       if (Object.keys(data).length === 0) {
  //         return []
  //       } else {
  //         return data.map((row, index) => data[index][1].value).slice(1)
        // }
      // } else {
      //     if (Object.keys(data).length === 0) {
      //       return []
      //     } else {
      //       return data.map((row, index) => data[index][5].value).slice(1)
      //     }
      //   }
      // } 


  // const renderPlanView = () => {
  //   <Plot
  //     data = {[
  //       {
  //         x: createEastingCoordinates(getWellPlansFromJSONDbReducer.response),
  //         y: createNorthingCoordinates(getWellPlansFromJSONDbReducer.response),
  //         type: "scatter",
  //         mode: "lines+markers",
  //         marker: {color: "blue"},
  //         name: "Plan"
  //       },
  //       {
  //         x: createEastingCoordinates(getLeaseLinesFromJSONDbReducer.response),
  //         y: createNorthingCoordinates(getLeaseLinesFromJSONDbReducer.response),
  //         type: "scatter",
  //         mode: "lines+markers",
  //         marker: {color: "black"},
  //         name: "Lease Lines"
  //       }
  //     ]}
  //     layout = { {width: 1000, height: 800, title: "Section View"} }
  //   />
  // }


  const renderBullshit = () => {
    return (
      <Plot
        data = {[
          {
            x: createEastingCoordinates(getLeaseLinesFromJSONDbReducer.response),
            y: createEastingCoordinates(getLeaseLinesFromJSONDbReducer.response),
            type: "scatter",
            mode: "lines+markers",
            marker: {color:"blue"},
            name: "Plan"

          }
        ]}
      />
      // <Container>
      //   {renderPlanView()} 
      // </Container>
    )
  }

  if (getLeaseLinesFromJSONDbReducer.status === "received" && getWellPlansFromJSONDbReducer.status === "received") {
    // console.log("Here's the getLeaseLinesFromJSONDbReducer.status")
    // console.log(getLeaseLinesFromJSONDbReducer.response)
    // console.log(getLeaseLinesFromJSONDbReducer.response.length)
    // const data = [...getLeaseLinesFromJSONDbReducer.response]
    // let result = data.map((row, index) => data[index][2].value).slice(1)

    // console.log(result)
    return (
      <Container>
        {renderBullshit()} 
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

const mapStateToProps = ({getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer}) => {
  return {
    getWellPlansFromJSONDbReducer, activeWell, getLeaseLinesFromJSONDbReducer
  }
}

export default connect(mapStateToProps, { })(ExistingPVA)