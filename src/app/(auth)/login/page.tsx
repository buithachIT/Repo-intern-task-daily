import SigninForm from "@/features/auth/components/SigninForm/SigninForm";
// REVIEW: Prettier isn't working please check it due to multiple space in this code



const LoginPage = () => {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] mx-auto mt-20 from-primary flex justify-center md:grid-cols-[1fr_600px]">
            <div className="">
                <SigninForm />
            </div>
        </div>
    )
}
export default LoginPage;   