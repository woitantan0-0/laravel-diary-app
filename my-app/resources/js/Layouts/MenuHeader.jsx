import React, { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";

const MenuHeader = (props) => {
    return (
        <>
            <Head title={props.title} />

            <header className="grid grid-cols-2 items-center gap-2 py-10 px-4 lg:grid-cols-3 lg:ps-2 lg:pe-10">
                <div className="flex lg:col-start-2 lg:justify-center">
                    <Link href="/" className="px-3">
                        <img
                            src={
                                props.imagePass
                                    ? props.imagePass + "image/logoHp.jpeg"
                                    : "./image/logoHp.jpeg"
                            }
                            className="App-logo"
                            alt="logo"
                        />
                    </Link>
                </div>
                <nav className="-mx-3 flex flex-1 justify-end lg:col-start-3">
                    {props.auth.user ? (
                        <>
                            <Link
                                href={route("dashboard")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route("diary.create")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                日記投稿
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
        </>
    );
};
export default MenuHeader;
