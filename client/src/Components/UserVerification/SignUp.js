import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
// AWS Cognito
import UserPool from "./UserPool"
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
//redux & router
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userSubmittedCredentials, setSubmittedCreds] = useState(false)
  const [verificationCode, setVerificationCode] = useState(null)
  const [verficationSuccess, setVerificationSucess] = useState(false)
  
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
        <Col>
          <Row className="justify-content-md-center">
            <h3>Sign Up</h3>
          </Row>
          <Form.Group>
            <Form.Control placeholder="Enter Email" onChange={event => setEmail(event.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder="Create Password" onChange={event => setPassword(event.target.value)} />
          </Form.Group>
            <Button variant="info" disabled={ email === "" && password === "" && userSubmittedCredentials === false ? true : false } onClick={(e)=>submitNewUser(e)}>Submit</Button>
          <Link to="/signin" className="item">
            Already have an account?
          </Link>
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
        setVerificationSucess(true)
      }
    })
  }

  const renderCodeResponse = () => {
    return (
      <div>
        Registration Sucessful
      </div>
    )
  }

  const renderConfirmationCodeForm = () => {
     return (
        <Form.Group>
          <Row className="justify-content-md-center">
            <h3 className="mt-4">Confirmation Code</h3>
          </Row>
          <Form.Control className="mt-3" placeholder="Enter Verification Code" onChange={event => setVerificationCode(event.target.value)} />
          <Button className="mt-4" variant="primary" disabled={ verificationCode === "" ? true : false } onClick={(event) => verifyConfirmationCode(event)}>Submit</Button>
        </Form.Group>
     )
  }

  return (
    <React.Fragment>
      <Jumbotron fluid className="bg-dark text-white">
        <Container>
          <h1>LandShark App (Employee Portal)</h1>
        </Container>
      </Jumbotron>
      <Form>
        <Row className="justify-content-center align-self-center">
            <Col md="auto"/>
            <Col md={3}>
              {renderSignUp()}
              {userSubmittedCredentials ? renderConfirmationCodeForm() : null }
              {verficationSuccess ? "Registration Successful" : ""}
            </Col>
            <Col md="auto"></Col>
          </Row>
      </Form>
    </React.Fragment>
  )
}

export default SignUp