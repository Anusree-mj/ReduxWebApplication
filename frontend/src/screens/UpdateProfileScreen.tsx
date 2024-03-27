import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import Header from '../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateProfileAction, userStateType } from '../store/user/userReducer';

const UpdateProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [file, setFile] = useState<File | undefined>();
    const [image, setImage] = useState('')
    const [showImageForm, setShowImageForm] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoading = useSelector((state: { user: userStateType }) => state.user.isLoading);
    const error = useSelector((state: { user: userStateType }) => state.user.error);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/login')
        }
        else {
            const userInfo = (JSON.parse(userData));
            setName(userInfo.name)
            setEmail(userInfo.email);
            setImage(userInfo.image);
        }
    }, [])

    const uploadImage = async () => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/uploadImage`, formData);
                setImage(response.data.imageUrl)
                toast.success('Image uplaoded successfully')
            } else {
                toast.error('No file selected');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateProfile = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await dispatch(updateProfileAction({ name, email, image, handleUpdateSuccess }));
        } catch (error) {
            console.error('Login error:', error);
        }

    }

    const handleUpdateSuccess = (userData: any) => {
        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success('Successfully logged in');
        navigate('/');
    }

    return (
        <>
            <Header />
            <Container>
                <Row className='justify-content-md-center mt-5'>
                    <Col xs={12} md={6} className='card p-5'>
                        <h1>Update Profile</h1>
                        <div className="text-center mb-3 d-flex flex-column align-items-center">
                            <img src={image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
                            <Button onClick={() => { setShowImageForm(prevState => !prevState) }} variant='primary' className='mt-3' >
                                Edit Image
                            </Button>
                        </div>

                        <Form onSubmit={handleUpdateProfile}>
                            {showImageForm && (
                                <Form.Group className='my-2' controlId='image' >
                                    <Form.Label>Image</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            type='file'
                                            onChange={(e) => {
                                                const target = e.target as HTMLInputElement;
                                                if (target.files && target.files.length > 0) {
                                                    setFile(target.files[0]);
                                                }
                                            }}
                                        />
                                        <Button onClick={uploadImage}><img src="/upload.png" alt="profileImage" /></Button>
                                    </div>
                                </Form.Group>
                            )}

                            <Form.Group className='my-2' controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary' className='mt-3'>
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>);
};

export default UpdateProfileScreen;