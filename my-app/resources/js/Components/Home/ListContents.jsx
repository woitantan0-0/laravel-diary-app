import React, { useEffect } from "react";
import DiaryList from "@/Components/Parts/DiaryList";
import { Input, InputGroup, Kbd, Box } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const ListContents = (props) => {
    return (
        <>
            <Box py={10} px={10}>
                <InputGroup flex="1" startElement={<LuSearch />}>
                    <Input rounded={6} placeholder="Search contacts enter." />
                </InputGroup>
            </Box>
            <DiaryList
                title="日記一覧"
                diaries={props.diaries}
                isPopular={true}
            />
        </>
    );
};

export default ListContents;
