<template>
    <div class="row">
        <AddTaskModal @closeModal="closeTaskModal" />
        <BreadCrumb />
        <ProjectDetail :ProjectDetail="ProjectData" />
        <ProjectProgress :ProjectDetail="ProjectData" />

        <br />

        <div class="card">
            <div class="card-body">
                <div class="row" style="height: 500px">
                    <NotStartedColumn @openTaskModal="openTaskModal" />

                    <PendingColumn />

                    <CompletedColumn />
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
import NotStartedColumn from './components/tasks/NotStartedColumn.vue';
import PendingColumn from './components/tasks/PendingColumn.vue';
import CompletedColumn from './components/tasks/CompletedColumn.vue';
import AddTaskModal from './components/tasks/AddTaskModal.vue';
import { closeModal, openModal } from '../../../helpers/util';

const route = useRoute();
const { ProjectData, getProjectDetail } = useGetProjectDetail();
const slug = route.query?.project as string;

async function openTaskModal() {
    openModal('taskModal').then(() => {
        console.log('Model Opened...');
    });
}

function closeTaskModal(){
    closeModal('taskModal')
}

onMounted(async () => {
    await getProjectDetail(slug);
    console.log(slug);
});
</script>

<style>
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

