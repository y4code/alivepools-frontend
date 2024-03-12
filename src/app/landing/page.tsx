'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createTask, getDomain } from "@/lib/api";
import { BeautifulBackground } from "@/components/custom/beautiful-background";
import useSWRMutation from "swr/mutation";
import { getErrorMessage } from "../../interfaces/errors";
import { CheckIcon } from "@radix-ui/react-icons";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { Res } from "@/interfaces/generic_res";
import { toast } from "@/components/ui/use-toast";
import { CreateTaskPayload, Task, TaskStatus } from "@/interfaces/task";

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
        <div className="flex flex-col w-full items-center space-y-4">
            <div className="flex space-x-2">
                <Input type="email" placeholder="Enter your domain" value={domain} onChange={e => setDomain(e.target.value)} />
                <Button disabled={isMutating}
                    onClick={() => { trigger() }} type="submit">
                    Check
                </Button>
            </div>
            <div className="flex w-full min-h-6 items-center flex-col">
                {isMutating && <div>loading...</div>}
                {error && <div>failed to load</div>}
                {!isMutating && data && (
                    <>
                        {data?.is_success ?
                            <InfoCard website={domain} />
                            : getErrorMessage(data?.code)}
                    </>
                )}
            </div>
        </div>
    )
}

function InfoCard({ website }: { website: string }) {
    const router = useRouter();
    const args: CreateTaskPayload = {
        domain: website,
        send_frequency: 300,
        status: TaskStatus.Active,
    }
    const options = {
        onSuccess: (data: Res<Task>) => { data.is_success ? router.push('./dashboard') : toast({ title: "Failed to create task", description: data.message }) },
        onError: (error: Error) => { toast({ title: "Failed to create task", description: error.message }) }
    };
    const { data, error, isMutating, trigger } = useSWRMutation({ url: '/task', args }, createTask, options)
    const { isLoggedIn } = useUser();

    const handleSubscribe = () => {
        if (!isLoggedIn) {
            router.push('/signin');
            return;
        }
        trigger();
    }

    return (
        <div className="flex flex-row justify-between items-center w-full max-w-screen-md space-y-2 rounded-lg p-6 animate-fade-in">
            <div className="flex flex-row space-x-2">
                <CheckIcon className="w-6 h-6" />
                <p>{website}</p>
            </div>
            <Button disabled={isMutating}
                onClick={() => { handleSubscribe() }} type="submit">
                Subscribe
            </Button>
        </div>
    )
}