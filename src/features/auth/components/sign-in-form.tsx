'use client'

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/extensions/hint";

import { useLogin } from "../api/use-login";
import { useAuthError } from "../hooks/use-auth-error";
import { loginSchema, type LoginSchema } from "../schemas";

export const SignInForm = () => {
    const { mutate: login, isPending } = useLogin();
    const searchParams = useSearchParams();
    const error = useAuthError();

    const [showTwoFaCodeInput, setShowTwoFaCodeInput] = useState(false);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: searchParams.get("email") || "",
            password: "",
            twoFACode: ""
        }
    });

    const onSubmit = async (values: LoginSchema) => {
        if (showTwoFaCodeInput && !values.twoFACode) {
            toast.error("Please enter your 2FA code.");
            return;
        }

        login(values, {
            onSuccess: ({ twoFACodeSent }) => {
                if (twoFACodeSent) {
                    setShowTwoFaCodeInput(true);
                }
            }
        });
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl {...field}>
                                <Input
                                    type="password"
                                    placeholder="******"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormDescription>
                                <Link href="/reset-password" className="hover:text-black transition">
                                    Forgot password
                                </Link>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {showTwoFaCodeInput && (
                    <FormField
                        control={form.control}
                        name="twoFACode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    2FA Code
                                </FormLabel>
                                <FormControl {...field}>
                                    <Input
                                        placeholder="Check your inbox to get the code"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {error && (
                    <Hint variant="destructive">
                        {error.message}
                    </Hint>
                )}
                <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="mt-2"
                >
                    Login
                </Button>
            </form>
        </Form>
    )
}