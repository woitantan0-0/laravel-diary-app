import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

const DiaryDetail = (props) => {
    return (
        <>
            <Box py={5} px={5} bg="cyan.50">
                <h1 className="text-2xl font-bold">{props.h1Text}</h1>
            </Box>
        </>
    );
};

export default DiaryDetail;
