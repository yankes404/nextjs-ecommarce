import { retrieveSessionStatus } from "@/features/payments/actions";
import { PaymentStatusCard } from "@/features/payments/components/payment-status-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface Props {
    searchParams: Promise<{ id: string | null }>;
}

const PaymentSuccessPage = async ({ searchParams }: Props) => {
    const { id } = await searchParams;

    const { status } = await retrieveSessionStatus(id ?? "");

    return (
        <div className="flex flex-col min-h-svh">
            <Header />
            <main className="p-4 flex justify-center items-start flex-grow">
                <PaymentStatusCard status={status} />
            </main>
            <Footer />
        </div>
    )
}
 
export default PaymentSuccessPage;