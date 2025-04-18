import React from "react";
import DiaryList from "@/Components/Parts/DiaryList";

const HomeContents = (props) => {
    return (
        <>
            <DiaryList
                title="人気の日記一覧"
                diaries={props.popularDiaries}
                isPopular={true}
            />
            <DiaryList
                title="最新の日記一覧"
                diaries={props.latestDiaries}
                isPopular={false}
            />
        </>
    );
};

export default HomeContents;
