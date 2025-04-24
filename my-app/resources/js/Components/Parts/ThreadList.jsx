import React, { useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import ThreadDelete from "./ThreadDelete";

const ThreadList = (props) => {
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
                                <Flex gap="4">
                                    <Box w={"100%"}>
                                        <p>
                                            <strong>{thread.user.name}</strong>
                                        </p>
                                        <Text
                                            style={{ whiteSpace: "pre-line" }}
                                        >
                                            {thread.comment}
                                        </Text>
                                        <p className="text-gray-500 text-sm">
                                            {thread.created_at}
                                        </p>
                                    </Box>
                                    {props.auth.user &&
                                        props.auth.user.id ===
                                            thread.user_id && (
                                            <ThreadDelete
                                                threadId={thread.id}
                                                diaryId={props.diaryId}
                                            />
                                        )}
                                </Flex>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </>
    );
};

export default ThreadList;
