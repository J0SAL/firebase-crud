import React, { useState } from "react";
import { auth, provider } from "../../utils/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

var default_user = {
  email: "",
  password: "",
};
function Register() {
  const [user, setUser] = useState(default_user);

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
        console.log('This email address is already in use. Please use a different email.');
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
      <h2>Register</h2>
      <form onSubmit={signIn}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "25vw",
            width: "25vw",
          }}
        >
          Email{" "}
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          Password{" "}
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={signInGoogle}>
            Google
          </button>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
