import React, { useEffect } from "react";
import {
    Flex,
    Link,
    Button,
    CloseButton,
    Dialog,
    Portal,
} from "@chakra-ui/react";
import { router } from "@inertiajs/react";

const ThreadDelete = (props) => {
    const handleDelete = (e) => {
        e.preventDefault();
        router.post(route("thread.destroy", props.diaryId), {
            thread_id: props.threadId,
        });
    };
    return (
        <Flex alignItems={"flex-end"}>
            <Dialog.Root role="alertdialog">
                <Dialog.Trigger asChild>
                    <Link
                        w={8}
                        className="text-red-500 border-b border-red-500 hover:text-red-300 hover:border-red-300"
                    >
                        削除
                    </Link>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>ほんとに...？</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <p>返信をさくじょしちゃうよ？いいの...？</p>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                        px={3}
                                        bgColor={"gray.600"}
                                        color={"white"}
                                        fontWeight={"bold"}
                                        _hover={{
                                            bgColor: "gray.500",
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Dialog.ActionTrigger>
                                <Button
                                    px={3}
                                    bgColor={"red.600"}
                                    color={"white"}
                                    fontWeight={"bold"}
                                    _hover={{
                                        bgColor: "red.500",
                                    }}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Flex>
    );
};

export default ThreadDelete;
