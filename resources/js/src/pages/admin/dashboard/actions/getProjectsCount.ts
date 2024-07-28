import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { showErrorResponse } from "../../../../helpers/util";

type countProjectType = {
    projects_count: number,
};

export function useGetTotalProjects() {
    const projects = ref<countProjectType>({} as countProjectType);
    async function getTotalProjects() {
        try {
            const data = await makeHttpRequest<undefined, countProjectType>(
                `projects/count`,
                "GET"
            );
            projects.value = data;
        } catch (error) {
            showErrorResponse(error);
        }
    };

    return { projects, getTotalProjects };
}
