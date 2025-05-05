import { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { AuthCard } from "@/features/auth/components/auth-card";
import { CreateResetPasswordTokenForm } from "@/features/auth/components/create-reset-password-token-form";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
    title: "Reset Password - BuyAnything"
}

interface Props {
    searchParams: Promise<{
        token: string | null;
    }>
}

const ResetPasswordPage = async ({ searchParams }: Props) => {
    const { token } = await searchParams;
    let existingToken = token ? await prisma.resetPasswordToken.findFirst({ where: { token } }) : null;

    if (existingToken && existingToken.expiresAt < new Date()) existingToken = null;

    return (
        <AuthCard
            title="Reset Password"
            description={existingToken ? "Reset your password" : "Enter your email address to reset your password"}
        >
            {existingToken ? <ResetPasswordForm /> : <CreateResetPasswordTokenForm />}
        </AuthCard>
    )
}
 
export default ResetPasswordPage;