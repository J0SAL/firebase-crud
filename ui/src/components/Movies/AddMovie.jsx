import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function AddMovie() {
    const [movie, setMovie] = useState({
        name: '',
        image: '',
        link: ''
    });

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Movie Details:", movie);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col xs={12} className="text-center mb-4">
                    <h2 className="text-dark">Add Movie</h2>
                </Col>
                <Col xs={12} md={4} className="mx-auto">
                    <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={movie.name}
                                onChange={handleChange}
                                placeholder="Enter movie name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={movie.image}
                                onChange={handleChange}
                                placeholder="Enter movie image URL"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Link</Form.Label>
                            <Form.Control
                                type="text"
                                name="link"
                                value={movie.link}
                                onChange={handleChange}
                                placeholder="Enter movie link"
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">
                            Add Movie
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddMovie;
