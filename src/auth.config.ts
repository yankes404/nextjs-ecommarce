import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export default {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in"
    },
    providers: [
        Credentials({
            credentials: {
                email: { type: "email", label: "Email" },
                password: { type: "password", label: "Password" },
            },
            async authorize ({ email, password }) {
                if (!email || !password) return null;
                if (typeof email !== "string" || typeof password !== "string") return null;

                const user = await prisma.user.findUnique({ where: { email } });

                if (user && user.password) {
                    const isPasswordsCompare = await bcrypt.compare(password, user.password);
                    if (isPasswordsCompare) return user;
                }

                return null;      
            }
        })
    ],
} satisfies NextAuthConfig