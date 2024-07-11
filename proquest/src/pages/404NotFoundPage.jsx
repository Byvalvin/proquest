import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <div className='flex justify-center mb-4'>
            <FaExclamationCircle className="text-red-500 text-9xl mb-4" />
        </div>
        <h1 className="text-3xl font-bold mb-2">OOPS! 404 Page Not Found</h1>
        <p className="text-gray-600 mb-4">The page you are looking for does not exist.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
