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
import { taskStore } from './store/kabanStore';

const route = useRoute();
const { ProjectData, getProjectDetail } = useGetProjectDetail();
const slug = route.query?.project as string;

// this function is to open the pop up AddTaskModal.vue (taskModal).
async function openTaskModal() {
    openModal('taskModal').then(() => {
        // passing the project id to the taskStore to use it in the pop up AddTaskModal.vue (taskModal).
        taskStore.taskInput.project_id = ProjectData.value?.data.id;
        console.log('Modal Opened...');
    });
}

// this function is to close the pop up AddTaskModal.vue (taskModal).
function closeTaskModal(){
    closeModal('taskModal')
}

onMounted(async () => {
    await getProjectDetail(slug);
    console.log(slug);
});
</script>

<template>
    <div class="row">
        <AddTaskModal
            @closeModal="closeTaskModal"
        />
        <BreadCrumb />
        <ProjectDetail :ProjectDetail="ProjectData" />
        <ProjectProgress :ProjectDetail="ProjectData" />

        <br />

        <div class="card">
            <div class="card-body">
                <div class="row" style="height: 500px">
                    <NotStartedColumn :projectData="ProjectData" @openTaskModal="openTaskModal" />

                    <PendingColumn :projectData="ProjectData" />

                    <CompletedColumn :projectData="ProjectData" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.scrollable-tasks {
  height: 440px;
  overflow-y: auto;
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
.assignees button {
    border-radius: 50px;
    width: 40px;
    height: 40px;
    border: 1px solid whitesmoke;
}
.assignees .member_1 {
    position: relative;
    left: -10px;
}
.assignees .member_2 {
    position: relative;
    left: -20px;
}
.assignees .member_3 {
    position: relative;
    left: -30px;
}
.assignees {
    display: flex;
    align-items: center; /* Align items vertically centered */
    justify-content: space-between; /* Space between buttons and assignees count */
}
.assignees-count {
    margin-left: auto; /* Pushes the count to the right */
}
</style>

