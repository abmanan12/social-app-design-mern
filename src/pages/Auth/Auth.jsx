import React, { useState } from "react";

import "./Auth.css";
import Logo from "../../img/logo.png";

import { useDispatch, useSelector } from 'react-redux'
import { login, signUp } from "../../actions/AuthActions";

const initalState = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  confirmpass: ""
}

const Auth = () => {

  const dispatch = useDispatch()
  const loading = useSelector(state => state.authReducer.loading)

  const [data, setData] = useState(initalState)
  const [cpassword, setCPassword] = useState(true)
  const [isSignUp, setIsSignUp] = useState(false);

  const resetForm = () => {
    setData(initalState)
    setCPassword(true)
  }

  const handleChange = e => {
    setData(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {

    setCPassword(true)
    e.preventDefault()

    if (isSignUp) {
      data.password === data.confirmpass ? dispatch(signUp(data))
        : setCPassword(false)
    }
    else {
      dispatch(login(data))
    }

  }

  return (
    <div className="Auth">

      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>AM Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm" onSubmit={handleSubmit}>

          <h3>Sign up</h3>

          {isSignUp &&
            <div>
              <input
                required
                type="text"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                placeholder="First Name"
                onChange={handleChange}
              />

              <input
                required
                type="text"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>}

          <div>
            <input
              required
              type="text"
              className="infoInput"
              name="username"
              value={data.username}
              placeholder="Username"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              required
              type="password"
              className="infoInput"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={handleChange}
            />

            {isSignUp &&
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                value={data.confirmpass}
                placeholder="Confirm Password"
                onChange={handleChange}
              />}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: cpassword ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>

          <div>
            <span style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => { setIsSignUp(prev => !prev); resetForm() }}>
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </span>
          </div>

          <button className="button infoButton" type="submit" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? "SignUp" : "Login"}
          </button>

        </form>
      </div>

    </div>
  );
};


export default Auth;
