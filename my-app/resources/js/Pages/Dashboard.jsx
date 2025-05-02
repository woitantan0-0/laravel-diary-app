import React, { useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Tabs, Box } from "@chakra-ui/react";
import { Toaster, toaster } from "@/Components/ui/toaster";
import ListContents from "@/Components/Home/ListContents";
import { router } from "@inertiajs/react";

const Dashboard = (props) => {
    // タブの状態を管理するためのuseStateフックを使用
    const [tab, setTab] = useState(props.tab);
    // タブの状態を変更するための関数を定義
    const handleTabChange = (key, newTab) => {
        setTab(newTab);
        switch (key) {
            case "diary":
                router.get(route("dashboard.index"));
                break;
            case "comment":
                // router.get(route("dashboard.list"));
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
                            onClick={handleTabChange.bind(null, "diary")}
                        >
                            HOME
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="list"
                            onClick={handleTabChange.bind(null, "comment")}
                        >
                            LIST
                        </Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            </Box>

            <ListContents diaries={props.diaries} search={props.search} />
        </>
    );
};

Dashboard.layout = (page) => <MainLayout children={page} title="マイページ" />;
export default Dashboard;
