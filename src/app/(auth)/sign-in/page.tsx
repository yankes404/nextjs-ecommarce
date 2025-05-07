import { type Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { CardFooter } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Sign In - BuyAnything"
}

const Footer = () => {
    return (
        <CardFooter className="flex justify-center gap-1.5 text-sm w-full text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="font-medium transition hover:opacity-80 text-foreground">
                Sign Up
            </a>
        </CardFooter>
    )
}

const SignUpPage = () => {
    return (
        <AuthCard
            title="Sign In"
            description="Sign in to your account"
            showSocials
            footer={Footer()}
        >
            <SignInForm />
        </AuthCard>
    )
}
 
export default SignUpPage;