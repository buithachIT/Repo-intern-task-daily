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
import { toast, ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { asyncHandlerWrapper } from "@/helper/api"
import { signIn } from "@/lib/action/auth"

const SigninForm = () => {
    const router = useRouter();
    const { user, isAuthenticated, login } = useAuth();
    // 1. Define your form.
    const form = useForm<SigninFormValues>({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });
    // const onSubmit = async (data: SigninFormValues) => {
    //     try {
    //         const response = await fetch(apiPath("/api/users/signin"), {
    //             method: "POST",
    //             body: JSON.stringify(data),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const result = await response.json();

    //         if (!result.user) {
    //             toast.error(result.error)
    //             console.log("No result", result.error);
    //         } else {
    //             console.log("Check result", result)
    //             toast.success("Đăng nhập thành công");
    //             login(result.user, result.accessToken);
    //             setTimeout(() => {
    //                 router.push('/');
    //             }, 1500);
    //         }
    //     } catch (error) {
    //         console.error("Fetch error:", error);
    //         toast.error("Lỗi không xác định>> loginform");
    //     }
    // };
    const onSubmit = async (data: SigninFormValues) => {
        await asyncHandlerWrapper(
            async () => {
                const result = await signIn(data);
                if (result && result.user) {
                    console.log("check login", result.user, result.accessToken);
                    login(result.user, result.accessToken);
                    toast.success("Đăng nhập thành công");
                    router.push('/home')
                } else {
                    toast.error(result.error);
                    return
                }
            },
            (error) => {
                console.log(error);
                toast.error(error)
            },
        )
    }
    console.log("Check authen", isAuthenticated, user)
    return (
        <div className="p-10 shadow-xl">
            <p className={`${lusitana.className} text-3xl font-bold mb-2`}>Login to create your Blog</p>
            <ToastContainer />
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