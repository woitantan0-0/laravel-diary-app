import React, { useEffect, useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import DiaryLink from "./DiaryLink";

const MyDiaryList = (props) => {
    // もっと見る
    const [loadIndex, setLoadIndex] = useState(10);
    const [isEmpty, setIsEmpty] = useState(false);
    const [currentLink, setCurrentLink] = useState(props.diaries);
    const handleDisplayMore = () => {
        if (loadIndex >= currentLink.length) {
            setIsEmpty(true);
        } else {
            setLoadIndex(loadIndex + 10);
        }
    };

    useEffect(() => {
        if (loadIndex >= currentLink.length) {
            setIsEmpty(true);
        }
    }, [loadIndex]);

    return (
        <>
            {props.diaries && props.diaries.length > 0 ? (
                <>
                    <div className="py-3">
                        {currentLink.slice(0, loadIndex).map((diary) => (
                            <DiaryLink
                                key={diary.id}
                                id={diary.id}
                                title={diary.title}
                                target_date={diary.target_date}
                                is_public={diary.is_public}
                                isPopular={true}
                                isBad={true}
                                likes_count={diary.likes_count}
                                bads_count={diary.bads_count}
                            />
                        ))}
                    </div>

                    {!isEmpty && (
                        <Box className="text-center">
                            <Button
                                disabled={isEmpty ? true : false}
                                onClick={handleDisplayMore}
                                variant="contained"
                                px={3}
                                className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 active:bg-cyan-700"
                            >
                                もっと見る
                            </Button>
                        </Box>
                    )}
                </>
            ) : (
                <Box p={5}>投稿はまだありません</Box>
            )}
        </>
    );
};

export default MyDiaryList;
