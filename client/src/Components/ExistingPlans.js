// import React, { useState } from "react"
// import { connect } from "react-redux"

// import Container from "react-bootstrap/esm/Container"
// import Form from "react-bootstrap/Form"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
// import Button from "react-bootstrap/Button"

// import 'react-datasheet/lib/react-datasheet.css'
// import ReactDataSheet from "react-datasheet"
// import saveWellPlansToJSONDb from "../ActionCreators/saveWellPlansToJSONDb"


// const ExistingWellPlans = ({saveWellPlansToJSONDb, saveActiveWellToReduxStoreReducer, getWellsFromJSONDbReducer}) => {
//   const [plans, setPlans] = useState([])
//   const [grid, setGrid] = useState([])


//   const [grid, setGrid] = useState(initialGrid);
//   const onCellsChanged = (changes) => {
//     const newGrid = grid.map(row => [...row])
//     changes.forEach(({cell, row, col, value}) => {
//       newGrid[row][col] = {...grid[row][col], value}
//     })
//     setGrid(newGrid)
//   }

//   const addNewRow = () => {
//     const localGrid = [{value: grid.length + 1, readOnly: true}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}]
//     setGrid([...grid, localGrid])
//   };

//   const editPlans = () => {
//     setEditGrid(!editGrid)
//     const gridNew = grid.map(row => [...row]);
//     for (let row = 1; row < gridNew.length; row ++) {
//       for (let col = 1; col < gridNew[row].length; col ++) {
//         gridNew[row][col].readOnly = editGrid;
//       }
//     }
//     setGrid(gridNew);
//   };

//   const removeRow = () => {
//     const newGrid = [...grid];
//     newGrid.pop();
//     setGrid(newGrid);
//   };

//   return (
//     <Container>
//       <Col>EXISTING PLANS</Col>

//       <ReactDataSheet
//         data={grid}
//         valueRenderer={(cell)=> cell.value}
//         onCellsChanged={onCellsChanged}
//       ></ReactDataSheet>
//       <Col>
//     <Button variant="primary" className="mt-4 mb-4" onClick={()=>addNewRow()}>Add a Row</Button>
//     <Button variant="danger" className="my-4 ml-4" onClick={()=>removeRow()}>Remove a Row</Button>
//     <Button variant="info" className="my-4 ml-4" onClick={()=>editPlans()}>Edit Plans</Button>
//     <Button variant="info" className="my-4 ml-4" onClick={()=>createNewPlan()}>Create New Plan</Button>
    
//       </Col>
//     </Container>
//   )
// }

// const mapStateToProps = ({saveActiveWellToReduxStoreReducer, getWellsFromJSONDbReducer}) => {
//   return {
//     saveActiveWellToReduxStoreReducer,
//     getWellsFromJSONDbReducer
//   }
// }

// export default connect(mapStateToProps)(ExistingWellPlans)