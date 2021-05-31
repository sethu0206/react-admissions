import React, { Component } from "react";
//import RegistrationForm from '../components/register'
import FormInputs from "./FormInputs";
//import { useHistory } from "react-router-dom";
//import $ from 'jquery';

import Joi from "joi-browser";
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
      submitSuccessfully: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.validateOnChange = this.validateOnChange.bind(this);
  }

  schema = Joi.object().keys({
    username: Joi.string()
      .label("Username")
      .required(),
    password: Joi.string()
      .required()
      .label("Password")
  });

  validate() {
    const result = Joi.validate(
      { username: this.state.username, password: this.state.password },
      this.schema,
      { abortEarly: false }
    );

    if (result.error === null) return;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    console.log(errors);

    console.log("Form Submitted.");

    this.setState({ submitSuccessfully: true });
  }

  validateOnChange(currentTarget) {
    const obj = { [currentTarget.name]: currentTarget.value };

    const res = this.schema._inner.children.filter(
      item => item.key === currentTarget.name
    );

    console.log(this.schema[currentTarget.name]);

    const schema = { [currentTarget.name]: res[0].schema };

    const { error } = Joi.validate({ obj }, schema);

    return error ? error.details[0].message : null;
  }

  handleInputChange({ currentTarget }) {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateOnChange(currentTarget);

    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name];

    this.setState({ [currentTarget.name]: currentTarget.value, errors });
  }
  render() {
    let x;
    console.log("inside loginform"+this.props.type);
    if(this.props.type===1)
    {

      x=(
        <div>
          <FormInputs
          onChange={this.handleInputChange}
          errors={this.state.errors}
          value={this.state.username}
          htmlForId="username"
          type="text"
          label="Refnumber"
        />
        <button  className="btn btn-primary" onClick={()=>{console.log("clicked");this.props.history.push({pathname:"/register",data:this.state.username,history:this.props.history});}}>
          Login
        </button>
      </div>
      );
    }
    else if(this.props.type===2)
    {
      x=(
          <div><FormInputs
          onChange={this.handleInputChange}
          errors={this.state.errors}
          value={this.state.username}
          htmlForId="username"
          type="text"
          label="Username"
          />
        <FormInputs
          onChange={this.handleInputChange}
          errors={this.state.errors}
          value={this.state.password}
          htmlForId="password"
          type="password"
          label="Password"
        />
        <button  className="btn btn-primary" onClick={()=>{console.log("clicked");this.props.history.push("/staff");}}>
          Login
        </button>
      </div>

    );
    }
    console.log(x);
    return (
      <form onSubmit={this.handleSubmit} >
        {this.state.submitSuccessfully && (
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Form has been submitted!</h4>
            <p>
              You have successfully submitted the form. You will be redirected
              shortly.
            </p>
            <hr />
            <p class="mb-0">
              You will be loggedin as *username* and other users will see this
              name.
            </p>
          </div>
        )}
        {x}

      </form>
    );
  }
}

export default LoginForm;
