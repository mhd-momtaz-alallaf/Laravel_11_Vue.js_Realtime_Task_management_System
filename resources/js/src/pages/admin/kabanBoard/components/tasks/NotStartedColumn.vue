<script setup lang="ts">
const emit = defineEmits<{
    (e:'openTaskModal'): Promise<void>;
}>();
</script>

<template>
    <div class="col-md-4 not_started_task">
        <div class="card card-header">
            <button @click="emit('openTaskModal')" class="btn btn-warning">Add Task</button>
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
</template>
