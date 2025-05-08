import React, { useEffect, useState } from "react";
import { Tabs, Box, Input, InputGroup } from "@chakra-ui/react";

const MyCommentList = (props) => {
    // もっと見る
    const [loadIndex, setLoadIndex] = useState(4);
    const [isEmpty, setIsEmpty] = useState(false);
    const [currentLink, setCurrentLink] = useState([]);
    const handleDisplayMore = () => {
        if (loadIndex > currentLink.length) {
            setIsEmpty(true);
        } else {
            setLoadIndex(loadIndex + 4);
        }
    };

    return (
        <>
            <Box>tab2</Box>
        </>
    );
};

export default MyCommentList;
