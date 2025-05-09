import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { UserRole } from "@prisma/client"

interface Props {
    role: UserRole;
}

export const UserRoleBadge = ({ role }: Props) => {
    return (
        <Badge
            variant="secondary"
            className={cn("uppercase font-semibold text-muted-foreground", role === "ADMIN" && "bg-red-500 text-white")}
        >
            {role}
        </Badge>
    )
}