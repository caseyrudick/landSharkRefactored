import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css'
import ReactDataSheet from "react-datasheet"
import getSurveysFromJSONDb from "../ActionCreators/getWellPlansFromJSONDb"


const ExistingSurveys = ({activeWell, getSurveysFromJSONDbReducer, getSurveysFromJSONDb}) => {
  const [surveys, setSurveys] = useState([])
  const [grid, setGrid] = useState([])

  useEffect(() => {
    if (getSurveysFromJSONDbReducer.status === "received") {
      console.log(getSurveysFromJSONDbReducer.response)
      const plansFromReducerCopy = [...getSurveysFromJSONDbReducer.response]
      setSurveys(plansFromReducerCopy)
    }
  },[getSurveysFromJSONDbReducer.status])

  let gridFromSurveys = [[{value: '', readOnly: true, width: '3rem'}, {value: 'Measured Depth', readOnly: true, width: '10rem'}, {value: 'Inclination', readOnly: true, width: '7rem'}, {value: 'Azimuth', readOnly: true, width: '7rem'}, {value: 'TVD', readOnly: true, width: '7rem'}, {value: 'NS', readOnly: true, width: '7rem'}, {value: 'EW', readOnly: true, width: '7rem'}, {value: 'SECT', readOnly: true, width: '7rem'}, {value: 'DLS', readOnly: true, width: '7rem'}]]


  const renderMain = () => {
    const { operator, rig, well } = activeWell.response
    return (
      <React.Fragment>
        <h3 className="my-4">{operator} - {rig} - {well}</h3>
        <ReactDataSheet
          data={surveys}
          valueRenderer={cell => cell.value}
          width
        />
      </React.Fragment>
    )
  }

  if (getSurveysFromJSONDbReducer.status === "received" && getSurveysFromJSONDbReducer.response) {
    return (
      <Container>
        {renderMain()}
      </Container>
    )
  } else {
    return (
      "Data Loading"
    )
  }
}

const mapStateToProps = ({activeWell, getSurveysFromJSONDbReducer}) => {
  return {
    activeWell, 
    getSurveysFromJSONDbReducer
  }
}

export default connect(mapStateToProps, {getSurveysFromJSONDb})(ExistingSurveys)