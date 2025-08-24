"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ProfilePage() {
    const [fullname, setFullname] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // foydalanuvchi ma'lumotlarini olish
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setEmail(user.email || "");
                setFullname(user.user_metadata.fullname || "");
                setCompanyname(user.user_metadata.companyname || "");
            }
        };
        getUser();
    }, []);

    const handleUpdate = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // user metadata ni update qilish
        const { error } = await supabase.auth.updateUser({
            data: {
                fullname: fullname,
                companyname: companyname,
            },
        });

        if (error) {
            alert("Error updating profile: " + error.message);
        } else {
            alert("Profile updated!");
        }
    };

    return (
        <div className="p-6 w-[90%] lg:w-[50%] m-auto">
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>

            <div className="mb-3">
                <label>Email (cannot change)</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded bg-gray-100"
                />
            </div>

            <div className="mb-3">
                <label>Full Name</label>
                <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div className="mb-3">
                <label>Company Name</label>
                <input
                    type="text"
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>

            <Link href={'/dashboard'}>
                <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update
                </button>
            </Link>
        </div>
    );
}
