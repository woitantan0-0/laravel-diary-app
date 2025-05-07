import React, { useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Tabs, Box } from "@chakra-ui/react";
import { Toaster, toaster } from "@/Components/ui/toaster";
import HomeContents from "@/Components/Home/HomeContents";
import ListContents from "@/Components/Home/ListContents";
import { router } from "@inertiajs/react";

const Home = (props) => {
    // タブの状態を管理するためのuseStateフックを使用
    const [tab, setTab] = useState(props.tab);
    // タブの状態を変更するための関数を定義
    const handleTabChange = (key, newTab) => {
        setTab(newTab);
        switch (key) {
            case "home":
                router.get(route("home.index"));
                break;
            case "list":
                router.get(route("home.list"));
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        if (props.message) {
            toaster.create({
                title: props.message,
                type: "success",
            });
        }
        if (props.error_message) {
            toaster.create({
                title: props.error_message,
                type: "error",
            });
        }
    }, [props]);

    return (
        <>
            <Toaster />
            <Box pt={5} px={5} bg="cyan.50">
                <Tabs.Root
                    maxW="md"
                    fitted
                    defaultValue={props.tab}
                    bg="cyan.50"
                >
                    <Tabs.List>
                        <Tabs.Trigger
                            value="home"
                            onClick={handleTabChange.bind(null, "home")}
                        >
                            HOME
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="list"
                            onClick={handleTabChange.bind(null, "list")}
                        >
                            Search
                        </Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            </Box>

            {props.tab == "list" ? (
                <ListContents diaries={props.diaries} search={props.search} />
            ) : (
                <HomeContents
                    popularDiaries={props.popularDiaries}
                    latestDiaries={props.latestDiaries}
                />
            )}
        </>
    );
};

Home.layout = (page) => <MainLayout children={page} title="ホームページ" />;
export default Home;
