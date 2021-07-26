import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  handleSignInFb,
  handleSignOut,
  initializeFirebaseLogin,
  signInWithEmailAndPassword,
} from "./firebaseManager";

initializeFirebaseLogin();
function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });
  const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setUserLoggedIn(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const GoogleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const signInFb = () => {
    handleSignInFb().then((res) => {
      handleResponse(res, true);
    });
  };
  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };
  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && isPasswordHasNumber;
    }
    if (isFormValid) {
      const userInfoForm = { ...user };
      userInfoForm[e.target.name] = e.target.value;
      setUser(userInfoForm);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={GoogleSignIn}>Sign In</button>
      )}
      <br />
      <button onClick={signInFb}>Facebook login</button>
      {user.isSignedIn && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our own authentication</h1>
      <p>Name:{user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New user signUp</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Enter your name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter your email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="enter your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          {newUser ? "created account" : "login in"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
