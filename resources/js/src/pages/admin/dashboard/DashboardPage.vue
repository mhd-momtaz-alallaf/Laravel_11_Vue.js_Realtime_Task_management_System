<script setup lang="ts">
import { onMounted } from 'vue';
import ApexDonut from './/components/ApexDonut.vue';
import ApexRadialBar from './/components/ApexRadialBar.vue';
import { useGetPinnedProject } from './actions/getPinnedProject';
import { useGetTotalProjects } from './actions/getProjectsCount';

const { project, getPinnedProject } = useGetPinnedProject();
const { projects, getTotalProjects } = useGetTotalProjects();

onMounted(async () => {
    await getPinnedProject();
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
                <h3 style="color: rgb(118, 119, 120)">
                    Project :{{ project?.name }}
                </h3>
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
                    <div class="card-header"><b>Tasks</b></div>
                    <div class="card-body">
                        <div>
                            <ApexDonut :task="[40,60]" />
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
                        <div>
                            <ApexRadialBar :percent="70"/>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
