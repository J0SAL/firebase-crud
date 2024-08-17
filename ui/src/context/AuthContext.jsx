import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase";
import { BASE_URL } from "../utils/base_url";
import axiosClient from "../utils/axios-client";
import { getJwtToken, removeJwtToken, addJwtToken } from "../utils/tokenstorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [jwtToken, setJwtToken] = useState(getJwtToken());
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken) {
            getUser(jwtToken);
        }
    }, [jwtToken])
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

    const getUser = async (token) => {
        try {
            let res = await axios.get(`${BASE_URL}/get-user`, { headers: { "Authorization": `Bearer ${token}` } });
            if (res?.data?.user == "") {
                navigate("/user-info")
            } else {
                setUser(res?.data?.user)
                toast.success(`Welcome ${res?.data?.user?.name}!🎉`)
            }
        }
        catch (error) {
            if (error.response.data.status == 'jwt_expired') {
                toast.info("Session Expired, Please Log in again 😊")
                removeData()
                navigate('/signin')
            }
            toast.error("Something went wrong")
            console.log(error);
        }
    }

    const addUser = async (user) => {
        try {

            let res = await axiosClient.post("/add-user-info", user);
            setUser(res?.data?.user)
            toast.success(`User Added!🎉`)
        } catch (error) {
            toast.error(`Something went wrong ☹️`)
            console.log(error)
        }
    }

    const login = async (token) => {
        try {
            let res = await axiosClient.post(`${BASE_URL}/login`, {}, {
                headers: {
                    "X-Firebase-AppCheck": `${token}`,
                },
            });
            setJwtToken(res.data.token);
            addJwtToken(res.data.token)
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
            addJwtToken(res.data.token);
        } catch (error) {
            toast.error("Something went wrong!☹️", {
                position: "top-right",
            });
            console.log("Error: ", error)
        }
    }


    const removeData = async () => {
        await signOut(auth);
        setUser(null);
        removeJwtToken();
    }
    const logout = async () => {
        try {
            removeData();
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