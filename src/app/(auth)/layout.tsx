import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface Props {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div className="min-h-svh flex flex-col">
          <Header />
          <main className="py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 grid place-items-center ">
            {children}
          </main>
          <Footer />
        </div>
    )
}
 
export default AuthLayout;