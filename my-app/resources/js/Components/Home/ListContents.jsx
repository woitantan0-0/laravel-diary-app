import React, { useEffect } from "react";
import { router } from "@inertiajs/react";
import DiaryList from "@/Components/Parts/DiaryList";
import { Input, InputGroup, Box } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const ListContents = (props) => {
    const [searchText, setSearchText] = React.useState(props.search || "");
    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            const searchValue = e.target.value;
            if (searchValue) {
                router.get(route("home.list"), { search: searchValue });
            } else {
                router.get(route("home.list"));
            }
        }
    };
    return (
        <>
            <Box py={10} px={10}>
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
                    <li>※タイトル、日付、本文、投稿者名で検索できるよ</li>
                    <li>※日付は`2025-05-07`のように入力してね</li>
                    <li>※入力後、エンターを押すと検索されるよ</li>
                </ul>
            </Box>
            <DiaryList
                title="日記一覧"
                diaries={props.diaries.data}
                pageData={props.diaries}
                isPopular={true}
                searchText={searchText}
            />
        </>
    );
};

export default ListContents;
