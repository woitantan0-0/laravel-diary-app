import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useEffect } from "react";

const ErrorDialog = (props) => {
    return (
        <Dialog.Root
            lazyMount
            open={props.openError.open}
            onOpenChange={props.onOpenChangeError}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>エラーが発生しました</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>error code: {props.openError.status}</p>
                            <p>error message: {props.openError.message}</p>
                            <p className="pt-5">
                                ブラウザを更新したり、再ログインしたりしてみてね。
                            </p>
                            <p>待ってるよ...</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button
                                    variant="outline"
                                    px={3}
                                    bgColor={"cyan.600"}
                                    color={"white"}
                                    fontWeight={"bold"}
                                    _hover={{
                                        bgColor: "cyan.500",
                                    }}
                                >
                                    OK
                                </Button>
                            </Dialog.ActionTrigger>
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

export default ErrorDialog;
