<template>
    <div class="row">
        <BreadCrumb />
        <ProjectDetail :ProjectDetail="ProjectData" />
        <ProjectProgress :ProjectDetail="ProjectData" />

        <br />

        <div class="card">
            <div class="card-body">
                <div class="row" style="height: 500px">
                    <div class="col-md-4 not_started_task">
                        <div class="card card-header">
                            <button class="btn btn-warning">Add Task</button>
                        </div>

                        <div class="card card-body task_card" draggable="true">
                            <p>Task Name</p>

                            <div class="assignees">
                                <button class="btn btn-primary member_1">I</button>
                                <button class="btn btn-light member_2">J</button>
                                <button class="btn btn-secondary member_3">K</button>
                                3 Assignees
                            </div>
                        </div>

                        <div class="card card-body task_card" draggable="true">
                            <p>Task Name</p>

                            <div class="assignees">
                                <button class="btn btn-primary member_1">I</button>
                                <button class="btn btn-light member_2">J</button>
                                <button class="btn btn-secondary member_3">K</button>
                                3 Assignees
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 pending_task">
                        <div class="card card-header">
                            <b>Pending</b>
                        </div>

                        <div class="card card-body"></div>
                    </div>

                    <div class="col-md-4 completed_task">
                        <div class="card card-header">
                            <b>Completed</b>
                        </div>

                        <div class="card card-body"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useGetProjectDetail } from './actions/getProjectDetail';
import BreadCrumb from './components/BreadCrumb.vue';
import ProjectDetail from "./components/ProjectData.vue";
import ProjectProgress from './components/ProjectProgress.vue';
import { onMounted } from 'vue';

const route = useRoute();
const { ProjectData, getProjectDetail } = useGetProjectDetail();
const slug = route.query?.project as string;

onMounted(async () => {
    await getProjectDetail(slug);
    console.log(slug);
});
</script>

<style >
.assignees button {
    border-radius: 50px;
    width: 40px;
    height: 40px;
    border: 1px solid grey;
}
.assignees .member_2 {
    position: relative;
    left: -10px;
}
.assignees .member_3 {
    position: relative;
    left: -20px;
}
.task_card {
    padding: 10px;
    margin-top: 7px;
}
.not_started_task {
    background-color: aliceblue;
}
.pending_task {
    background-color: rgb(240, 242, 242);
}
</style>

