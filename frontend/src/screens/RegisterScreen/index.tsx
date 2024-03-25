import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Header from '../../components/header';
import { useState } from 'react';
const RegisterScreen = () => {
   
    return (
        <>
            <Header />
            <Container>
                <Row className='justify-content-md-center mt-3 mb-2'>
                    <Col xs={12} md={6} className='card p-5'>
                        <h1>Sign Up</h1>
                        <Form>
                            <Form.Group className='my-2' controlId='name'>
                                <Form.Label>Name </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Name'
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm Password'
                                ></Form.Control>
                            </Form.Group>

                            <Button
                                // disabled={isLoading}
                                type='submit'
                                variant='primary'
                                className='mt-3'
                            >
                                Sign Up
                            </Button>
                        </Form>
                        <Row className='py-3'>
                            <Col>
                                Already have an account? <Link to='/login'>Sign In</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default RegisterScreen;