'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/extensions/hint";

import { useRegister } from "../api/use-register";
import { useAuthError } from "../hooks/use-auth-error";
import { registerSchema, type RegisterSchema } from "../schemas";

export const SignUpForm = () => {
    const { mutate: register, isPending } = useRegister();
    const error = useAuthError();

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    });

    const onSubmit = async (values: RegisterSchema) => {
        register(values);
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl {...field}>
                                <Input
                                    placeholder="John Doe"
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
                    Register
                </Button>
            </form>
        </Form>
    )
}