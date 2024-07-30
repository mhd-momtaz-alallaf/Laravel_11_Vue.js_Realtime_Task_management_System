import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { showErrorResponse } from "../../../../helpers/util";
import { SingleProjectResponseType } from "./getProjectDetail.types";

export function useGetProjectDetail() {
    const loading = ref(false);
    const ProjectData = ref<SingleProjectResponseType>({} as SingleProjectResponseType);

    async function getProjectDetail(slug: string) {
        try {
            loading.value = true;
            const data= await makeHttpRequest<undefined, SingleProjectResponseType>(
                `projects/${slug}`,
                'GET'
            );
            loading.value = false;
            ProjectData.value = data;
        } catch (error: any) {
            loading.value = false;
            showErrorResponse(error);
        }
    };

    return { getProjectDetail, ProjectData, loading };
};
