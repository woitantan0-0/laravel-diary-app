import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Box } from "@chakra-ui/react";

const ThreadLink = (props) => {
    const userData = usePage().props;
    const pathname = location.pathname.split("/")[1];

    return (
        <>
            {userData.auth.user.id == props.user_id && (
                <Box
                    ml={4}
                    pl={4}
                    my={5}
                    className="border-l-4 border-gray-300"
                >
                    <Link
                        href={`/diary/${props.diary_id}?ref=${pathname}#comment-${props.comment_id}`}
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
                </Box>
            )}
        </>
    );
};

export default ThreadLink;
