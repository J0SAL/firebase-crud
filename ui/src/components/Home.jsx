import React, { useEffect } from 'react'
import AllMovies from './Movies/AllMovies'
import { useMovie } from '../context/MovieContext'

function Home() {
    const { getAllMovies } = useMovie();
    useEffect(() => {
        getAllMovies()
    }, [])
    return (
        <AllMovies />
    )
}

export default Home