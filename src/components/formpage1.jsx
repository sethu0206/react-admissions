import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

const FormPage = (props) => {
  let x;
  if(props.usertype==='staff')
  {
    x=(<div><MDBInput
      label="Type your email"
      icon="envelope"
      group
      type="email"
      validate
      error="wrong"
      success="right"
    />
    <MDBInput
      label="Type your password"
      icon="lock"
      group
      type="password"
      validate
    /></div>
      );
  }
  else if(props.usertype==='student')
  {
  x=(<div><MDBInput
      label="Refnumber"
      icon="envelope"
      group
      type="email"
      validate
      error="wrong"
      success="right"
    />
    <MDBInput
      label="Type your password"
      icon="lock"
      group
      type="password"
      validate
    /></div>);
  }
  else {
    x=(<p></p>);
  }
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Login:
                </h3>
              </MDBCardHeader>
              <form>
                <div className="grey-text">
                  {x}
                </div>

              <div className="text-center mt-4">
                <MDBBtn
                  color="light-blue"
                  className="mb-3"
                  type="submit"
                >
                  Login
                </MDBBtn>
              </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Not a member? Sign Up</p>
                  <p>Forgot Password?</p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;
