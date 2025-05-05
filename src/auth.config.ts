import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
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
        Google,
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
    callbacks: {
        jwt({ token, trigger, session }) {
            if (trigger === "update") {
                // console.log(session);

                if (session.email) {
                    token.email = session.email;
                }
                if (session.name) {
                    token.name = session.name;
                }
            }

            return token;
        },
        session({ session, token }) {
            if (token && token.sub) {
                session.user.id = token.sub;
            }

            return session;
        }
    },
    events: {
        async linkAccount ({ user }) {
            await prisma.user.update({ where: { id: user.id }, data: { emailVerified: new Date() } }).catch(() => {});
        }
    }
} satisfies NextAuthConfig