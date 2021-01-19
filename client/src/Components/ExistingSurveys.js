import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css'
import ReactDataSheet from "react-datasheet"
import getSurveysFromDynamoDb from "../ActionCreators/getWellPlansFromDynamoDb"


const ExistingSurveys = ({activeWell, getSurveysFromDynamoDbReducer, getSurveysFromDynamoDb}) => {
  const [surveys, setSurveys] = useState([])
  const [grid, setGrid] = useState([])

  useEffect(() => {
    if (getSurveysFromDynamoDbReducer.status === "received") {
      createCopies();
    }
  },[getSurveysFromDynamoDbReducer.status])

  useEffect(() => {
    createReactDataSheetGridFromSurveys();
  }, [surveys])

  const createCopies = () => {
    setSurveys([...getSurveysFromDynamoDbReducer.response.Items])
    // createReactDataSheetGridFromPlans();
  }

  const createReactDataSheetGridFromSurveys = () => {
    let dataSheetHeader = [[{value: '', readOnly: true, width: '3rem'}, {value: 'Measured Depth', readOnly: true, width: '10rem'}, {value: 'Inclination', readOnly: true, width: '7rem'}, {value: 'Azimuth', readOnly: true, width: '7rem'}, {value: 'TVD', readOnly: true, width: '7rem'}, {value: 'NS', readOnly: true, width: '7rem'}, {value: 'EW', readOnly: true, width: '7rem'}, {value: 'SECT', readOnly: true, width: '7rem'}, {value: 'DLS', readOnly: true, width: '7rem'}]]
    let surveysCopy = [...surveys];
    surveysCopy.forEach((surveyLineItem, idx) => {
      let newRow = [];
      newRow[0] = {value: idx+1, width: "4rem", readOnly: true}
      newRow[1] = {value: parseInt(surveyLineItem.MD), width: "10rem"}
      newRow[2] = {value: parseInt(surveyLineItem.INC), width: "7rem"}
      newRow[3] = {value: parseInt(surveyLineItem.AZM), width: "7rem"}
      newRow[4] = {value: parseInt(surveyLineItem.TVD), width: "7rem"}
      newRow[5] = {value: parseInt(surveyLineItem.Northing), width: "7rem"}
      newRow[6] = {value: parseInt(surveyLineItem.Easting), width: "7rem"}
      newRow[7] = {value: parseInt(surveyLineItem.VS), width: "7rem"}
      newRow[8] = {value: parseInt(surveyLineItem.DLS), width: "7rem"}
      dataSheetHeader.push(newRow)      
    })
    setGrid(dataSheetHeader);
    // console.log(grid);
    // setGrid(result)
  }

  let gridFromSurveys = [[{value: '', readOnly: true, width: '3rem'}, {value: 'Measured Depth', readOnly: true, width: '10rem'}, {value: 'Inclination', readOnly: true, width: '7rem'}, {value: 'Azimuth', readOnly: true, width: '7rem'}, {value: 'TVD', readOnly: true, width: '7rem'}, {value: 'NS', readOnly: true, width: '7rem'}, {value: 'EW', readOnly: true, width: '7rem'}, {value: 'SECT', readOnly: true, width: '7rem'}, {value: 'DLS', readOnly: true, width: '7rem'}]]

  const renderMain = () => {
    if (getSurveysFromDynamoDbReducer.status === "received") {
      const { Operator, Rig, Well_Name} = activeWell.response
      return (
        <React.Fragment>
          <h3 className="my-4">{Operator.S} - {Rig.S} - {Well_Name.S}</h3>
          <ReactDataSheet data={grid} valueRenderer={cell => cell.value} width/>
        </React.Fragment>
      )
    }
  }

  if (getSurveysFromDynamoDbReducer.status === "received") {
    return (
      <Container>
        {renderMain()}
      </Container>
    ) 
  } else {
    return "error"
  }

}
//   const renderMain = () => {
//     const { operator, rig, well } = activeWell.response
//     return (
//       <React.Fragment>
//         <h3 className="my-4">{operator} - {rig} - {well}</h3>
//         <ReactDataSheet
//           data={surveys}
//           valueRenderer={cell => cell.value}
//           width
//         />
//       </React.Fragment>
//     )
//   }

//   if (getSurveysFromDynamoDbReducer.status === "received" && getSurveysFromDynamoDbReducer.response) {
//     return (
//       <Container>
//         {renderMain()}
//       </Container>
//     )
//   } else {
//     return (
//       "Data Loading"
//     )
//   }
// }

const mapStateToProps = ({activeWell, getSurveysFromDynamoDbReducer}) => {
  return {
    activeWell, 
    getSurveysFromDynamoDbReducer
  }
}

export default connect(mapStateToProps, {getSurveysFromDynamoDb})(ExistingSurveys)