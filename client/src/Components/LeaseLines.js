// import React, { useState, useEffect } from "react"
// //bootstrap
// import Container from "react-bootstrap/esm/Container";
// import Form from "react-bootstrap/Form"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
// import Button from "react-bootstrap/Button"

// import 'react-datasheet/lib/react-datasheet.css';
// import { connect } from "react-redux"
// import ReactDataSheet from 'react-datasheet';

// // actionCreators
// import saveWellPlansToJSONDb from "../ActionCreators/saveWellPlansToJSONDb"

// const LeaseLines = ({/*currentWell, currentWellId, saveWellPlansToJSONDb*/}) => {
//   const [editGrid, setEditGrid] = useState(true)
//   const initialGrid = [
//     [{value: '', readOnly: true, width: '7rem'}, {value:"Measured Depth", readOnly: true, width: '7rem'}, {value:"Inclination", readOnly: true, width: '7rem'}, {value:"Azimuth", readOnly: true, width: '7rem'}, {value:"TVD", readOnly: true, width: '7rem'}, {value:"Northing", readOnly: true, width: '7rem'}, {value:"Easting", readOnly: true, width: '7rem'}],
//     [{value: 1, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}],
//     [{value: 2, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}],
//     [{value: 3, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}],
//     [{value: 4, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}],
//     [{value: 5, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}],
//     [{value: 6, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}, {value: 0, readOnly: true}],
//     ];

//   const [grid, setGrid] = useState(initialGrid);

//   const onCellsChanged = changes => {
//     // iterate through existing grid to get a copy and not mutate current as we iterate over
//     const gridNew = grid.map(row => [...row]);
//     // iterate through the changes.  Each change is a cell, each cell is an object
//     // with cell (previousVal), row, col, currentVal
//     // mutate the value of the newGrid[row#][col#] to the new value 
//     changes.forEach(({ cell, row, col, value }) => {
//       gridNew[row][col] = { ...grid[row][col], value };
//     });
//     setGrid(gridNew)
//   };

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

//   const createNewPlan = () => {
//       let wellPlans = currentWell.plans
//       let wellPlanCount = wellPlans.length;
//       let newWellPlanNumberAndPlan = {
//         "id": wellPlanCount += 1,
//         "planDetails": grid
//       };
//       const activeWellCopy = {...currentWell};
//       activeWellCopy.plans.push(newWellPlanNumberAndPlan);
//       console.log(activeWellCopy)
//       saveWellPlansToJSONDb(activeWellCopy, currentWellId)
//       // saveNewPlanToReduxStore(activeWellCopy);
//       // postPlansToJSONdb(activeWellCopy)
//   };



//   return (
//     <Container>
//       <Col xs={30}>{`${currentWell.operator} - ${currentWell.rig} - ${currentWell.well}`}</Col>
//       <Col xs={30}>
//     <ReactDataSheet
//         data={grid}
//         valueRenderer={(cell) => cell.value}
//         onCellsChanged={onCellsChanged}
       
//     />
//     </Col>
//     <Button variant="primary" className="mt-4 mb-4" onClick={()=>addNewRow()}>Add a Row</Button>
//     <Button variant="danger" className="my-4 ml-4" onClick={()=>removeRow()}>Remove a Row</Button>
//     <Button variant="info" className="my-4 ml-4" onClick={()=>editPlans()}>Edit Plans</Button>
//     <Button variant="info" className="my-4 ml-4" onClick={()=>createNewPlan()}>Create New Plan</Button>
    
//     </Container>
//   )
// }

// const mapStateToProps = ({postWellInfoToJSONDbReducer, getWellsFromJSONDbReducer}) => {
//   const currentWell = postWellInfoToJSONDbReducer.response
//   let currentWellId = ""
//   for (let well in getWellsFromJSONDbReducer.response) {
//     let wellInfo = getWellsFromJSONDbReducer.response[well]
//     if (wellInfo.operator === currentWell.operator && wellInfo.well === currentWell.well) {
//       currentWellId = wellInfo.id
//     }
//   }
  
//   return {
//     currentWellId,
//     currentWell
//   }
// }

// export default connect(mapStateToProps, {/*saveNewPlanToReduxStore,*/saveWellPlansToJSONDb})(LeaseLines)


// // const mapStateToProps = ({activeWell}) => {
// //   console.log(activeWell.payload)
// //   const currentlyActiveWell = Object.values(activeWell.payload[0])
// //   const wellInfo = `${activeWell.operator} - ${activeWell.rig} - ${activeWell.well}`;
// //   const wellPlans= activeWell.plans
// //   return {
// //     currentlyActiveWell,
// //     wellInfo,
// //     wellPlans
// //   }
// // }