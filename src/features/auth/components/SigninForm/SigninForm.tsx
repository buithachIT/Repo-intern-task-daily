"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signinFormSchema, SigninFormValues } from "@/features/auth/components/SigninForm/SigninSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputPassword } from "@/components/ui/passwordInputCustom"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { lusitana } from "@/accets/fonts/fonts"



const SigninForm = () => {
    // 1. Define your form.
    const form = useForm<SigninFormValues>({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });
    const onSubmit = async (data: SigninFormValues) => {
        console.log("Form submitted", data);
    };
    return (
        <div className="p-10 shadow-xl">
            <p className={`${lusitana.className} text-3xl font-bold mb-2`}>Login to create your Blog</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            < FormItem >
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="px-[15px] py-3 text-[12px] text-sm"
                                        {...field}
                                        placeholder="Enter email address"
                                    />
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
                                    <InputPassword
                                        className="px-[15px] py-3 text-[12px] text-sm"
                                        {...field}
                                        placeholder="Enter password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center gap-[6px]">
                            <FormField
                                control={form.control}
                                name="rememberMe"
                                render={({ field }) => (
                                    <FormItem className="flex gap-[6px] items-center justify-center space-y-0">
                                        <FormControl>
                                            <Switch
                                                onCheckedChange={field.onChange}
                                                id="remeberme"
                                            />
                                        </FormControl>
                                        <FormLabel htmlFor="remeberme">Remember me</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Link
                            href=""
                            className="text-[12px] text-primary"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
export default SigninForm;