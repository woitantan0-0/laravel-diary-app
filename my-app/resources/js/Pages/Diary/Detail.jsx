import React, { useEffect } from "react";
import CommentList from "@/Components/Parts/CommentList";
import CommentForm from "@/Components/Parts/CommentForm";
import DiaryDelete from "@/Components/Parts/DiaryDelete";
import MainLayout from "@/Layouts/MainLayout";
import H1Parts from "@/Components/Parts/H1Parts";
import { Box, Button, HStack, Tag } from "@chakra-ui/react";
import { Toaster, toaster } from "@/Components/ui/toaster";
import { router } from "@inertiajs/react";
import Likes from "@/Components/Parts/Likes";

const DiaryDetail = (props) => {
    useEffect(() => {
        if (props.message) {
            toaster.create({
                title: props.message,
                type: "success",
            });
        }
        if (props.error_message) {
            toaster.create({
                title: props.error_message,
                type: "error",
            });
        }
    }, [props]);

    return (
        <>
            <Toaster />
            <Box bg="pink.50">
                <H1Parts h1Text={props.diary.title} />
                <Box px={5} py={20}>
                    <Tag.Root size="md" variant="subtle" colorPalette="cyan">
                        <Tag.Label>
                            {props.diary.is_public ? "公開" : "非公開"}
                        </Tag.Label>
                    </Tag.Root>
                    <p>ひ：{props.diary.target_date}</p>
                    <p>おなまえ：{props.diary.user.name}</p>
                    <Box py={10} style={{ whiteSpace: "pre-line" }}>
                        {props.diary.body}
                    </Box>

                    <Likes diary={props.diary} likeState={props.likeState} />

                    {props.auth.user &&
                        props.auth.user.id === props.diary.user_id && (
                            <HStack gap="4" pt={5}>
                                <Button
                                    type="button"
                                    px={5}
                                    bgColor={"cyan.600"}
                                    color={"white"}
                                    fontWeight={"bold"}
                                    _hover={{
                                        bgColor: "cyan.500",
                                    }}
                                    onClick={() =>
                                        router.get(
                                            route("diary.edit", props.diary.id)
                                        )
                                    }
                                >
                                    へんしゅう
                                </Button>
                                <DiaryDelete diaryId={props.diary.id} />
                            </HStack>
                        )}
                </Box>
            </Box>
            {props.auth.user && (
                <Box py={5} px={5}>
                    <CommentForm
                        diaryId={props.diary.id}
                        errMessage={props.errors}
                    />
                </Box>
            )}
            <Box py={5} px={5}>
                <CommentList
                    comments={props.comments}
                    auth={props.auth}
                    errMessage={props.errors}
                />
            </Box>
            <Box py={5} px={5}>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:bg-gray-700"
                    onClick={() => {
                        router.get(route("home.index"));
                    }}
                >
                    一覧にもどる
                </button>
            </Box>
        </>
    );
};

DiaryDetail.layout = (page) => (
    <MainLayout children={page} title="日記詳細" imagePass="../" />
);
export default DiaryDetail;
