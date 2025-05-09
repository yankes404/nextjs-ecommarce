'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { useMakeUserAdminModal } from "../hooks/use-make-user-admin-modal";
import { useMakeUserAdmin } from "../api/use-change-user-role";

export const MakeUserAdminModal = () => {
    const { mutate, isPending } = useMakeUserAdmin();

    const { isOpen, open, close, userId } = useMakeUserAdminModal();

    const onOpenChange = (isOpen: boolean) => (isOpen && userId) ? open(userId) : (!isPending && close());

    const makeAdmin = () => userId && mutate(userId);

    return (
        <AlertDialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will make the user an admin.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={makeAdmin}
                        disabled={isPending}
                    >
                        Make Admin
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}