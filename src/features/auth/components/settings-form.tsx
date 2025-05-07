'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { settingsSchema, type SettingsSchema } from "../schemas";
import { useUpdateSettings } from "../api/use-update-settings";

interface Props {
    defaultValues: SettingsSchema
}

export const SettingsForm = ({ defaultValues }: Props) => {
    const { mutate, isPending } = useUpdateSettings();

    const form = useForm<SettingsSchema>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            password: "",
            ...defaultValues
        }
    });

    const onSubmit = (values: SettingsSchema) => {
        mutate(values);
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
                                    placeholder="Leave blank if you don't want to change"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="twoFAEnabled"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Two Factor Authentication
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button
                        type="submit"
                        size="lg"
                        className="px-24 w-full md:w-auto"
                        disabled={isPending}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    )
}