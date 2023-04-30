import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <FaExclamationTriangle size="5em" className="text-danger" />
      <h1>404</h1>
      <p>Sorry, This page does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
