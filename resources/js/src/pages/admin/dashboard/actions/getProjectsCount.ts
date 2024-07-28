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

            // Ensure that the event listener is set up only once
            if (!window.Echo.joined) {
                updateData();
                window.Echo.joined = true;
            }
        } catch (error) {
            showErrorResponse(error);
        }
    };

    // using laravel reverb to update the projects count in realtime with each time a new project is created.
    function updateData() {
        // listening to 'countProjectsChannel' of 'NewProjectCreated' Event.
        window.Echo.channel("countProjectsChannel").listen("NewProjectCreated", (e: { projectsCount: number }) => {
                projects.value = {
                    projects_count: e.projectsCount,
                };
                //console.log(e);
            },
        );
    };

    return { projects, getTotalProjects };
}
