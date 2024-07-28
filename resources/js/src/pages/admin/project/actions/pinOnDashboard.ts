import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { showErrorResponse } from "../../../../helpers/util";
import { successMsg } from "../../../../helpers/toast-notification";

export function usePinProjectOnDashboard(){
    const loading = ref(false);
    async function pinnedProject(projectId: number) {
       try {
            loading.value = true
            const data= await makeHttpRequest<{ projectId: number }, { message: string }>(
                `projects/${projectId}/pin-on-dashboard`,
                'POST',
            );
            loading.value = false;
            successMsg(data.message);
        } catch (error) {
            loading.value = false;
            showErrorResponse(error);
        }
    };

    return { pinnedProject };
};
