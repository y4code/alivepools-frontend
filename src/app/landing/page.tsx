'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { getDomain } from "@/lib/api";
import { BeautifulBackground } from "@/components/custom/beautifulBackground";
import useSWRMutation from "swr/mutation";
import { getErrorMessage } from "../interfaces/errors";

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
    const { data, error, isMutating, trigger } = useSWRMutation({ url: '/domain', args: { website: domain } }, getDomain);

    return (
        <div className="flex flex-col w-full max-w-sm items-center space-y-2">
            <div className="flex space-x-2">
                <Input type="email" placeholder="Enter your domain" value={domain} onChange={e => setDomain(e.target.value)} />
                <Button disabled={isMutating}
                    onClick={() => {
                        trigger()
                    }} type="submit">Check</Button>
            </div>
            <div className="flex w-full max-w-sm min-h-6 items-center space-x-2">
                {isMutating && <div>loading...</div>}
                {error && <div>failed to load</div>}
                {!isMutating && data && (
                    <div>
                        {data?.is_success ? "Website is available" : getErrorMessage(data?.code)}
                    </div>
                )}
            </div>
        </div>
    )
}