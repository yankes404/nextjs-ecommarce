'use client'

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
    title: string;
    description?: string;
    showSocials?: boolean;
    children: React.ReactNode;
    footer?: React.ReactElement;
}

export const AuthCard = ({
    title,
    description,
    showSocials = false,
    children,
    footer
}: Props) => {
    const searchParams = useSearchParams();

    const loginByProvider = (provider: "google") => {
        const callbackUrl = searchParams.get('callback_url') ?? DEFAULT_LOGIN_REDIRECT;
        signIn(provider, { callbackUrl });
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-xl text-center">
                    {title}
                </CardTitle>
                {description && (
                    <CardDescription className="text-center">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                {children}
                {showSocials && (
                    <>
                        <div className="relative w-full my-6">
                            <Separator />
                            <span className="inline-block text-sm uppercase text-muted-foreground font-medium absolute top-1/2 left-1/2 -translate-1/2 bg-card px-8">
                                Or
                            </span>
                        </div>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => loginByProvider("google")}
                            className="w-full"
                        >
                            <FcGoogle />
                        </Button>
                    </>
                )}
            </CardContent>
            {footer}
        </Card>
    )
}