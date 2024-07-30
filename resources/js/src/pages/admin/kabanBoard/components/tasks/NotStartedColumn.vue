<script setup lang="ts">
import { computed } from 'vue';
import { getFirstChar } from '../../../../../helpers/util';
import { SingleProjectResponseType, TaskStatus } from '../../actions/getProjectDetail.types';

defineProps<{
    projectData: SingleProjectResponseType;
}>();

const emit = defineEmits<{
    (e:'openTaskModal'): Promise<void>;
}>();
</script>

<template>
    <div class="col-md-4 not_started_task">
        <div class="card card-header">
            <button @click="emit('openTaskModal')" class="btn btn-warning">Add Task</button>
        </div>

        <div class="scrollable-tasks">
            <div
                v-show="task.status === TaskStatus.NOT_STARTED ? true : false"
                v-for="task in projectData?.data?.tasks"
                :key="task.id"
                draggable="true"
                :class="'card card-body task_card notStartedTask_'+task.id"
            >
                <p>{{task.name}}</p>
                <div class="assignees">
                    <div class="assignees-buttons">
                        <button v-for="(member, index) in task.task_members.slice(0, 4)"
                            :key="member.id"
                            :class="`btn btn-primary member_${index}`"
                        >
                            {{ getFirstChar(member?.members?.name) }}
                        </button>
                    </div>
                    <div class="assignees-count">
                        {{ task?.task_members.length }} assignees
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
