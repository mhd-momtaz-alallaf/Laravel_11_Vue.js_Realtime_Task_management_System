import { ref } from "vue"
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest"
import { taskStore } from "../store/kabanStore"
import { successMsg } from "../../../../helpers/toast-notification"
import { showErrorResponse } from "../../../../helpers/util"

export type CreateTaskInput = {
    name: string;
    project_id: number;
    memberIds: Array<number>;
};

export function useCreateTask() {
    const loading = ref(false);

    async function createTask() {
        try {
            loading.value = true
            const data= await makeHttpRequest<CreateTaskInput, {message: string}>(
                'tasks',
                'POST',
                taskStore.taskInput
            );
            loading.value = false;
            successMsg(data.message);
        } catch (error) {
            loading.value = false;
            showErrorResponse(error);
        }
    }

    return { createTask, loading };
}
