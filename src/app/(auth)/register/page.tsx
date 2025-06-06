import SignupForm from "@/features/auth/components/SignupForm/SignupForm";
const RegisterPage = () => {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] mx-auto mt-20 from-primary flex justify-center md:grid-cols-[1fr_600px]">
            <div className="">
                <SignupForm />
            </div>
        </div>
    )
}
export default RegisterPage;   