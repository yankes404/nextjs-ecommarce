'use server'

import { AuthError } from "next-auth";
import * as bcrypt from "bcryptjs";

import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

import { emailSchema, type EmailSchema, loginSchema, type LoginSchema, passwordSchema, type PasswordSchema, registerSchema, type RegisterSchema, settingsSchema, type SettingsSchema } from "./schemas";

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

export const getSettings = async () => {
    try {
        const session = await auth();
        // console.log(session?.user)

        if (!session || !session.user) {
            return { error: "You are not logged in" }
        }
    
        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    
        if (!user) {
            return { error: "User does not exist" }
        }
    
        const settings = {
            name: user.name,
            email: user.email,
            twoFA: user.twoFA
        }
    
        return { settings }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const updateSettings = async (values: SettingsSchema) => {
    try {
        const session = await auth();
    
        if (!session || !session.user) {
            return { error: "You are not logged in" }
        }
    
        const validatedFields = settingsSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
    
        const {
            name,
            email,
            password,
            twoFA
        } = validatedFields.data;
    
        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    
        if (!user) {
            return { error: "User does not exist" }
        }
    
        const isEmailChanged = email !== user.email;
    
        if (isEmailChanged) {
            await prisma.order.updateMany({ where: { customerEmail: user.email }, data: { customerEmail: email } });

            // TODO: Send email confirmation
        }
    
        let hashedPassword: string | undefined = undefined;
    
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
    
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                email,
                password: hashedPassword,
                twoFA
            }
        });
    
        return { success: "You have been successfully updated" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const createResetPasswordToken = async (values: EmailSchema) => {
    try {
        const validatedFields = emailSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
    
        const {
            email
        } = validatedFields.data;
    
        const user = await prisma.user.findUnique({ where: { email } });
    
        if (!user) {
            return { error: "User does not exist" }
        }

        const existingToken = await prisma.resetPasswordToken.findFirst({ where: { userId: user.id } });
    
        if (existingToken) {
            if (existingToken.expiresAt > new Date()) {
                return { error: "You have already requested a password reset" }
            }
    
            await prisma.resetPasswordToken.deleteMany({ where: { userId: user.id } });
        }
    
        await prisma.resetPasswordToken.create({
            data: {
                userId: user.id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 15)
            }
        });
    
        // TODO: Send email
    
        return { success: "We have sent you an email with a link to reset your password" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}

export const resetPassword =async  (token: string, values: PasswordSchema) => {
    try {
        const validatedFields = passwordSchema.safeParse(values);
    
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
    
        const {
            password
        } = validatedFields.data;
    
        const existingToken = await prisma.resetPasswordToken.findFirst({ where: { token } });
    
        if (!existingToken) {
            return { error: "Invalid token" }
        }
    
        if (existingToken.expiresAt < new Date()) {
            return { error: "Token has expired" }
        }
    
        const user = await prisma.user.findUnique({ where: { id: existingToken.userId } });
    
        if (!user) {
            return { error: "User does not exist" }
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword
            }
        });
    
        await prisma.resetPasswordToken.deleteMany({ where: { userId: user.id } });
    
        return { success: "You have successfully reset your password" }
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" }
    }
}