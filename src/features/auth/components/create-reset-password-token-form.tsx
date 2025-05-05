'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateResetPasswordToken } from "../api/use-create-reset-password-token";
import { emailSchema, EmailSchema } from "../schemas";

export const CreateResetPasswordTokenForm = () => {
    const { mutate: createToken, isPending } = useCreateResetPasswordToken();

    const form = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = async (values: EmailSchema) => {
        createToken(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl {...field}>
                                <Input
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="mt-2"
                >
                    Reset Password
                </Button>
            </form>
        </Form>
    )
}