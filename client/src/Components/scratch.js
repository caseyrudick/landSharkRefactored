// DRAFTING ONLY - DO NOT USE
import React, { useState } from "react"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from "react-router-dom"
import axios from 'axios';



export default () => {
  const [operator, setOperator] = useState("")
  const [rig, setRig] = useState("")
  const [well, setWell] = useState("")
  
  const handleNewWellSubmit = async () => {
      const data = {
        operator, 
        rig,
        well
      }
      try {
        console.log(data)
        await axios.post("https://ybalhnj3qc.execute-api.us-east-2.amazonaws.com/dev/testing2", data)

      } catch (error){
        console.log(error)
      }
      
  }
  return (
    <Container>
      <Row>
        <Col>
        <h3 className="my-4">Add new well data</h3>
        <Form.Control className="mt-3" placeholder="Operator" onChange={event => setOperator(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Rig" onChange={event => setRig(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Well" onChange={event => setWell(event.target.value)} />
        
        <Button className="mt-4" variant="info" onClick={()=>handleNewWellSubmit()}>Submit and begin adding well data</Button>
        </Col>
      </Row>
    </Container>
  )
}