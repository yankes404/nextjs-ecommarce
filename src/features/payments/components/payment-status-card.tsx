import Link from "next/link";
import { HomeIcon } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { StripePaymentStatus } from "../types";

interface Props {
    status: StripePaymentStatus | null;
}

export const PaymentStatusCard = ({ status }: Props) => {
    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-xl text-center">
                    {status === "complete" && "Payment completed"}
                    {status === "expired" && "Payment expired"}
                    {status === "open" && "Pending payment"}
                    {!status && "Payment not found"}
                </CardTitle>
                {status && (
                <CardDescription className="text-center">
                    {status === "complete" && "Your payment was successful. You should receive an email confirmation with all details of your order"}
                    {status === "expired" && "Your payment was expired. If the money was taken from your account, it is necessary to contact our support."}
                    {status === "open" && "Your payment is still pending"}
                </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <Button className="w-full" asChild>
                    <Link href="/">
                        <HomeIcon />
                        Go to home
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}