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
        } catch (error) {
            showErrorResponse(error);
        }
    };

    return { getChartData, chartData };
};
