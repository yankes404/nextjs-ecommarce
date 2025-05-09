'use client'

import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { useCreateFeedbackModal } from "../hooks/use-create-feedback-modal";
import { useProductFeedbacks } from "../api/use-product-feedbacks";
import { FeedbackCard } from "./feedback-card";
import { CreateFeedbackModal } from "./create-feedback-modal";
import { EditFeedbackModal } from "./edit-feedback-modal";
import { DeleteFeedbakModal } from "./delete-feedback-modal";
import { SetFeedbackVisibilityModal } from "./set-feedback-visibility-modal";

interface Props {
    productId: string;
}

export const FeedbacksList = ({
    productId,
}: Props) => {
    const { data: session } = useSession();
    const { data: feedbacks, isLoading } = useProductFeedbacks(productId);
    const [maxFeedbacks, setMaxFeedbacks] = useState(50);

    const { open: openCreateFeedbackModal } = useCreateFeedbackModal();

    const onShowMore = useCallback(() => {
        setMaxFeedbacks((prev) => Math.min(prev + 25, feedbacks?.length ?? 0));
    }, [feedbacks]);

    const sortedFeedbacks = useMemo(() => {
        if (!feedbacks) return [];
        
        return feedbacks
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .sort((a, b) => {
                if (a.userId === session?.user?.id && b.userId !== session?.user?.id) {
                    return -1;
                }
                if (a.userId !== session?.user?.id && b.userId === session?.user?.id) {
                    return 1;
                }
                return b.createdAt.getTime() - a.createdAt.getTime();
            })
            .slice(0, maxFeedbacks);
    }, [feedbacks, maxFeedbacks, session]);

    return isLoading ? (
        <div className="flex flex-col gap-7">
            {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex gap-4 items-start" key={index}>
                    <Skeleton className="size-10 shrink-0 rounded-full" />
                    <div className="flex flex-col">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="mt-1 h-5 w-52" />
                        <Skeleton className="mt-2 h-5 w-16" />
                    </div>
                </div>
            ))}
        </div>
    ) : feedbacks && (
        <div className="flex flex-col gap-6">
            <CreateFeedbackModal
                productId={productId}
            />
            <EditFeedbackModal />
            <DeleteFeedbakModal />
            <SetFeedbackVisibilityModal />
            <div className="flex items-center justify-between gap-3.5">
                <h2 className="font-bold text-2xl">
                    {feedbacks.length.toLocaleString("en-US", { maximumFractionDigits: 0 })} Feedbacks
                </h2>
                {session?.user.id && (
                    <Button
                        size="sm"
                        onClick={openCreateFeedbackModal}
                    >
                        <PlusIcon />
                        Give Feedback
                    </Button>
                )}
            </div>
            <Separator />
            <div className="flex flex-col items-start gap-7">
                {sortedFeedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
                {feedbacks.length > maxFeedbacks && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onShowMore}
                    >
                        Show more
                    </Button>
                )}
            </div>
        </div>
    )
}