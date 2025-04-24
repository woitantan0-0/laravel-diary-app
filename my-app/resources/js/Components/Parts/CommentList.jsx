import React, { useEffect, useState } from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import ThreadList from "@/Components/Parts/ThreadList";
import ThreadForm from "./ThreadForm";

const CommentList = (props) => {
    const [threadFormStatus, setThreadFormStatus] = useState({});
    const handleCommentReply = (commentId, status) => {
        setThreadFormStatus((prevThread) => ({
            ...prevThread,
            [commentId]: !status,
        }));
    };
    return (
        <>
            <Text py={10} fontSize={"2xl"}>
                コメント一覧
            </Text>
            {props.comments.length > 0 ? (
                <ul className="pl-1">
                    {props.comments.map((comment) => (
                        <Box key={comment.id}>
                            <Box>
                                <li className="border-b border-gray-300 pb-3 mb-3">
                                    <Flex gap="4">
                                        <Box w={"100%"}>
                                            <p>
                                                <strong>
                                                    {comment.user.name}
                                                </strong>
                                            </p>
                                            <Text
                                                style={{
                                                    whiteSpace: "pre-line",
                                                }}
                                            >
                                                {comment.comment}
                                            </Text>
                                            <p className="text-gray-500 text-sm">
                                                {comment.created_at}
                                            </p>
                                        </Box>
                                        {props.auth.user && (
                                            <Flex alignItems={"flex-end"}>
                                                <Link
                                                    w={8}
                                                    className="text-gray-500 border-b border-gray-300 hover:text-cyan-300 hover:border-cyan-300"
                                                    onClick={() =>
                                                        handleCommentReply(
                                                            comment.id,
                                                            threadFormStatus &&
                                                                threadFormStatus[
                                                                    comment.id
                                                                ]
                                                                ? threadFormStatus[
                                                                      comment.id
                                                                  ]
                                                                : false
                                                        )
                                                    }
                                                >
                                                    返信
                                                </Link>
                                            </Flex>
                                        )}
                                    </Flex>
                                </li>
                                <ThreadList threads={comment.threads} />
                            </Box>
                            <ThreadForm
                                commentId={comment.id}
                                diaryId={comment.diary_id}
                                errMessage={props.errMessage}
                                status={threadFormStatus[comment.id]}
                            />
                        </Box>
                    ))}
                </ul>
            ) : (
                <div className="p-5">コメントはまだありません</div>
            )}
        </>
    );
};
export default CommentList;
