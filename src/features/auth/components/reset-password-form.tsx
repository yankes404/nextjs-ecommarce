'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useResetPassword } from "../api/use-reset-password";
import { passwordSchema, PasswordSchema } from "../schemas";

export const ResetPasswordForm = () => {
    const { mutate: resetPassword, isPending } = useResetPassword();

    const form = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit = async (values: PasswordSchema) => {
        resetPassword(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                New Password
                            </FormLabel>
                            <FormControl {...field}>
                                <Input
                                    type="password"
                                    placeholder="********"
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