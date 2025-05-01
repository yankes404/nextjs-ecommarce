import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const AuthCard = ({
    title,
    description,
    children
}: Props) => {
    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-xl text-center">
                    {title}
                </CardTitle>
                {description && (
                    <CardDescription className="text-center">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}