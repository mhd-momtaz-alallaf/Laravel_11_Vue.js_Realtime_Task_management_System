import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { showErrorResponse } from "../../../../helpers/util";

type chartDataType = {
    tasks: Array<number>
    progress: number
};

export function useGetChartData() {
    const chartData = ref<chartDataType>({} as chartDataType);
    async function getChartData(projectId: number) {
        try {
            const data = await makeHttpRequest<undefined, chartDataType>(
                `projects/${projectId}/get-charts-data`,
                'GET'
            );
            chartData.value = data;
            updateData();
        } catch (error) {
            showErrorResponse(error);
        }
    };

    // using laravel reverb to update the projects Progress and tasks status count in realtime with each time a task status of a Project is changed.
    function updateData() {
        // listening to 'projectProgressChannel' of 'TrackingProjectProgress' Event.
        window.Echo.channel("projectProgressChannel").listen("TrackingProjectProgress", (e: {projectProgress: number}) => {
            chartData.value.progress = 0; // initializing the progress.
            setTimeout(() => chartData.value.progress = e.projectProgress, 300);
            // console.log(e);
            }
        );

        window.Echo.channel("tasksCountChannel").listen("TrackingProjectTasksCount", (e: {tasks: Array<number>}) => {
            chartData.value.tasks = undefined as any; // initializing the tasks.
            setTimeout(() => chartData.value.tasks = e.tasks, 200);
            // console.log(e);
            }
        );
    }

    return { getChartData, chartData };
};
