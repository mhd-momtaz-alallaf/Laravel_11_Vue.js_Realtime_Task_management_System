import { ref } from "vue";
import { makeHttpRequest } from "../../../helpers/makeHttpRequest";
import { showError, successMsg } from "../../../helpers/toast-notification";
import { showErrorResponse } from "../../../helpers/util";

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
            showErrorResponse(error);
        }
    }

    return { register, loading };
}
