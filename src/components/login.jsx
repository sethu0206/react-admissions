//import React from "react";

import LoginForm from "./LoginForm";

export default function Login(props) {
  if(props.type===0)
  {
    return(<div></div>);
  }
  return (
    <div className="container" style={{backgroundColor:'#2299ff2e',width:'800px',marginTop:'100px'}}>
      <h1 className="text-center">Login Form</h1>
      <LoginForm type={props.type} history={props.history}/>
    </div>
  );
}
