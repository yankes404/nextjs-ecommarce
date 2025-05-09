import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="p-9 h-svh overflow-y-auto flex-grow flex flex-col">
                <SidebarTrigger className="md:hidden mb-3" />
                {children}
            </main>
        </SidebarProvider>
    )
}
 
export default AdminLayout;