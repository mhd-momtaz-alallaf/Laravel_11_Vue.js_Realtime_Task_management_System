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
import { useDragTask } from './actions/dragTask';

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

const { fromNotStartedToPending, fromPendingToCompleted, fromCompletedToPending, fromPendingToNotStarted } = useDragTask();

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
        <BreadCrumb><template #project-name>{{ slug }}</template></BreadCrumb>
        <ProjectDetail :ProjectDetail="ProjectData" />
        <ProjectProgress :ProjectDetail="ProjectData" />

        <br />

        <div class="card">
            <div class="card-body">
                <div class="row" style="height: 570px">
                    <NotStartedColumn
                        :projectData="ProjectData"
                        @openTaskModal="openTaskModal"
                        @fromNotStartedToPending="fromNotStartedToPending"
                    />

                    <PendingColumn
                        :projectData="ProjectData"
                        @fromPendingToCompleted="fromPendingToCompleted"
                        @fromPendingToNotStarted="fromPendingToNotStarted"
                     />

                    <CompletedColumn
                        :projectData="ProjectData"
                        @fromCompletedToPending="fromCompletedToPending"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.hovered{
    border:2px dashed rgb(157, 156, 156);
    border-radius: 5px;
}
.card-header {
    height: 50px !important; /* Force the height to 10px */
    overflow: hidden; /* Hide any overflow content */
    display: flex; /* Use flexbox for alignment */
    align-items: center; /* Center content vertically */
    justify-content: center; /* Center content horizontally */
    padding: 50 !important;
}
.scrollable-tasks {
  height: 520px;
  overflow-y: auto;
}
.task_card {
    padding: 10px;
    margin-top: 7px;
}
.card-header .btn .new-task{
    width: 200px; /* Customize the button width */
    height: 45px; /* Customize the button height */
}
.not_started_task {
    background-color: rgb(239, 244, 251);
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
/* Total scrollbar width */
.scrollable-tasks::-webkit-scrollbar {
    width: 4px;
    height: 8px; /* For horizontal scrollbar if needed */
}

/* Track */
.scrollable-tasks::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

/* Handle */
.scrollable-tasks::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

/* Handle on hover */
.scrollable-tasks::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>

