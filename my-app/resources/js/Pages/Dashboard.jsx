import React, { useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import H1Parts from "@/Components/Parts/H1Parts";
import MyDiaryList from "@/Components/Parts/MyDiaryList";
import MyCommentList from "@/Components/Parts/MyCommentList";
import { Tabs, Box, Input, InputGroup } from "@chakra-ui/react";
import { Toaster, toaster } from "@/Components/ui/toaster";
import { router } from "@inertiajs/react";
import { LuSearch } from "react-icons/lu";

const Dashboard = (props) => {
    // 検索機能
    const [searchText, setSearchText] = React.useState(props.search || "");
    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            const searchValue = e.target.value;
            if (searchValue) {
                router.get(route("dashboard"), { search: searchValue });
            } else {
                router.get(route("dashboard"));
            }
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
            <H1Parts h1Text={"マイページ"} />
            <Box pt={10} px={5}>
                <InputGroup flex="1" startElement={<LuSearch />}>
                    <Input
                        rounded={6}
                        placeholder="さがすよ。エンターおしてね。"
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleSearchEnter}
                        value={searchText}
                    />
                </InputGroup>
                <ul className="text-gray-500 pt-3">
                    <li>※検索したい文字を入力してね</li>
                    <li>※タイトル、日付、本文で検索できるよ</li>
                    <li>※日付は`2025-05-07`のように入力してね</li>
                    <li>※入力後、エンターを押すと検索されるよ</li>
                </ul>
            </Box>

            <Box pt={5} px={5}>
                <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
                    <Tabs.List className="border-b border-gray-200 bg-white my-3">
                        <Tabs.Trigger value="tab-1" className="px-5">
                            投稿日記一覧
                        </Tabs.Trigger>
                        <Tabs.Trigger value="tab-2" className="px-5">
                            コメント一覧
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab-1">
                        <MyDiaryList diaries={props.diaries} />
                    </Tabs.Content>
                    <Tabs.Content value="tab-2">
                        <MyCommentList comments={props.comments} />
                    </Tabs.Content>
                </Tabs.Root>
            </Box>
        </>
    );
};

Dashboard.layout = (page) => <MainLayout children={page} title="マイページ" />;
export default Dashboard;
