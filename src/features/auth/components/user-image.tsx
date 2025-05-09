import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
    image?: string | null;
    name?: string | null;
}

export const UserImage = ({
    image,
    name
}: Props) => {
    return (
        <Avatar className="size-10 border shadow-sm">
            <AvatarImage
                src={image ?? ""}
                alt={name ?? ""}
            />
            <AvatarFallback className="text-sm font-medium bg-foreground/5 select-none">
                {name?.charAt(0).toUpperCase() ?? "?"}
            </AvatarFallback>
        </Avatar>
    )
}