import { type Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const metadata: Metadata = {
    title: "Sign Up - BuyAnything"
}

const SignUpPage = () => {
    return (
        <AuthCard
            title="Sign Up"
            description="Register to get up to 15% off on your first order"
            showSocials
        >
            <SignUpForm />
        </AuthCard>
    )
}
 
export default SignUpPage;