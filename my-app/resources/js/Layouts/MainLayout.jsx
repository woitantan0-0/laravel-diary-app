import React, { useEffect } from "react";
import MenuHeader from "@/Layouts/MenuHeader";
import MenuFooter from "@/Layouts/MenuFooter";

const MainLayout = ({ children, title, imagePass }) => {
    return (
        <>
            <MenuHeader title={title} imagePass={imagePass} />
            <main className="pb-10">{children}</main>
            <MenuFooter />
        </>
    );
};

export default MainLayout;
