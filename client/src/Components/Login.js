import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import UserPool from "./UserPool"



const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState(null)

  const submitNewUser = event => {
    // event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) =>{
      if (err) console.log(err);
      console.log(data)
    })
  }

  const signUp = () => {
    return (
      <Col>
        <h3 className="my-4">Sign Up</h3>
        <Form.Control className="mt-3" placeholder="Enter Email" onChange={event => setEmail(event.target.value)} />
        <Form.Control className="mt-3" placeholder="Create Password" onChange={event => setPassword(event.target.value)} />
        <Button className="mt-4" variant="info" disabled={ email === "" || password === "" ? true : false } onClick={()=>submitNewUser()}>Submit</Button>
      </Col>
    )
  }

  const confirmationCode = () => {
     return (
      <Col>
      <h3 className="my-4">Sign Up</h3>
      <Form.Control className="mt-3" placeholder="Enter Verification Code" onChange={event => setPassword(event.target.value)} />
      <Button className="mt-4" variant="info" disabled={ email === "" || password === "" ? true : false } onClick={()=>submitNewUser()}>Submit</Button>
    </Col>
     )
  }

  return (
    <Container>
      <Row>
        {signUp()}
      </Row>
    </Container>
  )

}

export default SignUp