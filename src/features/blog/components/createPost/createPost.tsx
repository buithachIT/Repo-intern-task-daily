'use client'
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext";
import { Plus } from "lucide-react"
import { useState } from "react";
import CreatePostForm from "./createPostForm/createPostForm";

const CreateFormPost = () => {
    const { user, isLoading } = useAuth();
    const [isOpenModalCreatePost, setIsOpenModalCreatePost] = useState<boolean>(false);
    if (!isLoading && user?.role !== "ADMIN") return null;
    if (isLoading) return <p>Đang tải</p>
    if (user?.role === "ADMIN") {
        return (
            <div>
                <div className="absolute left-10/12 -translate-x-1/2 translate-y-1/2">
                    <Button onClick={() => { setIsOpenModalCreatePost(true) }}><i><Plus /></i>Tạo Post</Button>
                    <CreatePostForm
                        isOpenModalCreatePost={isOpenModalCreatePost}
                        setIsOpenModalCreatePost={setIsOpenModalCreatePost}
                        userId={user.id}
                    />
                </div>
            </div>
        )
    }
}
export default CreateFormPost