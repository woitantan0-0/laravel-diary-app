import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import H1Parts from "@/Components/Parts/H1Parts";
import {
    Box,
    Field,
    Input,
    Textarea,
    CheckboxCard,
    HStack,
} from "@chakra-ui/react";

const DiaryEdit = (props) => {
    const [diary, setDiary] = useState({
        id: props.diary.id || "",
        title: props.diary.title || "",
        target_date: props.diary.target_date_origin || "",
        body: props.diary.body || "",
        is_public: props.diary.is_public == 1 ? true : false,
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDiary((prevDiary) => ({
            ...prevDiary,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("diary.update"), diary);
    };
    return (
        <>
            <H1Parts h1Text="にっきのへんしゅう。" />
            <Box py={5} px={5}>
                <form onSubmit={handleSubmit}>
                    <Field.Root py={3} required invalid={!!props.errors.title}>
                        <Field.Label>
                            たいとる。 <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            placeholder="今日の夢。"
                            rounded={6}
                            onChange={handleChange}
                            name="title"
                            value={diary.title}
                        />
                        <Field.HelperText>
                            あなたのできごとのがいようをかいてね。
                        </Field.HelperText>
                        {props.errors.title && (
                            <Field.ErrorText>
                                {props.errors.title}
                            </Field.ErrorText>
                        )}
                    </Field.Root>
                    <Field.Root
                        py={3}
                        required
                        invalid={!!props.errors.target_date}
                    >
                        <Field.Label>
                            ひにち。 <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            type="date"
                            rounded={6}
                            onChange={handleChange}
                            name="target_date"
                            value={diary.target_date}
                        />
                        <Field.HelperText>
                            できごとがあったひをせんたくしてね。
                        </Field.HelperText>
                        {props.errors.target_date && (
                            <Field.ErrorText>
                                {props.errors.target_date}
                            </Field.ErrorText>
                        )}
                    </Field.Root>
                    <Field.Root py={3} required invalid={!!props.errors.body}>
                        <Field.Label>
                            ほんぶん。 <Field.RequiredIndicator />
                        </Field.Label>
                        <Textarea
                            placeholder="今日は、オムライスを食べたよ。"
                            variant="outline"
                            rounded={6}
                            onChange={handleChange}
                            name="body"
                            value={diary.body}
                        />
                        <Field.HelperText>
                            あなたのできごとのしょうさいをかいてね。
                        </Field.HelperText>
                        {props.errors.body && (
                            <Field.ErrorText>
                                {props.errors.body}
                            </Field.ErrorText>
                        )}
                    </Field.Root>
                    <CheckboxCard.Root
                        my={3}
                        maxW="300px"
                        bg="cyan.50"
                        variant="outline"
                        colorPalette="cyan"
                        checked={diary.is_public}
                    >
                        <CheckboxCard.HiddenInput
                            onChange={handleChange}
                            name="is_public"
                            value={diary.is_public}
                        />
                        <CheckboxCard.Control>
                            <CheckboxCard.Content>
                                <CheckboxCard.Label>
                                    こうかいする？
                                </CheckboxCard.Label>
                                <CheckboxCard.Description>
                                    だれでもみれるようにするよ。
                                    みせたいときはチェックしてね。
                                </CheckboxCard.Description>
                            </CheckboxCard.Content>
                            <CheckboxCard.Indicator />
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                    <HStack spacing={4} py={3}>
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 active:bg-cyan-700"
                        >
                            こうしん！
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:bg-gray-700"
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                            もどる
                        </button>
                    </HStack>
                </form>
            </Box>
        </>
    );
};

DiaryEdit.layout = (page) => (
    <MainLayout children={page} title="にっきのへんしゅう。" imagePass="../../">
        {page}
    </MainLayout>
);
export default DiaryEdit;
