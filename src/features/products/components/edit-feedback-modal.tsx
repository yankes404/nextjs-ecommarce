'use client'

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { FeedbackStarsPicker } from "./feedback-stars-picker";
import { feedbackSchema, type FeedbackSchema } from "../schemas";
import { useEditFeedbackModal } from "../hooks/use-edit-feedback-modal";
import { useEditFeedback } from "../api/use-edit-feedback";

export const EditFeedbackModal = () => {
    const { isOpen, feedback, open, close } = useEditFeedbackModal();

    const onOpenChange = (isOpen: boolean) => (isOpen && feedback) ? open(feedback) : close();

    const { mutate, isPending } = useEditFeedback();

    const form = useForm<FeedbackSchema>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            stars: 5,
            content: ""
        }
    });

    const onSubmit = (values: FeedbackSchema) => {
        if (!feedback) {
            toast.error("Feedback not found");
            return;
        }

        mutate({
            feedbackId: feedback.id,
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

    useEffect(() => {
        if (isOpen) {
            if (feedback) {
                form.setValue("stars", feedback.stars);
                form.setValue("content", feedback.content);
            }
        } else {
            form.reset();
        }
    }, [isOpen, feedback, form]);

    return (
        <Dialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        Edit Feedback
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Edit your feedback
                    </DialogDescription>
                </DialogHeader>
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
                            Save
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}