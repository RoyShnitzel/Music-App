import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, auth } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="mt-8">
      <h1>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <label htmlFor="userEmail">Email:</label>
          <br />
          <br />
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="Enter Email..."
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <br />
          <label htmlFor="userPassword">Password:</label>
          <br />
          <br />
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <br />
          <button
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
          </button>
        </form>
        <p>or</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <p>
          Don't have an account? <Link to="signUp">Sign up here</Link> <br />{" "}
          <br />
          <Link to="resetpassword">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
