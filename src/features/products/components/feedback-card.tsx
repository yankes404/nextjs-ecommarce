import { useSession } from "next-auth/react";
import { EyeIcon, EyeOffIcon, PenIcon, TrashIcon } from "lucide-react";
import { Feedback, User } from "@prisma/client";
import { format } from "date-fns";

import { UserImage } from "@/features/auth/components/user-image";
import { Button } from "@/components/ui/button";

import { FeedbackStars } from "./feedback-stars";
import { useEditFeedbackModal } from "../hooks/use-edit-feedback-modal";
import { useDeleteFeedbackModal } from "../hooks/use-delete-feedback-modal";
import { useSetFeedbackVisibilityModal } from "../hooks/use-set-feedback-visibility-modal";

interface Props {
    feedback: Feedback & { user: User };
}

export const FeedbackCard = ({ feedback }: Props) => {
    const { data: session } = useSession();

    const { open: openEditFeedbackModal } = useEditFeedbackModal();
    const { open: openDeleteFeedbackModal } = useDeleteFeedbackModal();
    const { open: openSetFeedbackVisibilityModal } = useSetFeedbackVisibilityModal();

    return (
        <div className="w-full flex gap-4 items-start group">
            <UserImage
                image={feedback.user.image}
                name={feedback.user.name}
            />
            <div className="flex flex-col flex-grow">
                <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <span>
                        {feedback.user.name}
                    </span>
                    <div className="size-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>
                        {format(feedback.createdAt, "PPP p")}
                    </span>
                    {feedback.isEdited && (
                        <>
                            <div className="size-1 shrink-0 rounded-full bg-muted-foreground" />
                            <span>Edited</span>
                        </>
                    )}
                </div>
                <p className="text-sm mt-0.5">
                    {feedback.content}
                </p>
                <FeedbackStars
                    starsCount={feedback.stars}
                    className="mt-2"
                />
            </div>
            {(session?.user?.id === feedback.userId || session?.user.role === "ADMIN") && (
                <div className="pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 flex justify-end items-center h-full">
                    {session.user.id === feedback.userId && (
                        <>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => openEditFeedbackModal(feedback)}
                            >
                                <PenIcon className="size-3.5" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => openDeleteFeedbackModal(feedback.id)}
                            >
                                <TrashIcon className="size-3.5" />
                            </Button>
                        </>
                    )}
                    {session.user.role === "ADMIN" && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="[&_svg]:size-3.5"
                            onClick={() => openSetFeedbackVisibilityModal(feedback)}
                        >
                            {feedback.isHidden ? <EyeIcon /> : <EyeOffIcon />}
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}