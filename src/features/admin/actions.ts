'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
    const session = await auth();

    if (!session || !session.user) {
        return []
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });

    if (!user || user.role !== "ADMIN") {
        return []
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            twoFAEnabled: true,
            role: true
        }
    });

    return users;
}

export const makeUserAdmin = async (userId: string) => {
    try {
        const session = await auth();
    
        if (!session || !session.user) {
            return { error: "You are not logged in" }
        }
    
        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    
        if (!user) {
            return { error: "User does not exist" }
        }
    
        if (user.role !== "ADMIN") {
            return { error: "You are not allowed to do this" }
        }
    
        const userToChange = await prisma.user.findUnique({ where: { id: userId } });
    
        if (!userToChange) {
            return { error: "User does not exist" }
        }

        if (userToChange.role === "ADMIN") {
            return { error: "User already has this role" }
        }

        if (!userToChange.twoFAEnabled) {
            return { error: "User does not have 2FA enabled" }
        }
    
        await prisma.user.update({
            where: { id: userToChange.id },
            data: {
                role: "ADMIN"
            }
        });
    
        return { success: "You have successfully changed the role of the user" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}