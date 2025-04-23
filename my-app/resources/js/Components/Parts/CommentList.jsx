import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import ThreadList from "@/Components/Parts/ThreadList";

const CommentList = (props) => {
    return (
        <>
            <Text py={10} fontSize={"2xl"}>
                コメント一覧
            </Text>
            {props.comments.length > 0 ? (
                <ul className="pl-1">
                    {props.comments.map((comment) => (
                        <Box key={comment.id}>
                            <li className="border-b border-gray-300 pb-3 mb-3">
                                <p>
                                    <strong>{comment.user.name}</strong>
                                </p>
                                <Text style={{ whiteSpace: "pre-line" }}>
                                    {comment.comment}
                                </Text>
                                <p className="text-gray-500 text-sm">
                                    {comment.created_at}
                                </p>
                            </li>
                            <ThreadList threads={comment.threads} />
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
