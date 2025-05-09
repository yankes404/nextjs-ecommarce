import { Metadata } from "next";

import { UsersClient } from "./client";

export const metadata: Metadata = {
    title: "Users - BuyAnything"
}

const UsersPage = () => {
    return (
        <UsersClient />
    )
}
 
export default UsersPage;