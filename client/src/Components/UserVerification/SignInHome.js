import React, {useState} from "react"
import Container from "react-bootstrap/esm/Container"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { connect } from "react-redux"
import userNeedsToCreateAccount from "../../ActionCreators/UserVerification/userNeedsToCreateAccount"

const SignInHome = ({userNeedsToCreateAccountReducer}) => {
  // const [existingUser, setExistingUser] = useState(true)
  const SignInOrSignUp = () => {
    if (userNeedsToCreateAccountReducer.response) {
      console.log("user needs an account -sent from Home")
      return (
        <Container>
          <SignUp/>
        </Container>
      )
    }
    return (
      <Container>
        <SignIn/>
      </Container>
    )
  }
  return (
    SignInOrSignUp()
  )
}

const mapStateToProps = ({ userNeedsToCreateAccountReducer }) => {
  return {
    userNeedsToCreateAccountReducer
  }
}

export default connect(mapStateToProps)(SignInHome);