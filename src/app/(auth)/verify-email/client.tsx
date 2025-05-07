'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { HomeIcon, LoaderIcon } from "lucide-react";

import { AuthCard } from "@/features/auth/components/auth-card";
import { useVerifyEmail } from "@/features/auth/api/use-verify-email";
import { Button } from "@/components/ui/button";

interface Message {
    type: "success" | "error";
    content: string;
}

interface Props {
    token: string;
}

export const VerifyEmailClient = ({ token }: Props) => {
    const { mutate, isPending } = useVerifyEmail();
    const [message, setMessage] = useState<Message | null>(null);

    useEffect(() => {
        if (!token) return;
        mutate(token, {
            onSuccess: ({ success, error }) => {
                setMessage({ type: success ? "success" : "error", content: success || error || "Something went wrong" });
            }
        })
    }, [token, mutate]);

    return (
        <AuthCard
            title={message ? message.type === "success" ? "Email Verified" : "Email Verification Failed" : "Email Verification"}
            description={message?.content}
        >
            <div className="flex justify-center w-full">
                {isPending && <LoaderIcon className="size-4 shrink-0 animate-spin text-muted-foreground" />}
                {!isPending && (
                    <Button
                        size="lg"
                        className="w-full md:w-auto"
                        asChild
                    >
                        <Link href="/">
                            <HomeIcon />
                            Home
                        </Link>
                    </Button>
                )}
            </div>
        </AuthCard>
    )
}