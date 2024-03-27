import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import AdminHeader from "../../components/adminHeader"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduserAction, adminStateType } from '../../store/admin/adminReducer';
import { toast } from 'react-toastify';
import axios from 'axios'

const AddUserScreen = () => {
    const [name, setName] = useState('');
    const [nameSpan, setNameSpan] = useState('');
    const [email, setEmail] = useState('');
    const [emailSpan, setEmailSpan] = useState('');
    const [password, setPassword] = useState('')
    const [passwordSpan, setPasswordSpan] = useState('')
    const [confirmPassword, setConfrmPassword] = useState('')
    const [confirmPasswordSpan, setConfrmPasswordSpan] = useState('')
    const [file, setFile] = useState<File | undefined>();
    const [image, setImage] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state: { admin: adminStateType }) => state.admin.isLoading);
    const error = useSelector((state: { admin: adminStateType }) => state.admin.error);

    const handleAddUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const isValid = validation();
        if (isValid) {
            try {
                await dispatch(adduserAction({ name, email, password, image,handleAddUserSuccess }));
            } catch (error) {
                console.error('Login error:', error);
            }
        }
    }
    const handleAddUserSuccess = (status: '') => {
        if (status) {
            navigate('/admin')
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error]);

    const validation = () => {
        let isValid = true;
        if (!name) {
            setNameSpan('*This field is required');
            isValid = false;
        }
        if (!email) {
            setEmailSpan('*This field is required');
            isValid = false;
        }
        if (!password) {
            setPasswordSpan('*This field is required');
            isValid = false;
        }
        if (!confirmPassword) {
            setConfrmPasswordSpan('*This field is required');
            isValid = false;
        }
        if (password !== confirmPassword) {
            toast.error('*Passwords do not match');
            isValid = false;
        }
        return isValid;
    };

    const uploadImage = async () => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/uploadImage`, formData);
                setImage(response.data.imageUrl)
                toast.success('Image Successfully Uploaded')
            } else {
                toast.error('No file selected');
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <AdminHeader />
            <Container>
                <Row className='justify-content-md-center mt-3 mb-2'>
                    <Col xs={12} md={6} className='card p-5'>
                        <h1>Add User</h1>
                        <Form onSubmit={handleAddUser}>
                            <Form.Group className='my-2' controlId='name' onClick={(e) => { setNameSpan('') }}>
                                <Form.Label>Name </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                ></Form.Control>
                                <span className="text-danger">{nameSpan}</span>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='email' onClick={(e) => { setEmailSpan('') }}>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                ></Form.Control>
                                <span className="text-danger">{emailSpan}</span>

                            </Form.Group>

                            <Form.Group className='my-2' controlId='image'>
                                <Form.Label>Image </Form.Label>
                                <div className="d-flex align-items-center">
                                    <Form.Control
                                        type='file'
                                        onChange={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            if (target.files && target.files.length > 0) {
                                                setFile(target.files[0]);
                                            }
                                        }}
                                    ></Form.Control>
                                    <Button onClick={uploadImage}><img src="/upload.png" alt="" /></Button>
                                </div>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='password' onClick={(e) => { setPasswordSpan('') }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                ></Form.Control>
                                <span className="text-danger">{passwordSpan}</span>

                            </Form.Group>

                            <Form.Group className='my-2' controlId='confirmPassword' onClick={(e) => { setConfrmPasswordSpan('') }}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => { setConfrmPassword(e.target.value) }}
                                ></Form.Control>
                                <span className="text-danger">{confirmPasswordSpan}</span>

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
                                    'Add User'
                                )}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default AddUserScreen;