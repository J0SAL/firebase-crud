import { Container, Row, Col } from 'react-bootstrap';
import 'react-loading-skeleton/dist/skeleton.css';
import MovieCard from './MovieCard';
import { useMovie } from '../../context/MovieContext';

function AllMovies() {
    // Dummy movie data array
    const { movies } = useMovie();

    return (
        <Container className="py-5">
            <Row>
                {movies?.map((movie, key) => (
                    <Col xs={12} md={3} className="mb-4" key={key}>
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default AllMovies;
