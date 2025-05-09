import { NextAuthConfig, CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import * as bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { generateCode } from "@/lib/utils";
import { User, UserRole } from "@prisma/client";

class EmailNotVerifiedError extends CredentialsSignin {
    code = "EmailNotVerifiedError"
}

class EmailVerificationTokenSent extends CredentialsSignin {
    code = "EmailVerificationTokenSent"
}  

class TwoFACodeSent extends CredentialsSignin {
    code = "TwoFACodeSent"
}

declare module "next-auth" {
    interface Session {
      user: {
        role: string
      } & DefaultSession["user"]
    }
    interface User {
      role: UserRole
    }
}

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
                twoFACode: { type: "text", label: "2FA Code" }
            },
            async authorize ({ email, password, twoFACode: code }) {
                if (!email || !password) return null;
                if (typeof email !== "string" || typeof password !== "string") return null;

                const twoFACode = code as string | null;

                const user = await prisma.user.findUnique({ where: { email }, include: { twoFACode: true } });

                if (!user?.emailVerified) { // && process.env.NODE_ENV === "production"
                    const existingToken = await prisma.emailVerificationToken.findFirst({ where: { email } });
                    if (!existingToken || existingToken.expiresAt < new Date()) {
                        await prisma.emailVerificationToken.deleteMany({ where: { email } });
                        await prisma.emailVerificationToken.create({
                            data: {
                                email,
                                expiresAt: new Date(Date.now() + 1000 * 60 * 15)
                            }
                        });

                        // TODO: Send verification email

                        throw new EmailVerificationTokenSent();
                    }

                    throw new EmailNotVerifiedError();
                }

                if (!user || !user.password) return null;

                const isPasswordCompare = await bcrypt.compare(password, user.password);
                if (!isPasswordCompare) return null;

                if (user.twoFAEnabled) {
                    if (!user.twoFACode || user.twoFACode.expiresAt < new Date()) {
                        await prisma.twoFACode.deleteMany({ where: { userId: user.id } });

                        const code = generateCode();
                        const expirationDate = new Date(Date.now() + 1000 * 60 * 15);

                        await prisma.twoFACode.create({
                            data: {
                                userId: user.id,
                                code,
                                expiresAt: expirationDate
                            }
                        });

                        // TODO: Send email
                        
                        throw new TwoFACodeSent();
                    }

                    if (!twoFACode) {
                        throw new TwoFACodeSent();
                    }

                    if (user.twoFACode.code !== twoFACode) {
                        return null;
                    }

                    await prisma.twoFACode.deleteMany({ where: { userId: user.id } });
                }

                return user;
            }
        })
    ],
    callbacks: {
        jwt({ token, trigger, session, user }) {
            if (user) {
                token.role = (user as User).role;
            }

            if (trigger === "update") {
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
            if (token) {
                if (token.sub) {
                    session.user.id = token.sub;
                }

                if (token.role) {
                    session.user.role = token.role as UserRole;
                }
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