import React from 'react'
import { useAuth } from '../context/AuthContext'
import AllMovies from './Movies/AllMovies'

function Home() {
    return (
        <AllMovies />
    )
}

export default Home