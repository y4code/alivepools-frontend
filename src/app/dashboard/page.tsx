"use client";
import { BeautifulBackground } from "@/components/custom/beautiful-background";
import useSWR from 'swr';
import { getTasks } from "@/lib/api";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function DashboardPage() {
    const { data, error, isLoading } = useSWR({ url: '/tasks' }, getTasks);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
            <BeautifulBackground />
            <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">Task List</h2>
                {error && <div>Failed to load tasks</div>}
                {isLoading && <div>Loading...</div>}
                {data && data.data && data.data.length > 0 && (
                    <Table>
                        <TableCaption>Task List</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Domain</TableHead>
                                <TableHead>Send Frequency(second)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Last Run Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.domain}</TableCell>
                                    <TableCell>{task.send_frequency}</TableCell>
                                    <TableCell>{task.status}</TableCell>
                                    <TableCell>{task.created_at}</TableCell>
                                    <TableCell>{task.last_run_time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {data && !data.data && <div>No tasks found.</div>}
            </div>
        </main>
    );
}