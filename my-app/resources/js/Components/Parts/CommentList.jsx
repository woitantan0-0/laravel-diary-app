import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import ThreadList from "@/Components/Parts/ThreadList";
import ThreadForm from "./ThreadForm";
import CommentDelete from "./CommentDelete";

const CommentList = (props) => {
    const [threadFormStatus, setThreadFormStatus] = useState({});
    const [commentText, setCommentText] = useState({});
    const handleCommentReply = (commentId, status) => {
        setThreadFormStatus((prevThread) => ({
            ...prevThread,
            [commentId]: !status,
        }));
        setCommentText((prevCommentText) => ({
            ...prevCommentText,
            [commentId]: status == true ? "返信する？" : "キャンセル",
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
                        <Box key={comment.id} pb={10}>
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
                                        {props.auth.user &&
                                            props.auth.user.id ===
                                                comment.user_id && (
                                                <CommentDelete
                                                    commentId={comment.id}
                                                    diaryId={comment.diary_id}
                                                />
                                            )}
                                    </Flex>
                                </li>
                                <ThreadList
                                    threads={comment.threads}
                                    diaryId={comment.diary_id}
                                    auth={props.auth}
                                />
                                {props.auth.user && (
                                    <Button
                                        px={3}
                                        size="xs"
                                        textStyle="xs"
                                        className="text-cyan-500 border border-cyan-500 hover:bg-cyan-100"
                                        onClick={() =>
                                            handleCommentReply(
                                                comment.id,
                                                threadFormStatus &&
                                                    threadFormStatus[comment.id]
                                                    ? threadFormStatus[
                                                          comment.id
                                                      ]
                                                    : false
                                            )
                                        }
                                    >
                                        {commentText && commentText[comment.id]
                                            ? commentText[comment.id]
                                            : "返信する？"}
                                    </Button>
                                )}
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
