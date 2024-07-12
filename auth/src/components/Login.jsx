import React, { useState } from "react";
import { auth, provider } from "../utils/firebase";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { setToken } from "../utils/common";

var template = {
    email: "",
    password: "",
};
function Login() {
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
            let result = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );

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
            setToken(await result.user.getIdToken());
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
            <h2>Login</h2>
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

export default Login;
