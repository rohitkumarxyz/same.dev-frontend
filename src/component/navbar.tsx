import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center px-4 py-2">
            <Link to="/"> <div className="text-lg font-bold cusror-pointer">Same.dev</div>  </Link>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-600 cursor-pointer hover:bg-pink-500 text-white px-2 py-1 rounded-xl font-semibold transition shadow-lg"
            >
                <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-medium cursor-pointer rounded hover:bg-pink-500 bg-pink-600 text-white transition duration-200 ease-in-out outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                    Sign In
                </button>
            </motion.button>
        </nav>
    );
};

export default Navbar;