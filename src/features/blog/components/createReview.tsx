'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useReviews } from '@/hooks/useReviews'

type Props = {
    postId: string
    onSubmit?: (content: string, rating: number) => Promise<void>
}

export default function CreateReview({ postId, onSubmit }: Props) {
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const { mutate } = useReviews(postId)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (onSubmit) {
                await onSubmit(content, rating)
                setContent('')
            } else {
                setContent('')
                setRating(5)
                mutate()
            }
        } catch (error) {
            toast.error('Lỗi gửi đánh giá!')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <textarea
                className="border p-2 rounded resize-none"
                rows={3}
                placeholder="Viết cảm nhận của bạn..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <select
                className="border p-2 rounded w-fit"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            >
                {[5, 4, 3, 2, 1].map((val) => (
                    <option key={val} value={val}>
                        {val} sao
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-[#004f70] text-white px-4 items-center w-1/2 py-2 rounded hover:bg-blue-700"
                disabled={isLoading}
            >
                {isLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
        </form>
    )
}
