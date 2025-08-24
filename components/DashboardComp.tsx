"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { CiBoxList } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

export default function DashboardComp() {
    const router = useRouter();
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Navigatsiyani render bosqichida emas, effekt ichida amalga oshiramiz
    useEffect(() => {
        if (!loading && !session) {
            router.push("/login");
        }
    }, [loading, session, router]);

    if (loading) return <div>Loading...</div>;
    if (!session) return null; // Router push bo'layotgan paytda hech nima ko'rsatmaymiz

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // logoutdan keyin login sahifasiga qaytaradi
    };

    return (
        <div className="p-6 flex flex-col relative h-full">
            <div className="flex justify-center items-center gap-5">
                <Link href={'/dashboard/profile'}>
                    <div className="w-[40px] h-[40px] cursor-pointer rounded-full border border-gray-300 flex justify-center items-center text-xl">
                        <span>{session.user.user_metadata.fullname[0]}</span>
                    </div>
                </Link>
                <div className="text-lg">
                    <span>{session.user.user_metadata.fullname}</span>
                </div>
            </div>
            <hr className="text-gray-300 my-5" />
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <CiBoxList />
                    <Link href={'/dashboard/list-gu45'}>List GU-45</Link>
                </div>
                <div className="flex items-center gap-3">
                    <FaUser />
                    <Link href={'/dashboard/profile'}>Profile</Link>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="absolute bottom-5 mb-10 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex justify-center items-center gap-3"
            >
                <IoLogOut />
                Logout
            </button>
        </div>
    );
}