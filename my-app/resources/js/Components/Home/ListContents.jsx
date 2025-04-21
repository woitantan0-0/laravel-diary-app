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
                        placeholder="Search diary. Press enter after typing."
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleSearchEnter}
                        value={searchText}
                    />
                </InputGroup>
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
