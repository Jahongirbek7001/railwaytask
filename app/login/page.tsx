"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Cookies from "js-cookie";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        if (data?.session?.access_token) {
            Cookies.set("sb_token", data.session.access_token, { expires: 1 });
            router.push("/dashboard/list-gu45");
        } else {
            setError("Sessiya yaratilmagan.");
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleLogin}
                className="w-96 p-6 bg-white shadow-md rounded-lg"
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>You don'y have an account ? <Link href={'/signup'} className=" text-blue-500">Sign Up</Link></p>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
