import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Button } from "@chakra-ui/react";

const MenuHeader = (props) => {
    const userData = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <Head title={props.title} />

            <nav className="border-b border-gray-100 bg-white py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-25 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="px-3">
                                    <img
                                        src={
                                            props.imagePass
                                                ? props.imagePass +
                                                  "image/logoHp.jpeg"
                                                : "./image/logoHp.jpeg"
                                        }
                                        className="App-logo"
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <Button
                                px={3}
                                size="xs"
                                textStyle="xs"
                                className="text-cyan-500 border border-cyan-500 hover:bg-cyan-100"
                                onClick={() => {
                                    router.get(route("diary.create"));
                                }}
                            >
                                日記投稿
                            </Button>
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {userData.auth.user
                                                    ? userData.auth.user.name
                                                    : "ゲストさん"}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    {userData.auth.user ? (
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("dashboard")}
                                            >
                                                マイページ
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                プロフィール設定
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                ログアウト
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    ) : (
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("login")}
                                            >
                                                ログイン
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("register")}
                                            >
                                                新規会員登録
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    )}
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    {/* <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div> */}

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {userData.auth.user
                                    ? userData.auth.user.name
                                    : "ゲストさん"}
                            </div>
                            {userData.auth.user && (
                                <div className="text-sm font-medium text-gray-500">
                                    {userData.auth.user.email}
                                </div>
                            )}
                        </div>

                        {userData.auth.user ? (
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("diary.create")}>
                                    日記投稿
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("dashboard")}>
                                    マイページ
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    プロフィール設定
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    ログアウト
                                </ResponsiveNavLink>
                            </div>
                        ) : (
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("login")}>
                                    ログイン
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("register")}>
                                    新規会員登録
                                </ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};
export default MenuHeader;
