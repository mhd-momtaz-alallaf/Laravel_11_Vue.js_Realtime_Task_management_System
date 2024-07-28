import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { showErrorResponse } from "../../../../helpers/util";
import { successMsg } from "../../../../helpers/toast-notification";

export type ProjectType = {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    slug: string;
    task_progress: {
        id: number;
        project_id: number;
        progress: string;
        created_at: string;
        updated_at: string;
    };
};

export type GetProjectType = {
    data:{ data: Array<ProjectType> }
} & Record<string, any>;

export function useGetProject() {
    const loading = ref(false);
    const ProjectData = ref<GetProjectType>({} as GetProjectType)
    async function getProjects(page: number = 1, query: string = ''){
       try {
            loading.value = true;
            const data= await makeHttpRequest<undefined, GetProjectType>(
                `projects?search=${query}&page=${page}`,
                'GET'
            );
            loading.value = false;
            ProjectData.value = data;
        } catch (error) {
            loading.value = false;
            showErrorResponse(error);
        }
    }

    return { getProjects ,ProjectData, loading };
};
