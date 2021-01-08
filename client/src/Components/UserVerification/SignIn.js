import React, { useState } from 'react';
//boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav"
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
// AWS Cognito
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from "./UserPool"
//redux & router
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import History from "../History"
// action Creator
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
        console.log(data);
        History.push("/dashboard")
        console.log(History)
        
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
                      <Link to="/signup" className="item">
                        Create an account
                      </Link>
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