import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { HeaderSignContainer } from "../containers/headersign";
import { FooterContainer } from "../containers/footer";
import * as ROUTES from "../constants/routes";

export default function SignUp() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = firstName === "" || password === "" || emailAddress === "";

  const handleSignup = (event) => {
    event.preventDefault();


    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then((result) =>
      result.user
        .updateProfile(result.user, {
          displayName: firstName,
          photoURL: Math.floor(Math.random() * 5) + 1,
        })
          .then(() => {
            history.push(ROUTES.BROWSE);
          })
      ).catch((error) => {
        setFirstName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
  };
  return (
    <>
      <HeaderSignContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignup} method="POST">
            <Form.Input
              placeholder="First name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit
              disabled={isInvalid}
              type="submit"
              data-testid="sign-up"
            >
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderSignContainer>
      <FooterContainer />
    </>
  );
}
