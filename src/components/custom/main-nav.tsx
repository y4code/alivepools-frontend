import Link from "next/link";

export default function MainNav() {
    return (
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Overview
            </Link>
            <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Dashboard
            </Link>
        </nav>
    )
}