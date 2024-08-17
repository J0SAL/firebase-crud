import React, { useState } from "react";
import { auth, provider } from "../../utils/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUnlockAlt,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

var default_user = {
  email: "",
  password: "",
};
function Register() {
  const [user, setUser] = useState(default_user);
  const [loading, setLoading] = useState(false);

  const canSubmit =
    user.email.length > 0 &&
    user.password.length > 0 &&
    !loading;


  const { register, logout } = useAuth();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    setUser(default_user);
    try {
      let result = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const email = result.user.email;
      const firebaseIdToken = await result.user.getIdToken();
      register(firebaseIdToken);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log();
        toast.warn('Opps, Email already in use.. Maybe try login? 🤔')
      } else {
        console.log('An error occurred:', error.message);
      }
    }
  };

  const signInGoogle = async () => {
    try {
      let result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const firebaseIdToken = await result.user.getIdToken();
      register(firebaseIdToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form className="mt-4" onSubmit={signIn}>
        <Form.Group id="email" className="mb-4">
          <Form.Label>Your Email</Form.Label>
          <InputGroup>
            <InputGroup.Text className="px-2">
              <FontAwesomeIcon icon={faEnvelope} style={{ width: "15px" }} />
            </InputGroup.Text>
            <Form.Control
              autoFocus
              required
              name="email"
              type="email"
              placeholder="example@company.com"
              onChange={handleChange}
              value={user.email}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group id="password" className="mb-4">
          <Form.Label>Password</Form.Label>

          <InputGroup>
            <InputGroup.Text className="px-2">
              <FontAwesomeIcon icon={faUnlockAlt} style={{ width: "15px" }} />
            </InputGroup.Text>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
            />
          </InputGroup>
        </Form.Group>
        <Row>
          <Col xs={12}>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!canSubmit}
            >
              {!loading ? "Register" : <FontAwesomeIcon icon={faSpinner} className="fa-spin" />}
            </Button>
          </Col>
          <Col xs={12} className="mt-2">
            <button disabled={loading} className="login-with-google-btn w-100" onClick={signInGoogle}>
              Continue With Google
            </button>
          </Col>


        </Row>
      </Form>
    </div>
  );
}

export default Register;
