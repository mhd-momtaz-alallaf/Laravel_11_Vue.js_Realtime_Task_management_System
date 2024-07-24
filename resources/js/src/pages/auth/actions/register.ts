import { ref } from "vue";
import { makeHttpRequest } from "../../../helpers/makeHttpRequest";
import { showError, successMsg } from "../../../helpers/toast-notification";

export type RegisterUserType = {
    email: string;
    password: string;
};

export type RegisterResponseType = {
    user: { email: string };
    message: string;
};

export const registerInput = ref<RegisterUserType>({
    email: '',
    password: ''
});

export function useRegisterUser() {
    const loading = ref(false);

    async function register() {
        try {
            loading.value = true;
            const data = await makeHttpRequest<RegisterUserType, RegisterResponseType>(
                'register',
                'POST',
                registerInput.value
            );
            loading.value = false;
            registerInput.value = { email: '', password: '' };
            successMsg(data.message);
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

    return { register, loading };
}
