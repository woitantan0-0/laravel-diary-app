import React from "react";

const MenuFooter = () => {
    return (
        <footer className="bg-gray-100 py-4">
            <div className="container mx-auto text-center">
                <p className="text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} Your Company Name. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default MenuFooter;
