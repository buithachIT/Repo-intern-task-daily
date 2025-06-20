import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { createPostFormValues } from "./createPostFormSchema";

type Props = {
    form: UseFormReturn<createPostFormValues>;
};

export const CreatePostFormFields = ({ form }: Props) => (
    <>
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <div className="grid gap-3">
                        <Label>Title</Label>
                        <FormControl>
                            <Input
                                className="text-sm"
                                {...field}
                                placeholder="Enter title of post"
                            />
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <div className="grid gap-3">
                        <Label>Content</Label>
                        <FormControl>
                            <Textarea
                                className="border p-2 rounded resize-none"
                                rows={3}
                                placeholder="Viết cảm nhận của bạn..."
                                {...field}
                            />
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
    </>
);
