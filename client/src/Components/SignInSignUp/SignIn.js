import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import UserPool from "./UserPool"
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitCredentialsForSignIn = (event) => {
    event.preventDefault();
    const userCredentials = {
      Username: email,
      Password: password
    }
    const userData = {
      Username: email, 
      Pool: UserPool
    }
    const authDetails = new AuthenticationDetails(userCredentials);
    const user = new CognitoUser(userData)

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log("onSuccess", data)
      },

      onFailure: err => {
        console.log("error", err)
      }

    })
  }

  const renderSignIn = () => {
    return (
      <Col xs={5}>
        <Row className="justify-content-md-center">
          <h3>Sign In</h3>
        </Row>
        <Form.Group>
          <Form.Control /*className="mt-3"*/ placeholder="Enter Email" onChange={event => setEmail(event.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Control /*className="mt-3"*/ placeholder="Enter Password" onChange={event => setPassword(event.target.value)} />
        </Form.Group>
        <Button className="mt-4" variant="info" disabled={ email === "" && password === "" ? true : false } onClick={(e)=>submitCredentialsForSignIn(e)}>Submit</Button>
      </Col>
    )
  }



  return (
    <Container className="mt-4">
      <Col>
      {renderSignIn()}
      </Col>
    </Container>
  )

}

export default SignIn