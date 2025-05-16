import React, { useEffect, useState } from "react";
import { Button, Box, Card, Stack } from "@chakra-ui/react";
import CommentLink from "./CommentLink";
import ThreadLink from "./ThreadLink";

const MyCommentList = (props) => {
    // もっと見る
    const [loadIndex, setLoadIndex] = useState(5);
    const [isEmpty, setIsEmpty] = useState(false);
    const [currentLink, setCurrentLink] = useState(props.comments);
    const handleDisplayMore = () => {
        if (loadIndex >= currentLink.length) {
            setIsEmpty(true);
        } else {
            setLoadIndex(loadIndex + 5);
        }
    };
    useEffect(() => {
        if (loadIndex >= currentLink.length) {
            setIsEmpty(true);
        }
    }, [loadIndex]);

    return (
        <>
            {currentLink && currentLink.length > 0 ? (
                <>
                    <div className="py-3">
                        {currentLink.slice(0, loadIndex).map((comment) => (
                            <Stack className="py-1" key={comment.id}>
                                <Card.Root
                                    size="sm"
                                    variant="outline"
                                    className="border border-gray-200 mb-3"
                                >
                                    <Card.Body color="fg.muted">
                                        <CommentLink
                                            id={comment.id}
                                            comment={comment.comment}
                                            created_at={comment.created_at}
                                            diary_id={comment.diary_id}
                                            user_id={comment.user_id}
                                            diary={comment.diary}
                                        />
                                        {comment.threads &&
                                            comment.threads.length > 0 &&
                                            comment.threads.map((thread) => (
                                                <ThreadLink
                                                    key={thread.id}
                                                    comment={thread.comment}
                                                    created_at={
                                                        thread.created_at
                                                    }
                                                    diary_id={comment.diary_id}
                                                    comment_id={
                                                        thread.comment_id
                                                    }
                                                    user_id={thread.user_id}
                                                />
                                            ))}
                                    </Card.Body>
                                </Card.Root>
                            </Stack>
                        ))}
                    </div>

                    {!isEmpty && (
                        <Box className="text-center">
                            <Button
                                disabled={isEmpty ? true : false}
                                onClick={handleDisplayMore}
                                variant="contained"
                                px={3}
                                className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 active:bg-cyan-700"
                            >
                                もっと見る
                            </Button>
                        </Box>
                    )}
                </>
            ) : (
                <Box p={5}>コメントはまだありません</Box>
            )}
        </>
    );
};

export default MyCommentList;
