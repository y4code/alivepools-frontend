'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Message } from "../interfaces/model";
import useSWR from "swr";
import { API_HOST, fetcher } from "@/lib/api";

export default function LandingPage() {
    return <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
        <BeautifulBackground />
        <p className="">欢迎李姐重金注资一百块！</p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Alivepools, always alive</h1>
        <InputWithButton />
    </main>
}

export function InputWithButton() {
    const [domain, setDomain] = useState('');
    // TODO: to make check button show spinner while fetching, consider using Jotai https://jotai.org
    // const [result, setResult] = useState<Message | null>({ message: '' });
    const [queryDomain, setQueryDomain] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDomain(e.target.value);
    }
    const handleCheck = () => {
        setQueryDomain(domain);
    }

    return (
        <div className="flex flex-col w-full max-w-sm items-center space-y-2">
            <div className="flex space-x-2">
                <Input type="email" placeholder="Enter your domain" value={domain} onChange={handleInputChange} />
                <Button onClick={handleCheck} type="submit">Check</Button>
            </div>
            <div className="flex w-full max-w-sm min-h-6 items-center space-x-2">
                <Result queryDomain={queryDomain} />
            </div>
        </div>
    )
}

function Result({ queryDomain }: { queryDomain: string }) {
    const shouldFetch = queryDomain.trim() !== '';
    const { data, error, isLoading } = useSWR<Message>(shouldFetch
        ? API_HOST + '/domain?website=' + queryDomain
        : null, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return <div>{data?.message}</div>
}

function BeautifulBackground() {
    return <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
    >
        <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
        ></div>
    </div>

}