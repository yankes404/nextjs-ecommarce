import { useSearchParams } from "next/navigation";

const errors: Record<string, string> = {
    "OAuthAccountNotLinked": "Sign in with the same provider that you used first time",
}

function getError (error: string) {
    return error in errors ? errors[error] : "Something went wrong";
}

export const useAuthError = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return error ? {
        code: getError(error),
        message: getError(error),
    } : null;
}