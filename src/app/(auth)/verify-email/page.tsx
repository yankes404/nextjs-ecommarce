import { Metadata } from "next";

import { VerifyEmailClient } from "./client";

export const metadata: Metadata = {
    title: "Verify Email - BuyAnything"
}

interface Props {
    searchParams: Promise<{ token: string }>;
}

const VerifyEmailPage = async ({ searchParams }: Props) => {
    const { token } = await searchParams;

    return (
        <VerifyEmailClient token={token} />
    )
}
 
export default VerifyEmailPage;