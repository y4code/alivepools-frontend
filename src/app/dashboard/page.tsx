"use client";
import { BeautifulBackground } from "@/components/custom/beautiful-background";
import useSWR from 'swr';
import { getTasks } from "@/lib/api";

export default function DashboardPage() {
    const { data, error, isLoading } = useSWR({ url: '/tasks' }, getTasks);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
            <BeautifulBackground />
            <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">Task List</h2>
                {error && <div>Failed to load tasks</div>}
                {isLoading && <div>Loading...</div>}
                {data && data.data.length > 0 ? (
                    <ul>
                        {data.data.map((task) => (
                            <li key={task.id} className="border-b border-gray-200 p-4">
                                <h3 className="font-bold">{task.domain} - {task.status} - {task.created_at}</h3>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks found.</p>
                )}
            </div>
        </main>
    );
}