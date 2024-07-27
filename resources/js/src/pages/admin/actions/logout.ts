import { ref } from "vue";
import { makeHttpRequest } from "../../../helpers/makeHttpRequest";
import { showErrorResponse } from "../../../helpers/util";
import { successMsg } from "../../../helpers/toast-notification";

export function useLogoutUser() {
    const loading = ref(false);
    async function logout(userId: number | undefined) {
       try {
            loading.value = true;
            const data = await makeHttpRequest<{ userId: number | undefined }, { message: string }>(
                'logout',
                'POST',
                { userId: userId }
            );
            loading.value = false;
            successMsg(data.message);
        } catch (error:any) {
            console.log(error);
            showErrorResponse(error);
            if((error as Error).message == 'Unauthenticated.') {
                window.location.href="/app/login";
            }
            loading.value = false;
        }
    }

    return { logout, loading };
}
