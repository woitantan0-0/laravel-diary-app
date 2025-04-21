import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const ThreadList = (props) => {
    useEffect(() => {
        console.log(props);
    }, [props]);

    return (
        <>
            {props.threads.length > 0 && (
                <Box ml={8} my={5} className="border-l-4 border-gray-300 ">
                    <ul className="pl-10">
                        {props.threads.map((thread) => (
                            <li
                                key={thread.id}
                                className="border-b border-gray-300 pb-3 mb-3"
                            >
                                <p>
                                    <strong>{thread.user.name}</strong>
                                </p>
                                {thread.comment}
                                <p className="text-gray-500 text-sm">
                                    {thread.created_at}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </>
    );
};

export default ThreadList;
