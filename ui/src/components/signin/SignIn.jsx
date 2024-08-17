import { Col, Container, Row, Tabs, Tab } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import Login from './Login';
import Register from './Register';
import './signin.css';
import { PAGE_TITLE } from "../../utils/constants";

function SignIn() {
    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image">
                        <Col
                            xs={12}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <div
                                style={{ maxWidth: "512px" }}
                                className="bg-white shadow-soft border rounded p-4 p-lg-5 w-100"
                            >
                                <div className="d-flex align-items-center justify-content-center my-2">
                                    <img width={35} src="/logo192.png"
                                        className={`d-inline-block align-top infinite-rotate`} />
                                    <h4 className="mx-2">{PAGE_TITLE}</h4>
                                </div>
                                <Tabs
                                    defaultActiveKey="login"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                    fill
                                >
                                    <Tab eventKey="login" title="Login">
                                        <Login />
                                    </Tab>
                                    <Tab eventKey="register" title="Register">
                                        <Register />
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default SignIn