import { SigninFormValues } from "@/features/auth/components/SigninForm/SigninSchema";
import { apiPath } from "../api/utils";
import { SignupFormValues } from "@/features/auth/components/SignupForm/SignupSchema";

// REVIEW: Add more cases when we receive error from BE side with respose.ok !== true
/** 
 * E.g. When user signup with wrong data and catch and show this error for user
 */

export const signUp = async (user: SignupFormValues) => {
    const response = await fetch(apiPath("/api/users/signups/"), {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    return result;
}

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