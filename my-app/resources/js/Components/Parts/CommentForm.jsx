import React, { useState, useEffect } from "react";
import { Text, Field, Textarea, Button, Box } from "@chakra-ui/react";
import { router } from "@inertiajs/react";

const CommentForm = (props) => {
    const [comment, setComment] = React.useState({
        comment: "",
        diary_id: props.diaryId,
    });
    useEffect(() => {
        if (!props.errMessage.comment) {
            setComment({
                comment: "",
                diary_id: props.diaryId,
            });
        }
    }, [props]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment((prevComment) => ({
            ...prevComment,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("comment.store"), comment);
    };
    return (
        <>
            <Text pt={5} fontSize={"2xl"}>
                コメントする。
            </Text>
            <form onSubmit={handleSubmit}>
                <Field.Root
                    py={3}
                    required
                    invalid={!!props.errMessage.comment}
                >
                    <Textarea
                        placeholder="ぼくも、オムライスを食べたよ。"
                        variant="outline"
                        rounded={6}
                        onChange={handleChange}
                        name="comment"
                        value={comment.comment}
                    />
                    {props.errMessage.comment && (
                        <Field.ErrorText>
                            {props.errMessage.comment}
                        </Field.ErrorText>
                    )}
                </Field.Root>
                <Box className="text-right">
                    <Button
                        type="submit"
                        px={5}
                        bgColor={"cyan.600"}
                        color={"white"}
                        fontWeight={"bold"}
                        _hover={{
                            bgColor: "cyan.500",
                        }}
                    >
                        コメント投稿！
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default CommentForm;
