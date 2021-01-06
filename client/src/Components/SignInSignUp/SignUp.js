import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import UserPool from "./UserPool"
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userSubmittedCredentials, setSubmittedCreds] = useState(false)
  const [verificationCode, setVerificationCode] = useState(null)

  const submitNewUser = event => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
        setSubmittedCreds(true)
      }
    })
  }

  const renderSignUp = () => {
    return (
      <Col xs={5}>
        <Row className="justify-content-md-center">
          <h3>Sign Up</h3>
        </Row>
        <Form.Group>
          <Form.Control /*className="mt-3"*/ placeholder="Enter Email" onChange={event => setEmail(event.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Control /*className="mt-3"*/ placeholder="Create Password" onChange={event => setPassword(event.target.value)} />
        </Form.Group>
          <Button className="mt-4" variant="info" disabled={ email === "" && password === "" && userSubmittedCredentials === false ? true : false } onClick={(e)=>submitNewUser(e)}>Submit</Button>

      </Col>
    )
  }

  const verifyConfirmationCode = event => {
    event.preventDefault()
    const userData = {
      Username: email,
      Pool: UserPool
    }
    console.log(verificationCode)
    const congitoUser = new CognitoUser(userData);
    congitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })
  }


  const renderConfirmationCodeForm = () => {
     return (
      <Form.Group>
        <h3 className="my-4">Confirmation Code</h3>
        <Form.Control className="mt-3" placeholder="Enter Verification Code" onChange={event => setVerificationCode(event.target.value)} />
        <Button className="mt-4" variant="primary" disabled={ verificationCode === "" ? true : false } onClick={(event) => verifyConfirmationCode(event)}>Submit</Button>
      </Form.Group>
     )
  }

  return (
    <Container className="mt-4">
      <Col >
        {renderSignUp()}
        {userSubmittedCredentials ? renderConfirmationCodeForm() : null }
      </Col>
    </Container>
  )

}

export default SignUp