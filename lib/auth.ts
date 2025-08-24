import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Bu joyda foydalanuvchi tekshiruvini qilamiz (DB dan)
                if (
                    credentials?.email === "test@example.com" &&
                    credentials?.password === "123456"
                ) {
                    return { id: "1", email: credentials.email };
                }
                return null;
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login"
    }
};
