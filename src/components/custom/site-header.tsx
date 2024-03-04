'use client';
import Link from "next/link";
import MainNav from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import { Icons } from "./icons";
import useUser from "@/hooks/use-user";
import { LoginWithEmail } from "./login-with-email";
import { useEffect } from "react";

export default function SiteHeader() {
    const { isLoggedIn, isLoading, user, clearUser } = useUser();

    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Icons.alivepools className="h-12 w-12" />
                </Link>
                <MainNav />
                {isLoading ?
                    <div className="ml-auto">Loading...</div>
                    : <div className="ml-auto flex items-center space-x-4">
                        <Search></Search>
                        {isLoggedIn ? <UserNav user={user} clearUser={clearUser} /> : <LoginWithEmail />}
                    </div>
                }
            </div>
        </header>
    )
}