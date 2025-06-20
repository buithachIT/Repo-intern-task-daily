"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostFormSchema, createPostFormValues } from "./createPostFormSchema";
import { asyncHandlerWrapper } from "@/helper/api";
import { createPostAPI } from "@/lib/action/post";
import { toast } from "react-toastify";
import { Form } from "@/components/ui/form";
import { CreatePostDialog } from "./createPostDialog";
import { CreatePostFormFields } from './createPostFormField';

type Props = {
    isOpenModalCreatePost: boolean;
    setIsOpenModalCreatePost: (v: boolean) => void;
    userId: string;
};

const CreatePostForm = ({ isOpenModalCreatePost, setIsOpenModalCreatePost, userId }: Props) => {
    const form = useForm<createPostFormValues>({
        resolver: zodResolver(createPostFormSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const onSubmit = async (data: createPostFormValues) => {
        const payload = { ...data, userId };
        await asyncHandlerWrapper(
            async () => {
                await createPostAPI(payload);
                toast.success("Đăng bài thành công");
                form.reset();
                setIsOpenModalCreatePost(false);
            },
            (error) => {
                toast.error(error || "Đăng bài thất bại");
            }
        );
    };

    return (
        <Form {...form}>
            <CreatePostDialog
                open={isOpenModalCreatePost}
                onClose={() => setIsOpenModalCreatePost(false)}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <CreatePostFormFields form={form} />
            </CreatePostDialog>
        </Form>
    );
};

export default CreatePostForm;
