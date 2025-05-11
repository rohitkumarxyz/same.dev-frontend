import {  useGoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('Login successful:', tokenResponse);
            if (!tokenResponse) {
                console.error('No tokenResponse received');
            }
        },
        onError: (error) => {
            console.error('Login Failed:', error);
        },
    });

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <motion.div
                className="w-full md:w-1/2 flex flex-col justify-center items-center p-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Link
                    to="/"
                    className="absolute top-4 left-4 text-pink-500 text-lg font-semibold"
                    style={{ marginBottom: '2rem' }}
                >
                    Same.dev
                </Link>
                <h1 className="text-4xl font-bold mb-4 lg:mt-0 md:mt-0 mt-32 text-center">Welcome Back!</h1>
                <p className="text-gray-400 mb-8 text-center">
                    Sign in to access your account and explore amazing features.
                </p>
                <div className="w-full max-w-xs">
                    <button
                        onClick={() => login()}
                        className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-200"
                    >
                        <div className="flex items-center justify-center">
                            Sign in with Google
                        </div>
                    </button>
                </div>
            </motion.div>

            <motion.div
                className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-800 p-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold mb-4 text-center">Discover Same.dev</h2>
                <p className="text-gray-400 mb-6 text-center">
                    Enter your thoughts below and see the magic happen!
                </p>
                <input
                    type="text"
                    placeholder="Create a Todo Website..."
                    value={""}
                    disabled={true}
                    className="w-full max-w-md bg-gray-700 text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <p className="text-gray-500 text-sm text-center">
                    Your input will be processed automatically.
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
