import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import AdminHeader from '../../components/adminHeader';
import { getAdminLoginAction, adminStateType } from '../../store/admin/adminReducer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AdminLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state: { admin: adminStateType }) => state.admin.isLoading);
    const error = useSelector((state: { admin: adminStateType }) => state.admin.error);

    const handleAdminLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!email && !password) {
            toast.error('Please provide valid email and password');
            return;
        } else if (!email) {
            toast.error('Please provide valid email');
        } else if (!password) {
            toast.error('Please provide valid password');
        }
        try {
            await dispatch(getAdminLoginAction({ email, password, handleAdminLoginSuccess }));
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    const handleAdminLoginSuccess = async (adminData: any) => {
        localStorage.setItem("adminData", JSON.stringify(adminData));
        toast.success('Successfully logged in');
       navigate('/admin')
    }

    useEffect(() => {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
            navigate('/admin');
        }
    }, [navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error]);

    return (
        <>
            <AdminHeader />
            <Container>
                <Row className='justify-content-md-center mt-5'>
                    <Col xs={12} md={6} className='card p-5'>
                        <h1>Admin Sign In</h1>
                        <Form onSubmit={handleAdminLogin}>
                            <Form.Group className='my-2' controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button
                                type='submit'
                                variant='primary'
                                className='mt-3'
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Loading...</span>
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                        </Form>
                        <Row className='py-3'>
                            <Col>
                                New Customer? <Link to='/register'>Register</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default AdminLoginScreen;