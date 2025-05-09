import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Props {
    image?: string | null;
    name?: string | null;
    className?: string;
    imageClassName?: string;
    fallbackClassName?: string;
}

export const UserImage = ({
    image,
    name,
    className,
    imageClassName,
    fallbackClassName
}: Props) => {
    return (
        <Avatar className={cn("size-10 border shadow-sm", className)}>
            <AvatarImage
                src={image ?? ""}
                alt={name ?? ""}
                className={imageClassName}
            />
            <AvatarFallback className={cn("text-sm font-medium bg-foreground/5 select-none", fallbackClassName)}>
                {name?.charAt(0).toUpperCase() ?? "?"}
            </AvatarFallback>
        </Avatar>
    )
}