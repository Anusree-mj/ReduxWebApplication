import { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminItem } from "../store/admin/type";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const AdminHeader = () => {
    const [adminInfo, setAdminInfo] = useState<AdminItem | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const adminData = localStorage.getItem('adminData')
        if (adminData) {
            setAdminInfo(JSON.parse(adminData));
        }
    }, [])

    const logoutHandler = async () => {
        try {
            Cookies.remove('jwtAdmin');
            localStorage.removeItem('adminData');
            setAdminInfo(null);
            navigate('/admin/login');
        } catch (error) {
            toast.error('Logout Failed')
            console.log(error)
        }
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/admin'>
                        <Navbar.Brand>Redux WebApp</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {adminInfo ? (
                                <NavDropdown title={adminInfo.name} id='adminname'>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <FaSignInAlt /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>                                  
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default AdminHeader;
