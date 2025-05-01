'use server'

import { AuthError } from "next-auth";
import * as bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

import { loginSchema, type LoginSchema, registerSchema, type RegisterSchema } from "./schemas";

export const register = async (values: RegisterSchema) => {
    try {
        const validatedFields = registerSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
        
        const {
            email,
            name,
            password
        } = validatedFields.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            return { error: "User already exists" }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        return { success: "You have been successfully registered" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const login = async (values: LoginSchema) => {
    try {
        const validatedFields = loginSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }

        const {
            email,
            password
        } = validatedFields.data;

        await signIn("credentials", { email, password, redirect: false });
        
        return { success: "You have been successfully logged in" }
    } catch (error) {
        console.error(error);

        if (error instanceof AuthError) {
            // @ts-expect-error: error might not be typed as CredentialsSignin
            if (error.type === "CredentialsSignin")  {
                return { error: "Invalid Credentials" }
            }
        }

        return { error: "Something went wrong" }
    }
}