'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { useUserSettings } from "../api/use-user-settings";
import { SettingsForm } from "./settings-form";
import { LoaderIcon } from "lucide-react";
import { Hint } from "@/components/ui/extensions/hint";

export const SettingsCard = () => {
    const { data, isPending } = useUserSettings();

    const shouldDisplayLoading = isPending;
    const shuldDisplayNoDataError = !shouldDisplayLoading && !data;
    const shuldDisplayError = !shouldDisplayLoading && data && data.error
    const shuldDispalyForm = !shouldDisplayLoading && data && !data.error && data.settings;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-center">Settings</CardTitle>
                <CardDescription className="text-center">
                    Manage your account settings
                </CardDescription>
            </CardHeader>
            <CardContent>
                {shouldDisplayLoading && <LoaderIcon className="size-4 mx-auto animate-spin" />}
                {shuldDisplayNoDataError && <Hint variant="destructive">Something went wrong. Please try again later</Hint>}
                {shuldDisplayError && <Hint variant="destructive">{data.error}</Hint>}
                {shuldDispalyForm && <SettingsForm defaultValues={data.settings} />}
            </CardContent>
        </Card>
    )
}