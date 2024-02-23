'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { Message, Res, getErrorMessage } from "../interfaces/model";
import useSWR from "swr";
import { getDomain } from "@/lib/api";
import { BeautifulBackground } from "@/components/custom/beautifulBackground";

export default function LandingPage() {
    return <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
        <BeautifulBackground />
        <p className="">欢迎李姐重金注资一百块！</p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Alivepools, always alive</h1>
        <InputWithButton />
    </main>
}

function InputWithButton() {
    const [domain, setDomain] = useState('');
    const [queryDomain, setQueryDomain] = useState('');
    const shouldFetch = queryDomain.trim() !== '';
    const { data, error, isLoading } = useSWR<Res<Message>>(shouldFetch ? queryDomain : null, getDomain);
    console.log(data)
    return (
        <div className="flex flex-col w-full max-w-sm items-center space-y-2">
            <div className="flex space-x-2">
                <Input type="email" placeholder="Enter your domain" value={domain} onChange={e => setDomain(e.target.value)} />
                <Button onClick={() => setQueryDomain(domain)} type="submit">Check</Button>
            </div>
            <div className="flex w-full max-w-sm min-h-6 items-center space-x-2">
                {isLoading && <div>loading...</div>}
                {error && <div>failed to load</div>}
                {data && (
                    <div>
                        {data.is_success ? "Website is available" : getErrorMessage(data.code)}
                    </div>
                )}
            </div>
        </div>
    )
}

