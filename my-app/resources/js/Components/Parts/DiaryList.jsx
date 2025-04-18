import React from "react";
import { Link } from "@inertiajs/react";
import { Flex, Box } from "@chakra-ui/react";

const DiaryList = (props) => {
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

            {props.diaries.length > 0 ? (
                <ul className="p-3">
                    {props.diaries.map((diary) => (
                        <li
                            key={diary.id}
                            className="border-b border-gray-300 pb-3 mb-3"
                        >
                            <Link
                                href={`/diary/${diary.id}`}
                                className="text-2xl font-bold text-black my-3 hover:text-blue-500"
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
        </>
    );
};

export default DiaryList;
