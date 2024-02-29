import { EnvelopeOpenIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LoginWithEmail() {
    return (
        <Button asChild>
            <Link href="/signin">
                <>
                    <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
                </>
            </Link>
        </Button>
    )
}