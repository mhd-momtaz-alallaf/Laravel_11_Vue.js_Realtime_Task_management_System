<script setup lang="ts">
import { onMounted } from 'vue';
import ApexDonut from './/components/ApexDonut.vue';
import ApexRadialBar from './/components/ApexRadialBar.vue';
import { useGetPinnedProject } from './actions/getPinnedProject';
import { useGetTotalProjects } from './actions/getProjectsCount';
import { useGetChartData } from './actions/getChartsData';

const { project, getPinnedProject } = useGetPinnedProject();
const { projects, getTotalProjects } = useGetTotalProjects();
const { chartData, getChartData } = useGetChartData();

onMounted(async () => {
    await getPinnedProject();
    getChartData(project.value.id);
    getTotalProjects();
});
</script>

<template>
    <div class="row">
        <h2>Dashboard</h2>
        <br />
        <br />
        <br />
        <div class="row">
            <div class="col-md-8">
                <!-- {{ project?.id }} -->
                <h3>
                    <router-link style="color: rgb(118, 119, 120)" :to="'/kaban?project=' + project?.slug">
                        Project :{{ project?.name }}
                    </router-link>
                </h3>
                <br />
            </div>
        </div>
        <br /><br />
        <div class="row">
            <div class="col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <b>Total Projects</b>
                    </div>
                    <div class="card-body">
                        <br />
                        <br />
                        <h2 align="center">{{ projects?.projects_count }}</h2>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <b>Tasks</b>
                    </div>

                    <div class="card-body">
                        <!-- {{ chartData.tasks }} -->
                        <div v-if="chartData.tasks">
                            <ApexDonut :task="chartData.tasks" />
                        </div>
                        <div v-else>
                            <ApexDonut :task="[0, 0, 0]" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <b>Task Progress</b>
                    </div>

                    <div class="card-body">
                        <div v-if="chartData.progress > 0">
                            <ApexRadialBar :percent="chartData.progress" />
                        </div>
                        <div v-else>
                            <ApexRadialBar :percent=0 />
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-body {
    height: 200px; /* Customize the cards height */
}
</style>
