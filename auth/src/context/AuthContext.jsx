import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [jwtToken, setJwtToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log("siggned in")
        } else {
            console.log("signed out")
        }
    }, [user]);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("firebase loggin in");
        } else {
            console.log("firebase logged out");
        }
    });

    useEffect(() => {
        if (jwtToken)
            getUser();
    }, [jwtToken])

    const getUser = async () => {
        console.log("get user jwt token: ", jwtToken)
        let res = await axios.get("http://127.0.0.1:5000/get-user", {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        setUser(res?.data?.user)
        toast.success(`Welcome!🎉`)
    }

    const addUser = async (user) => {
        try {

            let res = await axios.post("http://127.0.0.1:5000/add-user-info", { "user": user }, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setUser(res?.data?.user)
            toast.success(`User Added!🎉`)
        } catch (error) {
            toast.error(`Something went wrong ☹️`)
            console.log(error)
        }
    }

    const login = async (token) => {
        try {
            let res = await axios.post("http://127.0.0.1:5000/login", {}, {
                headers: {
                    "X-Firebase-AppCheck": `${token}`,
                },
            });
            setJwtToken(res.data.token)
        } catch (error) {
            toast.error("Something went wrong!☹️", {
                position: "top-right",
            });
            console.log("Error: ", error)
        }
    }


    const register = async (token) => {
        try {
            let res = await axios.post("http://127.0.0.1:5000/register", {}, {
                headers: {
                    "X-Firebase-AppCheck": `${token}`,
                },
            });
            setJwtToken(res.data.token);
            navigate('/user-info')
        } catch (error) {
            toast.error("Something went wrong!☹️", {
                position: "top-right",
            });
            console.log("Error: ", error)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setJwtToken(null);
            toast.success('Come back soon!😀 ', {
                position: "top-right",
            })
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, addUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);