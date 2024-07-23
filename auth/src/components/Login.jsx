import React, { useState } from "react";
import { auth, provider } from "../utils/firebase";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";

var template = {
    email: "",
    password: "",
};
function Login() {
    const [user, setUser] = useState(template);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("loggin in");
        } else {
            console.log("logged out");
        }
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const login = async (token) => {
        let res = await axios.post("http://127.0.0.1:5000/register", {}, {
            headers: {
                "X-Firebase-AppCheck": `${token}`,
            },
        });
        const jwttoken = res.data.token;
        console.log(jwttoken);
    }


    const signIn = async (e) => {
        e.preventDefault();
        setUser(template);
        try {
            let result = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );
            const email = result.user.email;
            const idToken = await result.user.getIdToken();
            console.log(email);
            console.log(idToken);
            login(idToken);
        } catch (error) {
            console.log(error);
        }
    };

    const signInGoogle = async () => {
        try {
            let result = await signInWithPopup(auth, provider);
            const email = result.user.email;
            const idToken = await result.user.getIdToken();
            console.log(email);
            console.log(idToken);
            login(idToken);
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
