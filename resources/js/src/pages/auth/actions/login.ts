import { ref } from "vue";
import { makeHttpRequest } from "../../../helpers/makeHttpRequest";
import { showError, successMsg } from "../../../helpers/toast-notification";

export type LoginUserType = {
    email: string
    password: string
}

export type LoginResponseType = {
    user: {email: string};
    message: string;
    isLoggedIn?: boolean;
}

export const loginInput = ref<LoginUserType>({
    email: '',
    password: ''
});

export function useLoginUser() {
    const loading=ref(false)

    async function login() {
        try {
            loading.value = true;
            const data = await makeHttpRequest<LoginUserType, LoginResponseType>(
                'login',
                'POST',
                loginInput.value
            );
            loading.value = false;
            loginInput.value = {} as LoginUserType;

            if (data.isLoggedIn) {
                successMsg(data.message);
            } else {
                showError(data.message);
            }
        } catch (error: any) {
            loading.value = false;

            if (error.errors) {
                for (const key in error.errors) {
                    if(typeof error.errors[key] === "string")
                        showError(error.errors[key]);
                }
            } else {
                showError("An unexpected error occurred.");
            }
        }
    }
    return {login, loading}
}
