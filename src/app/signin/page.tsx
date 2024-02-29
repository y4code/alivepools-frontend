'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BeautifulBackground } from "@/components/custom/beautifulBackground";
import { signIn } from "@/lib/api";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

const FormSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function SigninPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [statedFormData, setStatedFormData] = useState({
        email: "",
        password: "",
    })
    const { data, error, isMutating, trigger } = useSWRMutation({ url: '/user/signin', args: statedFormData }, signIn, {
        onSuccess: (data) => {
            if (data.is_success) {
                setToken(data.data.token);
                router.replace("/dashboard");
            } else {
                toast({
                    title: "Sign in failed",
                    description: data.message,
                });
            }
        },
        onError: (error) => {
            toast({
                title: "Sign in failed",
                description: error.message,

            });
        }
    });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(formData: z.infer<typeof FormSchema>) {
        trigger();
    }

    return <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
        <Toaster />
        <BeautifulBackground />
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>Keep your website in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" onChange={
                        () => {
                            setStatedFormData(form.getValues())
                        }
                    }>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        <Button disabled={isMutating} type="submit">Sign in</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </main>
}