import { ref } from "vue";
import { makeHttpRequest } from "../../../helpers/makeHttpRequest";
import { showError, successMsg } from "../../../helpers/toast-notification";
import { showErrorResponse } from "../../../helpers/util";


export type LoginUserType = {
    email: string
    password: string
}

export type LoginResponseType = {
    user:{ email: string, id: number};
    message: string;
    isLoggedIn: boolean;
    token: string;
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

            successMsg(data.message)
            if(data.isLoggedIn){
                // storing the user data (response) in the local storage.
                localStorage.setItem('userData', JSON.stringify(data))
                window.location.href="/app/dashboard"
            }
        } catch (error: any) {
            loading.value = false;
            showErrorResponse(error);
        }
    }
    return {login, loading}
}
