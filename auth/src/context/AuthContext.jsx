import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase";
import { BASE_URL } from "../utils/base_url";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let localtoken = localStorage.getItem("jwttoken")
        if (localtoken) {
            setJwtToken(localtoken)
        }
    }, []);

    useEffect(() => {
        if (jwtToken) {
            localStorage.setItem("jwttoken", jwtToken);
            getUser(jwtToken);
        } else {
            localStorage.removeItem("jwttoken");
        }

    }, [jwtToken])

    const getUser = async (jwtToken) => {
        try {
            let res = await axios.get(`${BASE_URL}/get-user`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (res?.data?.user == "") {
                navigate("/user-info")
            } else {
                setUser(res?.data?.user)
                toast.success(`Welcome ${res?.data?.user?.name}!🎉`)
                navigate("/");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const addUser = async (user) => {
        try {

            let res = await axios.post(`${BASE_URL}/add-user-info`, user, {
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
            let res = await axios.post(`${BASE_URL}/login`, {}, {
                headers: {
                    "X-Firebase-AppCheck": `${token}`,
                },
            });
            await setJwtToken(res.data.token);
        } catch (error) {
            toast.error("Something went wrong!☹️", {
                position: "top-right",
            });
            console.log("Error: ", error)
        }
    }


    const register = async (token) => {
        try {
            let res = await axios.post(`${BASE_URL}/register`, {}, {
                headers: {
                    "X-Firebase-AppCheck": `${token}`,
                },
            });
            setJwtToken(res.data.token);
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
            setUser(null);
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