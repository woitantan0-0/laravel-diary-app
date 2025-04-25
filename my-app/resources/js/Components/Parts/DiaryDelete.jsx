import React, { useEffect } from "react";
import { Flex, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { router } from "@inertiajs/react";

const DiaryDelete = (props) => {
    const handleDelete = (e) => {
        e.preventDefault();
        router.post(route("diary.destroy"), {
            id: props.diaryId,
        });
    };
    return (
        <Flex alignItems={"flex-end"}>
            <Dialog.Root role="alertdialog">
                <Dialog.Trigger asChild>
                    <Button
                        type="button"
                        px={5}
                        bgColor={"red.600"}
                        color={"white"}
                        fontWeight={"bold"}
                        _hover={{
                            bgColor: "red.500",
                        }}
                    >
                        さくじょ
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>ほんとに...？</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <p>日記をさくじょしちゃうよ？いいの...？</p>
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

export default DiaryDelete;
