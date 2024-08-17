import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../utils/axios-client";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const addMovie = async (movie) => {
        try {
            let res = await axiosClient.post("/add-movie", movie);
            setMovies([...movies, res?.data?.movie])
            toast.success(`Movie Added!🎉`)
            navigate('/')
        } catch (error) {
            toast.error(`Something went wrong ☹️`)
            console.log(error)
        }
    }

    const getAllMovies = async () => {
        try {
            let res = await axiosClient.get("/get-all-movies");
            setMovies(res?.data?.movies)
            toast.success(`Here are all the awesome movies!🤫`)
        } catch (error) {
            toast.error(`Something went wrong ☹️`)
            console.log(error)
        }
    }

    return (
        <MovieContext.Provider value={{ movies, addMovie, getAllMovies }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovie = () => useContext(MovieContext);