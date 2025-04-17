import React from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

const Home = (props) => {
    return (
        <>
            <h1>ホームページ</h1>
            <h2>人気の日記一覧</h2>
            <ul>
                {props.popularDiaries.map((diary) => (
                    <li key={diary.id}>
                        <Link href={`/diary/${diary.id}`}>{diary.title}</Link>
                        <p>日付: {diary.target_date}</p>
                        <p>投稿者: {diary.user.name}</p>
                        <p>いいね数: {diary.good_count}件</p>
                    </li>
                ))}
            </ul>
            <h2>最新の日記一覧</h2>
            <ul>
                {props.latestDiaries.map((diary) => (
                    <li key={diary.id}>
                        <Link href={`/diary/${diary.id}`}>{diary.title}</Link>
                        <p>日付: {diary.target_date}</p>
                        <p>投稿者: {diary.user.name}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

Home.layout = (page) => <MainLayout children={page} title="ホームページ" />;
export default Home;
