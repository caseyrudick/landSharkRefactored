import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import 'react-datasheet/lib/react-datasheet.css'
import ReactDataSheet from "react-datasheet"
import ExistingLeaseLines from "./ExistingLeaseLines"
import ExistingHardLines from "./ExistingHardLines"
import LeaseLines from "./LeaseLines"
import HardLines from "./HardLines"


const PolyLines = ({saveWellInfoToReduxStoreReducer, getLeaseLinesFromDynamoDbReducer, getHardLinesFromDynamoDbReducer, activeWell}) => {
  
  const renderWellData = () => {
    if (saveWellInfoToReduxStoreReducer.status === "received") {
      const { well, rig, operator} = saveWellInfoToReduxStoreReducer.response
      return <h3 className="hy-4"> {operator} - {rig} - {well}</h3>
    }
    else if (activeWell.status === "received") {
      const { Well_Name, Rig, Operator} = activeWell.response
      return <h3 className="hy-4"> {Operator.S} - {Rig.S} - {Well_Name.S}</h3>
    } else {
      return "No well data"
    }
  }
  

  const renderLeaseLineGrid = () => {
    const existingLeaseLines = getLeaseLinesFromDynamoDbReducer.response.Count > 0;
    if (existingLeaseLines) {
      return <ExistingLeaseLines/>
    } else {
      return <LeaseLines/>
      }
  }

  const renderHardLineGrid = () => {
    const existingHardLines = getHardLinesFromDynamoDbReducer.response.Count > 0;
    if (existingHardLines) {
      return <ExistingHardLines/>
    } else {
      return <HardLines/>
      }
  }

  return (
    <Container>
      {renderWellData()}
      <Row className="mt-4">
        <Col>
          <h4>Lease Lines</h4>
          {renderLeaseLineGrid()}
        </Col>
        <Col>
        <h4>Hard Lines</h4>
          {renderHardLineGrid()}
        </Col>
      </Row>
    </Container>
  )
}

  // if (getLeaseLinesFromDynamoDbReducer.status === "received" && getHardLinesFromDynamoDbReducer.status === "received") {
  //   console.log("existing lease and existing hard")
  //   return (
  //     <Container>
  //       {renderWellData()}
  //       <Row className="mt-4">
  //         <Col>
  //           <h4>Lease Lines</h4>
  //           <ExistingLeaseLines/>
  //         </Col>
  //         <Col>
  //         <h4>Hard Lines</h4>
  //           <ExistingHardLines/>
  //         </Col>
  //       </Row>
  //     </Container>
  //   )
  // } else if (getLeaseLinesFromDynamoDbReducer.status === "received" && getHardLinesFromDynamoDbReducer.status === "") {
  //   console.log("existing lease and new hard")
  //   return (
  //     <Container>
  //       {renderWellData()}
  //       <Row className="mt-4">
  //         <Col>
  //           <h4>Lease Lines</h4>
  //           <ExistingLeaseLines/>
  //         </Col>
  //         <Col>
  //         <h4>Hard Lines</h4>
  //           <HardLines/>
  //         </Col>
  //       </Row>
  //     </Container>
  //   )
  // } else if (getHardLinesFromDynamoDbReducer.status === "received" && getLeaseLinesFromDynamoDbReducer.status === "") {
  //   console.log("existing hard and new lease")
  //   return (
  //     <Container>
  //     {renderWellData()}
  //     <Row className="mt-4">
  //       <Col>
  //         <h4>Lease Lines</h4>
  //         <LeaseLines/>
  //       </Col>
  //       <Col>
  //         <h4>Hard Lines</h4>
  //         <ExistingHardLines/>
  //       </Col>
  //     </Row>
  //   </Container>
  //   )
  // } else {
  //   console.log("both new lease and hard")
  //   return (
  //     <Container>
  //       {renderWellData()}
  //       <Row className="mt-4">
  //         <Col>
  //           <h4>Lease Lines</h4>
  //           <LeaseLines/>
  //         </Col>
  //         <Col>
  //         <h4>Hard Lines</h4>
  //           <HardLines/>
  //         </Col>
  //       </Row>
  //     </Container>
  //   )
  // }




const mapStateToProps = ({saveWellInfoToReduxStoreReducer, activeWell, getHardLinesFromDynamoDbReducer, getLeaseLinesFromDynamoDbReducer}) => {
 return {
  activeWell, 
  getLeaseLinesFromDynamoDbReducer,
  getHardLinesFromDynamoDbReducer,
  saveWellInfoToReduxStoreReducer
 }
}

export default connect(mapStateToProps)(PolyLines)

// import React, { useEffect, useState } from "react"
// import { connect } from "react-redux"

// import Container from "react-bootstrap/esm/Container"
// import Form from "react-bootstrap/Form"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
// import Button from "react-bootstrap/Button"

// import 'react-datasheet/lib/react-datasheet.css'
// import ReactDataSheet from "react-datasheet"
// import ExistingLeaseLines from "./ExistingLeaseLines"
// import ExistingHardLines from "./ExistingHardLines"
// import LeaseLines from "./LeaseLines"
// import HardLines from "./HardLines"

// const PolyLines = ({saveWellInfoToReduxStoreReducer, activeWell, getLeaseLinesFromJSONDbReducer, getHardLinesFromJSONDbReducer,}) => {
//   const renderWellData = () => {
//     if (saveWellInfoToReduxStoreReducer.status === "received") {
//       const { well, rig, operator} = saveWellInfoToReduxStoreReducer.response
//       return <h3 className="hy-4"> {operator} - {rig} - {well}</h3>
//     }
//     else if (activeWell.status === "received") {
//       const { Well_Name, Rig, Operator} = activeWell.response
//       return <h3 className="hy-4"> {Operator.S} - {Rig.S} - {Well_Name.S}</h3>
//     } else {
//       return "No well data"
//     }
//   }
  
//   const renderLeaseLines = () => {
//     // if (getLeaseLinesFromJSONDbReducer.status === "received" && getLeaseLinesFromJSONDbReducer.response) {
//     //   return <ExistingLeaseLines/>
//     // } else {
//       return <LeaseLines/>
//     // }
//   }

//   const renderHardLines = () => {
//     // if (getHardLinesFromDynamoDbReducer.status === "received" && getHardLinesFromDynamoDbReducer.response) {
//     //   return <ExistingHardLines/>
//     // } else {
//       return <HardLines/>
//     // }
//   }

//   return (
//     <Container>
//       {renderWellData()}
//       <Row className="mt-4">
//         <Col>
//           <h4>Lease Lines</h4>
//           {renderLeaseLines()}
//         </Col>
//         <Col>
//         <h4>Hard Lines</h4>
//           {renderHardLines()}
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// const mapStateToProps = ({saveWellInfoToReduxStoreReducer, getHardLinesFromDynamoDbReducer, activeWell, getLeaseLinesFromJSONDbReducer, getHardLinesFromJSONDbReducer}) => {
//  return {
//   saveWellInfoToReduxStoreReducer,
//   getHardLinesFromDynamoDbReducer,
//   // getLeaseLinesFromJSONDbReducer,
//   // getHardLinesFromJSONDbReducer,
//   activeWell, 
//  }
// }

// export default connect(mapStateToProps)(PolyLines)




// // import React, { useState, useEffect } from "react"
// // //bootstrap
// // import Container from "react-bootstrap/esm/Container";
// // import Form from "react-bootstrap/Form"
// // import Row from "react-bootstrap/Row"
// // import Col from "react-bootstrap/Col"
// // import Button from "react-bootstrap/Button"

// // import 'react-datasheet/lib/react-datasheet.css';
// // import { connect } from "react-redux"
// // import ReactDataSheet from 'react-datasheet';

// // // actionCreators
// // import saveLeaseLinesToReduxStore from "../ActionCreators/saveLeaseLinesToReduxStore"
// // import postLeaseLinesToJSONDb from "../ActionCreators/postLeaseLinesToJSONDb"


// // const LeaseLines = ({activeWell, saveLeaseLinesToReduxStore, postLeaseLinesToJSONDb}) => {
// //   const {operator, rig, well, county, usState, northing, easting} = activeWell.response
// //   // set up initial grid
// //   // create local state to setGrid
// //   // renderWellHeader {if (either activeWell or saveWellInfoToRedux)} then destructure out the rig, wellname, operator
// //   // render out ReactData sheet data = {grid} valueRenderer={cell=> cell.value} onCellsChanged={onCellsChanged}
// //   // render submit button return row col xs={10} className = "my-4" button variant="info' onClick = handleSubmit
// //   // handlesubmit = postLeaseLinesToJSONDb saveHardLinesToRedux
// //   // addRows: newGrid =  [...grid, addedRow] setGrid(newGrid)

// //   const initialGrid = [
// //     [{value: "", readOnly: true, width: "7rem"}, {value: "Northing", readOnly: true, width: "7rem"}, {value:"Easting", readOnly: true, width: "7rem"}],
// //     [{value: 1, readOnly: true}, {value: 0}, {value: 0}],
// //     [{value: 2, readOnly: true}, {value: 0}, {value: 0}],
// //     [{value: 3, readOnly: true}, {value: 0}, {value: 0}],
// //     [{value: 4, readOnly: true}, {value: 0}, {value: 0}],
// //     [{value: 5, readOnly: true}, {value: 0}, {value: 0}],
// //     [{value: 6, readOnly: true}, {value: 0}, {value: 0}],
// //     [{value: 7, readOnly: true}, {value: 0}, {value: 0}],
// //     [{value: 8, readOnly: true}, {value: 0}, {value: 0}],
// //     [{value: 9, readOnly: true}, {value: 0}, {value: 0}],
// //   ]
// //   const [grid, setGrid] = useState(initialGrid)

// //   const renderWellHeader = () => {
// //     if (activeWell.status === "received") {
// //       // const {operator, rig, well} = activeWell.response
// //       return <h3 className="my-4">{operator} - {rig} - {well}</h3>
// //     } else {
// //       return "No Well Data"
// //     }
// //   }

// //   const onCellsChanged = changes => {
// //     const gridNew = grid.map(row => [...row])
// //     changes.forEach(({cell, row, col, value}) => {
// //       gridNew[row][col] = {...grid[row][col], value}
// //     });
// //     setGrid(gridNew);
    
// //   }

// //   const handleSubmit = () => {
// //     const wellInfoAndLeaseLines = {
// //       operator,
// //       rig, 
// //       well, 
// //       county,
// //       usState, 
// //       northing,
// //       easting,
// //       grid
// //     }
// //     // const activeWell
// //     // saveLeaseLinesToJSON 
// //     checkTest()
// //     postLeaseLinesToJSONDb(wellInfoAndLeaseLines)
// //     saveLeaseLinesToReduxStore(wellInfoAndLeaseLines)

    
// //   }

// //   const checkTest = () => {
// //     console.log("whyyy")
// //   }

// //   const renderRowsButtons = () => {
// //     return (
// //       <Row>
// //         <Col xs={10} className="my-4">
// //           <Button variant="success" className="my-4" onClick={handleSubmit}> 
// //             Submit
// //           </Button>
// //           <Button variant="primary" className="ml-4" onClick={addRow}>
// //             Add a Row
// //           </Button>
// //           <Button variant="primary" className="ml-4" onClick={removeRow}>
// //             Remove a Row
// //           </Button>

// //         </Col>
// //       </Row>
// //     )
// //   }

// //   const addRow = () => {
// //     const gridLength = grid.length
// //     const newRow = [{value: gridLength, readOnly: true}, {value: 0}, {value: 0}]
// //     const newGrid = [...grid, newRow]
// //     setGrid(newGrid)
// //   }

// //   const removeRow = () => {
// //     const newGrid = [...grid]
// //     newGrid.pop()
// //     setGrid(newGrid)
// //   }
  

// //   return (
// //     <Container>
// //       <Row>
// //         <Col xs={10}>
// //           {renderWellHeader()}
// //           <ReactDataSheet data={grid} valueRenderer={(cell)=> cell.value} onCellsChanged={onCellsChanged}/>
// //           {renderRowsButtons()}
// //         </Col>
// //       </Row>
// //     </Container>
// //   )
// // }

// // const mapStateToProps = ({activeWell, postLeaseLinesToJSONDbReducer}) => {
// //   return {
// //     activeWell,
// //     postLeaseLinesToJSONDbReducer,
// //   }
// // }

// // export default connect(mapStateToProps, {saveLeaseLinesToReduxStore, postLeaseLinesToJSONDb})(LeaseLines)