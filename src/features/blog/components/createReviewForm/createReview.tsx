'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useReviews } from '@/hooks/useReviews'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createReviewFormValues, createReviewSchema } from './createReviewSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
    postId: string
    onSubmit?: (content: string, rating: number) => Promise<void>
}

export default function CreateReview({ postId, onSubmit }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const { mutate } = useReviews(postId)

    const form = useForm<createReviewFormValues>({
        resolver: zodResolver(createReviewSchema),
        defaultValues: {
            content: '',
            rating: 0,
        },
    });

    const handleSubmit = async (data: createReviewFormValues) => {
        setIsLoading(true)
        try {
            if (onSubmit) {
                await onSubmit(data.content, data.rating)
                form.reset();
            } else {
                mutate()
            }
        } catch (error) {
            toast.error('Lỗi gửi đánh giá!')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 mt-6">
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="border p-2 rounded resize-none"
                                    rows={3}
                                    placeholder="Viết cảm nhận của bạn..."

                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >

                </FormField>
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <Select
                                value={field.value?.toString()}
                                onValueChange={(value) => field.onChange(Number(value))}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Your rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[5, 4, 3, 2, 1].map((val) => (
                                        <SelectItem key={val} value={val.toString()}>
                                            {val} <Star className="inline text-yellow-300 ml-1 w-4 h-4" />
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="bg-[#004f70] text-white px-4 items-center w-1/2 py-2 rounded hover:bg-blue-700"
                    disabled={isLoading}
                >
                    {isLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
                </Button>
            </form >
        </Form >
    )
}
