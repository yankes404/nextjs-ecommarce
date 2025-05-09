'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateFeedback } from "@/features/products/api/use-create-feedback";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { FeedbackStarsPicker } from "./feedback-stars-picker";
import { feedbackSchema, type FeedbackSchema } from "../schemas";
import { useCreateFeedbackModal } from "../hooks/use-create-feedback-modal";

interface Props {
    productId: string;
}

export const CreateFeedbackModal = ({
    productId
}: Props) => {
    const { data: session } = useSession();

    const { isOpen, open, close } = useCreateFeedbackModal();

    const onOpenChange = (isOpen: boolean) => isOpen ? open() : close();

    const { mutate, isPending } = useCreateFeedback();

    const form = useForm<FeedbackSchema>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            stars: 5,
            content: ""
        }
    });

    const onSubmit = (values: FeedbackSchema) => {
        mutate({
            productId,
            values
        }, {
            onSuccess: ({ success }) => {
                if (success) {
                    form.reset();
                    close();
                }
            }
        })
    }

    return (
        <Dialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        {session?.user ? "Give Feedback" : "You're not logged in"}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {session?.user ? "Give us your feedback" : "Sign in to give us your feedback"}
                    </DialogDescription>
                </DialogHeader>
                {session?.user ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="stars"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Stars
                                        </FormLabel>
                                        <FeedbackStarsPicker
                                            stars={field.value}
                                            disabled={isPending}
                                            onStarsChange={field.onChange}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Content
                                        </FormLabel>
                                        <FormControl {...field}>
                                            <Textarea
                                                placeholder="Enter your feedback here..."
                                                className="h-40 min-h-24 max-h-52"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className="mt-2"
                                disabled={isPending}
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                ): (
                    <Button
                        size="lg"
                        asChild
                    >
                        <Link href={`/sign-in?callback_url=/products/${productId}`}>
                            Sign in
                        </Link>
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    )
}