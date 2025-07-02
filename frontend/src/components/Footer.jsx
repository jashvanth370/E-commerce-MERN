import React from 'react';

const Footer = () => (
    <footer className="bg-white border-t py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</div>
            <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
            </div>
        </div>
    </footer>
);

export default Footer; 