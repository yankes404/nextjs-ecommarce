import { type Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { CardFooter } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Sign Up - BuyAnything"
}

const Footer = () => {
    return (
        <CardFooter className="flex justify-center gap-1.5 text-sm w-full text-muted-foreground">
            Already have an account?{" "}
            <a href="/sign-in" className="font-medium transition hover:opacity-80 text-foreground">
                Sign In
            </a>
        </CardFooter>
    )
}

const SignUpPage = () => {
    return (
        <AuthCard
            title="Sign Up"
            description="Register to get up to 15% off on your first order"
            showSocials
            footer={Footer()}
        >
            <SignUpForm />
        </AuthCard>
    )
}
 
export default SignUpPage;