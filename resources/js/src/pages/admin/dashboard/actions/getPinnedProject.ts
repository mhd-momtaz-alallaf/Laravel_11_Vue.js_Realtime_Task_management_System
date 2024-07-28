import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { showErrorResponse } from "../../../../helpers/util";
import { successMsg } from "../../../../helpers/toast-notification";

type pinnedProject = {
    id: number,
    name: string,
};

export type PinnedProjecType = {
    data: pinnedProject,
};

export function useGetPinnedProject() {
    const project = ref<pinnedProject>({} as pinnedProject);
    async function getPinnedProject() {
        try {
            const {data} = await makeHttpRequest<undefined, PinnedProjecType>(
                `projects/get-pinned-project`,
                'GET'
            );
            project.value = data;
        } catch (error) {
            showErrorResponse(error);
        }
    };

    return { getPinnedProject, project };
}
