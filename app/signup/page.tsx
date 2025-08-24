"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [errorM, setErroM] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // 1. Avval auth ga user qo‘shamiz
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    fullname: fullname,
                    companyname: companyname,
                }
            }
        });

        if (error) {
            setErroM(error.message)
            console.error(error.message);
        } else {
            router.push("/login");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSignup}
                className="w-96 p-6 bg-white shadow-md rounded-lg"
            >
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border p-2 mb-3 rounded"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full border p-2 mb-3 rounded"
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Sign Up
                </button>
                {
                    errorM.length > 0 ?
                        <p className=" text-red-500">{errorM} <span className=" text-blue-500 border-b border-blue-500"><Link href={"/login"}>Log in</Link></span></p> : <></>
                }
            </form>
        </div>
    );
}
