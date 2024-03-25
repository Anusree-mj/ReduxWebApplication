import { Spinner } from 'react-bootstrap';
// add skeleton
const Loader = () => {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block',
            }}
        ></Spinner>
    );
};

export default Loader;