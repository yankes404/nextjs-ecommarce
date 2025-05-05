import { type Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = {
    title: "Sign In - BuyAnything"
}

const SignUpPage = () => {
    return (
        <AuthCard
            title="Sign In"
            description="Sign in to your account"
            showSocials
        >
            <SignInForm />
        </AuthCard>
    )
}
 
export default SignUpPage;