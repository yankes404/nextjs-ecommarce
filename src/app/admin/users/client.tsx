'use client'

import { LoaderIcon } from "lucide-react";

import { useUsers } from "@/features/admin/api/use-users";
import { DataTable } from "@/features/admin/components/data-table";
import { MakeUserAdminModal } from "@/features/admin/components/make-user-admin-modal";
import { userColumns } from "@/features/admin/components/user-columns";

export const UsersClient = () => {
    const { data: users, isLoading } = useUsers();

    return (
        <>
            <MakeUserAdminModal />
            <h1 className="text-2xl font-semibold">
                Users
            </h1>
            {isLoading ? (
                <div className="w-full flex-grow flex justify-center items-center">
                    <LoaderIcon className="size-4 shrink-0 text-muted-foreground animate-spin" />
                </div>
            ): (
                <DataTable
                    data={users ?? []}
                    columns={userColumns}
                    searchInput={{ accessorKey: "email", placeholder: "Search by email..." }}
                />
            )}
        </>
    )
}