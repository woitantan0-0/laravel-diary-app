import React, { useEffect, useState } from "react";
import { Field, Textarea, Button, Box } from "@chakra-ui/react";
import { router } from "@inertiajs/react";

const ThreadForm = (props) => {
    const [thread, setThread] = useState({
        thread_comment: "",
        comment_id: props.commentId,
    });
    useEffect(() => {
        if (!(props.errMessage && props.errMessage[props.commentId])) {
            setThread({
                thread_comment: "",
                comment_id: props.commentId,
            });
        }
    }, [props]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setThread((prevThread) => ({
            ...prevThread,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("thread.store", props.diaryId), thread);
    };
    return props.status ? (
        <form onSubmit={handleSubmit}>
            <Field.Root
                py={3}
                required
                invalid={
                    !!(props.errMessage && props.errMessage[props.commentId])
                }
            >
                <Textarea
                    placeholder="やあ。元気？"
                    variant="outline"
                    rounded={6}
                    onChange={handleChange}
                    name="thread_comment"
                    value={thread.thread_comment}
                />
                {props.errMessage && props.errMessage[props.commentId] && (
                    <Field.ErrorText>
                        {props.errMessage[props.commentId]["thread_comment"]}
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
                    へんしん！
                </Button>
            </Box>
        </form>
    ) : (
        ""
    );
};

export default ThreadForm;
