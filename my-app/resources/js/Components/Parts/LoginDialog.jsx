import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useEffect } from "react";
import { router } from "@inertiajs/react";

const LoginDialog = (props) => {
    return (
        <Dialog.Root
            lazyMount
            open={props.open}
            onOpenChange={props.onOpenChange}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>ログインしてください！</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            ログインしないとできない操作です。ログインするか、新規登録してください。無料だよ！
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button
                                    variant="outline"
                                    px={3}
                                    bgColor={"gray.600"}
                                    color={"white"}
                                    fontWeight={"bold"}
                                    _hover={{
                                        bgColor: "gray.500",
                                    }}
                                >
                                    やめる...
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button
                                px={3}
                                bgColor={"cyan.600"}
                                color={"white"}
                                fontWeight={"bold"}
                                _hover={{
                                    bgColor: "cyan.500",
                                }}
                                onClick={() => {
                                    router.get(route("login"));
                                }}
                            >
                                ログイン
                            </Button>
                            <Button
                                px={3}
                                bgColor={"cyan.600"}
                                color={"white"}
                                fontWeight={"bold"}
                                _hover={{
                                    bgColor: "cyan.500",
                                }}
                                onClick={() => {
                                    router.get(route("register"));
                                }}
                            >
                                新規登録
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default LoginDialog;
