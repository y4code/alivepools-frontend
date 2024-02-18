// import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DashboardPage() {

    return <main className="flex min-h-screen flex-col items-center p-24">
        Hello Alivepools
        <InputWithButton />
    </main>
}

export function InputWithButton() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Enter your domain" />
            <Button type="submit">Check</Button>
        </div>
    )
}

