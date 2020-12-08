// import React, { useState } from "react"
// import { connect } from "react-redux"

// import Container from "react-bootstrap/esm/Container"
// import Form from "react-bootstrap/Form"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
// import Button from "react-bootstrap/Button"

// import 'react-datasheet/lib/react-datasheet.css'
// import ReactDataSheet from "react-datasheet"
// import saveNewPlanToReduxStore from "../ActionCreators/saveNewPlanToReduxStore"
// import postPlanstoJSONdb from "../ActionCreators/saveWellPlansToJSON"
// import wellsReducer from "../Reducers/wellsReducer"


// // iterate through existing grid to get a copy and not mutate current as we iterate over
//     // iterate through the changes.  Each change is a cell, each cell is an object
//     // with cell (previousVal), row, col, currentVal
//     // mutate the value of the newGrid[row#][col#] to the new value 
// const ExistingWellPlans = (selectedWell) => {
//   const [grid, setGrid] = useState([/*insert connection to plans prop*/])
//   const initialGrid = selectedWell
//   // const initialGrid = 
//   const onCellsChanged = (changes) => {
//     const newGrid = grid.map(row => [...row])
//     // newGrid is now a copy of old grid
//     changes.forEach(({cell, row, col, value}) => {
//       // each cell of newGrid is a copy of the old grid, plus changed value
//       newGrid[row][col] = {...grid[row][col], value}
//     })
//     // set this grid as the local state's grid
//     setGrid(newGrid)
//   }
//   return (
//     <Container>
//       <Col>Insert Name of well</Col>

//       <ReactDataSheet
//         data={grid}
//         valueRenderer={(cell)=> cell.value}
//         onCellsChanged={onCellsChanged}
//       ></ReactDataSheet>
//     </Container>
//   )
// }

// const mapStateToProps = ({selectedWell}) => {
//   return {selectedWell}
// }

// export default connect(mapStateToProps)(ExistingWellPlans)