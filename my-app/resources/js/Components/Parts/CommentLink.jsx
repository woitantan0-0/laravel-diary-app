import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Box } from "@chakra-ui/react";

const CommentLink = (props) => {
    const userData = usePage().props;
    return (
        <Box>
            <Box>
                <Link
                    href={`/diary/${props.diary_id}`}
                    className="text-cyan-600 my-3 hover:text-cyan-300"
                >
                    日記：{props.diary.title}
                </Link>
            </Box>
            {userData.auth.user.id == props.user_id && (
                <>
                    <Link
                        href={`/diary/${props.diary_id}`}
                        className="text-black my-3 hover:text-pink-300"
                    >
                        <Box
                            className="py-3"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {props.comment}
                        </Box>
                    </Link>
                    <p className="text-gray-500">
                        コメント日: {props.created_at}
                    </p>
                </>
            )}
        </Box>
    );
};

export default CommentLink;
