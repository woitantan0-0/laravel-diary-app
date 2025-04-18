import React, { useEffect } from "react";
import MenuHeader from "@/Layouts/MenuHeader";
import MenuFooter from "@/Layouts/MenuFooter";
import { usePage } from "@inertiajs/react";

const MainLayout = ({ children, title }) => {
    const { props } = usePage();

    return (
        <>
            <MenuHeader auth={props.auth} title={title} />
            <main className="pb-10">{children}</main>
            <MenuFooter />
        </>
    );
};

export default MainLayout;
