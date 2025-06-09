import { SigninFormValues } from "@/features/auth/components/SigninForm/SigninSchema";
import { apiPath } from "../api/utils";

export const signIn = async (user: SigninFormValues) => {
    const response = await fetch(apiPath("/api/users/signin/"), {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    return result;
}