import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav"
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import UserPool from "./UserPool"
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux"
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

import userNeedsToCreateAccount from "../../ActionCreators/UserVerification/userNeedsToCreateAccount"


const SignIn = ({ userNeedsToCreateAccount }) => {
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

  //responsible for rendering SignUp page
  const createAccount = (event) => {
    event.preventDefault()

    userNeedsToCreateAccount(true)
  }

  const renderSignIn = () => {
    return (
      <React.Fragment>
      <Jumbotron fluid className="bg-dark text-white">
        <Container>
          <h1>LandShark App (Employee Portal)</h1>
        </Container>
      </Jumbotron>
      <Form>
        <Container fluid className="h-100">
          <Row> 
          </Row>
            <Row className="justify-content-center align-self-center">
              <Col md="auto"></Col>
                <Col md={3}>
                  <Row className="justify-content-md-center">
                    <h3>Sign In</h3>
                  </Row>
                  <Form.Group>
                    <Form.Control placeholder="Enter Email" onChange={event => setEmail(event.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control placeholder="Enter Password" onChange={event => setPassword(event.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Row> 
                      <Col>
                        <Button variant="info" disabled={ email === "" && password === "" ? true : false } onClick={(e)=>submitCredentialsForSignIn(e)}>Submit</Button>
                      </Col>
                      <Col>
                        <Button variant="info" onClick={(e) => createAccount(e)}>Create An Account</Button>
                      </Col>
                    </Row>
                  </Form.Group>       
                </Col>
              <Col md="auto"></Col>

            </Row>

        </Container>
        </Form> 
      </React.Fragment>
    )
  }

  return (
      renderSignIn()
  )
}


export default connect(null, {userNeedsToCreateAccount})(SignIn)