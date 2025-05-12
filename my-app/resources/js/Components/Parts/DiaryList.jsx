import React, { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { Flex, Box, HStack, Button } from "@chakra-ui/react";
import DiaryLink from "./DiaryLink";

const DiaryList = (props) => {
    const handlePageCange = (url) => {
        if (url) {
            const routerUrl = props.searchText
                ? `${url}&search=${props.searchText}`
                : url;
            router.get(routerUrl);
        }
    };

    const getButtonLabel = (label) => {
        if (label.includes("pre")) {
            return "前へ";
        } else if (label.includes("next")) {
            return "次へ";
        }
        return label;
    };

    return (
        <>
            <Flex pt={10} pb={5}>
                <img
                    src="./image/iconGame.jpeg"
                    className="p-2 flex-fill"
                    alt="logo"
                    style={{ width: "70px" }}
                />
                <h2 className="text-3xl font-bold text-black py-3">
                    {props.title}
                </h2>
            </Flex>

            {props.diaries && props.diaries.length > 0 ? (
                <div className="p-3">
                    {props.diaries.map((diary) => (
                        <DiaryLink
                            key={diary.id}
                            id={diary.id}
                            title={diary.title}
                            target_date={diary.target_date}
                            is_public={diary.is_public}
                            user={diary.user}
                            isPopular={props.isPopular}
                            likes_count={diary.likes_count}
                        />
                    ))}
                </div>
            ) : (
                <Box p={5}>投稿はまだありません</Box>
            )}

            {props.pageData && props.pageData.links.length > 0 && (
                <HStack px={3}>
                    {props.pageData.links.map((link, index) => (
                        <Button
                            key={index}
                            onClick={() => handlePageCange(link.url)}
                            bg={link.active ? "cyan.200" : "gray.100"}
                            variant="solid"
                            px={4}
                        >
                            {getButtonLabel(link.label)}
                        </Button>
                    ))}
                </HStack>
            )}
        </>
    );
};

export default DiaryList;
