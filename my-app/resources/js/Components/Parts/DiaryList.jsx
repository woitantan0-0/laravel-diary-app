import React, { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { Flex, Box, HStack, Button } from "@chakra-ui/react";

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
                />
                <h2 className="text-3xl font-bold text-black py-3">
                    {props.title}
                </h2>
            </Flex>

            {props.diaries && props.diaries.length > 0 ? (
                <ul className="p-3">
                    {props.diaries.map((diary) => (
                        <li
                            key={diary.id}
                            className="border-b border-gray-300 pb-3 mb-3"
                        >
                            <Link
                                href={`/diary/${diary.id}`}
                                className="text-2xl font-bold text-black my-3 hover:text-pink-300"
                            >
                                {diary.title}
                            </Link>
                            <p>日付: {diary.target_date}</p>
                            <p>投稿者: {diary.user.name}</p>
                            {props.isPopular && (
                                <p>いいね数: {diary.good_count}件</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <Box p={5}>投稿はまだありません</Box>
            )}

            {props.pageData && props.pageData.links.length > 0 && (
                <HStack>
                    {props.pageData.links.map((link, index) => (
                        <Button
                            key={index}
                            onClick={() => handlePageCange(link.url)}
                            bg={link.active ? "cyan.200" : "gray.100"}
                            variant="solid"
                            px={5}
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
