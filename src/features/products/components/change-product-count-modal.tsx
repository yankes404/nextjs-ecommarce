import { useEffect, useState } from "react";

import { toast } from "sonner";
import { isNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Props {
    initialCount: number;
    onCountChange: (count: number) => void;
    children: React.ReactNode;
}

export function ChangeProductCountModal({
    initialCount,
    onCountChange,
    children
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const [count, setCount] = useState<number | null>(initialCount);

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.valueAsNumber;
        const newCount = isNumber(value) ? value : null;

        setCount(newCount);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!count || count <= 0 || count > 99) {
            toast.error("Product count must be between 1 and 99");
            return;
        }

        if (count === initialCount) {
            toast.error("Product count must be different than initial count");
            return;
        }

        setIsOpen(false);
        onCountChange(count);
    }

    useEffect(() => {
        setCount(initialCount);
    }, [initialCount]);

    return (
        <Dialog
            defaultOpen={false}
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">Change Product Count</DialogTitle>
                    <DialogDescription className="text-center">You can change product count here.</DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4"
                >
                    <Input
                        type="number"
                        placeholder="You have to enter a number between 1 and 99"
                        min={1}
                        max={99}
                        value={count ?? ""}
                        onChange={handleCountChange}
                    />
                    <Button
                        type="submit"
                        size="lg"
                        className="mt-2"
                    >
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}