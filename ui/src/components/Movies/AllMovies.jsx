import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MovieCard from './MovieCard';

function AllMovies() {
    // Dummy movie data array
    const movies = [
        {
            id: 1,
            name: "The Shawshank Redemption",
            image: "https://via.placeholder.com/150",
            link: "https://www.imdb.com/title/tt0111161/"
        },
        {
            id: 2,
            name: "The Godfather",
            image: "https://via.placeholder.com/150",
            link: "https://www.imdb.com/title/tt0068646/"
        },
        {
            id: 3,
            name: "The Dark Knight",
            image: "https://via.placeholder.com/150",
            link: "https://www.imdb.com/title/tt0468569/"
        },
        {
            id: 4,
            name: "Forrest Gump",
            image: "https://via.placeholder.com/150",
            link: "https://www.imdb.com/title/tt0109830/"
        }
    ];

    return (
        <Container className="py-5">
            <Row>
                <Col xs={12} className="text-center mb-4">
                    <h2>All Movies</h2>
                </Col>
            </Row>
            <Row>
                {movies.map((movie, key) => (
                    <Col xs={12} md={3} className="mb-4" key={key}>
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default AllMovies;
