import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Col, Container, Row, Form, Button } from "react-bootstrap";

var default_user = {
    user_name: "",
    locality: "",
};

function UserInfo() {

    const [user, setUser] = useState(default_user);
    const { addUser } = useAuth();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(user);
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "92vh" }}>
            <Row className="w-100">
                <Col xs={12} className="text-center mb-4">
                    <h4>User Information</h4>
                </Col>
                <Col xs={12} md={4} className="mx-auto">
                    <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="user_name"
                                value={user.user_name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Locality</Form.Label>
                            <Form.Control
                                type="text"
                                name="locality"
                                value={user.locality}
                                onChange={handleChange}
                                placeholder="Enter your locality"
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
}

export default UserInfo