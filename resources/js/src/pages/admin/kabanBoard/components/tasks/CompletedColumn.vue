<script lang="ts" setup>
import { getFirstChar, myDebounce } from "../../../../../helpers/util";
import { SingleProjectResponseType, TaskStatus} from "../../actions/getProjectDetail.types";

defineProps<{
    projectData: SingleProjectResponseType;
}>();

const emit = defineEmits<{
    (e: "fromCompletedToPending", taskId: number, project_id: number): Promise<void>;
}>();
</script>

<template>
    <div class="col-md-4 completed_task">
        <div class="card card-header">
            <b>Completed</b>
        </div>

        <div class="scrollable-tasks">
            <div
                v-show="task.status === TaskStatus.COMPLETED ? true : false"
                v-for="task in projectData?.data?.tasks"
                :key="task.id"
                draggable="true"
                :class="'card card-body task_card completedTask_'+task.id"
                @drag="emit('fromCompletedToPending', task.id, projectData?.data?.id)"
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
                        {{ task?.task_members.length }} Assignees
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
