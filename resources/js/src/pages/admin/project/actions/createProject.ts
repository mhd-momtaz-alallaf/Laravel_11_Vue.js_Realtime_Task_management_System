import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { successMsg } from "../../../../helpers/toast-notification";
import { showErrorResponse } from "../../../../helpers/util";
import { projectStore } from "../store/projectStore";

export type ProjectInputType = {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
};

export type ProjectResponseType = {
    message: string;
};

export function useCreateOrUpdateProject() {

    const loading = ref(false);
    async function createOrUpdate() {
       try {
            loading.value = true;
            const data = projectStore.edit ? await updateProject() : await createProject();

            loading.value = false;
            projectStore.projectInput = {} as ProjectInputType;
            successMsg(data.message);
        } catch (error) {
            loading.value = false;
            showErrorResponse(error);
        }
    };

    return { createOrUpdate, loading };
};

async function createProject() {
    const data= await makeHttpRequest<ProjectInputType, ProjectResponseType>(
        'projects',
        'POST',
        projectStore.projectInput
    );

    return data;
};

async function updateProject() {
    const data= await makeHttpRequest<ProjectInputType, ProjectResponseType>(
        `projects/${projectStore.projectInput.id}`,
        'PUT',
        projectStore.projectInput
    );

    projectStore.edit = false;
    return data;
};
