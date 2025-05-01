'use client'

import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useLogin } from "../api/use-login";
import { loginSchema, type LoginSchema } from "../schemas";

export const SignInForm = () => {
    const { mutate: login, isPending } = useLogin();
    const searchParams = useSearchParams();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: searchParams.get("email") || "",
            password: ""
        }
    });

    const onSubmit = async (values: LoginSchema) => {
        login(values);
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
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