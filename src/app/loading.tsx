import { LoaderIcon } from "lucide-react";

const Loading = () => {
    return (
        <div className="w-screen h-svh overflow-hidden grid place-items-center">
            <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
        </div>
    )
}
 
export default Loading;