import React from "react";

const MenuFooter = () => {
    return (
        <footer className="bg-cyan-50 py-4">
            <div className="container mx-auto text-center">
                <p className="text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} Woi. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default MenuFooter;
