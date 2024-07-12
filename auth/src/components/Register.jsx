import React, { useState } from "react";
import { auth, provider } from "../utils/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

var template = {
  name: "",
  email: "",
  password: "",
};
function Register() {
  const [user, setUser] = useState(template);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user: ", user);
    } else {
      console.log("logged out");
    }
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    setUser(template);
    try {
      let result = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      await updateProfile(result.user, {
        displayName: user.name,
      });
      result.user.displayName = user.name;

      console.log(result.user.displayName);
      console.log(result.user.email);
      console.log(result.user.uid);
    } catch (error) {
      console.log(error);
    }
  };

  const signInGoogle = async () => {
    try {
      let result = await signInWithPopup(auth, provider);
      console.log(result.user.displayName);
      console.log(result.user.email);
      console.log(result.user.uid);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
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
          Name{" "}
          <input
            type="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
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
